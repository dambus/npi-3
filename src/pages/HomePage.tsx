import AboutTeaser from '../components/AboutTeaser'
import ContactSection from '../components/ContactSection'
import FeaturedServicesSection from '../components/FeaturedServicesSection'
import FooterCTA from '../components/FooterCTA'
import HeroLanding from '../components/HeroLanding'
import LogoWall from '../components/LogoWall'
import ProjectsTeaserSection from '../components/ProjectsTeaserSection'
import Section from '../components/Section'
import ServiceCard from '../components/ServiceCard'
import ValueIconsSection from '../components/ValueIconsSection'

const services = [
  {
    title: 'Project management',
    description:
      'Integrated scheduling, procurement support, interface management and reporting to keep engineering deliverables aligned with CAPEX and compliance targets.',
    ctaLabel: 'See methodology',
    href: '/services',
    variant: 'filled' as const,
  },
  {
    title: 'Studies & analysis',
    description:
      'Feasibility, due diligence, risk and integrity assessments that inform investment decisions and modernisation roadmaps.',
    href: '/services',
    ctaLabel: 'Review scope',
  },
  {
    title: 'Conceptual design',
    description:
      'Concept selection, process simulations and layout strategies that establish technical direction, budgetary accuracy and permitting readiness.',
    href: '/services',
    ctaLabel: 'View deliverables',
  },
  {
    title: 'Detail design',
    description:
      'Discipline documentation, workshop drawings, equipment specifications and vendor coordination for construction and installation.',
    href: '/services',
    ctaLabel: 'Explore documentation',
  },
  {
    title: 'Supervision & commissioning',
    description:
      'Licensed supervision, site instructions and commissioning protocols to ensure quality, safety and compliance during execution.',
    href: '/services',
    ctaLabel: 'Plan supervision',
  },
  {
    title: 'Consulting & compliance',
    description:
      'Regulatory advisory, licensing, ISO integration and training programmes that secure approvals and operational readiness.',
    href: '/services',
    ctaLabel: 'Talk to an expert',
  },
]

export function HomePage() {
  return (
    <>
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
      <ContactSection id="contact" />
      <FooterCTA />
    </>
  )
}

export default HomePage
