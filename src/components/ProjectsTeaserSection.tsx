import ProjectCard from './ProjectCard'
import Section from './Section'

const projects = [
  {
    title: 'Expansion of underground gas storage – Banatski Dvor',
    industry: 'Gas storage',
    description:
      'Concept through detail design for compression, dehydration and metering units, including safety systems and integration with existing infrastructure.',
    image: '/media/projects/storage-facility.png',
  },
  {
    title: 'Modular gas pressure regulating station network',
    industry: 'Distribution',
    description:
      'Standardised pressure regulating stations engineered for rapid deployment across utility network, covering civil, mechanical and electrical packages.',
    image: '/media/projects/modular-station.png',
  },
  {
    title: 'Process upgrade at petrochemical complex',
    industry: 'Petrochemical',
    description:
      'Revamp of process units with new instrumentation, control logic and safety interlocks, ensuring compliance with latest EU directives.',
    image: '/media/projects/process-upgrade.png',
  },
]

export function ProjectsTeaserSection() {
  return (
    <Section
      id="projects"
      variant="muted"
      align="left"
      eyebrow="Selected references"
      title="Projects that demonstrate our sector expertise."
      description="From feasibility studies to commissioning support, our multidisciplinary team delivers traceable documentation and coordination."
      className="relative overflow-hidden"
      contentClassName="gap-16"
    >
      <span className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-[radial-gradient(circle_at_bottom,_rgba(0,158,65,0.25),_transparent_70%)]" />
      <span className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/3 bg-[radial-gradient(circle_at_center,_rgba(13,31,73,0.12),_transparent_70%)]" />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { value: '23', label: 'Gas & energy facilities' },
          { value: '32', label: 'Process units modernised' },
          { value: '18', label: 'International collaborations' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-brand-primary/10 bg-white p-5 text-brand-primary shadow-[0_24px_60px_rgba(8,18,40,0.08)]"
          >
            <p className="font-display text-3xl font-semibold text-brand-secondary">
              {item.value}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-neutral">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </Section>
  )
}

export default ProjectsTeaserSection
