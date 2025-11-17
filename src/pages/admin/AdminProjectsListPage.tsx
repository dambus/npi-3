import {
  ArrowPathIcon,
  PencilSquareIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
  TrashIcon,
} from '@heroicons/react/20/solid'
import { useMemo, useState } from 'react'
import Button from '../../components/Button'
import Section from '../../components/Section'
import type { Project } from '../../data/projectTypes'
import { deleteProject, updateProject } from '../../data/projectsRepository'
import { useProjectsQuery } from '../../hooks/usePublishedProjects'
import { useAuth } from '../../hooks/useAuth'

export function AdminProjectsListPage() {
  const { projects, isLoading, error, reload } = useProjectsQuery({ includeDrafts: true })
  const { user, signOut } = useAuth()
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [pendingAction, setPendingAction] = useState<
    | {
        projectId: string
        kind: 'publish' | 'unpublish' | 'delete' | 'activate' | 'deactivate'
      }
    | null
  >(
    null,
  )

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0
      return dateB - dateA
    })
  }, [projects])

  const requiresSupabase = sortedProjects.some((project) => !project.id)

  const handlePublishToggle = async (project: Project) => {
    if (!project.id) {
      setFeedback({
        type: 'error',
        message: 'Supabase project ID missing. Refresh the page or ensure migration completed successfully.',
      })
      return
    }

    const nextStatus = project.metadata.status === 'published' ? 'draft' : 'published'
    setPendingAction({ projectId: project.id, kind: nextStatus === 'published' ? 'publish' : 'unpublish' })
    setFeedback(null)

    try {
      await updateProject({
        id: project.id,
        status: nextStatus,
      })
      await reload()
      setFeedback({
        type: 'success',
        message:
          nextStatus === 'published'
            ? `"${project.name}" is now published.`
            : `"${project.name}" has been set back to draft.`,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update project status.'
      setFeedback({
        type: 'error',
        message,
      })
    } finally {
      setPendingAction(null)
    }
  }

  const handleDeleteProject = async (project: Project) => {
    if (!project.id) {
      setFeedback({
        type: 'error',
        message: 'Supabase project ID missing. Refresh the page or ensure migration completed successfully.',
      })
      return
    }

    const confirmed = window.confirm(
      `Delete project "${project.name}"? This removes its Supabase record and related metadata. Assets stay in storage.`,
    )
    if (!confirmed) {
      return
    }

    setPendingAction({ projectId: project.id, kind: 'delete' })
    setFeedback(null)

    try {
      await deleteProject(project.id)
      await reload()
      setFeedback({
        type: 'success',
        message: `"${project.name}" has been deleted.`,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete project.'
      setFeedback({
        type: 'error',
        message,
      })
    } finally {
      setPendingAction(null)
    }
  }

  const isRowPending = (projectId: string) => pendingAction?.projectId === projectId

  const handleActiveToggle = async (project: Project) => {
    if (!project.id) {
      setFeedback({
        type: 'error',
        message: 'Supabase project ID missing. Refresh the page or ensure migration completed successfully.',
      })
      return
    }

    const nextValue = !project.isActive
    setPendingAction({ projectId: project.id, kind: nextValue ? 'activate' : 'deactivate' })
    setFeedback(null)

    try {
      await updateProject({
        id: project.id,
        isActive: nextValue,
      })
      await reload()
      setFeedback({
        type: 'success',
        message: nextValue
          ? `"${project.name}" is now active on the public projects list.`
          : `"${project.name}" has been hidden from the public projects list.`,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update active state.'
      setFeedback({
        type: 'error',
        message,
      })
    } finally {
      setPendingAction(null)
    }
  }

  return (
    <Section align="left" className="bg-surface-default pb-24" contentClassName="gap-8 lg:gap-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-neutral/70">Admin</p>
          <h1 className="font-display text-3xl font-semibold text-brand-primary">Projects</h1>
          <p className="text-sm text-brand-neutral">
            Manage Supabase-backed project references, update their publication status, and upload assets without leaving
            the dashboard.
          </p>
          <p className="text-xs text-brand-neutral/80">
            Media assets are stored in
            <code className="mx-1 rounded bg-surface-muted px-2 py-0.5 text-xs text-brand-primary">project_media</code>
            within Supabase storage.
          </p>
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-brand-neutral/15 bg-white/90 p-5 shadow-[0_18px_45px_rgba(8,20,44,0.12)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-neutral/70">Signed in</p>
            <p className="mt-2 text-sm font-semibold text-brand-primary">{user?.email ?? 'Unknown user'}</p>
            <p className="mt-1 text-xs text-brand-neutral">
              Use the quick actions to refresh data or start a new reference. Sign out here when you are done.
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
        {feedback ? (
          <div
            role="status"
            className={`rounded-[1.25rem] border px-4 py-2 text-sm ${
              feedback.type === 'success'
                ? 'border-brand-secondary/25 bg-brand-secondary/10 text-brand-secondary'
                : 'border-feedback-danger/25 bg-feedback-danger/10 text-feedback-danger'
            }`}
          >
            {feedback.message}
          </div>
        ) : (
          <span className="text-xs uppercase tracking-[0.22em] text-brand-neutral/50">
            Supabase project catalogue
          </span>
        )}

        <div className="flex flex-wrap justify-end gap-3">
          <Button
            as="button"
            variant="secondary"
            size="sm"
            onClick={() => reload()}
            leadingIcon={<ArrowPathIcon className="h-4 w-4" aria-hidden="true" />}
            disabled={isLoading}
          >
            Refresh
          </Button>
          <Button
            as="router-link"
            to="/admin/projects/new"
            variant="primary"
            size="sm"
            leadingIcon={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
          >
            New project
          </Button>
        </div>
      </div>

      {requiresSupabase ? (
        <div
          role="alert"
          className="rounded-xl border border-feedback-warning/25 bg-feedback-warning/10 p-4 text-sm text-feedback-warning"
        >
          Supabase is not connected. Admin tools require a live Supabase project with populated IDs.
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="rounded-xl border border-feedback-danger/25 bg-feedback-danger/10 p-4 text-sm text-feedback-danger"
        >
          {error.message || 'Failed to load projects.'}
        </div>
      ) : null}

      {isLoading ? (
        <p className="text-sm text-brand-neutral">Loading projects...</p>
      ) : sortedProjects.length === 0 ? (
        <p className="text-sm text-brand-neutral">No projects available yet.</p>
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-brand-neutral/15 bg-white shadow-[0_16px_35px_rgba(8,20,44,0.08)]">
          <table className="min-w-full divide-y divide-brand-neutral/10 text-sm">
            <thead className="bg-surface-muted">
              <tr className="text-left text-xs font-semibold uppercase tracking-[0.22em] text-brand-neutral">
                <th className="whitespace-nowrap px-4 py-3">Code</th>
                <th className="px-4 py-3">Project</th>
                <th className="whitespace-nowrap px-4 py-3">Status</th>
                <th className="whitespace-nowrap px-4 py-3">Active</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-neutral/5">
              {sortedProjects.map((project) => {
                const projectId = project.id ?? project.slug ?? project.metadata.internalId ?? project.name
                const pending = project.id ? isRowPending(project.id) : false
                const nextStatus = project.metadata.status === 'published' ? 'draft' : 'published'

                return (
                  <tr key={projectId} className="align-top">
                    <td className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-neutral/70">
                      {project.metadata.internalId}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-brand-primary">{project.name}</span>
                        <span className="text-xs text-brand-neutral/70">
                          {project.slug?.trim() || 'No case study slug'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        status={project.metadata.status}
                        onToggle={() => handlePublishToggle(project)}
                        disabled={!project.id || pending}
                        title={
                          project.metadata.status === 'published'
                            ? 'Click to unpublish'
                            : 'Click to publish'
                        }
                        nextStatus={nextStatus}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <ActiveBadge
                        isActive={project.isActive}
                        onToggle={() => handleActiveToggle(project)}
                        disabled={!project.id || pending}
                      />
                    </td>
                    <td className="px-4 py-3 text-brand-neutral">
                      {project.year ? project.year : <span className="text-brand-neutral/60">—</span>}
                    </td>
                    <td className="px-4 py-3 text-brand-neutral">
                      {project.updatedAt
                        ? new Date(project.updatedAt).toLocaleString()
                        : new Date(project.createdAt ?? '').toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {project.id ? (
                        <div className="flex flex-wrap justify-end gap-2">
                          <Button
                            as="router-link"
                            to={`/admin/projects/${project.id}`}
                            variant="secondary"
                            size="sm"
                            className="min-w-[88px]"
                            leadingIcon={<PencilSquareIcon className="h-4 w-4" aria-hidden="true" />}
                          >
                            Edit
                          </Button>
                          <Button
                            as="button"
                            type="button"
                            size="sm"
                            variant="ghost"
                            disabled={pendingAction?.projectId === project.id && pendingAction.kind === 'delete'}
                            className="border border-feedback-danger/40 text-feedback-danger hover:bg-feedback-danger/10"
                            leadingIcon={<TrashIcon className="h-4 w-4" aria-hidden="true" />}
                            onClick={() => handleDeleteProject(project)}
                          >
                            Delete
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-brand-neutral/60">Supabase ID missing</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-xs text-brand-neutral/70">
        Tip: Publish-ready projects should have status set to
        <span className="mx-1 rounded-full bg-brand-primary/10 px-2 py-0.5 text-brand-primary">
          published
        </span>
        and a hero image selected. Gallery ordering follows the sequence configured below.
      </div>
    </Section>
  )
}

function StatusBadge({
  status,
  onToggle,
  disabled,
  title,
  nextStatus,
}: {
  status: Project['metadata']['status']
  onToggle?: () => void
  disabled?: boolean
  title?: string
  nextStatus?: Project['metadata']['status']
}) {
  const presets: Record<string, { label: string; className: string }> = {
    draft: {
      label: 'Draft',
      className: 'bg-brand-neutral/10 text-brand-neutral/80',
    },
    published: {
      label: 'Published',
      className: 'bg-brand-accent/15 text-brand-accent',
    },
    archived: {
      label: 'Archived',
      className: 'bg-brand-primary/10 text-brand-primary/80',
    },
  }

  const preset = presets[status] ?? presets.draft

  const baseClasses = `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-150 ${preset.className}`

  if (!onToggle) {
    return (
      <span className={baseClasses} title={title}>
        {preset.label}
      </span>
    )
  }

  const ariaLabel =
    nextStatus && nextStatus !== status
      ? `Set project status to ${nextStatus}`
      : status === 'published'
        ? 'Unpublish project'
        : 'Publish project'

  return (
    <button
      type="button"
      className={`${baseClasses} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary disabled:cursor-not-allowed disabled:opacity-60`}
      onClick={onToggle}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
    >
      {preset.label}
    </button>
  )
}

function ActiveBadge({
  isActive,
  onToggle,
  disabled,
}: {
  isActive: boolean
  onToggle?: () => void
  disabled?: boolean
}) {
  const label = isActive ? 'Active' : 'Hidden'
  const className = isActive
    ? 'bg-brand-secondary/15 text-brand-secondary'
    : 'bg-brand-neutral/10 text-brand-neutral/80'

  if (!onToggle) {
    return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{label}</span>
  }

  return (
    <button
      type="button"
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={isActive}
      title={isActive ? 'Click to hide from public list' : 'Click to mark as active'}
    >
      {label}
    </button>
  )
}

export default AdminProjectsListPage
