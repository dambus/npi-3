import {
  ArrowDownIcon,
  ArrowPathIcon,
  ArrowUpIcon,
  CloudArrowUpIcon,
  PhotoIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/20/solid'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import FormField from '../../components/FormField'
import Section from '../../components/Section'
import RichTextEditor from '../../components/RichTextEditor'
import type { Project, ProjectAsset, ProjectImage, ProjectPriority, ProjectStatus } from '../../data/projectTypes'
import {
  createProject,
  fetchProjectById,
  listProjectAssets,
  updateProject,
  uploadProjectAsset,
} from '../../data/projectsRepository'
import { useAuth } from '../../hooks/useAuth'
import { blocksFromEditorHtml, editorValueFromBlocks } from '../../lib/richText'

type GallerySelection = {
  asset: ProjectAsset
  caption: string
}

type ProjectFormState = {
  name: string
  slug: string
  internalCode: string
  shortDescription: string
  client: string
  category: string
  status: ProjectStatus
  priority: ProjectPriority | ''
  projectManager: string
  year: string
  descriptionHtml: string
  tagsText: string
  isActive: boolean
  heroAssetId?: string
}

const DEFAULT_FORM_STATE: ProjectFormState = {
  name: '',
  slug: '',
  internalCode: '',
  shortDescription: '',
  client: '',
  category: '',
  status: 'draft',
  priority: '',
  projectManager: '',
  year: '',
  descriptionHtml: '',
  tagsText: '',
  isActive: true,
  heroAssetId: undefined,
}

export function AdminProjectEditorPage() {
  const navigate = useNavigate()
  const { projectId } = useParams<{ projectId: string }>()
  const isEditing = Boolean(projectId)
  const { user, signOut } = useAuth()

  const [formState, setFormState] = useState<ProjectFormState>(DEFAULT_FORM_STATE)
  const [gallerySelections, setGallerySelections] = useState<GallerySelection[]>([])
  const [assets, setAssets] = useState<ProjectAsset[]>([])
  const [isLoading, setIsLoading] = useState(isEditing)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [assetError, setAssetError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [assetsLoading, setAssetsLoading] = useState(false)
  const initialHeroAssetRef = useRef<ProjectAsset | undefined>(undefined)

  const reconcileGallerySelections = useCallback((freshAssets: ProjectAsset[]) => {
    setGallerySelections((prev) =>
      prev.map((item) => {
        const match = freshAssets.find((asset) => asset.id === item.asset.id)
        return match ? { ...item, asset: match } : item
      }),
    )
  }, [])

  useEffect(() => {
    let isMounted = true
    if (!isEditing || !projectId) {
      return
    }

    setIsLoading(true)
    fetchProjectById(projectId, { includeDrafts: true })
      .then((project) => {
        if (!isMounted) return
        if (!project) {
          setLoadError('Project not found.')
          setIsLoading(false)
          return
        }
        bootstrapFormState(project)
        setIsLoading(false)
      })
      .catch((error) => {
        if (!isMounted) return
        setLoadError(error instanceof Error ? error.message : 'Failed to load project.')
        setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [isEditing, projectId])

  useEffect(() => {
    if (!formState.internalCode) {
      setAssets([])
      return
    }

    let isMounted = true

    const loadAssets = async () => {
      setAssetsLoading(true)
      setAssetError(null)
      try {
        const data = await listProjectAssets({
          internalCode: formState.internalCode,
        })
        if (!isMounted) return
        setAssets(data)
        reconcileGallerySelections(data)
      } catch (error) {
        if (!isMounted) return
        setAssetError(error instanceof Error ? error.message : 'Failed to load assets.')
      } finally {
        if (isMounted) {
          setAssetsLoading(false)
        }
      }
    }

    void loadAssets()

    return () => {
      isMounted = false
    }
  }, [formState.internalCode, reconcileGallerySelections])

  const heroAsset = useMemo(() => {
    if (!formState.heroAssetId) {
      return undefined
    }
    return (
      assets.find((asset) => asset.id === formState.heroAssetId) ??
      gallerySelections.find((selection) => selection.asset.id === formState.heroAssetId)?.asset ??
      initialHeroAssetRef.current
    )
  }, [assets, gallerySelections, formState.heroAssetId])

  const handleInputChange =
    (field: keyof ProjectFormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value
      setFormState((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

  const handleGenerateSlug = () => {
    setFormState((prev) => ({
      ...prev,
      slug: slugify(prev.name),
    }))
  }

  const handleToggleGallery = (asset: ProjectAsset) => {
    setGallerySelections((prev) => {
      const exists = prev.find((item) => item.asset.id === asset.id)
      if (exists) {
        return prev.filter((item) => item.asset.id !== asset.id)
      }
      return [...prev, { asset, caption: '' }]
    })
  }

  const handleGalleryCaptionChange = (assetId: string, caption: string) => {
    setGallerySelections((prev) =>
      prev.map((item) => (item.asset.id === assetId ? { ...item, caption } : item)),
    )
  }

  const handleMoveGalleryItem = (assetId: string, direction: 'up' | 'down') => {
    setGallerySelections((prev) => {
      const index = prev.findIndex((item) => item.asset.id === assetId)
      if (index === -1) return prev
      const next = [...prev]
      const swapWith = direction === 'up' ? index - 1 : index + 1
      if (swapWith < 0 || swapWith >= next.length) return prev
      ;[next[index], next[swapWith]] = [next[swapWith], next[index]]
      return next
    })
  }

  const handleUploadAssets = async (fileList: FileList | null) => {
    if (!fileList?.length) {
      return
    }

    if (!formState.internalCode) {
      setAssetError('Set the internal code before uploading assets.')
      return
    }

    setIsUploading(true)
    setAssetError(null)
    try {
      const files = Array.from(fileList)
      for (const file of files) {
        await uploadProjectAsset({
          file,
          internalCode: formState.internalCode,
          slug: formState.slug || null,
          label: file.name,
        })
      }
      const refreshed = await listProjectAssets({
        internalCode: formState.internalCode,
      })
      setAssets(refreshed)
      reconcileGallerySelections(refreshed)
    } catch (error) {
      setAssetError(error instanceof Error ? error.message : 'Upload failed.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSaving(true)
    setSaveMessage(null)
    setAssetError(null)

    try {
      const description = blocksFromEditorHtml(formState.descriptionHtml)
      const normalizedSlug = formState.slug.trim() ? formState.slug.trim() : null
      const tags = splitTags(formState.tagsText)
      const yearValue = formState.year ? Number.parseInt(formState.year, 10) : undefined
      const gallery = gallerySelections.map((item, index) => ({
        assetId: item.asset.id,
        caption: item.caption?.trim() || undefined,
        orderIndex: index,
      }))

      if (isEditing && projectId) {
        await updateProject({
          id: projectId,
          slug: normalizedSlug,
          internalCode: formState.internalCode,
          name: formState.name,
          shortDescription: formState.shortDescription,
          client: formState.client,
          category: formState.category,
          status: formState.status,
          priority: formState.priority || undefined,
          projectManager: formState.projectManager || undefined,
          year: Number.isFinite(yearValue) ? yearValue : undefined,
          description,
          tags,
          heroAssetId: formState.heroAssetId ?? null,
          isActive: formState.isActive,
          gallery,
        })
        setSaveMessage('Project updated successfully.')
      } else {
        const created = await createProject({
          slug: normalizedSlug,
          internalCode: formState.internalCode,
          name: formState.name,
          shortDescription: formState.shortDescription,
          client: formState.client,
          category: formState.category,
          status: formState.status,
          priority: formState.priority || undefined,
          projectManager: formState.projectManager || undefined,
          year: Number.isFinite(yearValue) ? yearValue : undefined,
          description,
          tags,
          heroAssetId: formState.heroAssetId ?? null,
          isActive: formState.isActive,
          gallery,
        })
        setSaveMessage('Project created successfully. Redirecting...')
        if (created?.id) {
          setTimeout(() => {
            navigate(`/admin/projects/${created.id}`)
          }, 900)
        }
      }
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : 'Failed to save project.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <Section align="left" className="bg-surface-default py-24">
        <p className="text-sm text-brand-neutral">Loading project...</p>
      </Section>
    )
  }

  if (loadError) {
    return (
      <Section align="left" className="bg-surface-default py-24">
        <div className="space-y-4">
          <p className="text-sm text-feedback-danger">{loadError}</p>
          <Button as="router-link" to="/admin/projects" variant="secondary" size="sm">
            Back to projects
          </Button>
        </div>
      </Section>
    )
  }

  return (
    <Section align="left" className="bg-surface-default pb-24" contentClassName="gap-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-neutral/70">Admin</p>
          <h1 className="font-display text-3xl font-semibold text-brand-primary">
            {isEditing ? 'Edit project' : 'Create a new project'}
          </h1>
          <p className="text-sm text-brand-neutral">
            {isEditing
              ? 'Update project metadata, description, media selection and publication status directly from this editor.'
              : 'Populate the core project details, upload assets and set status when you are ready to publish.'}
          </p>
          <p className="text-xs text-brand-neutral/80">
            Storage path convention:
            <code className="mx-1 rounded bg-surface-muted px-2 py-0.5 text-xs text-brand-primary">
              projects/INTERNAL-CODE/slug/filename.ext
            </code>
            (slugless projects use a <code className="mx-1 rounded bg-surface-muted px-2 py-0.5 text-xs text-brand-primary">listing-only</code> folder)
            — matching the Supabase <code className="mx-1 rounded bg-surface-muted px-2 py-0.5 text-xs text-brand-primary">project_media</code> bucket
            structure.
          </p>
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-brand-neutral/15 bg-white/90 p-5 shadow-[0_18px_45px_rgba(8,20,44,0.12)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-neutral/70">Signed in</p>
            <p className="mt-2 text-sm font-semibold text-brand-primary">{user?.email ?? 'unknown user'}</p>
            <p className="mt-1 text-xs text-brand-neutral">
              Save frequently—uploads and metadata are written straight to Supabase once you submit the form.
            </p>
          </div>
          <Button
            as="button"
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            leadingIcon={<ArrowRightOnRectangleIcon className="h-4 w-4" aria-hidden="true" />}
            className="self-start border border-brand-neutral/20 text-brand-neutral/80 hover:border-feedback-danger/40 hover:text-feedback-danger"
          >
            Sign out
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs uppercase tracking-[0.22em] text-brand-neutral/50">
          {isEditing ? 'Supabase project editor' : 'Supabase project creation'}
        </span>
        <div className="flex flex-wrap justify-end gap-3">
          <Button as="router-link" to="/admin/projects" variant="ghost" size="sm">
            View all projects
          </Button>
        </div>
      </div>

      {saveMessage ? (
        <div
          role="status"
          className="rounded-xl border border-brand-secondary/20 bg-brand-secondary/5 p-4 text-sm text-brand-secondary"
        >
          {saveMessage}
        </div>
      ) : null}

      <form className="space-y-10" onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          <FormField
            id="internalCode"
            label="Internal code"
            value={formState.internalCode}
            onChange={handleInputChange('internalCode')}
            required
          />
          <div className="grid gap-2">
            <FormField
              id="slug"
              label="Slug"
              value={formState.slug}
              onChange={handleInputChange('slug')}
            />
            <button
              type="button"
              className="self-start text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary hover:text-brand-secondary/80"
              onClick={handleGenerateSlug}
            >
              Generate from name
            </button>
            <p className="text-xs text-brand-neutral/70">
              Leave blank to keep this project as a catalogue-only reference without a public case study page.
            </p>
          </div>
          <FormField
            id="name"
            label="Project name"
            value={formState.name}
            onChange={handleInputChange('name')}
            required
          />
          <FormField
            id="shortDescription"
            label="Short description"
            type="textarea"
            rows={4}
            value={formState.shortDescription}
            onChange={handleInputChange('shortDescription')}
            required
          />
          <FormField
            id="client"
            label="Client"
            value={formState.client}
            onChange={handleInputChange('client')}
          />
          <FormField
            id="category"
            label="Category"
            value={formState.category}
            onChange={handleInputChange('category')}
          />
          <FormField
            id="status"
            label="Status"
            type="select"
            options={[
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
              { value: 'archived', label: 'Archived' },
            ]}
            value={formState.status}
            onChange={handleInputChange('status')}
          />
          <FormField
            id="priority"
            label="Priority"
            type="select"
            options={[
              { value: '', label: 'None' },
              { value: 'flagship', label: 'Flagship' },
              { value: 'portfolio', label: 'Portfolio' },
              { value: 'standard', label: 'Standard' },
            ]}
            value={formState.priority}
            onChange={handleInputChange('priority')}
          />
          <div className="flex flex-col gap-2 lg:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-primary">
              Active listing
            </span>
            <p className="text-xs text-brand-neutral/75">
              Only active projects appear in the “Active project references” list on the public site. Drafts and hidden
              projects remain accessible via direct links or the admin console.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                as="button"
                type="button"
                variant={formState.isActive ? 'primary' : 'secondary'}
                size="sm"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    isActive: true,
                  }))
                }
                aria-pressed={formState.isActive}
                disabled={isSaving}
              >
                Active
              </Button>
              <Button
                as="button"
                type="button"
                variant={!formState.isActive ? 'primary' : 'secondary'}
                size="sm"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    isActive: false,
                  }))
                }
                aria-pressed={!formState.isActive}
                disabled={isSaving}
              >
                Hidden
              </Button>
            </div>
          </div>
          <FormField
            id="projectManager"
            label="Project manager"
            value={formState.projectManager}
            onChange={handleInputChange('projectManager')}
          />
          <FormField
            id="year"
            label="Year"
            type="number"
            value={formState.year}
            onChange={handleInputChange('year')}
          />
        </div>

        <div className="space-y-2">
          <label id="project-description-label" className="text-sm font-semibold text-brand-primary">
            Detailed description
          </label>
          <p id="project-description-hint" className="text-xs text-brand-neutral/75">
            Use headings, bullet lists and emphasised text to structure the long-form overview. Links open in a new tab.
          </p>
          <RichTextEditor
            value={formState.descriptionHtml}
            onChange={(html) =>
              setFormState((prev) => ({
                ...prev,
                descriptionHtml: html,
              }))
            }
            labelledBy="project-description-label"
            describedBy="project-description-hint"
          />
        </div>

        <FormField
          id="tags"
          label="Tags"
          hint="Comma separated list."
          value={formState.tagsText}
          onChange={handleInputChange('tagsText')}
        />

        <MediaManager
          assets={assets}
          assetsLoading={assetsLoading}
          assetError={assetError}
          heroAsset={heroAsset}
          heroAssetId={formState.heroAssetId}
          onSetHero={(assetId) =>
            setFormState((prev) => ({
              ...prev,
              heroAssetId: assetId,
            }))
          }
          onClearHero={() =>
            setFormState((prev) => ({
              ...prev,
              heroAssetId: undefined,
            }))
          }
          onToggleGallery={handleToggleGallery}
          onUploadAssets={handleUploadAssets}
          isUploading={isUploading}
          gallerySelections={gallerySelections}
          onCaptionChange={handleGalleryCaptionChange}
          onMoveGallery={handleMoveGalleryItem}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button as="router-link" to="/admin/projects" variant="ghost" size="sm">
            Cancel
          </Button>
          <div className="flex gap-3">
            <Button
              as="button"
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setGallerySelections([])
                setFormState((prev) => ({ ...prev, heroAssetId: undefined }))
              }}
              disabled={isSaving}
            >
              Clear media
            </Button>
            <Button
              as="button"
              type="submit"
              variant="primary"
              size="md"
              loading={isSaving}
              leadingIcon={<ArrowPathIcon className="h-4 w-4" aria-hidden="true" />}
            >
              {isEditing ? 'Save changes' : 'Create project'}
            </Button>
          </div>
        </div>
      </form>
    </Section>
  )

  function bootstrapFormState(project: Project) {
    setFormState({
      name: project.name,
      slug: project.slug ?? '',
      internalCode: project.metadata.internalId,
      shortDescription: project.shortDescription,
      client: project.client,
      category: project.category,
      status: project.metadata.status,
      priority: (project.metadata.priority as ProjectPriority | undefined) ?? '',
      projectManager: project.metadata.projectManager ?? '',
      year: project.year ? String(project.year) : '',
      descriptionHtml: editorValueFromBlocks(project.description),
      tagsText: (project.metadata.tags ?? []).join(', '),
      heroAssetId: project.heroImage.assetId,
      isActive: project.isActive,
    })

    const initialHeroAsset = projectImageToAsset(project.heroImage)
    initialHeroAssetRef.current = initialHeroAsset

    const initialSelections = project.gallery
      .map((image) => ({
        asset: projectImageToAsset(image),
        caption: image.caption ?? '',
      }))
      .filter(
        (item): item is GallerySelection =>
          Boolean(item.asset) && Boolean(item.asset?.id),
      )

    setGallerySelections(initialSelections)
  }

}

function MediaManager({
  assets,
  assetsLoading,
  assetError,
  heroAsset,
  heroAssetId,
  onSetHero,
  onClearHero,
  onToggleGallery,
  onUploadAssets,
  isUploading,
  gallerySelections,
  onCaptionChange,
  onMoveGallery,
}: {
  assets: ProjectAsset[]
  assetsLoading: boolean
  assetError: string | null
  heroAsset?: ProjectAsset
  heroAssetId?: string
  onSetHero: (assetId: string) => void
  onClearHero: () => void
  onToggleGallery: (asset: ProjectAsset) => void
  onUploadAssets: (files: FileList | null) => void
  isUploading: boolean
  gallerySelections: GallerySelection[]
  onCaptionChange: (assetId: string, caption: string) => void
  onMoveGallery: (assetId: string, direction: 'up' | 'down') => void
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className="space-y-6 rounded-2xl border border-brand-neutral/15 bg-white p-6 shadow-[0_20px_50px_rgba(8,20,44,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold text-brand-primary">Media</h2>
          <p className="text-sm text-brand-neutral">
            Upload images to the Supabase storage bucket or select existing assets for hero and gallery.
          </p>
        </div>
        <div className="flex gap-3">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={(event) => {
              onUploadAssets(event.target.files)
              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
            }}
          />
          <Button
            as="button"
            type="button"
            variant="secondary"
            size="sm"
            leadingIcon={<CloudArrowUpIcon className="h-4 w-4" aria-hidden="true" />}
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload assets'}
          </Button>
        </div>
      </div>

      {assetError ? (
        <div
          role="alert"
          className="rounded-xl border border-feedback-danger/25 bg-feedback-danger/10 p-4 text-sm text-feedback-danger"
        >
          {assetError}
        </div>
      ) : null}

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-neutral">Hero asset</h3>
          {heroAssetId ? (
            <button
              type="button"
              onClick={onClearHero}
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary hover:text-brand-secondary/80"
            >
              <XMarkIcon className="h-4 w-4" aria-hidden="true" />
              Clear
            </button>
          ) : null}
        </div>
        {heroAsset ? (
          <div className="flex gap-4 rounded-xl border border-brand-primary/10 bg-surface-muted p-4">
            <img
              src={heroAsset.publicUrl}
              alt={heroAsset.altText ?? ''}
              className="h-24 w-32 rounded-lg object-cover"
            />
            <div className="flex flex-col justify-between text-sm text-brand-neutral">
              <div>
                <p className="font-semibold text-brand-primary">{heroAsset.label ?? 'Untitled asset'}</p>
                <p className="text-xs text-brand-neutral/70">{heroAsset.path}</p>
              </div>
              <button
                type="button"
                className="self-start text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary hover:text-brand-secondary/80"
                onClick={() => onSetHero(heroAsset.id)}
              >
                Re-select
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-brand-neutral/70">
            Select an asset below to set the hero image displayed on the public project page.
          </p>
        )}
      </div>

  <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-neutral">Asset library</h3>
          {assetsLoading ? (
            <span className="text-xs text-brand-neutral">Loading...</span>
          ) : (
            <span className="text-xs text-brand-neutral">{assets.length} assets</span>
          )}
        </div>
        {assetsLoading ? (
          <p className="text-sm text-brand-neutral">Fetching assets...</p>
        ) : assets.length === 0 ? (
          <div className="flex items-center gap-3 rounded-xl border border-brand-neutral/15 bg-surface-muted/80 p-4 text-sm text-brand-neutral">
            <PhotoIcon className="h-8 w-8 text-brand-neutral/50" aria-hidden="true" />
            <span>No assets yet. Upload images to populate the library.</span>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {assets.map((asset) => {
              const selectedAsHero = heroAssetId === asset.id
              const selectedForGallery = gallerySelections.some((item) => item.asset.id === asset.id)

              return (
                <div
                  key={asset.id}
                  className="flex flex-col gap-3 rounded-xl border border-brand-neutral/15 bg-white p-4 shadow-[0_12px_30px_rgba(8,20,44,0.08)]"
                >
                  <div className="relative overflow-hidden rounded-lg border border-brand-neutral/10">
                    <img
                      src={asset.publicUrl}
                      alt={asset.altText ?? ''}
                      className="h-32 w-full object-cover"
                    />
                    {selectedAsHero ? (
                      <span className="absolute right-2 top-2 rounded-full bg-brand-secondary px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white">
                        Hero
                      </span>
                    ) : null}
                  </div>
                  <div className="space-y-2 text-xs text-brand-neutral">
                    <p className="font-semibold text-brand-primary">{asset.label ?? 'Untitled asset'}</p>
                    <p className="text-[0.7rem] text-brand-neutral/70">{asset.mimeType ?? 'Unknown type'}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      as="button"
                      type="button"
                      variant={selectedAsHero ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => onSetHero(asset.id)}
                    >
                      {selectedAsHero ? 'Hero selected' : 'Set as hero'}
                    </Button>
                    <Button
                      as="button"
                      type="button"
                      variant={selectedForGallery ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => onToggleGallery(asset)}
                    >
                      {selectedForGallery ? 'In gallery' : 'Add to gallery'}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-neutral">Gallery sequence</h3>
        {gallerySelections.length === 0 ? (
          <p className="text-sm text-brand-neutral/70">No gallery assets selected yet.</p>
        ) : (
          <div className="space-y-4">
            {gallerySelections.map((item, index) => (
              <div
                key={item.asset.id}
                className="flex flex-col gap-4 rounded-xl border border-brand-neutral/15 bg-surface-muted/60 p-4 sm:flex-row"
              >
                <img
                  src={item.asset.publicUrl}
                  alt={item.asset.altText ?? ''}
                  className="h-24 w-32 rounded-lg object-cover"
                />
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-center justify-between text-xs text-brand-neutral/70">
                    <span>#{index + 1}</span>
                    <span>{item.asset.label ?? 'Untitled asset'}</span>
                  </div>
                  <FormField
                    id={`caption-${item.asset.id}`}
                    label="Caption"
                    type="textarea"
                    rows={2}
                    value={item.caption}
                    onChange={(event) => onCaptionChange(item.asset.id, event.target.value)}
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      as="button"
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onMoveGallery(item.asset.id, 'up')}
                      disabled={index === 0}
                      leadingIcon={<ArrowUpIcon className="h-4 w-4" aria-hidden="true" />}
                    >
                      Up
                    </Button>
                    <Button
                      as="button"
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onMoveGallery(item.asset.id, 'down')}
                      disabled={index === gallerySelections.length - 1}
                      leadingIcon={<ArrowDownIcon className="h-4 w-4" aria-hidden="true" />}
                    >
                      Down
                    </Button>
                    <Button
                      as="button"
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleGallery(item.asset)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function projectImageToAsset(image: ProjectImage): ProjectAsset | undefined {
  if (!image.assetId || !image.path || !image.bucket) {
    return undefined
  }
  return {
    id: image.assetId,
    bucket: image.bucket,
    path: image.path,
    publicUrl: image.src,
    label: image.label,
    altText: image.alt,
    mimeType: image.mimeType,
  }
}

function splitTags(value: string): string[] | undefined {
  const normalized = value
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
  return normalized.length ? normalized : undefined
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default AdminProjectEditorPage
