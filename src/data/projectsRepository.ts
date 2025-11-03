import type { PostgrestSingleResponse } from '@supabase/supabase-js'
import { assertSupabaseClient } from '../lib/supabaseClient'
import type {
  CreateProjectPayload,
  Project,
  ProjectAsset,
  ProjectImage,
  ProjectMetadata,
  ProjectPriority,
  ProjectQueryOptions,
  ProjectStatus,
  UpdateProjectPayload,
} from './projectTypes'
import { getAllProjects } from './projects'
import { ensureRichTextHtml } from '../lib/richText'

type ProjectRow = {
  id: string
  slug: string
  internal_code: string
  name: string
  short_description: string
  client: string | null
  category: string | null
  status: ProjectStatus
  priority: ProjectPriority | null
  project_manager: string | null
  year: number | null
  is_active?: boolean | null
  hero_asset_id: string | null
  created_at: string
  updated_at: string
  project_descriptions?: Array<{
    id: number
    order_index: number
    paragraph: string
  }>
  project_gallery_items?: Array<{
    id: number
    caption: string | null
    order_index: number
    asset: ProjectAssetRow | null
  }>
  project_tags?: Array<{ tag: string }>
  project_relations?: Array<{
    related_project_id: string
  }>
  hero_asset?: ProjectAssetRow | null
}

type ProjectAssetRow = {
  id: string
  bucket: string
  path: string
  label: string | null
  alt_text: string | null
  mime_type: string | null
  size_bytes: number | null
  created_at: string
}

let activeColumnSupport: boolean | null = null

function shouldIncludeActiveColumn(): boolean {
  return activeColumnSupport !== false
}

function markActiveColumnAvailable(value: boolean) {
  activeColumnSupport = value
}

function buildProjectSelectColumns(includeActive: boolean): string {
  const columns = [
    'id',
    'slug',
    'internal_code',
    'name',
    'short_description',
    'client',
    'category',
    'status',
    'priority',
    'project_manager',
    'year',
  ]

  if (includeActive) {
    columns.push('is_active')
  }

  columns.push(
    'hero_asset_id',
    'created_at',
    'updated_at',
    `project_descriptions (
    id,
    order_index,
    paragraph
  )`,
    `project_gallery_items (
    id,
    caption,
    order_index,
    asset:project_assets (
      id,
      bucket,
      path,
      label,
      alt_text,
      mime_type,
      size_bytes,
      created_at
    )
  )`,
    `project_tags (
    tag
  )`,
    `project_relations!project_relations_project_id_fkey (
    related_project_id
  )`,
    `hero_asset:project_assets!projects_hero_asset_fk (
    id,
    bucket,
    path,
    label,
    alt_text,
    mime_type,
    size_bytes,
    created_at
  )`,
  )

  return columns.join(',\n  ')
}

type PostgrestErrorLike = {
  message?: string
  details?: string
}

function isMissingActiveColumnError(error: PostgrestErrorLike | undefined) {
  if (!error) return false
  const { message, details } = error
  const text = `${message ?? ''} ${details ?? ''}`.trim()
  if (!text) return false
  return /column .*is_active.* does not exist/i.test(text)
}

export async function fetchProjects(options: ProjectQueryOptions = {}): Promise<Project[]> {
  const includeDrafts = Boolean(options.includeDrafts)

  let supabase: ReturnType<typeof assertSupabaseClient>
  try {
    supabase = assertSupabaseClient()
  } catch {
    console.warn('[projectsRepository] Supabase client unavailable, using local project data fallback.')
    return loadFallbackProjects(includeDrafts)
  }

  try {
    const includeActiveColumn = shouldIncludeActiveColumn()

    const baseQuery = supabase
      .from('projects')
      .select(buildProjectSelectColumns(includeActiveColumn), { count: 'exact' })
      .order('created_at', { ascending: false })

    const query = !includeDrafts ? baseQuery.eq('status', 'published') : baseQuery

    const response = (await query) as PostgrestSingleResponse<ProjectRow[]>
    if (response.error && includeActiveColumn && isMissingActiveColumnError(response.error)) {
      markActiveColumnAvailable(false)
      const retryBase = supabase
        .from('projects')
        .select(buildProjectSelectColumns(false), { count: 'exact' })
        .order('created_at', { ascending: false })
      const retryQuery = !includeDrafts ? retryBase.eq('status', 'published') : retryBase
      const retryResponse = (await retryQuery) as PostgrestSingleResponse<ProjectRow[]>
      if (retryResponse.error) {
        throw new Error(`Failed to fetch projects from Supabase: ${retryResponse.error.message}`)
      }
      const retryRows = retryResponse.data ?? []
      return mapProjectRows(retryRows)
    }

    if (response.error) {
      if (!includeDrafts) {
        console.warn(
          '[projectsRepository] Supabase project query failed, falling back to local JSON:',
          response.error.message,
        )
        return loadFallbackProjects(includeDrafts)
      }
      throw new Error(`Failed to fetch projects from Supabase: ${response.error.message}`)
    }

    if (includeActiveColumn) {
      markActiveColumnAvailable(true)
    }

    const rows = response.data ?? []
    return mapProjectRows(rows)
  } catch (error) {
    if (!includeDrafts) {
      console.warn('[projectsRepository] Falling back to local project data due to unexpected error.', error)
      return loadFallbackProjects(includeDrafts)
    }
    throw error
  }
}

export async function fetchProjectBySlug(
  slug: string,
  options: ProjectQueryOptions = {},
): Promise<Project | null> {
  const includeDrafts = Boolean(options.includeDrafts)

  let supabase: ReturnType<typeof assertSupabaseClient>
  try {
    supabase = assertSupabaseClient()
  } catch {
    const fallback = loadFallbackProjects(includeDrafts).find((project) => project.slug === slug)
    return fallback ?? null
  }

  try {
    const includeActiveColumn = shouldIncludeActiveColumn()
    const baseQuery = supabase.from('projects').select(buildProjectSelectColumns(includeActiveColumn)).eq('slug', slug)

    const query = !includeDrafts ? baseQuery.eq('status', 'published') : baseQuery

    const response = (await query.limit(1).maybeSingle()) as PostgrestSingleResponse<ProjectRow | null>
    if (response.error && includeActiveColumn && isMissingActiveColumnError(response.error)) {
      markActiveColumnAvailable(false)
      const retryBase = supabase.from('projects').select(buildProjectSelectColumns(false)).eq('slug', slug)
      const retryQuery = !includeDrafts ? retryBase.eq('status', 'published') : retryBase
      const retryResponse = (await retryQuery.limit(1).maybeSingle()) as PostgrestSingleResponse<ProjectRow | null>
      if (retryResponse.error) {
        throw new Error(`Failed to fetch project ${slug} from Supabase: ${retryResponse.error.message}`)
      }
      if (!retryResponse.data) {
        return null
      }
      const [retryMapped] = mapProjectRows([retryResponse.data])
      return retryMapped ?? null
    }

    if (response.error) {
      if (!includeDrafts) {
        const fallback = loadFallbackProjects(includeDrafts).find((project) => project.slug === slug)
        return fallback ?? null
      }
      throw new Error(`Failed to fetch project ${slug} from Supabase: ${response.error.message}`)
    }

    if (includeActiveColumn) {
      markActiveColumnAvailable(true)
    }

    if (!response.data) {
      return null
    }

    const [mapped] = mapProjectRows([response.data])
    return mapped ?? null
  } catch (error) {
    if (!includeDrafts) {
      const fallback = loadFallbackProjects(includeDrafts).find((project) => project.slug === slug)
      return fallback ?? null
    }
    throw error
  }
}

export async function fetchProjectById(
  id: string,
  options: ProjectQueryOptions = {},
): Promise<Project | null> {
  const includeDrafts = Boolean(options.includeDrafts)

  let supabase: ReturnType<typeof assertSupabaseClient>
  try {
    supabase = assertSupabaseClient()
  } catch {
    return null
  }

  try {
    const includeActiveColumn = shouldIncludeActiveColumn()
    const baseQuery = supabase.from('projects').select(buildProjectSelectColumns(includeActiveColumn)).eq('id', id)

    const query = !includeDrafts ? baseQuery.eq('status', 'published') : baseQuery

    const response = (await query.limit(1).maybeSingle()) as PostgrestSingleResponse<ProjectRow | null>
    if (response.error && includeActiveColumn && isMissingActiveColumnError(response.error)) {
      markActiveColumnAvailable(false)
      const retryBase = supabase.from('projects').select(buildProjectSelectColumns(false)).eq('id', id)
      const retryQuery = !includeDrafts ? retryBase.eq('status', 'published') : retryBase
      const retryResponse = (await retryQuery.limit(1).maybeSingle()) as PostgrestSingleResponse<ProjectRow | null>
      if (retryResponse.error) {
        if (!includeDrafts) {
          return null
        }
        throw new Error(`Failed to fetch project ${id} from Supabase: ${retryResponse.error.message}`)
      }
      if (!retryResponse.data) {
        return null
      }
      const [retryMapped] = mapProjectRows([retryResponse.data])
      return retryMapped ?? null
    }

    if (response.error) {
      if (!includeDrafts) {
        return null
      }
      throw new Error(`Failed to fetch project ${id} from Supabase: ${response.error.message}`)
    }

    if (includeActiveColumn) {
      markActiveColumnAvailable(true)
    }

    if (!response.data) {
      return null
    }

    const [mapped] = mapProjectRows([response.data])
    return mapped ?? null
  } catch (error) {
    if (!includeDrafts) {
      return null
    }
    throw error
  }
}

export async function createProject(payload: CreateProjectPayload): Promise<Project> {
  const supabase = assertSupabaseClient()

  const includeActiveColumn = shouldIncludeActiveColumn()

  const baseInsertPayload: Record<string, unknown> = {
    slug: payload.slug,
    internal_code: payload.internalCode,
    name: payload.name,
    short_description: payload.shortDescription,
    client: payload.client ?? null,
    category: payload.category ?? null,
    status: payload.status ?? 'draft',
    priority: payload.priority ?? null,
    project_manager: payload.projectManager ?? null,
    year: payload.year ?? null,
    hero_asset_id: payload.heroAssetId ?? null,
  }

  if (includeActiveColumn) {
    baseInsertPayload.is_active = payload.isActive ?? true
  }

  let { data, error } = await supabase.from('projects').insert(baseInsertPayload).select().single()

  if (error && includeActiveColumn && isMissingActiveColumnError(error)) {
    markActiveColumnAvailable(false)
    const retryPayload = { ...baseInsertPayload }
    delete retryPayload.is_active
    const retry = await supabase.from('projects').insert(retryPayload).select().single()
    data = retry.data
    error = retry.error
  }

  if (error || !data) {
    throw new Error(error ? error.message : 'Unknown error creating project')
  }

  const projectId = data.id

  if (payload.description?.length) {
    await supabase.from('project_descriptions').insert(
      payload.description.map((paragraph, index) => ({
        project_id: projectId,
        order_index: index,
        paragraph,
      })),
    )
  }

  if (payload.tags?.length) {
    await supabase.from('project_tags').insert(
      payload.tags.map((tag) => ({
        project_id: projectId,
        tag,
      })),
    )
  }

  if (payload.relatedProjectIds?.length) {
    await supabase.from('project_relations').insert(
      payload.relatedProjectIds.map((relatedId) => ({
        project_id: projectId,
        related_project_id: relatedId,
      })),
    )
  }

  if (payload.gallery?.length) {
    await supabase.from('project_gallery_items').insert(
      payload.gallery.map((item, index) => ({
        project_id: projectId,
        asset_id: item.assetId,
        caption: item.caption ?? null,
        order_index: item.orderIndex ?? index,
      })),
    )
  }

  const createdProject = await fetchProjectById(projectId, { includeDrafts: true })
  if (createdProject) {
    return createdProject
  }

  return {
    id: projectId,
    slug: payload.slug,
    name: payload.name,
    shortDescription: payload.shortDescription,
    client: payload.client ?? '',
    category: payload.category ?? '',
    year: payload.year ?? 0,
    description: payload.description ?? [],
    heroImage: { src: '', alt: '' },
    gallery: [],
    relatedSlugs: [],
    metadata: {
      internalId: payload.internalCode,
      status: payload.status ?? 'draft',
      ...(payload.projectManager ? { projectManager: payload.projectManager } : {}),
      ...(payload.priority ? { priority: payload.priority } : {}),
      ...(payload.tags?.length ? { tags: payload.tags } : {}),
      isActive: payload.isActive ?? true,
    },
    isActive: payload.isActive ?? true,
  }
}

export async function updateProject(payload: UpdateProjectPayload): Promise<Project> {
  const supabase = assertSupabaseClient()

  const { id, ...rest } = payload

  const updateFields = {
    ...(rest.slug ? { slug: rest.slug } : {}),
    ...(rest.internalCode ? { internal_code: rest.internalCode } : {}),
    ...(rest.name ? { name: rest.name } : {}),
    ...(rest.shortDescription ? { short_description: rest.shortDescription } : {}),
    ...(rest.client !== undefined ? { client: rest.client ?? null } : {}),
    ...(rest.category !== undefined ? { category: rest.category ?? null } : {}),
    ...(rest.status ? { status: rest.status } : {}),
    ...(rest.priority !== undefined ? { priority: rest.priority ?? null } : {}),
    ...(rest.projectManager !== undefined ? { project_manager: rest.projectManager ?? null } : {}),
    ...(rest.year !== undefined ? { year: rest.year ?? null } : {}),
    ...(rest.heroAssetId !== undefined ? { hero_asset_id: rest.heroAssetId ?? null } : {}),
    ...(rest.isActive !== undefined && shouldIncludeActiveColumn() ? { is_active: rest.isActive } : {}),
  }

  const { error } = await supabase.from('projects').update(updateFields).eq('id', id)

  if (error) {
    throw new Error(`Failed to update project: ${error.message}`)
  }

  if (rest.description) {
    await supabase.from('project_descriptions').delete().eq('project_id', id)
    if (rest.description.length) {
      await supabase.from('project_descriptions').insert(
        rest.description.map((paragraph, index) => ({
          project_id: id,
          order_index: index,
          paragraph,
        })),
      )
    }
  }

  if (rest.tags) {
    await supabase.from('project_tags').delete().eq('project_id', id)
    if (rest.tags.length) {
      await supabase.from('project_tags').insert(
        rest.tags.map((tag) => ({
          project_id: id,
          tag,
        })),
      )
    }
  }

  if (rest.relatedProjectIds) {
    await supabase.from('project_relations').delete().eq('project_id', id)
    if (rest.relatedProjectIds.length) {
      await supabase.from('project_relations').insert(
        rest.relatedProjectIds.map((relatedId) => ({
          project_id: id,
          related_project_id: relatedId,
        })),
      )
    }
  }

  if (rest.gallery) {
    await supabase.from('project_gallery_items').delete().eq('project_id', id)
    if (rest.gallery.length) {
      await supabase.from('project_gallery_items').insert(
        rest.gallery.map((item, index) => ({
          project_id: id,
          asset_id: item.assetId,
          caption: item.caption ?? null,
          order_index: item.orderIndex ?? index,
        })),
      )
    }
  }

  if (rest.slug) {
    return (await fetchProjectBySlug(rest.slug, { includeDrafts: true })) as Project
  }

  const { data: updatedRecord, error: fetchError } = await supabase
    .from('projects')
    .select('slug')
    .eq('id', id)
    .maybeSingle()

  if (fetchError || !updatedRecord) {
    throw new Error(fetchError ? fetchError.message : 'Unable to resolve updated project slug')
  }

  return (await fetchProjectBySlug(updatedRecord.slug, { includeDrafts: true })) as Project
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = assertSupabaseClient()

  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`)
  }
}

export async function listProjectAssets(params: {
  internalCode?: string
  slug?: string
} = {}): Promise<ProjectAsset[]> {
  const supabase = assertSupabaseClient()
  let query = supabase
    .from('project_assets')
    .select('*')
    .order('created_at', { ascending: false })

  if (params.internalCode && params.slug) {
    const folder = buildProjectFolder(params.internalCode, params.slug)
    query = query.like('path', `${folder}%`)
  } else if (params.internalCode) {
    const normalizedCode = params.internalCode.trim().replace(/\s+/g, '-').toUpperCase()
    query = query.like('path', `projects/${normalizedCode}/%`)
  }

  const { data, error } = await query
  if (error) {
    throw new Error(`Failed to list project assets: ${error.message}`)
  }

  return (data ?? []).map((asset) => mapProjectAssetRow(asset))
}

export async function uploadProjectAsset(params: {
  file: File
  internalCode: string
  slug: string
  label?: string
  altText?: string
}): Promise<ProjectAsset> {
  const supabase = assertSupabaseClient()
  const bucketId = 'project_media'

  const sanitizedName = params.file.name.replace(/\s+/g, '-').toLowerCase()
  const timestamp = new Date().toISOString().replace(/[:.]/g, '')
  const folder = buildProjectFolder(params.internalCode, params.slug)
  const storagePath = `${folder}/${timestamp}-${sanitizedName}`

  const { error: uploadError } = await supabase.storage
    .from(bucketId)
    .upload(storagePath, params.file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    throw new Error(`Failed to upload asset: ${uploadError.message}`)
  }

  const { data, error } = await supabase
    .from('project_assets')
    .insert({
      bucket: bucketId,
      path: storagePath,
      label: params.label ?? params.file.name,
      alt_text: params.altText ?? null,
      mime_type: params.file.type || null,
      size_bytes: params.file.size,
    })
    .select()
    .single()

  if (error || !data) {
    throw new Error(error ? error.message : 'Unknown error inserting asset metadata')
  }

  return mapProjectAssetRow(data)
}

function mapProjectRows(rows: ProjectRow[]): Project[] {
  const supabase = assertSupabaseClient()

  const projects = rows.map((row) => {
    const gallery = (row.project_gallery_items ?? [])
      .filter((item): item is Required<ProjectRow>['project_gallery_items'][number] & { asset: ProjectAssetRow } => {
        return Boolean(item.asset)
      })
      .sort((a, b) => a.order_index - b.order_index)
      .map((item) => mapGalleryItem(item, supabase))

    let heroImage = row.hero_asset ? mapProjectAssetToImage(row.hero_asset, supabase) : undefined
    if (!heroImage && gallery.length > 0) {
      const [fallbackHero] = gallery
      heroImage = { ...fallbackHero }
    }

    const description = [...(row.project_descriptions ?? [])]
      .sort((a, b) => a.order_index - b.order_index)
      .map((entry) => ensureRichTextHtml(entry.paragraph ?? ''))
      .filter((entry) => entry.length > 0)

    const tags = (row.project_tags ?? []).map((entry) => entry.tag)
    const metadata: ProjectMetadata = {
      internalId: row.internal_code,
      status: row.status,
      ...(row.project_manager ? { projectManager: row.project_manager } : {}),
      ...(row.priority ? { priority: row.priority } : {}),
      ...(tags.length ? { tags } : {}),
    }

    if (row.is_active !== undefined && row.is_active !== null) {
      metadata.isActive = row.is_active
    }

    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      shortDescription: row.short_description,
      client: row.client ?? '',
      category: row.category ?? '',
      year: row.year ?? 0,
      description,
      heroImage: heroImage ?? {
        src: '',
        alt: '',
      },
      gallery,
      relatedSlugs: [],
      metadata,
      isActive: metadata.isActive ?? true,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      _relatedProjectIds: (row.project_relations ?? []).map((relation) => relation.related_project_id),
    } as Project & { _relatedProjectIds: string[] }
  })

  const mapById = new Map<string, string>()
  for (const project of projects) {
    mapById.set(project.id!, project.slug)
  }

  return projects.map((projectWithInternal) => {
    const { _relatedProjectIds: relatedIdsRaw = [], ...project } = projectWithInternal as Project & {
      _relatedProjectIds?: string[]
    }
    const relatedSlugs = relatedIdsRaw
      .map((id) => mapById.get(id))
      .filter((value): value is string => Boolean(value))

    return {
      ...project,
      relatedSlugs,
    }
  })
}

function mapGalleryItem(
  item: NonNullable<ProjectRow['project_gallery_items']>[number] & { asset: ProjectAssetRow },
  supabase: ReturnType<typeof assertSupabaseClient>,
): ProjectImage {
  const mappedAsset = mapProjectAssetRow(item.asset, supabase)

  return {
    assetId: mappedAsset.id,
    src: mappedAsset.publicUrl,
    alt: mappedAsset.altText ?? '',
    caption: item.caption ?? undefined,
    bucket: mappedAsset.bucket,
    path: mappedAsset.path,
    label: mappedAsset.label,
    mimeType: mappedAsset.mimeType,
    sizeBytes: mappedAsset.sizeBytes,
  }
}

function mapProjectAssetRow(asset: ProjectAssetRow, supabase = assertSupabaseClient()): ProjectAsset {
  const { data } = supabase.storage.from(asset.bucket).getPublicUrl(asset.path)

  return {
    id: asset.id,
    bucket: asset.bucket,
    path: asset.path,
    publicUrl: data.publicUrl,
    label: asset.label ?? undefined,
    altText: asset.alt_text ?? undefined,
    mimeType: asset.mime_type ?? undefined,
    sizeBytes: asset.size_bytes ?? undefined,
    createdAt: asset.created_at,
  }
}

function mapProjectAssetToImage(
  asset: ProjectAssetRow,
  supabase: ReturnType<typeof assertSupabaseClient>,
): ProjectImage {
  const mapped = mapProjectAssetRow(asset, supabase)
  return {
    assetId: mapped.id,
    src: mapped.publicUrl,
    alt: mapped.altText ?? '',
    bucket: mapped.bucket,
    path: mapped.path,
    label: mapped.label,
    mimeType: mapped.mimeType,
    sizeBytes: mapped.sizeBytes,
  }
}

function buildProjectFolder(internalCode: string, slug: string): string {
  const normalizedCode = internalCode.trim().replace(/\s+/g, '-').toUpperCase()
  const normalizedSlug = slug.trim().replace(/\s+/g, '-').toLowerCase()
  return `projects/${normalizedCode}/${normalizedSlug}`
}

function loadFallbackProjects(includeDrafts: boolean): Project[] {
  const localProjects = getAllProjects()
  if (includeDrafts) {
    return localProjects
  }
  return localProjects.filter((project) => project.metadata.status === 'published')
}
