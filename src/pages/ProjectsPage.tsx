import HeroPrimary from '../components/HeroPrimary'
import ProjectsTeaserSection from '../components/ProjectsTeaserSection'
import Section from '../components/Section'

export function ProjectsPage() {
  return (
    <>
      <HeroPrimary
        eyebrow="Projects"
        title="References that demonstrate our multidisciplinary delivery."
        description="Full project catalogue with filters, technical scope and documentation samples is coming soon. Explore selected highlights below and contact us for specific references."
      />
      <ProjectsTeaserSection />
      <Section
        align="left"
        title="Need a detailed case study?"
        description="We are curating individual project dossiers (scope, deliverables, KPIs, imagery). Let us know which industries or project scales you want to see first."
      >
        <p className="max-w-2xl text-sm text-brand-neutral">
          Send a request through the contact page specifying industry, project size, and required documentation (P&IDs, 3D models, specifications, QA packs). We will share redacted samples aligned with NDA requirements.
        </p>
      </Section>
    </>
  )
}

export default ProjectsPage
