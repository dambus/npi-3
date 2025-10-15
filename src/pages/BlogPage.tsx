import HeroPrimary from '../components/HeroPrimary'
import Section from '../components/Section'

export function BlogPage() {
  return (
    <>
      <HeroPrimary
        eyebrow="Insights"
        title="News & thought leadership from NPI."
        description="We are curating project updates, regulatory insights and technical deep dives. Subscribe to stay informed when the first articles go live."
      />
      <Section
        align="left"
        title="Coming soon"
        description="Initial topics in development:"
      >
        <ul className="space-y-2 text-sm text-brand-neutral">
          <li>- Managing complex brownfield revamps with phased shutdowns</li>
          <li>- Lessons from recent gas infrastructure upgrades in the region</li>
          <li>- Practical guidance for aligning ISO procedures with client systems</li>
        </ul>
      </Section>
    </>
  )
}

export default BlogPage
