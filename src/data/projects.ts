import projectsData from './projects.json' assert { type: 'json' }
import type { Project, ProjectImage, ProjectMetadata, ProjectStatus } from './projectTypes'
import { ensureRichTextHtml } from '../lib/richText'

type RawProject = Record<string, unknown>
let rawProjects: RawProject[] = []

if (Array.isArray(projectsData)) {
  rawProjects = projectsData as RawProject[]
} else if (projectsData && typeof projectsData === 'object') {
  const maybeObject = projectsData as { projects?: RawProject[] }
  if (Array.isArray(maybeObject.projects)) {
    rawProjects = maybeObject.projects ?? []
  }
}

const projects: Project[] = rawProjects.map(normalizeProject)

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getProjectAdjacency(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) {
    return { previous: undefined, next: undefined }
  }

  const previous = index > 0 ? projects[index - 1] : undefined
  const next = index < projects.length - 1 ? projects[index + 1] : undefined

  return { previous, next }
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProjectBySlug(slug)
  if (!current) return []

  const relatedSlugs = current.relatedSlugs ?? []
  const relatedBySlug = relatedSlugs
    .map((relatedSlug) => getProjectBySlug(relatedSlug))
    .filter((project): project is Project => Boolean(project))

  const fallback = projects.filter((project) => project.slug !== slug)

  const ordered = [...relatedBySlug, ...fallback]
  const unique: Project[] = []
  const seen = new Set<string>()

  for (const project of ordered) {
    if (seen.has(project.slug)) {
      continue
    }
    seen.add(project.slug)
    unique.push(project)
    if (unique.length >= limit) {
      break
    }
  }

  return unique
}

function normalizeProject(raw: RawProject, index: number): Project {
  let structured = { ...(raw ?? {}) } as Record<string, unknown>

  for (const [key, value] of Object.entries(raw ?? {})) {
    if (!key.includes('.')) {
      continue
    }
    structured = setNestedValue(structured, key.split('.'), value) as Record<string, unknown>
    delete structured[key]
  }

  const name = asString(structured.name)
  const slugFromData = asString(structured.slug)
  const slug = slugFromData || slugify(name) || `project-${index + 1}`

  const year = toInteger(structured.year)

  const description = Array.isArray(structured.description)
    ? (structured.description as unknown[])
        .filter((paragraph): paragraph is string => typeof paragraph === 'string' && paragraph.length > 0)
        .map((paragraph) => ensureRichTextHtml(paragraph))
        .filter((paragraph) => paragraph.length > 0)
    : []

  const gallery = Array.isArray(structured.gallery)
    ? (structured.gallery as unknown[])
        .map(normalizeProjectImage)
        .filter((image) => Boolean(image.src))
    : []

  let heroImage = normalizeProjectImage(structured.heroImage)
  if (!heroImage.src && gallery.length > 0) {
    const [fallback] = gallery
    heroImage = {
      ...fallback,
      alt: heroImage.alt || fallback.alt,
    }
  }

  const relatedSlugs = Array.isArray(structured.relatedSlugs)
    ? (structured.relatedSlugs as unknown[]).filter(
        (item): item is string => typeof item === 'string' && item.length > 0,
      )
    : []

  const metadata = normalizeMetadata(structured.metadata, index)

  return {
    slug,
    name,
    shortDescription: asString(structured.shortDescription),
    client: asString(structured.client),
    category: asString(structured.category),
    year,
    description,
    heroImage,
    gallery,
    relatedSlugs: relatedSlugs.length ? relatedSlugs : undefined,
    metadata,
    isActive: metadata.isActive !== false,
  }
}

function normalizeProjectImage(value: unknown): ProjectImage {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const record = value as Record<string, unknown>
    const caption = typeof record.caption === 'string' ? record.caption : undefined
    return {
      src: asString(record.src),
      alt: asString(record.alt),
      ...(caption ? { caption } : {}),
    }
  }

  return {
    src: '',
    alt: '',
  }
}

function normalizeMetadata(value: unknown, index: number): ProjectMetadata {
  const fallbackId = `PRJ-${String(index + 1).padStart(3, '0')}`

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const raw = value as Record<string, unknown>
    const tagsValue = raw.tags
    const tags = Array.isArray(tagsValue)
      ? tagsValue.filter((tag): tag is string => typeof tag === 'string' && tag.length > 0)
      : undefined

    const metadata: ProjectMetadata = {
      ...raw,
      internalId: asString(raw.internalId, fallbackId),
      status: toProjectStatus(raw.status),
    }

    metadata.isActive = typeof raw.isActive === 'boolean' ? raw.isActive : true

    if (typeof raw.projectManager === 'string' && raw.projectManager.length > 0) {
      metadata.projectManager = raw.projectManager
    } else if ('projectManager' in metadata) {
      delete metadata.projectManager
    }

    if (typeof raw.priority === 'string' && raw.priority.length > 0) {
      metadata.priority = raw.priority
    } else if ('priority' in metadata) {
      delete metadata.priority
    }

    if (tags) {
      metadata.tags = tags
    } else if ('tags' in metadata) {
      delete metadata.tags
    }

    return metadata
  }

  return {
    internalId: fallbackId,
    status: 'draft',
    isActive: true,
  }
}

function setNestedValue(target: unknown, path: string[], value: unknown): unknown {
  if (path.length === 0) {
    return value
  }

  const [segment, ...rest] = path
  const isIndex = /^[0-9]+$/.test(segment)

  if (isIndex) {
    const index = Number(segment)
    const existingArray = Array.isArray(target) ? target : []
    const clone = [...existingArray]
    clone[index] = setNestedValue(clone[index], rest, value)
    return clone
  }

  const existingObject =
    target && typeof target === 'object' && !Array.isArray(target)
      ? (target as Record<string, unknown>)
      : {}

  const propertyKey = segment
  const clone: Record<string, unknown> = { ...existingObject }
  clone[propertyKey] = setNestedValue(clone[propertyKey], rest, value)
  return clone
}

function asString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  return fallback
}

function toInteger(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }
  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }
  return fallback
}

function toProjectStatus(value: unknown): ProjectStatus {
  const normalized = asString(value).toLowerCase()
  switch (normalized) {
    case 'published':
    case 'archived':
      return normalized
    default:
      return 'draft'
  }
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
