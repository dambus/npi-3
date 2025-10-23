import Button from './Button'
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
      className="relative overflow-hidden"
      contentClassName="gap-16"
      align="center"
      eyebrow="Selected references"
      title="Projects that demonstrate our sector expertise."
      description="From feasibility studies to commissioning support, our multidisciplinary team delivers traceable documentation and coordination."
    >
      <span className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-[radial-gradient(circle_at_bottom,_rgba(0,158,65,0.25),_transparent_70%)]" />
      <span className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/3 bg-[radial-gradient(circle_at_center,_rgba(13,31,73,0.12),_transparent_70%)]" />


      
        <div className="grid justify-center gap-6 sm:grid-cols-3 lg:justify-start mx-auto">
          {[
            { value: '23', label: 'Gas & energy facilities' },
            { value: '32', label: 'Process units modernised' },
            { value: '18', label: 'International collaborations' },
          ].map((item, index) => (
            <div
              key={item.label}
              className="group relative flex flex-col items-center gap-4 rounded-xl border border-brand-primary/0 bg-white/10 p-6 py-12 text-center shadow-[0_32px_70px_rgba(8,24,55,0.12)] backdrop-blur"
            >
              <div className="relative flex flex-col items-center gap-3">
                <div className="relative inline-flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-white/70 bg-white text-brand-primary shadow-[0_16px_30px_rgba(8,24,55,0.22)]">
                  <span className="pointer-events-none absolute inset-0 rounded-full border border-brand-secondary/10 transition-transform duration-300 group-hover:scale-105" />
                  <span className="pointer-events-none absolute inset-1 rounded-full border border-brand-secondary/15 opacity-80" />
                  <span
                    className="pointer-events-none absolute -inset-2 z-0 rounded-full bg-brand-secondary/60 blur-sm mix-blend-screen animate-orbit-one scale-80"
                    style={{ animationDelay: `${index * 3}s` }}
                  />
                  <span
                    className="pointer-events-none absolute -inset-4 z-0 rounded-full bg-brand-accent/50 blur-none mix-blend-screen animate-orbit-two scale-75"
                    style={{ animationDelay: `${index * 0.9 + 0.45}s` }}
                  />
                  <span className="relative z-10 font-display text-3xl font-bold tracking-tight text-brand-secondary/75">
                    {item.value}
                  </span>
                </div>
                <p className="mt-4 max-w-[16ch] text-sm leading-relaxed text-brand-neutral md:text-base">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
  

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>

      <div className="pt-2">
        <Button
          as="router-link"
          to="/projectspage"
          variant="ghost"
          className="rounded-[--radius-pill] border border-brand-secondary/20 bg-white/80 px-6 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-secondary shadow-[0_20px_40px_rgba(12,30,70,0.12)] hover:border-brand-accent/40 hover:text-brand-accent/90"
        >
          See all projects
        </Button>
      </div>
    </Section>
  )
}

export default ProjectsTeaserSection
