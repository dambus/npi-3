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

export function ValueIconsSection() {
  return (
    <Section
      variant="muted"
      align="center"
      eyebrow="Why partner with NPI"
      title="Multidisciplinary teams anchored in certified processes."
      description="Clients rely on us for end-to-end documentation and on-site expertise that aligns technical, regulatory and commercial priorities."
      contentClassName="gap-12"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {valueItems.map((item) => {
          const Icon = item.icon
          return (
            <article
              key={item.title}
              className="flex h-full flex-col gap-4 rounded-xl border border-brand-primary/10 bg-white p-6 text-left shadow-[0_18px_45px_rgba(9,20,55,0.08)]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl font-semibold text-brand-primary">
                {item.title}
              </h3>
              <p className="text-sm text-brand-neutral">{item.description}</p>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

export default ValueIconsSection
