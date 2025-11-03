import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Section from '../components/Section'
import { usePublishedProjects } from '../hooks/usePublishedProjects'

const VIEW_MODES = {
  cards: 'cards',
  table: 'table',
} as const

type ViewMode = (typeof VIEW_MODES)[keyof typeof VIEW_MODES]

function useFilterOptions(projects: ReturnType<typeof usePublishedProjects>['projects']) {
  return useMemo(() => {
    const categories = new Set<string>()
    const years = new Set<number>()

    for (const project of projects) {
      if (project.category) {
        categories.add(project.category)
      }
      if (project.year) {
        years.add(project.year)
      }
    }

    return {
      categories: Array.from(categories).sort((a, b) => a.localeCompare(b)),
      years: Array.from(years).sort((a, b) => b - a),
    }
  }, [projects])
}

function matchesSearch(project: ReturnType<typeof usePublishedProjects>['projects'][number], query: string) {
  if (!query) return true
  const haystack = [
    project.name,
    project.shortDescription,
    project.client,
    project.category,
    ...(project.metadata.tags ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return haystack.includes(query)
}

export function BrowseProjectsPage() {
  const { projects, isLoading, error } = usePublishedProjects()
  const { categories, years } = useFilterOptions(projects)

  const [viewMode, setViewMode] = useState<ViewMode>(VIEW_MODES.cards)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [year, setYear] = useState('all')
  const [activeOnly, setActiveOnly] = useState(true)

  const normalizedSearch = searchTerm.trim().toLowerCase()

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeOnly && !project.isActive) return false
      if (category !== 'all' && project.category !== category) return false
      if (year !== 'all' && String(project.year) !== year) return false
      if (!matchesSearch(project, normalizedSearch)) return false
      return true
    })
  }, [projects, activeOnly, category, year, normalizedSearch])

  useEffect(() => {
    setCategory('all')
    setYear('all')
    setActiveOnly(true)
  }, [projects.length])

  const resultLabel = filteredProjects.length === 1 ? 'project' : 'projects'

  return (
    <>
      <Section
        align="left"
        className="bg-surface-default"
        title="Browse all projects"
        description="Search live references, narrow by category or year, and switch between compact cards or table view."
        contentClassName="gap-10"
      >
        <div className="rounded-3xl border border-brand-neutral/15 bg-white p-6 shadow-[0_24px_55px_rgba(8,20,44,0.1)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-1 flex-col gap-2 md:max-w-sm">
              <label
                className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-neutral/70"
                htmlFor="projects-search"
              >
                Live search
              </label>
              <input
                id="projects-search"
                type="search"
                placeholder="Search by name, client or keywords"
                className="rounded-2xl border border-brand-neutral/25 bg-surface-muted px-4 py-3 text-sm text-brand-primary shadow-inner focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/20"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <div className="flex flex-col gap-1">
                <label
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-neutral/70"
                  htmlFor="projects-category"
                >
                  Category
                </label>
                <select
                  id="projects-category"
                  className="rounded-xl border border-brand-neutral/25 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary shadow-sm focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/20"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="all">All</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-neutral/70"
                  htmlFor="projects-year"
                >
                  Year
                </label>
                <select
                  id="projects-year"
                  className="rounded-xl border border-brand-neutral/25 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary shadow-sm focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/20"
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                >
                  <option value="all">All</option>
                  {years.map((item) => (
                    <option key={item} value={String(item)}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-neutral/70">Active</span>
                <button
                  type="button"
                  className={`rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                    activeOnly
                      ? 'border-brand-secondary/50 bg-brand-secondary/10 text-brand-secondary'
                      : 'border-brand-neutral/25 bg-white text-brand-neutral'
                  }`}
                  onClick={() => setActiveOnly((prev) => !prev)}
                >
                  {activeOnly ? 'Active only' : 'All listings'}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-neutral/70">
              {filteredProjects.length} {resultLabel} match your filters
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-neutral/70">View</span>
              <Button
                as="button"
                type="button"
                size="sm"
                variant={viewMode === VIEW_MODES.cards ? 'primary' : 'secondary'}
                onClick={() => setViewMode(VIEW_MODES.cards)}
                aria-pressed={viewMode === VIEW_MODES.cards}
              >
                Cards
              </Button>
              <Button
                as="button"
                type="button"
                size="sm"
                variant={viewMode === VIEW_MODES.table ? 'primary' : 'secondary'}
                onClick={() => setViewMode(VIEW_MODES.table)}
                aria-pressed={viewMode === VIEW_MODES.table}
              >
                Table
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <p className="text-sm text-brand-neutral">Loading catalogue…</p>
        ) : error ? (
          <div
            role="alert"
            className="rounded-xl border border-feedback-danger/20 bg-feedback-danger/5 p-4 text-sm text-feedback-danger"
          >
            Unable to load projects right now. Please try again later.
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-brand-neutral/15 bg-white p-6 text-sm text-brand-neutral">
            No projects match the current filters. Adjust the search or show hidden listings.
          </div>
        ) : viewMode === VIEW_MODES.table ? (
          <div className="overflow-x-auto rounded-2xl border border-brand-neutral/15 bg-white shadow-[0_18px_45px_rgba(8,20,44,0.08)]">
            <table className="min-w-full divide-y divide-brand-neutral/10 text-sm">
              <thead className="bg-surface-muted">
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.22em] text-brand-neutral">
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Active</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-neutral/5">
                {filteredProjects.map((project) => (
                  <tr key={project.slug}>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-brand-primary">{project.name}</span>
                        <span className="text-xs text-brand-neutral/70">{project.metadata.internalId}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-brand-neutral">{project.category || '—'}</td>
                    <td className="px-4 py-3 text-brand-neutral">{project.client || '—'}</td>
                    <td className="px-4 py-3 text-brand-neutral">{project.year || '—'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          project.isActive
                            ? 'bg-brand-secondary/15 text-brand-secondary'
                            : 'bg-brand-neutral/10 text-brand-neutral/80'
                        }`}
                      >
                        {project.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-brand-neutral capitalize">{project.metadata.status}</td>
                    <td className="px-4 py-3 text-right">
                      <Button as="router-link" to={`/projects/${project.slug}`} variant="secondary" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.slug}
                className="flex h-full flex-col gap-4 rounded-3xl border border-brand-neutral/15 bg-white p-6 shadow-[0_22px_55px_rgba(8,20,51,0.08)]"
              >
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-neutral/60">
                    {project.metadata.internalId}
                    <span className="h-1 w-1 rounded-full bg-brand-neutral/30" aria-hidden="true" />
                    {project.category || 'Uncategorised'}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-brand-primary">{project.name}</h3>
                  <p className="text-sm leading-relaxed text-brand-neutral">{project.shortDescription}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-brand-neutral/70">
                  <span className="rounded-full bg-brand-neutral/10 px-3 py-1 font-semibold uppercase tracking-[0.22em]">
                    {project.client || 'Client NDA'}
                  </span>
                  <span className="rounded-full bg-brand-neutral/10 px-3 py-1 font-semibold uppercase tracking-[0.22em]">
                    {project.year || 'Year TBD'}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 font-semibold uppercase tracking-[0.22em] ${
                      project.isActive ? 'bg-brand-secondary/15 text-brand-secondary' : 'bg-brand-neutral/15 text-brand-neutral'
                    }`}
                  >
                    {project.isActive ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <div className="mt-auto flex justify-between gap-3 text-xs text-brand-neutral/70">
                  <span>Updated {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : '—'}</span>
                  <Button as="router-link" to={`/projects/${project.slug}`} variant="link" className="text-brand-secondary">
                    View case study
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>

      <Section
        align="left"
        variant="muted"
        title="Need admin access?"
        description="Authenticated team members can manage content through the Supabase-backed admin console."
      >
        <p className="text-sm text-brand-neutral">
          Use the{' '}
          <Link to="/admin/projects" className="text-brand-secondary underline">
            admin project dashboard
          </Link>{' '}
          if you need to edit metadata, upload new galleries or adjust active listings.
        </p>
      </Section>
    </>
  )
}

export default BrowseProjectsPage

