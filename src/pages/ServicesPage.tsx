import HeroPrimary from '../components/HeroPrimary'
import Section from '../components/Section'
import ServiceCard from '../components/ServiceCard'

const services = [
  {
    title: 'Project management',
    description:
      'Integrated planning, interface management and stakeholder reporting that keeps programmes aligned with CAPEX, safety and compliance goals.',
  },
  {
    title: 'Studies & analysis',
    description:
      'Feasibility, due diligence, risk and integrity assessments that inform investment decisions and modernisation roadmaps.',
  },
  {
    title: 'Conceptual design',
    description:
      'Process simulations, layout strategies and cost envelopes that establish the technical direction and permitting strategy.',
  },
  {
    title: 'Detail design',
    description:
      'Discipline documentation, vendor coordination and workshop drawings ready for construction and installation.',
  },
  {
    title: 'Supervision & commissioning',
    description:
      'Licensed supervision, site instructions and commissioning protocols that ensure compliant handover.',
  },
  {
    title: 'Consulting & compliance',
    description:
      'Regulatory advisory, licensing support, ISO integration and training programmes for operational readiness.',
  },
]

export function ServicesPage() {
  return (
    <>
      <HeroPrimary
        eyebrow="Services"
        title="Integrated engineering support from concept to commissioning."
        description="We align with your delivery frameworks and document control systems, supplying accountable engineering packages at every stage."
      />

      <Section
        align="left"
        title="Core service lines"
        description="Select a capability to discuss scope, team composition and recent references. Detailed case studies will be published shortly."
        contentClassName="gap-12"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              variant="outline"
              footer={<span className="text-xs uppercase tracking-[0.18em] text-brand-neutral">More detail coming soon</span>}
            />
          ))}
        </div>
      </Section>
    </>
  )
}

export default ServicesPage
