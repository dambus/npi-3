import HeroPrimary from '../components/HeroPrimary'
import Section from '../components/Section'

export function QualityPage() {
  return (
    <>
      <HeroPrimary
        eyebrow="Quality & Compliance"
        title="ISO 9001 certified systems that keep documentation auditable."
        description="Our quality management system governs every deliverable, from document control and change management to supplier evaluations and site supervision reports."
      />
      <Section
        align="left"
        title="Documentation in progress"
        description="We are compiling process descriptions, audit schedules, and certification details for this page."
      >
        <ul className="space-y-3 text-sm text-brand-neutral">
          <li>- ISO 9001 scope statement and certificate numbers</li>
          <li>- Document control workflow with revision matrices and approvals</li>
          <li>- Change management procedure and field supervision reporting templates</li>
        </ul>
      </Section>
    </>
  )
}

export default QualityPage
