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
      variant="default"
      align="left"
      eyebrow="Core capabilities"
      title="Integrated engineering services from concept to commissioning."
      description="Every engagement is tailored to the client’s operational context, standards and investment plan. Explore the core areas where we provide end-to-end support."
      contentClassName="gap-12"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuredServices.map((service, index) => (
          <ServiceCard
            key={service.title}
            {...service}
            variant={index === 0 ? 'filled' : 'outline'}
            ctaLabel="Discover more"
          />
        ))}
      </div>
    </Section>
  )
}

export default FeaturedServicesSection
