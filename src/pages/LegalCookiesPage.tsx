import Section from '../components/Section'

export function LegalCookiesPage() {
  return (
    <>
      <Section
        variant="brand"
        align="left"
        eyebrow="Legal"
        title="Cookie policy"
        description="We are finalising the cookie inventory and consent approach for the new site. The published version will detail analytical tooling, retention and user controls."
      />
      <Section
        align="left"
        title="Planned contents"
        description="Expect the final update to outline:"
      >
        <ul className="space-y-2 text-sm text-brand-neutral">
          <li>- Categories of cookies used (essential, analytics, functional)</li>
          <li>- Purpose and duration for each cookie, including third-party services</li>
          <li>- Instructions for managing preferences and withdrawing consent</li>
        </ul>
      </Section>
    </>
  )
}

export default LegalCookiesPage
