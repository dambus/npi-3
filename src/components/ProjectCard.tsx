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
  href = '/projects',
}: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-brand-primary/10 bg-white text-left shadow-[0_24px_65px_rgba(8,18,40,0.12)] transition-transform duration-200 ease-out hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute left-5 top-5 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-primary shadow">
          {industry}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-display text-xl font-semibold text-brand-primary">
          {title}
        </h3>
        <p className="text-sm text-brand-neutral">{description}</p>
        <div className="mt-auto pt-2">
          <Button as="a" href={href} variant="link" className="text-sm">
            View project details
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
