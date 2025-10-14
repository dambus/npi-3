import Button from './components/Button'
import FeaturedServicesSection from './components/FeaturedServicesSection'
import FooterCTA from './components/FooterCTA'
import FormField from './components/FormField'
import HeroLanding from './components/HeroLanding'
import LogoWall from './components/LogoWall'
import ProjectsTeaserSection from './components/ProjectsTeaserSection'
import Section from './components/Section'
import ServiceCard from './components/ServiceCard'
import SiteHeader from './components/SiteHeader'
import ValueIconsSection from './components/ValueIconsSection'
import AboutTeaser from './components/AboutTeaser'

const services = [
  {
    title: 'Project management',
    description:
      'Integrated scheduling, procurement support, interface management and reporting to keep engineering deliverables aligned with CAPEX and compliance targets.',
    ctaLabel: 'See methodology',
    href: '/services#project-management',
    variant: 'filled' as const,
  },
  {
    title: 'Studies & analysis',
    description:
      'Feasibility, due diligence, risk and integrity assessments that inform investment decisions and modernisation roadmaps.',
    href: '/services#studies',
    ctaLabel: 'Review scope',
  },
  {
    title: 'Conceptual design',
    description:
      'Concept selection, process simulations and layout strategies that establish technical direction, budgetary accuracy and permitting readiness.',
    href: '/services#conceptual',
    ctaLabel: 'View deliverables',
  },
  {
    title: 'Detail design',
    description:
      'Discipline documentation, workshop drawings, equipment specifications and vendor coordination for construction and installation.',
    href: '/services#detail',
    ctaLabel: 'Explore documentation',
  },
  {
    title: 'Supervision & commissioning',
    description:
      'Licensed supervision, site instructions and commissioning protocols to ensure quality, safety and compliance during execution.',
    href: '/services#supervision',
    ctaLabel: 'Plan supervision',
  },
  {
    title: 'Consulting & compliance',
    description:
      'Regulatory advisory, licensing, ISO integration and training programmes that secure approvals and operational readiness.',
    href: '/services#consulting',
    ctaLabel: 'Talk to an expert',
  },
]

const serviceFocusOptions = [
  { value: '', label: 'Select focus area' },
  { value: 'project-management', label: 'Project management' },
  { value: 'studies', label: 'Studies & analysis' },
  { value: 'conceptual-design', label: 'Conceptual design' },
  { value: 'detail-design', label: 'Detail design' },
  { value: 'supervision', label: 'Supervision & commissioning' },
  { value: 'consulting', label: 'Consulting & compliance' },
]

function App() {
  return (
    <div className="page-shell flex min-h-screen flex-col text-brand-primary">
      <SiteHeader />

      <main className="flex flex-col">
        <HeroLanding />

        <ValueIconsSection />

        <AboutTeaser />

        <FeaturedServicesSection />

        <Section
          id="services-detailed"
          variant="muted"
          align="left"
          eyebrow="Detailed service catalogue"
          title="Support across every engineering milestone."
          description="Our licensed experts provide complete documentation, coordination and supervision, backed by ISO 9001 procedures and traceable deliverables."
          contentClassName="gap-12"
        >
          <div className="rounded-[2.5rem] border border-brand-accent/15 bg-white/90 p-8 shadow-[0_35px_80px_rgba(8,18,40,0.08)] backdrop-blur">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </Section>

        <ProjectsTeaserSection />

        <LogoWall />

        <Section
          id="contact"
          align="left"
          eyebrow="Kick-off window"
          title="Share a few details and we'll align the right engineering squad."
          description="We respond within one business day. Expect a short call to clarify objectives, current systems, and success metrics before we assemble the project pod."
          contentClassName="gap-12"
        >
          <form
            className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                id="contact-name"
                label="Full name"
                placeholder="Ana Petrović"
                required
              />
              <FormField
                id="contact-email"
                label="Work email"
                type="email"
                placeholder="ana.petrovic@npi.rs"
                required
              />
              <FormField
                id="contact-phone"
                label="Phone"
                type="tel"
                placeholder="+381 64 123 456"
                hint="Include country code if outside Serbia."
              />
              <FormField
                id="contact-company"
                label="Company"
                placeholder="NPI Engineering"
              />
              <FormField
                id="contact-service"
                label="Service focus"
                type="select"
                defaultValue=""
                options={serviceFocusOptions}
              />
              <div className="md:col-span-2">
                <FormField
                  id="contact-message"
                  label="Project context"
                  type="textarea"
                  placeholder="Current systems, timelines, and the outcome you want to achieve."
                  rows={5}
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" variant="primary" size="lg">
                  Request consultation
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-[--radius-card] bg-surface-muted p-6 ring-1 ring-brand-neutral/20">
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-semibold">
                  Typical engagement timeline
                </h3>
                <p className="text-sm text-brand-neutral">
                  We assemble cross-functional pods around your domain: automation, cybersecurity, compliance, or commissioning.
                </p>
              </div>
              <ol className="space-y-3 text-sm text-brand-primary/90">
                <li className="flex gap-3">
                  <span className="font-display text-lg text-brand-secondary">1.</span>
                  <span>
                    Discovery call (30 min) to align business goals, current stack, and site constraints.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-lg text-brand-secondary">2.</span>
                  <span>
                    Ops audit + workshop (1-2 weeks) to validate scope, risks, and compliance requirements.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-lg text-brand-secondary">3.</span>
                  <span>
                    Roadmap & budget pack ready for your board or steering committee approval.
                  </span>
                </li>
              </ol>
              <div className="rounded-xl bg-white/80 p-4 text-sm text-brand-primary shadow-[var(--shadow-card)]">
                <p>
                  Need an NDA first?{' '}
                  <a
                    href="mailto:info@npi.rs"
                    className="font-semibold text-brand-secondary hover:text-brand-accent"
                  >
                    info@npi.rs
                  </a>{' '}
                  or call <span className="font-semibold">+381 11 567 890</span>.
                </p>
              </div>
            </div>
          </form>
        </Section>

        <FooterCTA />
      </main>
    </div>
  )
}

export default App
