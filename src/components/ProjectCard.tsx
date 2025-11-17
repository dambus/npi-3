import Button from './Button'

export interface ProjectCardProps {
  image: string
  title: string
  industry: string
  description: string
  href?: string
}

export function ProjectCard({
  image,
  title,
  industry,
  description,
  href,
}: ProjectCardProps) {
  const hasCaseStudyLink = Boolean(href)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-primary/10 bg-white text-left shadow-[0_24px_65px_rgba(8,18,40,0.12)] transition-transform duration-200 ease-out hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover grayscale transition duration-300 ease-out group-hover:grayscale-0"
          loading="lazy"
        />
        <span className="absolute left-5 top-5 rounded-[--radius-pill] bg-brand-accent from-brand-secondary/95 via-brand-secondary/85 to-brand-accent/85 px-3 py-1 text-[0.65rem] font-normal uppercase tracking-[0.22em] text-white shadow-[0_18px_35px_rgba(12,30,70,0.3)]">
          {industry}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-display text-xl font-semibold text-brand-primary">
          {title}
        </h3>
        <p className="text-sm text-brand-neutral">{description}</p>
        <div className="mt-auto pt-2">
          {hasCaseStudyLink ? (
            <Button as="router-link" to={href!} variant="link" className="text-sm">
              View project details
            </Button>
          ) : (
            <Button
              as="button"
              type="button"
              variant="link"
              className="cursor-default text-brand-neutral/60"
              disabled
            >
              Case study in production
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
