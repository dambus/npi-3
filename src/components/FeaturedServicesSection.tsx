import {
  CalendarDaysIcon,
  ChartBarSquareIcon,
  ClipboardDocumentCheckIcon,
  CubeTransparentIcon,
  LightBulbIcon,
  PresentationChartLineIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import serviceComplianceImage from '../assets/services/service-compliance.jpg'
import serviceConceptImage from '../assets/services/service-concept.jpg'
import timelineDeliveryImage from '../assets/services/timeline-delivery.jpg'
import Button from './Button'
import Section from './Section'
import ServiceCard from './ServiceCard'

const featuredServices = [
  {
    badge: 'Design leadership',
    title: 'Concept & detail design',
    description:
      'Process simulations, coordination workshops and build-ready documentation aligned to permitting deadlines.',
    icon: <CubeTransparentIcon className="h-6 w-6" aria-hidden="true" />,
    image: serviceConceptImage,
    accent: 'from-brand-secondary/25 via-transparent to-brand-secondary/10',
    href: '/services',
  },
  {
    badge: 'Delivery control',
    title: 'Project management & supervision',
    description:
      'Scheduling, field supervision and vendor alignment that keep progress measured and compliant.',
    icon: <PresentationChartLineIcon className="h-6 w-6" aria-hidden="true" />,
    image: timelineDeliveryImage,
    accent: 'from-brand-accent/25 via-transparent to-brand-primary/15',
    href: '/services',
  },
  {
    badge: 'Risk insight',
    title: 'Studies & analysis',
    description:
      'Risk, integrity and remediation assessments that quantify impacts before investment decisions.',
    icon: <ClipboardDocumentCheckIcon className="h-6 w-6" aria-hidden="true" />,
    image: serviceComplianceImage,
    accent: 'from-brand-primary/25 via-transparent to-brand-accent/15',
    href: '/services',
  },
]

const detailedServices = [
  {
    title: 'Project management',
    description: 'Progress baselines, procurement tracking and focused governance cadences.',
    icon: <PresentationChartLineIcon className="h-8 w-8 text-brand-secondary" aria-hidden="true" />,
    hue: 'from-brand-secondary/10 to-white',
    href: '/services',
    ctaLabel: 'View approach',
  },
  {
    title: 'Studies & analysis',
    description: 'Due diligence, risk quantification and integrity audits for confident decisions.',
    icon: <ChartBarSquareIcon className="h-8 w-8 text-brand-accent" aria-hidden="true" />,
    hue: 'from-brand-accent/15 to-white',
    href: '/services',
    ctaLabel: 'See scope',
  },
  {
    title: 'Conceptual design',
    description: 'Technology selection, simulations and layouts mapped to CAPEX targets.',
    icon: <LightBulbIcon className="h-8 w-8 text-brand-primary" aria-hidden="true" />,
    hue: 'from-brand-primary/12 to-white',
    href: '/services',
    ctaLabel: 'Explore options',
  },
  {
    title: 'Detail design',
    description: 'Issued-for-construction drawings, equipment specs and vendor coordination.',
    icon: <WrenchScrewdriverIcon className="h-8 w-8 text-brand-secondary" aria-hidden="true" />,
    hue: 'from-brand-secondary/10 to-white',
    href: '/services',
    ctaLabel: 'Review deliverables',
  },
  {
    title: 'Supervision & commissioning',
    description: 'Licensed supervision, punch list control and commissioning protocols.',
    icon: <RocketLaunchIcon className="h-8 w-8 text-brand-accent" aria-hidden="true" />,
    hue: 'from-brand-accent/12 to-white',
    href: '/services',
    ctaLabel: 'Plan handover',
  },
  {
    title: 'Consulting & compliance',
    description: 'Regulatory advisory, ISO integration and training for operational readiness.',
    icon: <ShieldCheckIcon className="h-8 w-8 text-brand-primary" aria-hidden="true" />,
    hue: 'from-brand-primary/15 to-white',
    href: '/services',
    ctaLabel: 'Talk to a lead',
  },
]

const engagementTimeline = [
  {
    label: 'Week 1',
    title: 'Mobilise the pod',
    description: 'Kickoff, site walkdown and tool alignment completed with client peers.',
    icon: <CalendarDaysIcon className="h-6 w-6" aria-hidden="true" />,
  },
  {
    label: 'Week 3',
    title: 'Discipline sync loops',
    description: 'Parallel design sprints with visible risk actions and decision logs.',
    icon: <PresentationChartLineIcon className="h-6 w-6" aria-hidden="true" />,
  },
  {
    label: 'Week 6',
    title: 'Permit-ready handover',
    description: 'Traceable packages and commissioning priorities aligned for next phase.',
    icon: <ClipboardDocumentCheckIcon className="h-6 w-6" aria-hidden="true" />,
  },
]

export function FeaturedServicesSection() {
  return (
    <Section
      id="services"
      variant="default"
      align="left"
      className="relative overflow-hidden mt-10"
      contentClassName="gap-24"
      headerClassName="hidden"
    >
      <span className="pointer-events-none absolute -right-48 top-16 -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(16,76,186,0.12),_transparent_70%)] blur-2xl" />
      <span className="pointer-events-none absolute -left-32 bottom-10 -z-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,_rgba(0,158,65,0.14),_transparent_70%)] blur-2xl" />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,0.4fr)] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-accent">
            Services for complex assets
          </p>
          <h2 className="font-display text-4xl font-semibold leading-tight text-balance md:text-[3.25rem]">
            Preparing your engineering projects for confident decisions and flawless execution.
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-brand-neutral md:text-xl">
          We pair design specialists, project controllers and compliance leads in one delivery stream so regulated
          investments stay coordinated from first sketches to commissioning sign-off.
        </p>
      </div>

      <div className="space-y-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <article
              key={service.title}
              className="group flex h-full flex-col overflow-hidden rounded-[2.25rem] border border-brand-primary/6 bg-white shadow-[0_34px_90px_rgba(8,20,51,0.14)] transition duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_40px_120px_rgba(8,20,51,0.2)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-105"
                />
                <span
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${service.accent}`}
                />
                <span className="pointer-events-none absolute right-6 top-6 inline-flex h-12 w-12 items-center justify-center rounded-[--radius-pill] bg-white/95 text-brand-primary shadow-sm ring-1 ring-brand-primary/10">
                  {service.icon}
                </span>
              </div>
              <div className="flex h-full flex-col gap-5 p-7">
                <span className="inline-flex w-fit rounded-[--radius-pill] bg-brand-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-primary">
                  {service.badge}
                </span>
                <h3 className="font-display text-2xl font-semibold leading-snug text-brand-primary">
                  {service.title}
                </h3>
                <p className="text-base leading-relaxed text-brand-neutral">{service.description}</p>
                <Button
                  as="router-link"
                  to={service.href}
                  variant="link"
                  className="mt-auto text-sm font-semibold uppercase tracking-[0.26em] text-brand-secondary hover:text-brand-secondary/80"
                >
                  Discover service
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="space-y-20">
          <div className=" border border-white/10 bg-gradient-to-b md:bg-gradient-to-r 
          from-brand-primary/95 via-brand-secondary/90 to-brand-accent/100
          md:from-brand-primary/95 md:via-brand-secondary/90 md:to-brand-accent/90 

          p-10 text-white shadow-[0_40px_100px_rgba(8,20,51,0.3)]">
            <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-md space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
                  Engagement roadmap
                </p>
                <h3 className="font-display text-3xl font-semibold leading-tight">
                  A clear path from kickoff to permit-ready packages.
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  Map, iterate, release. Our pod stays in sync through shared dashboards and decision trails so every
                  milestone is ready for executive sign-off.
                </p>
              <Button
                as="router-link"
                to="/services"
                variant="secondary"
                className="self-start rounded-[--radius-pill] border border-white/10 bg-gradient-to-t from-white/96 via-white/92 to-white/75 px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary shadow-[0_20px_50px_rgba(4,15,40,0.25)] hover:from-white/92 hover:via-white/86 hover:to-white/70 hover:text-brand-primary mt-2"
              >
                Plan a project session
              </Button>
              </div>

              <div className="flex flex-1 flex-col gap-6">
                {engagementTimeline.map((step, index) => (
                  <div
                    key={step.title}
                    className="relative flex flex-col gap-4 border border-white/15 bg-white/6 p-6 backdrop-blur-md"
                  >
                    <span className="inline-flex w-fit items-center gap-2 rounded-[--radius-pill] bg-white/50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.36em] text-brand-primary backdrop-blur">
                      {step.label}
                    </span>
                    <div className="flex-column md:flex items-start gap-4">
                      <span className="inline-flex h-16 w-16 flex-none items-center justify-center rounded-full bg-white/18 text-white shadow-[0_10px_25px_rgba(8,20,51,0.22)]">
                        {step.icon}
                      </span>
                      <div className="space-y-1.5">
                        <h4 className="font-display text-2xl font-semibold leading-snug text-white mt-4 md:mt-2">
                          {step.title}
                        </h4>
                        <p className="text-md leading-relaxed text-white/80">{step.description}</p>
                      </div>
                    </div>
                    {index < engagementTimeline.length - 1 ? (
                      <span className="pointer-events-none absolute -bottom-8 left-8 h-8 w-px bg-white/20" />
                    ) : null}
                  </div>
                ))}
              </div>

              
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-accent">
                Detailed services
              </p>
              <h3 className="font-display text-2xl font-semibold leading-snug text-brand-primary">
                Where we plug into your project timeline
              </h3>
            </div>

            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {detailedServices.map((service) => (
                <ServiceCard
                  key={service.title}
                  {...service}
                  variant="outline"
                  iconStyle="none"
                  className={`h-full rounded-2xl border border-brand-primary/8 bg-gradient-to-br ${service.hue} p-6 shadow-[0_26px_60px_rgba(12,30,70,0.1)] hover:-translate-y-1 hover:border-brand-accent/40`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default FeaturedServicesSection
