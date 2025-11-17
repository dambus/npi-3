import {
  BuildingOffice2Icon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  TagIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import ProjectCard from '../components/ProjectCard'
import ProjectGallery from '../components/ProjectGallery'
import Section from '../components/Section'
import { useProjectBySlug } from '../hooks/usePublishedProjects'
import { renderableRichTextBlocks } from '../lib/richText'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { project, projects, isLoading, error } = useProjectBySlug(slug)

  useEffect(() => {
    if (!slug) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  const adjacency = useMemo(() => {
    if (!project || !slug) {
      return { previous: undefined, next: undefined }
    }
    const caseStudyProjects = projects.filter((entry) => entry.slug?.trim())
    const index = caseStudyProjects.findIndex((entry) => entry.slug === slug)
    if (index === -1) {
      return { previous: undefined, next: undefined }
    }
    return {
      previous: index > 0 ? caseStudyProjects[index - 1] : undefined,
      next: index < caseStudyProjects.length - 1 ? caseStudyProjects[index + 1] : undefined,
    }
  }, [project, projects, slug])

  const relatedProjects = useMemo(() => {
    if (!project || !slug) {
      return []
    }
    const relatedSlugs = project.relatedSlugs ?? []
    const relatedBySlug = relatedSlugs
      .map((relatedSlug) => projects.find((candidate) => candidate.slug === relatedSlug))
      .filter((candidate): candidate is typeof project => Boolean(candidate))

    const fallback = projects.filter((candidate) => candidate.slug !== slug)
    const ordered = [...relatedBySlug, ...fallback]
    const seen = new Set<string>()
    const unique: typeof project[] = []

    for (const candidate of ordered) {
      if (!candidate.slug) {
        continue
      }
      if (seen.has(candidate.slug) || candidate.slug === slug) {
        continue
      }
      seen.add(candidate.slug)
      unique.push(candidate)
      if (unique.length >= 3) {
        break
      }
    }

    return unique
  }, [project, projects])

  if (!slug) {
    return <Navigate to="/not-found" replace />
  }

  if (error) {
    return (
      <Section align="left" className="bg-surface-default py-24">
        <p
          role="alert"
          className="text-sm text-feedback-danger"
        >
          We couldn&apos;t load this project right now. Please try again later.
        </p>
      </Section>
    )
  }

  if (isLoading) {
    return (
      <Section align="left" className="bg-surface-default py-24">
        <p className="text-sm text-brand-neutral">Loading project...</p>
      </Section>
    )
  }

  if (!project) {
    return <Navigate to="/not-found" replace />
  }

  const { previous, next } = adjacency

  const tagList = project.metadata.tags ?? []

  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-primary text-white">
        <img
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/95 via-brand-primary/70 to-brand-secondary/45" />
        <div className="relative container-inset flex flex-col gap-6 py-16 sm:py-20 md:py-24">
          {/* <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs font-normal uppercase tracking-[0.12em] text-white/70"
          >
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>
            <span aria-hidden="true" className="text-white/40">
              /
            </span>
            <Link to="/projects" className="transition hover:text-white">
              Projects
            </Link>
            <span aria-hidden="true" className="text-white/40">
              /
            </span>
            <span className="text-white">{project.name}</span>
          </nav> */}

          <div className="max-w-3xl space-y-4">
            <span className="inline-flex w-fit items-center gap-2 border border-white/30 bg-white/15 px-2 py-1 text-[0.65rem] font-normal tracking-[0.12em] text-white/90">
              <TagIcon className="h-4 w-4 text-white/80" aria-hidden="true" />
              {project.category}
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white md:text-[3.25rem]">
              {project.name}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              {project.shortDescription}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/80">
            <span className="inline-flex items-center gap-2">
              <BuildingOffice2Icon className="h-6 w-6 text-brand-accent/85" aria-hidden="true" />
              <span className="font-normal">{project.client}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-brand-accent/85" aria-hidden="true" />
              <span className="font-normal">{project.year}</span>
            </span>
            {project.metadata.projectManager ? (
              <span className="inline-flex items-center gap-2">
                <UserCircleIcon className="h-6 w-6 text-brand-accent/85" aria-hidden="true" />
                <span className="font-normal">{project.metadata.projectManager}</span>
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <Section
        align="left"
        contentClassName="gap-12"
        className="bg-surface-default"
        id="project-overview"
      >
        <div
          className="grid gap-24 lg:grid-cols-12 lg:items-start"
          data-project-id={project.metadata.internalId}
        >
          <article className="space-y-8 lg:col-span-7 xl:col-span-8">
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-semibold text-brand-primary">
                Project overview
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-brand-neutral">
                {renderableRichTextBlocks(project.description).map((block, index) => (
                  <div key={index} className="space-y-2" dangerouslySetInnerHTML={{ __html: block }} />
                ))}
              </div>
            </div>

            <ProjectGallery images={project.gallery} projectName={project.name} />
          </article>

          <aside className="space-y-6 lg:col-span-5 xl:col-span-4">
            <div className="border border-brand-primary/9 bg-brand-primary/7 p-8">
              <h3 className="text-sm font-normal uppercase tracking-[0.12em] text-brand-neutral">
                Project details
              </h3>
              <dl className="mt-5 space-y-3 text-sm text-brand-primary">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-brand-neutral">Client</dt>
                  <dd className="max-w-[16ch] text-right font-semibold">{project.client}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-brand-neutral">Category</dt>
                  <dd className="max-w-[16ch] text-right font-semibold">{project.category}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-brand-neutral">Year</dt>
                  <dd className="text-right font-semibold">{project.year}</dd>
                </div>
                {project.metadata.priority ? (
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-brand-neutral">Priority</dt>
                    <dd className="text-right font-semibold capitalize">{project.metadata.priority}</dd>
                  </div>
                ) : null}
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-brand-neutral">Status</dt>
                  <dd className="text-right font-semibold capitalize">{project.metadata.status}</dd>
                </div>
              </dl>

              {tagList.length ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {tagList.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-xs bg-brand-primary/5 px-3 py-1 text-xs font-normal tracking-[0.12em] text-brand-primary/85 border border-brand-primary/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className=" border border-brand-secondary/20 bg-gradient-to-br from-brand-secondary/90 via-brand-secondary/85 to-brand-primary/80 p-8 text-white shadow-[0_32px_80px_rgba(8,20,70,0.35)]">
              <h3 className="text-base font-semibold">Need a similar project delivered?</h3>
              <p className="mt-3 text-sm text-white/85">
                Connect with our engineering leads to discuss scope, documentation requirements and mobilisation timelines.
              </p>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/12">
                    <PhoneIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm uppercase tracking-[0.12em] text-white/60">Call us</p>
                    <a href="tel:+381213020546" className="font-normal text-white text-md transition hover:text-brand-accent">
                      +381 21 302 05 46
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/12">
                    <EnvelopeIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-md uppercase tracking-[0.12em] text-white/60">Email us</p>
                    <a href="mailto:office@npi.rs" className="font-normal text-white text-md transition hover:text-brand-accent">
                      office@npi.rs
                    </a>
                  </div>
                </div>
              </div>
              <Button
                as="router-link"
                to="/contact"
                variant="secondary"
                className="mt-6 w-full justify-center border border-white/20 bg-white/10 px-6 py-3 text-md font-light uppercase tracking-[0.15em] text-white hover:bg-white/20"
              >
                Request a briefing
              </Button>
            </div>
          </aside>
        </div>
      </Section>

      <Section
        align="left"
        className="bg-surface-muted"
        contentClassName="gap-6"
      >
        <div className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-[0.22em] text-brand-neutral md:flex-row md:items-center md:justify-between md:w-full">
          {/* <span>Browse other references</span> */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:justify-between md:w-full md:gap-4">
            {previous?.slug ? (
              <Link
                to={`/projects/${previous.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-primary/10 bg-transparent px-4 py-2 text-xs sentence tracking-[0.12em] text-brand-primary transition hover:border-brand-accent/40 hover:text-brand-accent"
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                Previous: {previous.name}
              </Link>
            ) : (
              <span className="text-brand-neutral/40">First case study</span>
            )}

            {next?.slug ? (
              <Link
                to={`/projects/${next.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-primary/10 bg-transparent px-4 py-2 text-xs uppercase tracking-[0.12em] text-brand-primary transition hover:border-brand-accent/40 hover:text-brand-accent"
              >
                Next: {next.name}
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
            ) : (
              <span className="text-brand-neutral/40">Last case study</span>
            )}
          </div>
        </div>
      </Section>

      {relatedProjects.length ? (
        <Section
          align="left"
          variant="muted"
          title="Related projects"
          description="Explore adjacent references to compare scope, project teams and deliverables."
          contentClassName="gap-12"
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedProjects.map((related) => {
              const relatedSlug = related.slug?.trim()
              return (
                <ProjectCard
                  key={relatedSlug || related.id || related.metadata.internalId || related.name}
                  title={related.name}
                  industry={related.category}
                  description={related.shortDescription}
                  image={related.heroImage.src}
                  href={relatedSlug ? `/projects/${relatedSlug}` : undefined}
                />
              )
            })}
          </div>
        </Section>
      ) : null}
    </>
  )
}

export default ProjectDetailPage
