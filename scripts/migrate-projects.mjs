#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REQUIRED_ENV = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_SERVICE_ROLE_KEY']
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key])

if (missingEnv.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnv.join(
      ', ',
    )}. Supply them via --env-file=.env or your shell before running this script.`,
  )
  process.exit(1)
}

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const workspaceRoot = path.resolve(__dirname, '..')
const publicDir = path.join(workspaceRoot, 'public')
const dataFile = path.join(workspaceRoot, 'src', 'data', 'projects.json')

const bucketId = 'project_media'

const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function ensureRichTextHtml(value) {
  const trimmed = String(value ?? '').trim()
  if (!trimmed) {
    return ''
  }
  if (HTML_TAG_PATTERN.test(trimmed)) {
    return trimmed
  }
  return `<p>${escapeHtml(trimmed)}</p>`
}

function buildProjectFolder(rawInternalCode, rawSlug) {
  const normalizedCode = String(rawInternalCode ?? '')
    .trim()
    .replace(/\s+/g, '-')
    .toUpperCase()

  const normalizedSlug = String(rawSlug ?? '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()

  if (!normalizedCode || !normalizedSlug) {
    throw new Error(`Invalid storage folder inputs. internalCode="${rawInternalCode}", slug="${rawSlug}"`)
  }
  return `projects/${normalizedCode}/${normalizedSlug}`
}

function guessContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  switch (ext) {
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.webp':
      return 'image/webp'
    case '.gif':
      return 'image/gif'
    case '.svg':
      return 'image/svg+xml'
    case '.pdf':
      return 'application/pdf'
    default:
      return 'application/octet-stream'
  }
}

function toProjectStatus(value) {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase()
  if (normalized === 'published' || normalized === 'archived') {
    return normalized
  }
  return 'draft'
}

function toProjectPriority(value) {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase()
  if (normalized === 'flagship' || normalized === 'portfolio' || normalized === 'standard') {
    return normalized
  }
  return null
}

async function ensureAsset({ localSrc, altText, internalCode, slug }) {
  if (!localSrc) {
    return null
  }

  const relativePath = String(localSrc).replace(/^[/\\]+/, '')
  const absolutePath = path.join(publicDir, relativePath)

  try {
    await fs.access(absolutePath)
  } catch {
    console.warn(`[migrate-projects] Skipping missing asset "${relativePath}" for ${slug}.`)
    return null
  }

  const filename = path.basename(absolutePath)
  let storagePath

  try {
    storagePath = `${buildProjectFolder(internalCode, slug)}/${filename}`
  } catch (error) {
    console.error(`[migrate-projects] Failed to build storage path for ${slug}:`, error.message)
    return null
  }

  const existingAsset = await supabase
    .from('project_assets')
    .select('*')
    .eq('bucket', bucketId)
    .eq('path', storagePath)
    .maybeSingle()

  if (existingAsset.error) {
    throw new Error(`Failed to look up existing asset "${storagePath}": ${existingAsset.error.message}`)
  }

  if (existingAsset.data) {
    const needsAltUpdate =
      altText && (!existingAsset.data.alt_text || existingAsset.data.alt_text.trim().length === 0)

    if (needsAltUpdate) {
      const { error: updateError } = await supabase
        .from('project_assets')
        .update({ alt_text: altText })
        .eq('id', existingAsset.data.id)
      if (updateError) {
        console.warn(
          `[migrate-projects] Unable to update alt text for asset ${existingAsset.data.id}: ${updateError.message}`,
        )
      }
    }

    return existingAsset.data
  }

  const fileBuffer = await fs.readFile(absolutePath)
  const contentType = guessContentType(absolutePath)

  const { error: uploadError } = await supabase.storage.from(bucketId).upload(storagePath, fileBuffer, {
    contentType,
    upsert: false,
  })

  if (uploadError) {
    if (uploadError.message && uploadError.message.includes('already exists')) {
      const conflictLookup = await supabase
        .from('project_assets')
        .select('*')
        .eq('bucket', bucketId)
        .eq('path', storagePath)
        .maybeSingle()
      if (conflictLookup.data) {
        return conflictLookup.data
      }
    }
    throw new Error(`Failed to upload asset "${storagePath}": ${uploadError.message}`)
  }

  const { data, error } = await supabase
    .from('project_assets')
    .insert({
      bucket: bucketId,
      path: storagePath,
      label: altText && altText.trim().length > 0 ? altText : filename,
      alt_text: altText ?? null,
      mime_type: contentType,
      size_bytes: fileBuffer.length,
    })
    .select()
    .single()

  if (error) {
    if (error.message && error.message.includes('duplicate key value')) {
      const conflictLookup = await supabase
        .from('project_assets')
        .select('*')
        .eq('bucket', bucketId)
        .eq('path', storagePath)
        .maybeSingle()
      if (conflictLookup.data) {
        return conflictLookup.data
      }
    }
    throw new Error(`Failed to register asset metadata for "${storagePath}": ${error.message}`)
  }

  return data
}

async function main() {
  const raw = await fs.readFile(dataFile, 'utf8')
  const parsed = JSON.parse(raw)
  const projectEntries = Array.isArray(parsed.projects) ? parsed.projects : []

  if (projectEntries.length === 0) {
    console.log('[migrate-projects] No projects found in src/data/projects.json. Nothing to migrate.')
    return
  }

  const slugToProjectId = new Map()
  const pendingRelations = []

  for (const [index, entry] of projectEntries.entries()) {
    const slug = String(entry.slug ?? '').trim()
    if (!slug) {
      console.warn(`[migrate-projects] Skipping project at index ${index}: missing slug.`)
      continue
    }

    const name = String(entry.name ?? '').trim() || `Project ${index + 1}`
    const metadata = entry.metadata && typeof entry.metadata === 'object' ? entry.metadata : {}
    const isActive = typeof metadata.isActive === 'boolean' ? metadata.isActive : true

    const fallbackInternal = `PRJ-${String(index + 1).padStart(3, '0')}`
    const internalCode = String(metadata.internalId ?? fallbackInternal).trim() || fallbackInternal
    const status = toProjectStatus(metadata.status)
    const priority = toProjectPriority(metadata.priority)
    const projectManager =
      typeof metadata.projectManager === 'string' && metadata.projectManager.trim().length > 0
        ? metadata.projectManager.trim()
        : null

    const tags =
      Array.isArray(metadata.tags) && metadata.tags.length > 0
        ? metadata.tags
            .map((tag) => String(tag ?? '').trim())
            .filter((tag) => tag.length > 0)
        : []

    const descriptionParagraphs = Array.isArray(entry.description)
      ? entry.description
          .map((paragraph) => ensureRichTextHtml(paragraph))
          .filter((paragraph) => paragraph.length > 0)
      : []

    const yearValue =
      typeof entry.year === 'number'
        ? entry.year
        : typeof entry.year === 'string' && entry.year.trim().length > 0
          ? Number.parseInt(entry.year.trim(), 10)
          : null

    const heroImage = entry.heroImage && typeof entry.heroImage === 'object' ? entry.heroImage : null
    const heroAsset = await ensureAsset({
      localSrc: heroImage?.src,
      altText: heroImage?.alt ?? name,
      internalCode,
      slug,
    })

    const galleryEntries = Array.isArray(entry.gallery) ? entry.gallery : []
    const galleryAssets = []

    for (const [galleryIndex, galleryEntry] of galleryEntries.entries()) {
      if (!galleryEntry || typeof galleryEntry !== 'object') continue
      const asset = await ensureAsset({
        localSrc: galleryEntry.src,
        altText: galleryEntry.alt ?? `${name} gallery image ${galleryIndex + 1}`,
        internalCode,
        slug,
      })
      if (asset) {
        galleryAssets.push({
          asset,
          caption:
            typeof galleryEntry.caption === 'string' && galleryEntry.caption.trim().length > 0
              ? galleryEntry.caption.trim()
              : galleryEntry.alt ?? null,
        })
      }
    }

    const shortDescription = String(entry.shortDescription ?? '').trim()
    const client = String(entry.client ?? '').trim()
    const category = String(entry.category ?? '').trim()

    console.log(`[migrate-projects] Upserting project "${slug}" (${internalCode})`)

    const { data: upsertedProject, error: upsertError } = await supabase
      .from('projects')
      .upsert(
        {
          slug,
          internal_code: internalCode,
          name,
          short_description: shortDescription,
          client: client || null,
          category: category || null,
          status,
          priority,
          project_manager: projectManager,
          year: Number.isInteger(yearValue) ? yearValue : null,
          is_active: isActive,
          hero_asset_id: heroAsset?.id ?? galleryAssets[0]?.asset?.id ?? null,
        },
        {
          onConflict: 'slug',
        },
      )
      .select()
      .single()

    if (upsertError) {
      throw new Error(`Failed to upsert project "${slug}": ${upsertError.message}`)
    }

    const projectId = upsertedProject.id
    slugToProjectId.set(slug, projectId)

    const { error: deleteDescriptionsError } = await supabase
      .from('project_descriptions')
      .delete()
      .eq('project_id', projectId)
    if (deleteDescriptionsError) {
      throw new Error(`Failed to reset descriptions for "${slug}": ${deleteDescriptionsError.message}`)
    }

    if (descriptionParagraphs.length > 0) {
      const { error: insertDescriptionsError } = await supabase.from('project_descriptions').insert(
        descriptionParagraphs.map((paragraph, orderIndex) => ({
          project_id: projectId,
          order_index: orderIndex,
          paragraph,
        })),
      )
      if (insertDescriptionsError) {
        throw new Error(`Failed to insert descriptions for "${slug}": ${insertDescriptionsError.message}`)
      }
    }

    const { error: deleteTagsError } = await supabase.from('project_tags').delete().eq('project_id', projectId)
    if (deleteTagsError) {
      throw new Error(`Failed to reset tags for "${slug}": ${deleteTagsError.message}`)
    }

    if (tags.length > 0) {
      const { error: insertTagsError } = await supabase.from('project_tags').insert(
        tags.map((tag) => ({
          project_id: projectId,
          tag,
        })),
      )
      if (insertTagsError) {
        throw new Error(`Failed to insert tags for "${slug}": ${insertTagsError.message}`)
      }
    }

    const { error: deleteGalleryError } = await supabase
      .from('project_gallery_items')
      .delete()
      .eq('project_id', projectId)
    if (deleteGalleryError) {
      throw new Error(`Failed to reset gallery items for "${slug}": ${deleteGalleryError.message}`)
    }

    if (galleryAssets.length > 0) {
      const { error: insertGalleryError } = await supabase.from('project_gallery_items').insert(
        galleryAssets.map((item, orderIndex) => ({
          project_id: projectId,
          asset_id: item.asset.id,
          caption: item.caption ?? null,
          order_index: orderIndex,
        })),
      )
      if (insertGalleryError) {
        throw new Error(`Failed to insert gallery items for "${slug}": ${insertGalleryError.message}`)
      }
    }

    const { error: deleteRelationsError } = await supabase
      .from('project_relations')
      .delete()
      .eq('project_id', projectId)
    if (deleteRelationsError) {
      throw new Error(`Failed to reset relations for "${slug}": ${deleteRelationsError.message}`)
    }

    const relatedSlugs =
      Array.isArray(entry.relatedSlugs) && entry.relatedSlugs.length > 0
        ? entry.relatedSlugs
            .map((relatedSlug) => String(relatedSlug ?? '').trim())
            .filter((relatedSlug) => relatedSlug.length > 0)
        : []

    if (relatedSlugs.length > 0) {
      pendingRelations.push({
        projectId,
        slug,
        relatedSlugs,
      })
    }
  }

  for (const relationGroup of pendingRelations) {
    const rows = []
    for (const relatedSlug of relationGroup.relatedSlugs) {
      const relatedProjectId = slugToProjectId.get(relatedSlug)
      if (!relatedProjectId) {
        console.warn(
          `[migrate-projects] Unable to link relation for ${relationGroup.slug} -> ${relatedSlug}: project not found.`,
        )
        continue
      }
      if (relatedProjectId === relationGroup.projectId) {
        continue
      }
      rows.push({
        project_id: relationGroup.projectId,
        related_project_id: relatedProjectId,
      })
    }

    if (rows.length > 0) {
      const { error } = await supabase.from('project_relations').insert(rows)
      if (error) {
        throw new Error(`Failed to insert relations for "${relationGroup.slug}": ${error.message}`)
      }
    }
  }

  console.log(
    `[migrate-projects] Migration complete. Migrated ${slugToProjectId.size} projects and ${pendingRelations.length} relation sets.`,
  )
}

main().catch((error) => {
  console.error('[migrate-projects] Migration failed:', error)
  process.exitCode = 1
})
