import Section from '../components/Section'

export function LegalPrivacyPage() {
  return (
    <>
      <Section
        variant="brand"
        align="left"
        eyebrow="Legal"
        title="Privacy policy"
        description="We are drafting the final privacy statement aligned with Serbian and EU data protection requirements. The release version will cover personal data categories, lawful bases, retention, and data subject rights."
      />
      <Section
        align="left"
        title="What’s next"
        description="The completed policy will include:"
      >
        <ul className="space-y-2 text-sm text-brand-neutral">
          <li>- Contact details for the data protection officer</li>
          <li>- How we process contact form submissions and project documentation</li>
          <li>- Cookie classification and opt-out mechanisms</li>
          <li>- International data transfer safeguards</li>
        </ul>
      </Section>
    </>
  )
}

export default LegalPrivacyPage
