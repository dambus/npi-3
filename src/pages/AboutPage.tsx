import ContactSection from '../components/ContactSection'
import HeroPrimary from '../components/HeroPrimary'
import Section from '../components/Section'
import ServiceCard from '../components/ServiceCard'

const storyHighlights = [
  {
    title: 'Local roots, regional reach',
    description:
      'Founded beside the Petrohemija complex, we built credibility project by project before expanding to cross-border engagements in gas storage and petrochemical upgrades.',
  },
  {
    title: 'Licensed senior specialists',
    description:
      'Process, electrical, mechanical and automation leads hold Serbian and EU-recognised licenses, supported by document control and project coordination staff.',
  },
  {
    title: 'Quality embedded from day one',
    description:
      'Our ISO 9001 framework covers design control, vendor coordination and handover packages, making audits and permitting smoother for client teams.',
  },
]

const missionTiles = [
  {
    title: 'Mission',
    description:
      'Deliver dependable engineering documentation and supervision that keeps industrial assets compliant, efficient and safe.',
    footer: 'In progress: detailed KPIs & service charters.',
  },
  {
    title: 'Vision',
    description:
      'Become the trusted engineering partner for regulated energy and process operators across the SEE region.',
    footer: 'In progress: regional expansion roadmap.',
  },
  {
    title: 'Values',
    description:
      'Integrity in documentation, transparency in coordination, mentorship for young engineers, and accountability to site crews.',
    footer: 'In progress: culture handbook & team stories.',
  },
]

const milestones = [
  {
    year: '2008',
    headline: 'Studio founded in Novi Sad',
    summary:
      'Initial mandate focused on piping documentation and workshop drawings for Petrohemija revamp programmes.',
  },
  {
    year: '2012',
    headline: 'Licensed supervision capability',
    summary:
      'Expanded into site supervision, commissioning protocols and as-built documentation for gas storage facilities.',
  },
  {
    year: '2019',
    headline: 'Digital coordination tooling',
    summary:
      'Introduced BIM coordination, cloud-based model review and integrated decision logs across disciplines.',
  },
  {
    year: '2024',
    headline: 'Regional partnership network',
    summary:
      'Structured partnerships with QA labs, fabrication houses and OEM vendors to support cross-border delivery.',
  },
]

const leadershipPlaceholders = [
  {
    name: 'Leadership profile #1',
    role: 'Managing Director',
    focus: 'Process integration, project governance, client onboarding.',
  },
  {
    name: 'Leadership profile #2',
    role: 'Technical Director',
    focus: 'Discipline QA, design standards, vendor coordination.',
  },
  {
    name: 'Leadership profile #3',
    role: 'Supervision Lead',
    focus: 'Site mobilisation, commissioning protocols, HSE alignment.',
  },
]

export function AboutPage() {
  return (
    <>
      <HeroPrimary
        eyebrow="About Neopetrol Inženjering"
        title="Committed to excellence in industrial design and engineering."
        description="Founded in 2008, our team of licensed engineers delivers dependable documentation and consulting across oil, gas, petrochemical and energy sectors."
        stats={[
          { label: 'Years in operation', value: '17' },
          { label: 'Disciplines covered', value: '6' },
          { label: 'Projects delivered', value: '80+' },
        ]}
      />
      <Section
        align="left"
        title="Our story and operating model."
        description="These notes act as a starting point while we shape the full About experience. They mirror the tone and spacing established on the homepage so you can evaluate flow and content priorities."
        contentClassName="gap-16"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:items-start">
          <div className="space-y-6 text-brand-neutral">
            <h3 className="font-display text-2xl font-semibold text-brand-primary">
              Why partners rely on NPI
            </h3>
            <p className="text-base leading-relaxed">
              We grew out of operational needs: documentation that withstands audits, coordination that respects site
              realities, and supervision that keeps crews safe. Today the same discipline leads still mentor our newer
              engineers, ensuring knowledge transfer and consistent output across every engagement.
            </p>
            <p className="text-base leading-relaxed">
              This page will expand with more detailed narratives, but for now it captures the pillars we align to when
              stepping into complex industrial programmes.
            </p>
            <div className="rounded-[2rem] border border-brand-primary/10 bg-white/70 p-6 shadow-[0_28px_70px_rgba(8,20,51,0.12)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-accent">
                What to expect next
              </p>
              <ul className="mt-4 space-y-2 text-sm text-brand-primary">
                <li>• Leadership bios with credentials and project highlights.</li>
                <li>• Organisational chart and discipline pods.</li>
                <li>• Documentation workflow from concept to handover.</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4">
            {storyHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-brand-primary/10 bg-white/85 p-6 shadow-[0_25px_60px_rgba(8,20,51,0.1)]"
              >
                <h4 className="font-display text-xl font-semibold text-brand-primary">{item.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-brand-neutral">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        variant="muted"
        align="left"
        title="Mission, vision and values."
        description="Structured as cards for now — swap in richer content blocks, imagery or video when available."
        contentClassName="gap-12"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {missionTiles.map((tile) => (
            <ServiceCard
              key={tile.title}
              title={tile.title}
              description={tile.description}
              variant="ghost"
              className="h-full rounded-2xl border border-brand-primary/10 bg-white/90 p-8 shadow-[0_26px_60px_rgba(8,20,51,0.08)]"
              footer={<p className="text-xs uppercase tracking-[0.2em] text-brand-neutral">{tile.footer}</p>}
              iconStyle="none"
            />
          ))}
        </div>
      </Section>

      <Section
        align="left"
        title="Milestones on the roadmap."
        description="Use this horizontal timeline as a placeholder until the detailed chronology and photography are ready."
        contentClassName="gap-12"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {milestones.map((milestone) => (
            <div
              key={milestone.year}
              className="flex flex-col gap-3 rounded-2xl border border-brand-primary/10 bg-gradient-to-br from-white via-white/95 to-brand-secondary/5 p-6 shadow-[0_22px_55px_rgba(8,20,51,0.08)]"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent">
                {milestone.year}
              </span>
              <h4 className="font-display text-xl font-semibold text-brand-primary">{milestone.headline}</h4>
              <p className="text-sm leading-relaxed text-brand-neutral">{milestone.summary}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        variant="brand"
        align="left"
        title="Leadership snapshots coming soon."
        description="Use these placeholders to plan the layout for executive bios, photography and credentials."
        contentClassName="gap-12"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {leadershipPlaceholders.map((leader) => (
            <div
              key={leader.name}
              className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/8 p-6 text-white shadow-[0_30px_70px_rgba(3,10,28,0.4)] backdrop-blur"
            >
              <div className="h-32 rounded-2xl bg-white/10" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                  {leader.role}
                </p>
                <h4 className="mt-2 font-display text-2xl font-semibold text-white">{leader.name}</h4>
              </div>
              <p className="text-sm leading-relaxed text-white/80">{leader.focus}</p>
              <p className="mt-auto text-xs uppercase tracking-[0.24em] text-white/50">
                Portrait & credentials to follow
              </p>
            </div>
          ))}
        </div>
      </Section>

      <ContactSection />

      <Section
        align="left"
        title="Next steps"
        description="Detailed team bios, licenses and project methodology are in progress. Let us know which information is most useful so we can prioritise it."
      >
        <div className="max-w-2xl space-y-3 text-brand-neutral">
          <p>
            We are consolidating reference documentation, leadership bios and governance structure into this page.
            If you need a specific document, reach out via the contact form and we will share the latest revision.
          </p>
          <p>
            This page will expand with mission, vision, QHSE approach, and organisational chart aligned to the sitemap.
          </p>
        </div>
      </Section>
    </>
  )
}

export default AboutPage
