import HeroPrimary from '../components/HeroPrimary'
import Section from '../components/Section'

const industries = [
  {
    name: 'Oil & Gas Production',
    summary:
      'Field development studies, gathering systems, and upstream facility upgrades with emphasis on process safety and brownfield integration.',
  },
  {
    name: 'Refining & Petrochemical',
    summary:
      'Process revamps, unit debottlenecking, and environmental compliance roadmaps for refineries and petrochemical complexes.',
  },
  {
    name: 'Gas Storage & Transport',
    summary:
      'Underground storage expansions, compressor stations, and transmission infrastructure engineered for reliability and redundancy.',
  },
  {
    name: 'Energy & Power',
    summary:
      'Combined heat and power, utility systems, and electrification projects supporting industrial and municipal clients.',
  },
  {
    name: 'Industrial Automation',
    summary:
      'Instrumentation, control system upgrades, and functional safety architecture aligned with IEC and local regulatory requirements.',
  },
]

export function IndustriesPage() {
  return (
    <>
      <HeroPrimary
        eyebrow="Industries"
        title="Sector-specific expertise backed by operational references."
        description="Our teams integrate process, mechanical, electrical, instrumentation and civil disciplines to adapt to each sector’s compliance landscape."
      />
      <Section
        align="left"
        title="Where we operate"
        description="We are finalising detailed project examples and KPIs per sector. Use the list below to indicate which industry overview to prioritise."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {industries.map((industry) => (
            <article
              key={industry.name}
              className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-[0_24px_60px_rgba(8,18,40,0.08)] transition hover:-translate-y-0.5"
            >
              <h3 className="font-display text-xl font-semibold text-brand-primary">
                {industry.name}
              </h3>
              <p className="mt-3 text-sm text-brand-neutral">{industry.summary}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  )
}

export default IndustriesPage
