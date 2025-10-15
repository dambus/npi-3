import HeroPrimary from '../components/HeroPrimary'
import Section from '../components/Section'

export function AboutPage() {
  return (
    <>
      <HeroPrimary
        eyebrow="About Neopetrol Inženjering"
        title="Committed to excellence in industrial design and engineering."
        description="Founded in 2008, our team of licensed engineers delivers dependable documentation and consulting across oil, gas, petrochemical and energy sectors."
        stats={[
          { label: 'Years in operation', value: '17' },
          { label: 'Disciplines covered', value: '6' },
          { label: 'Projects delivered', value: '80+' },
        ]}
      />
      <Section
        align="left"
        title="Next steps"
        description="Detailed team bios, licenses and project methodology are in progress. Let us know which information is most useful so we can prioritise it."
      >
        <div className="max-w-2xl space-y-3 text-brand-neutral">
          <p>
            We are consolidating reference documentation, leadership bios and governance structure into this page.
            If you need a specific document, reach out via the contact form and we will share the latest revision.
          </p>
          <p>
            This page will expand with mission, vision, QHSE approach, and organisational chart aligned to the sitemap.
          </p>
        </div>
      </Section>
    </>
  )
}

export default AboutPage
