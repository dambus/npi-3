import {
  CheckBadgeIcon,
  BuildingOffice2Icon,
  ClipboardDocumentListIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import Section from './Section'

const valueItems = [
  {
    title: '15+ years of practice',
    description: 'Established in 2008 with sustained delivery across oil, gas and energy programs in the Balkans and EU.',
    icon: BuildingOffice2Icon,
  },
  {
    title: 'Integrated disciplines',
    description: 'Process, mechanical, electrical, instrumentation and civil teams working under the same project governance.',
    icon: ClipboardDocumentListIcon,
  },
  {
    title: 'ISO-certified quality',
    description: 'ISO 9001 quality management system with document control, change tracking and audit-ready records.',
    icon: CheckBadgeIcon,
  },
  {
    title: 'Licensed experts',
    description: 'Licensed engineers and consultants providing accountable signatures and compliance with Serbian regulations.',
    icon: UsersIcon,
  },
]

const kpiHighlights = [
  { value: '520+', label: 'Engineering deliverables issued' },
  { value: '40+', label: 'Licensed engineers & consultants' },
  { value: '12', label: 'Industry sectors supported' },
  { value: 'ISO 9001', label: 'Certified quality system' },
]

export function ValueIconsSection() {
  return (
    <Section
      variant="inverse"
      align="left"
      eyebrow="Why partner with NPI"
      title="Multidisciplinary teams anchored in certified processes."
      description="Clients rely on us for end-to-end documentation and on-site expertise that aligns technical, regulatory and commercial priorities."
      className="relative overflow-hidden"
      contentClassName="gap-16"
    >
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,158,65,0.35),_transparent_60%)] opacity-80" />
      <span className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(circle_at_center,_rgba(17,78,216,0.4),_transparent_65%)] opacity-70" />

      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] lg:gap-16">
        <div className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {kpiHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/20 bg-white/5 p-6 shadow-[0_24px_60px_rgba(3,10,28,0.4)] backdrop-blur"
              >
                <p className="font-display text-3xl font-semibold text-white md:text-4xl">
                  {item.value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/60">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <p className="max-w-xl text-base text-white/75 md:text-lg">
            Structured delivery frameworks, shared document control and multi-discipline collaboration pods ensure we can scale from feasibility studies to commissioning support without sacrificing accountability.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {valueItems.map((item) => {
            const Icon = item.icon
            return (
              <article
                key={item.title}
                className="flex h-full flex-col gap-4 rounded-2xl border border-white/15 bg-white/6 p-6 text-left shadow-[0_24px_55px_rgba(3,10,28,0.55)] backdrop-blur transition duration-200 ease-out hover:-translate-y-1 hover:border-white/30"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-display text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  {item.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export default ValueIconsSection
