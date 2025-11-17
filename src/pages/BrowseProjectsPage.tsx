import { useEffect, useMemo, useState } from 'react'
import Button from '../components/Button'
import Section from '../components/Section'
import type { Project } from '../data/projectTypes'
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
  const [missingCaseStudyProject, setMissingCaseStudyProject] = useState<Project | null>(null)

  const normalizedSearch = searchTerm.trim().toLowerCase()

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (category !== 'all' && project.category !== category) return false
      if (year !== 'all' && String(project.year) !== year) return false
      if (!matchesSearch(project, normalizedSearch)) return false
      return true
    })
  }, [projects, category, year, normalizedSearch])

  useEffect(() => {
    setCategory('all')
    setYear('all')
  }, [projects.length])

  const resultLabel = filteredProjects.length === 1 ? 'project' : 'projects'
  const fieldClasses =
    'w-full rounded-2xl border border-brand-neutral/25 bg-surface-muted px-4 py-3 text-sm text-brand-primary shadow-inner focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/20'

  const handleMissingCaseStudy = (project: Project) => {
    setMissingCaseStudyProject(project)
  }

  const closeModal = () => setMissingCaseStudyProject(null)

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
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap">
              <div className="w-full lg:flex-1">
                <label className="mb-1 text-sm font-medium text-brand-neutral" htmlFor="projects-search">
                  Live search
                </label>
                <input
                  id="projects-search"
                  type="search"
                  placeholder="Search by name, client or keywords"
                  className={fieldClasses}
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
              <div className="grid w-full gap-4 sm:grid-cols-2 lg:flex-1 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-neutral" htmlFor="projects-category">
                    Category
                  </label>
                  <select
                    id="projects-category"
                    className={fieldClasses}
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option value="all">All categories</option>
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-neutral" htmlFor="projects-year">
                    Year
                  </label>
                  <select
                    id="projects-year"
                    className={fieldClasses}
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                  >
                    <option value="all">All years</option>
                    {years.map((item) => (
                      <option key={item} value={String(item)}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-brand-neutral">
            <p>
              {filteredProjects.length} {resultLabel} match your filters
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-brand-neutral">View</span>
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
          <p className="text-sm text-brand-neutral">Loading catalogue...</p>
        ) : error ? (
          <div
            role="alert"
            className="rounded-xl border border-feedback-danger/20 bg-feedback-danger/5 p-4 text-sm text-feedback-danger"
          >
            Unable to load projects right now. Please try again later.
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-brand-neutral/15 bg-white p-6 text-sm text-brand-neutral">
            No projects match the current filters. Try adjusting your search or selecting a different category or year.
          </div>
        ) : viewMode === VIEW_MODES.table ? (
          <div className="overflow-x-auto rounded-2xl border border-brand-neutral/15 bg-white shadow-[0_18px_45px_rgba(8,20,44,0.08)]">
            <table className="min-w-full divide-y divide-brand-neutral/10 text-sm">
              <thead className="bg-surface-muted">
                <tr className="text-left text-sm font-semibold text-brand-neutral">
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-neutral/5">
                {filteredProjects.map((project) => {
                  const projectSlug = (project.slug || '').trim()
                  const hasCaseStudy = Boolean(projectSlug)
                  return (
                    <tr key={projectSlug || project.metadata.internalId || project.name}>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-brand-primary">{project.name}</span>
                      </td>
                      <td className="px-4 py-3 text-brand-neutral">{project.category || '-'}</td>
                      <td className="px-4 py-3 text-brand-neutral">{project.client || '-'}</td>
                      <td className="px-4 py-3 text-brand-neutral">{project.year || '-'}</td>
                      <td className="px-4 py-3 text-right">
                        {hasCaseStudy ? (
                          <Button as="router-link" to={`/projects/${projectSlug}`} variant="secondary" size="sm">
                            View
                          </Button>
                        ) : (
                          <Button variant="secondary" size="sm" onClick={() => handleMissingCaseStudy(project)}>
                            View
                          </Button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => {
              const projectSlug = (project.slug || '').trim()
              const hasCaseStudy = Boolean(projectSlug)
              return (
                <article
                  key={projectSlug || project.metadata.internalId || project.name}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-brand-neutral/15 bg-white p-6 shadow-[0_22px_55px_rgba(8,20,51,0.08)]"
                >
                  <div className="space-y-2">
                    <span className="text-sm text-brand-neutral/70">{project.category || 'Uncategorised'}</span>
                    <h3 className="font-display text-xl font-semibold text-brand-primary">{project.name}</h3>
                    <p className="text-sm leading-relaxed text-brand-neutral">{project.shortDescription}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-brand-neutral/80">
                    <span className="rounded-full bg-brand-neutral/10 px-3 py-1">
                      {project.client || 'Client NDA'}
                    </span>
                    <span className="rounded-full bg-brand-neutral/10 px-3 py-1">
                      {project.year || 'Year TBD'}
                    </span>
                  </div>
                  <div className="mt-auto flex justify-end">
                    {hasCaseStudy ? (
                      <Button as="router-link" to={`/projects/${projectSlug}`} variant="link" className="text-brand-secondary">
                        View case study
                      </Button>
                    ) : (
                      <Button variant="link" className="text-brand-secondary" onClick={() => handleMissingCaseStudy(project)}>
                        View case study
                      </Button>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </Section>
      {missingCaseStudyProject ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-primary/60 px-4 py-6 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeModal()
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-missing-title"
            className="w-full max-w-md rounded-3xl border border-brand-neutral/20 bg-white p-8 text-center shadow-[0_32px_65px_rgba(8,20,44,0.35)]"
          >
            <h2 id="case-study-missing-title" className="font-display text-2xl font-semibold text-brand-primary">
              Case study unavailable
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-neutral">
              {missingCaseStudyProject.name} is currently listed without a published case study. Please explore other projects or check back later.
            </p>
            <div className="mt-6 flex justify-center">
              <Button variant="primary" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default BrowseProjectsPage
