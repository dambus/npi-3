import projectsData from './projects.json' assert { type: 'json' }

export interface ProjectImage {
  src: string
  alt: string
  caption?: string
}

export interface ProjectMetadata {
  internalId: string
  status: string
  projectManager?: string
  priority?: string
  tags?: string[]
  [key: string]: unknown
}

export interface Project {
  slug: string
  name: string
  shortDescription: string
  client: string
  category: string
  year: number
  description: string[]
  heroImage: ProjectImage
  gallery: ProjectImage[]
  relatedSlugs?: string[]
  metadata: ProjectMetadata
}

const projects: Project[] = projectsData as Project[]

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
