import ContactSection from '../components/ContactSection'
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

const deliveryFrameworks = [
  {
    title: 'Front-end loading',
    description:
      'Stakeholder interviews, site data capture and risk workshops leading to FEL packages that inform investment decisions.',
    footer: 'Toolkit drafts: requirements register, decision log.',
  },
  {
    title: 'EPCM collaboration',
    description:
      'Coordination with owner teams, OEM vendors and fabrication partners using shared schedules and document control plans.',
    footer: 'Toolkit drafts: RACI outline, interface matrix.',
  },
  {
    title: 'Turnkey upgrades',
    description:
      'Discipline design, procurement support and supervision to deliver upgrades within outage windows and regulatory checkpoints.',
    footer: 'Toolkit drafts: shutdown playbook, QA sign-off path.',
  },
]

const documentationHighlights = [
  {
    title: 'Process & mechanical',
    bullets: [
      'PFDs, P&IDs, hydraulic calculations and equipment datasheets prepared for permitting reviews.',
      'Issued-for-construction packages with revision control and redline tracking.',
    ],
  },
  {
    title: 'Electrical & automation',
    bullets: [
      'Load lists, cable schedules and single line diagrams aligned with site standards.',
      'Control narratives, loop diagrams and FAT/SAT protocols ready for commissioning.',
    ],
  },
  {
    title: 'Civil & structural',
    bullets: [
      'Foundation drawings, reinforcement schedules and anchoring details verified with site surveys.',
      'As-built updates captured with photo logs and geodetic coordinates.',
    ],
  },
]

const readinessChecklist = [
  {
    label: 'Clarify scope assumptions',
    detail: 'Identify boundary conditions, existing documentation and third-party responsibilities.',
  },
  {
    label: 'Map approval pathways',
    detail: 'Outline regulatory checkpoints, inspection milestones and required dossiers.',
  },
  {
    label: 'Align on collaboration tools',
    detail: 'Select model coordination platforms, CDE structure and reporting cadence.',
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
        id="services-core"
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

      <Section
        id="services-delivery"
        variant="muted"
        align="left"
        title="Delivery frameworks we align to."
        description="Use these cards to plan how we plug into your governance model. Toolkits and templates are being finalised for each option."
        contentClassName="gap-12"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {deliveryFrameworks.map((framework) => (
            <ServiceCard
              key={framework.title}
              title={framework.title}
              description={framework.description}
              variant="ghost"
              className="h-full rounded-2xl border border-brand-primary/10 bg-white/95 p-8 shadow-[0_26px_60px_rgba(8,20,51,0.08)]"
              footer={
                <p className="text-xs uppercase tracking-[0.18em] text-brand-neutral">{framework.footer}</p>
              }
              iconStyle="none"
            />
          ))}
        </div>
      </Section>

      <Section
        id="services-documentation"
        align="left"
        title="Documentation packages in progress."
        description="Below shows the structure we use to keep engineering deliverables audit-ready. We will replace these notes with live samples and downloads."
        contentClassName="gap-10"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {documentationHighlights.map((item) => (
            <div
              key={item.title}
              className="flex h-full flex-col gap-4 rounded-3xl border border-brand-primary/10 bg-white/85 p-6 shadow-[0_24px_60px_rgba(8,20,51,0.1)]"
            >
              <h3 className="font-display text-xl font-semibold text-brand-primary">{item.title}</h3>
              <ul className="space-y-3 text-sm leading-relaxed text-brand-neutral">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="services-workshop"
        variant="brand"
        align="left"
        title="How to prepare for a services workshop."
        description="While detailed scoping guides are under development, this checklist helps teams gather the essentials before our kickoff."
        contentClassName="gap-10"
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] md:items-center">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_30px_70px_rgba(3,10,28,0.35)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Workshop objective</p>
            <p className="mt-3 text-lg font-semibold text-white">
              Align scope, risks and documentation milestones for your next project stage.
            </p>
          </div>
          <ul className="grid gap-4 text-sm leading-relaxed text-white/80">
            {readinessChecklist.map((item) => (
              <li
                key={item.label}
                className="rounded-2xl border border-white/12 bg-white/8 p-5 shadow-[0_24px_55px_rgba(3,10,28,0.28)] backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{item.label}</p>
                <p className="mt-2 text-sm text-white/85">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        id="services-next-steps"
        align="left"
        title="Next steps"
        description="Detailed scope sheets, resource plans and pricing models are in production. Let us know which information to prioritise."
      >
        <div className="max-w-2xl space-y-3 text-brand-neutral">
          <p>
            We can provide draft statements of work, project charters and QA checklists on request. Share your desired
            start date and any existing documentation so we can tailor the packet.
          </p>
          <p>
            If you are ready to proceed, complete the form below with project context and we will schedule a workshop
            with the relevant discipline leads.
          </p>
        </div>
      </Section>

      <ContactSection id="services-contact" />
    </>
  )
}

export default ServicesPage
