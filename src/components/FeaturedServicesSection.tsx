import {
  ClipboardDocumentCheckIcon,
  CubeTransparentIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/24/outline'
import Section from './Section'
import ServiceCard from './ServiceCard'

const featuredServices = [
  {
    title: 'Conceptual & detail design',
    description:
      'Process simulations, equipment sizing, P&IDs, layout drawings and detailed documentation ready for permitting and construction.',
    icon: <CubeTransparentIcon className="h-6 w-6" aria-hidden="true" />,
    href: '/services#design',
  },
  {
    title: 'Project management & supervision',
    description:
      'Planning, scheduling, site coordination and licensed supervision to keep budgets, safety and compliance on track until handover.',
    icon: <PresentationChartLineIcon className="h-6 w-6" aria-hidden="true" />,
    href: '/services#project-management',
  },
  {
    title: 'Studies & analysis',
    description:
      'Feasibility, risk and integrity assessments aligned with Serbian and EU requirements, including remediation recommendations.',
    icon: <ClipboardDocumentCheckIcon className="h-6 w-6" aria-hidden="true" />,
    href: '/services#studies',
  },
]

export function FeaturedServicesSection() {
  return (
    <Section
      id="services"
      variant="brand"
      align="left"
      eyebrow="Core capabilities"
      title="Integrated engineering services from concept to commissioning."
      description="Every engagement is tailored to the client's operational context, standards and investment plan. Explore the core areas where we provide end-to-end support."
      className="relative overflow-hidden"
      contentClassName="gap-16"
    >
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_rgba(0,158,65,0.4),_transparent_65%)] opacity-80" />
      <span className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(circle_at_center,_rgba(16,76,186,0.5),_transparent_70%)]" />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.8fr)] lg:items-start">
        <div className="grid gap-6 md:grid-cols-2">
          {featuredServices.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              variant={index === 0 ? 'filled' : 'outline'}
              ctaLabel="Discover more"
              className={index === 0 ? 'h-full' : 'h-full bg-white/90'}
            />
          ))}
        </div>

        <div className="flex h-full flex-col gap-6 rounded-[2.25rem] border border-white/15 bg-white/8 p-8 text-white shadow-[0_45px_95px_rgba(3,10,28,0.45)] backdrop-blur">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              Delivery playbook
            </p>
            <h3 className="font-display text-2xl font-semibold leading-tight">
              How we embed with client teams
            </h3>
            <p className="text-base text-white/75">
              Engagement pods span project managers, process leads and discipline coordinators. We integrate with your document control and reporting cadence from day one.
            </p>
          </div>
          <ol className="space-y-4">
            {[
              'Mobilise core pod within 2 weeks with agreed governance and tooling.',
              'Run parallel discipline tracks with shared model reviews and decision logs.',
              'Deliver traceable packages ready for permitting, procurement and construction.',
            ].map((step, index) => (
              <li key={step} className="flex gap-4 rounded-2xl bg-white/6 p-4">
                <span className="font-display text-2xl font-semibold text-brand-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-white/80">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-auto rounded-2xl border border-white/15 bg-brand-accent/15 p-5 text-sm text-white/90">
            <p className="font-semibold text-white">
              Need a rapid assessment?
            </p>
            <p className="mt-2">
              Ask about our fast-track feasibility sprint for brownfield upgrades. We hand over risk, schedule and cost implications within 15 business days.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default FeaturedServicesSection
