import { CheckCircleIcon } from '@heroicons/react/24/solid'
import {
  BuildingOffice2Icon,
  LightBulbIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import Section from './Section'

const kpiHighlights = [
  { value: '520+', label: 'Engineering deliverables issued' },
  { value: '40+', label: 'Licensed engineers & consultants' },
  { value: '12', label: 'Industry sectors supported' },
  { value: '9001', label: 'ISO Certified quality system' },
]

const tabItems = [
  {
    id: 'delivery',
    label: 'Integrated delivery',
    icon: Squares2X2Icon,
    eyebrow: 'Cross-discipline pods',
    heading: 'Coordinated engineering teams across every discipline.',
    description:
      'Process, mechanical, electrical, instrumentation and civil engineers work inside one governance model to keep interfaces aligned from feasibility through commissioning.',
    highlights: [
      'Shared document control and change logs reduce rework across packages.',
      'Discipline leads align milestones during weekly design coordination.',
      'Digital handover packs keep stakeholders synchronized on revisions.',
    ],
    image: '/media/hero-team.jpg',
  },
  {
    id: 'quality',
    label: 'Quality & compliance',
    icon: ShieldCheckIcon,
    eyebrow: 'ISO-certified governance',
    heading: 'Documented quality management trusted by auditors.',
    description:
      'Our ISO 9001 certified QMS handles document numbering, approvals and traceability so project owners can demonstrate compliance at every stage.',
    highlights: [
      'Formalized review & approval workflow for every engineering deliverable.',
      'Audit-ready archives with version history and metadata tagging.',
      'Risk & mitigation logs surfaced during design reviews for early action.',
    ],
    image: '/media/projects/process-upgrade.png',
  },
  {
    id: 'expertise',
    label: 'Licensed expertise',
    icon: BuildingOffice2Icon,
    eyebrow: 'Accountable leadership',
    heading: 'Licensed engineers guiding regulatory commitments.',
    description:
      'Certified experts sign off critical documentation, ensuring Serbian and EU regulatory requirements are met without delays.',
    highlights: [
      'Lead designers licensed across process, mechanical and electrical domains.',
      'Permit documentation packaged with supporting calculations and specs.',
      'On-site supervision teams coordinate inspectors and client reps.',
    ],
    image: '/media/projects/modular-station.png',
  },
  {
    id: 'innovation',
    label: 'Applied innovation',
    icon: LightBulbIcon,
    eyebrow: 'Continuous improvement',
    heading: 'Modern tooling accelerates decision-ready data.',
    description:
      'We combine 3D modelling, clash detection and data-rich reporting so investors, operators and regulators act on validated information.',
    highlights: [
      'Interdisciplinary model reviews surface clashes before fabrication.',
      'Real-time dashboards track progress against critical path milestones.',
      'Lifecycle asset data prepared for digital twin and CMMS onboarding.',
    ],
    image: '/media/projects/storage-facility.png',
  },
]

const imageMaskClass =
  // 'rounded-[62%_38%_58%_42%/46%_68%_38%_54%]'
  'rounded-[55%_52%_48%_50%/50%_50%_45%_45%]'


export function ValueIconsSection() {
  const [selectedTab, setSelectedTab] = useState(tabItems[0].id)
  const [displayedTab, setDisplayedTab] = useState(tabItems[0].id)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!isTransitioning) {
      return
    }

    const timeout = window.setTimeout(() => {
      setDisplayedTab(selectedTab)
      setIsTransitioning(false)
    }, 420)

    return () => window.clearTimeout(timeout)
  }, [isTransitioning, selectedTab])

  const activeTab = tabItems.find((tab) => tab.id === displayedTab) ?? tabItems[0]

  return (
    <Section
      variant="default"
      align="center"
      className="relative pb-24"
      contentClassName="gap-16 lg:gap-24"
    >
      <div className="flex flex-col items-center gap-16 lg:gap-20">
        <div className="relative isolate mt-[-240px] w-full max-w-5xl overflow-hidden rounded-[2.75rem] shadow-[0_30px_70px_rgba(8,24,55,0.25)]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(to_bottom,#0f1f4a_0%,#0f1f4a_52%,#ffffff_52%,#ffffff_100%)]"
          />
          <div className="relative rounded-[inherit] bg-white px-8 py-12 text-center text-brand-primary sm:px-10 sm:py-14">
            <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {kpiHighlights.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                  <p className="font-display text-2xl font-bold leading-tight text-brand-secondary md:text-6xl">
                    {item.value}
                  </p>
                  <p className="font-display text-base font-medium text-brand-primary/80 md:text-lg">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex max-w-3xl flex-col items-center gap-6 pt-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            Why partner with NPI
          </p>
          <h2 className="font-display text-4xl font-semibold leading-tight text-brand-primary md:text-[3.1rem]">
            Multidisciplinary teams anchored in certified processes.
          </h2>
          <p className="text-lg leading-relaxed text-brand-neutral md:text-xl">
            Clients rely on us for end-to-end documentation and on-site expertise that aligns technical, regulatory and commercial priorities.
          </p>
        </div>

        <div className="flex w-full flex-col gap-12">
          <div className="relative">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-brand-neutral/20" />
            <div
              className="grid gap-2 pb-4 sm:grid-cols-2 sm:gap-3 sm:[&>*]:w-full lg:flex lg:flex-wrap lg:justify-center lg:gap-4 lg:[&>*]:w-auto"
              role="tablist"
              aria-label="NPI value focus areas"
            >
              {tabItems.map((tab) => {
                const Icon = tab.icon
                const isSelected = tab.id === selectedTab
                return (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => {
                      if (tab.id === displayedTab || isTransitioning) return
                      setSelectedTab(tab.id)
                      setIsTransitioning(true)
                    }}
                    className="group relative flex w-full cursor-pointer items-center justify-between rounded-xl border border-brand-neutral/25 bg-white/90 px-4 py-3 text-sm font-medium text-brand-primary transition-all duration-200 hover:border-brand-accent/40 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/40 sm:px-5 sm:text-base lg:min-w-[180px] lg:w-auto"
                    aria-selected={isSelected}
                    role="tab"
                    tabIndex={isSelected ? 0 : -1}
                    id={`${tab.id}-tab`}
                    aria-controls={`${tab.id}-panel`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-brand-accent transition-colors group-hover:text-brand-secondary" aria-hidden="true" />
                      <span className="font-semibold">{tab.label}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`inline-flex h-1 w-8 rounded-full transition-all duration-300 ${
                        isSelected ? 'bg-brand-accent opacity-100' : 'bg-brand-accent/15 opacity-60'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          <div
            role="tabpanel"
            id={`${activeTab.id}-panel`}
            aria-labelledby={`${activeTab.id}-tab`}
            className={`grid items-center gap-14 transition-[opacity,transform] duration-[420ms] md:gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] ${
              isTransitioning ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
            style={{ minHeight: '460px' }}
          >
            <div className="relative mx-auto w-full max-w-[480px]">
              <div
                className={`absolute left-3 top-4 h-[100%] w-[95%] bg-brand-secondary/60 ${imageMaskClass} animate-orbit-one`}
              />
              <div
                className={`absolute right-2 bottom-4 h-[88%] w-[88%] bg-brand-accent/60 ${imageMaskClass} animate-orbit-two z-10`}
              />

              <div
                className={`relative overflow-hidden shadow-[0_25px_60px_rgba(8,24,55,0.28)] ${imageMaskClass} rotate-[-20deg] z-20`}
              >
                <img
                  src={activeTab.image}
                  alt={activeTab.heading}
                  className={`h-full w-[95%] object-center scale-135 object-cover rotate-[20deg] z-30 ${imageMaskClass}`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 text-left">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
                  {activeTab.eyebrow}
                </p>
                <h3 className="font-display text-3xl font-semibold leading-tight text-brand-primary md:text-[2.75rem]">
                  {activeTab.heading}
                </h3>
                <p className="text-base leading-relaxed text-brand-neutral md:text-lg">
                  {activeTab.description}
                </p>
              </div>

              <ul className="grid gap-3 text-brand-primary/90 sm:grid-cols-2 sm:gap-x-6">
                {activeTab.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm leading-relaxed md:text-base">
                    <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent">
                      <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default ValueIconsSection
