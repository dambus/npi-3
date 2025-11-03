export type ProjectStatus = 'draft' | 'published' | 'archived'

export type ProjectPriority = 'flagship' | 'portfolio' | 'standard'

export interface ProjectImage {
  /**
   * Optional ID referencing `project_assets.id`.
   * Available when data originates from Supabase.
   */
  assetId?: string
  /**
   * Public URL to render the asset.
   */
  src: string
  /**
   * Accessible alternative text or descriptive label.
   */
  alt: string
  /**
   * Optional caption shown in galleries.
   */
  caption?: string
  /**
   * Storage metadata (bucket + path) preserved for admin tooling.
   */
  bucket?: string
  path?: string
  label?: string
  mimeType?: string
  sizeBytes?: number
}

export interface ProjectMetadata {
  internalId: string
  status: ProjectStatus
  projectManager?: string
  priority?: ProjectPriority | string
  tags?: string[]
  isActive?: boolean
  [key: string]: unknown
}

export interface Project {
  /**
   * UUID primary key from Supabase. Optional for legacy JSON data.
   */
  id?: string
  slug: string
  name: string
  shortDescription: string
  client: string
  category: string
  year: number
  /**
   * Rich text HTML blocks representing the long-form description.
   */
  description: string[]
  heroImage: ProjectImage
  gallery: ProjectImage[]
  relatedSlugs?: string[]
  metadata: ProjectMetadata
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ProjectWithRelations extends Project {
  gallery: ProjectImage[]
  relatedSlugs: string[]
}

export interface ProjectAsset {
  id: string
  bucket: string
  path: string
  publicUrl: string
  label?: string
  altText?: string
  mimeType?: string
  sizeBytes?: number
  createdAt?: string
}

export interface ProjectGalleryItem {
  id: number | string
  asset: ProjectAsset
  caption?: string
  orderIndex: number
}

export interface ProjectQueryOptions {
  includeDrafts?: boolean
  includeRelations?: boolean
}

export interface CreateProjectPayload {
  slug: string
  internalCode: string
  name: string
  shortDescription: string
  client?: string
  category?: string
  status?: ProjectStatus
  priority?: ProjectPriority
  projectManager?: string
  year?: number
  description?: string[]
  tags?: string[]
  relatedProjectIds?: string[]
  heroAssetId?: string | null
  isActive?: boolean
  gallery?: Array<{
    assetId: string
    caption?: string
    orderIndex?: number
  }>
}

export interface UpdateProjectPayload extends Partial<CreateProjectPayload> {
  id: string
}
