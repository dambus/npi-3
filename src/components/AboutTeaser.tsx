import Button from './Button'
import Section from './Section'

const highlights = [
  'Conceptual, main and detail design for oil, gas and petrochemical facilities',
  'Feasibility studies, project management, supervision and commissioning support',
  'Based in Novi Sad with projects delivered across Serbia and neighbouring EU markets',
]

const stats = [
  { value: '17', label: 'Years in operation' },
  { value: '80+', label: 'Large-scale projects' },
  { value: '6', label: 'Discipline leads' },
]

export function AboutTeaser() {
  return (
    <Section
      id="about"
      className="relative overflow-hidden"
      align="left"
      title="Engineering partner focused on dependable project delivery."
      description="Neopetrol Inzenjering d.o.o. is a Novi Sad-based engineering and consulting company specialised in the oil, gas and petrochemical sectors. Since 2008 we have delivered reliable documentation and expert support across all phases - from studies and concept designs to detail documentation and site supervision."
      contentClassName="gap-16"
    >
      <span className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-64 bg-[radial-gradient(circle_at_top,_rgba(16,76,186,0.18),_transparent_70%)]" />
      <span className="pointer-events-none absolute inset-y-0 -left-40 -z-10 h-[440px] w-[440px] rounded-full bg-brand-accent/10 blur-3xl" />

      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <div className="space-y-10">
          <ul className="grid gap-4">
            {highlights.map((item, index) => (
              <li
                key={item}
                className="relative overflow-hidden rounded-[1.75rem] border border-brand-primary/10 bg-white/95 p-6 shadow-[0_28px_60px_rgba(8,18,40,0.08)]"
              >
                <span className="pointer-events-none absolute -right-6 top-3 font-display text-7xl font-black text-brand-primary/5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="relative flex gap-4">
                  <span className="mt-1.5 inline-flex h-3 w-3 flex-none rounded-full bg-brand-accent" />
                  <span className="text-base leading-relaxed text-brand-primary/90">
                    {item}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-brand-secondary/15 bg-brand-secondary/5 p-5 text-brand-primary shadow-[0_24px_55px_rgba(8,18,40,0.08)]"
              >
                <p className="font-display text-3xl font-semibold text-brand-secondary">
                  {item.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-neutral">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <Button as="router-link" to="/about" variant="secondary" size="lg" className="mt-2">
            Learn more about us
          </Button>
        </div>

        <div className="relative overflow-hidden rounded-[2.25rem] border border-brand-primary/10 bg-gradient-to-br from-white via-white/95 to-brand-secondary/5 p-10 shadow-[0_40px_90px_rgba(8,18,40,0.18)]">
          <div className="grid gap-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-brand-primary">
                Disciplines we integrate
              </h3>
              <p className="text-sm text-brand-neutral">
                Process - Mechanical - Electrical - Civil - Instrumentation &amp; Control - Fire &amp; Safety
              </p>
            </div>
            <div className="grid gap-4 rounded-2xl border border-brand-primary/10 bg-white/85 p-6 text-sm text-brand-primary shadow-[0_18px_40px_rgba(8,18,40,0.12)]">
              <p className="font-semibold">
                "NPI provides consolidated engineering packages with accountable documentation and coordination across all trades."
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-brand-neutral">
                Client feedback - Petrochemical revamp, 2024
              </p>
            </div>
            <div className="rounded-2xl bg-brand-secondary/10 p-5 text-sm text-brand-primary">
              <p className="font-semibold text-brand-secondary">
                What sets us apart
              </p>
              <ul className="mt-3 space-y-2 text-brand-primary/80">
                <li>- Unified discipline governance with single point of accountability</li>
                <li>- Document control aligned with ISO 9001 and client systems</li>
                <li>- Rapid mobilisation pod for site interventions and supervision</li>
              </ul>
            </div>
          </div>
          <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border border-brand-accent/35" />
          <span className="pointer-events-none absolute -bottom-10 left-12 h-20 w-20 rounded-full bg-brand-accent/15 blur-sm" />
        </div>
      </div>
    </Section>
  )
}

export default AboutTeaser
