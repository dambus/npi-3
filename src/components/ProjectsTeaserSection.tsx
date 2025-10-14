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
      variant="default"
      align="left"
      eyebrow="Selected references"
      title="Projects that demonstrate our sector expertise."
      description="From feasibility studies to commissioning support, our multidisciplinary team delivers traceable documentation and coordination."
      contentClassName="gap-12"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </Section>
  )
}

export default ProjectsTeaserSection
