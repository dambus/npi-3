import Button from './Button'
import Section from './Section'

const highlights = [
  'Conceptual, main and detail design for oil, gas and petrochemical facilities',
  'Feasibility studies, project management, supervision and commissioning support',
  'Based in Novi Sad with projects delivered across Serbia and neighbouring EU markets',
]

export function AboutTeaser() {
  return (
    <Section
      id="about"
      align="left"
      title="Engineering partner focused on dependable project delivery."
      description="Neopetrol Inzenjering d.o.o. is a Novi Sad-based engineering and consulting company specialised in the oil, gas and petrochemical sectors. Since 2008 we have delivered reliable documentation and expert support across all phases - from studies and concept designs to detail documentation and site supervision."
      contentClassName="gap-12"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div className="space-y-6">
          <ul className="space-y-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm text-brand-primary/90"
              >
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-brand-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-6 text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary/70">
            <span className="flex flex-col text-2xl font-bold normal-case text-brand-primary">
              200+ <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-neutral">Study &amp; design packages</span>
            </span>
            <span className="flex flex-col text-2xl font-bold normal-case text-brand-primary">
              40+ <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-neutral">Licensed engineers</span>
            </span>
          </div>

          <Button as="a" href="/about" variant="secondary" size="lg">
            Learn more about us
          </Button>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-brand-primary/10 bg-brand-primary/10 p-8 shadow-[0_30px_70px_rgba(8,18,40,0.15)]">
          <div className="grid gap-4">
            <div>
              <h3 className="font-display text-xl font-semibold text-brand-primary">
                Disciplines we integrate
              </h3>
              <p className="text-sm text-brand-neutral">
                Process - Mechanical - Electrical - Civil - Instrumentation &amp; Control - Fire &amp; Safety
              </p>
            </div>
            <div className="grid gap-3 rounded-2xl bg-white/80 p-6 text-sm text-brand-primary shadow-[0_14px_40px_rgba(8,18,40,0.1)]">
              <p className="font-semibold">
                "NPI provides consolidated engineering packages with accountable documentation and coordination across all trades."
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-brand-neutral">
                Client feedback - Petrochemical revamp, 2024
              </p>
            </div>
          </div>
          <span className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full border border-brand-accent/40" />
          <span className="pointer-events-none absolute -bottom-6 left-10 h-16 w-16 rounded-full bg-brand-accent/10" />
        </div>
      </div>
    </Section>
  )
}

export default AboutTeaser
