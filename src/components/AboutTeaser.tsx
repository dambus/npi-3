import Button from './Button'
import Section from './Section'

const highlights = [
  {
    title: 'Full project lifecycle coverage',
    description:
      'Conceptual, basic and detail design with supervision and commissioning support keeps every phase aligned under one governance model.',
  },
  {
    title: 'Documented delivery frameworks',
    description:
      'Feasibility studies, permitting packages and regulatory submissions produced with ISO 9001-backed control and traceability.',
  },
  {
    title: 'Regional reach from Novi Sad',
    description:
      'Projects delivered across Serbia and neighbouring EU markets supported by multilingual teams and supplier partnerships.',
  },
]

const stats = [
  { value: '17', label: 'Years in operation' },
  { value: '80+', label: 'Major projects delivered' },
  { value: '6', label: 'Discipline leads' },
]

const disciplinePillars = [
  'Process engineering',
  'Mechanical & piping',
  'Electrical & automation',
  'Instrumentation & control',
  'Civil & structural',
  'Fire & safety',
]

export function AboutTeaser() {
  return (
    <Section
      id="about"
      variant="muted"
      className="relative overflow-hidden"
      align="left"
      title="Engineering partner focused on dependable project delivery."
      description="Neopetrol Inzenjering d.o.o. is a Novi Sad-based engineering and consulting company specialised in the oil, gas and petrochemical sectors. Since 2008 we have delivered reliable documentation and expert support across all phases - from studies and concept designs to detail documentation and site supervision."
      contentClassName="gap-16"
    >
      <span className="pointer-events-none absolute inset-x-0 -top-32 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(18,36,76,0.12),_transparent_70%)]" />
      <span className="pointer-events-none absolute -bottom-32 right-10 -z-10 h-[320px] w-[320px] rounded-full bg-brand-secondary/15 blur-3xl" />

      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <div className="space-y-12">
          <div className="grid gap-6 md:grid-cols-2">
            {highlights.map((item, index) => (
              <article
                key={item.title}
                className="relative flex flex-col gap-4 rounded-[1.75rem] border border-brand-primary/10 bg-white/95 p-8 shadow-[0_35px_80px_rgba(8,18,40,0.12)]"
              >
                <span className="pointer-events-none absolute -left-3 top-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/15 font-display text-xl font-semibold text-brand-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="pl-12 font-display text-xl font-semibold text-brand-primary">
                  {item.title}
                </h3>
                <p className="pl-12 text-base leading-relaxed text-brand-primary/85">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-brand-secondary/20 bg-white p-6 text-brand-primary shadow-[0_28px_65px_rgba(9,22,48,0.12)]"
              >
                <p className="font-display text-4xl font-semibold tracking-tight text-brand-secondary md:text-5xl">
                  {item.value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.24em] text-brand-neutral">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <Button
            as="router-link"
            to="/about"
            variant="primary"
            size="lg"
            className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] shadow-[0_28px_60px_rgba(0,158,65,0.28)]"
          >
            Learn more about us
          </Button>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-primary/15 bg-white/95 p-10 shadow-[0_45px_100px_rgba(7,18,42,0.16)]">
          <span className="pointer-events-none absolute left-10 top-8 inline-flex items-center gap-3 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">
            Integrated disciplines
          </span>

          <div className="mt-16 grid gap-8">
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-semibold text-brand-primary">
                Multidisciplinary pods, one accountable lead.
              </h3>
              <p className="text-sm leading-relaxed text-brand-neutral md:text-base">
                Dedicated discipline leads coordinate weekly to align design interfaces, RFIs and approval gates. Every package is released with consolidated metadata, revision trails and responsibility matrix.
              </p>
            </div>

            <div className="grid gap-3 rounded-2xl border border-brand-primary/15 bg-brand-secondary/5 p-6 text-sm text-brand-primary shadow-[0_20px_50px_rgba(12,30,60,0.12)] sm:grid-cols-2">
              {disciplinePillars.map((item) => (
                <span key={item} className="flex items-center gap-3">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-accent" />
                  <span>{item}</span>
                </span>
              ))}
            </div>

            <div className="rounded-2xl border border-brand-primary/10 bg-white/90 p-6 text-sm text-brand-primary/85 shadow-[0_22px_50px_rgba(9,20,40,0.08)]">
              <p className="font-semibold text-brand-primary">
                How teams stay aligned
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent">
                    •
                  </span>
                  <span>Weekly interface reviews synchronise discipline milestones and manage change requests.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent">
                    •
                  </span>
                  <span>Central document control with live dashboards keeps stakeholders updated on issued deliverables.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent">
                    •
                  </span>
                  <span>Rapid response pods mobilise onsite for inspections, punch-lists and commissioning readiness.</span>
                </li>
              </ul>
            </div>
          </div>

          <span className="pointer-events-none absolute -right-20 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full border border-brand-accent/20" />
          <span className="pointer-events-none absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-brand-accent/12 blur-lg" />
        </div>
      </div>
    </Section>
  )
}

export default AboutTeaser
