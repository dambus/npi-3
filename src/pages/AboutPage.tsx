import ContactSection from '../components/ContactSection'
import HeroPrimary from '../components/HeroPrimary'
import Section from '../components/Section'

const growthHighlights = [
  {
    title: 'Energy and process roots',
    description:
      'Early programmes supported Naftna Industrija Srbije (NIS), the Novi Sad refinery, HIPOL in Odzaci, Zorka in Sabac, and Rafinerija Nafte Brod.',
  },
  {
    title: 'Geographic expansion',
    description:
      'Cross-border teams delivered detailed design in Kazakhstan while strengthening domestic partnerships with Srbija Gas and StandardGas.',
  },
]

const growthSnapshot = [
  { label: '2008', value: 'Studio founded in Novi Sad - 3 engineers' },
  { label: '2025', value: 'Regional delivery hub - 30+ engineers' },
]

const departments = [
  'Mechanical Engineering',
  'Process (Technological) Engineering',
  'Electrical Power Engineering',
  'Automation & Instrumentation',
  'Civil Engineering',
]

const isoCertifications = [
  { code: 'ISO 9001', focus: 'Quality Management' },
  { code: 'ISO 14001', focus: 'Environmental Management' },
  { code: 'ISO 27001', focus: 'Information Security' },
  { code: 'ISO 45001', focus: 'Occupational Health & Safety' },
]

const licenseCodes = [
  'P031M1',
  'P030E4',
  'P031T1',
  'P032M1',
  'P032T1',
  'P033M1',
  'P052M1',
  '09/4 no. 217-691/18',
  '09/4 no. 217-690/18',
]

const softwareSuites = [
  'Autodesk Plant 3D Design Suite',
  'Autodesk AutoCAD Electrical / MEP',
  'Autodesk Advanced Steel',
  'Hexagon CAESAR II',
  'Hexagon CADWorx',
  'Chemstations ChemCAD',
  'AspenTech HYSYS',
  'Radimpex Tower',
  'Urbano Ultimate',
  'Gas Arc Construction',
]

const missionVision = [
  {
    title: 'Mission',
    description:
      'Deliver dependable engineering documentation and supervision that keeps industrial assets compliant, efficient, and safe.',
  },
  {
    title: 'Vision',
    description:
      'Become the trusted engineering partner for regulated energy and process operators across the SEE region.',
  },
]

export function AboutPage() {
  return (
    <>
      <HeroPrimary
        eyebrow="About Neopetrol Engineering"
        title="Local roots, regional reach."
        description="From a small team in Novi Sad to a multidisciplinary engineering company delivering complex energy and process projects across Southeast Europe."
        stats={[
          { label: 'Years in operation', value: '17' },
          { label: 'Engineers', value: '30+' },
          { label: 'ISO certifications', value: '4' },
        ]}
        backgroundOverlayClassName="bg-gradient-to-br from-black/85 via-black/70 to-black/85 opacity-95"
        background={
          <video
            className="h-full w-full object-cover"
            src="/media/about/About_hero_video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        }
        // media={
        //   <div className="flex h-full items-end justify-center rounded-[1.75rem] bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-8 ring-1 ring-white/15">
        //     <p className="text-center text-lg font-semibold uppercase tracking-[0.28em] text-white/80">
        //       Built on discipline. Driven by knowledge.
        //     </p>
        //   </div>
        // }
      />

      <Section
        align="left"
        title="From local beginnings to regional projects."
        description="Founded in 2008 with three engineers, Neopetrol Engineering grew out of real operational needs: documentation that withstands audits, coordination that respects site realities, and supervision that keeps crews safe."
        contentClassName="gap-16"
      >
        <div className="grid gap-12 xl:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)] xl:items-start">
          <div className="space-y-7 text-brand-neutral">
            <p className="text-base leading-relaxed">
              The same discipline leads still mentor younger engineers, ensuring knowledge transfer and consistent output
              across every engagement. Early assignments focused on energy and petrochemical upgrades at refineries,
              storage terminals, and processing plants. As our clients faced larger capital programmes, the studio scaled
              its capabilities—adding licensed specialists and deepening site supervision expertise.
            </p>
            <p className="text-base leading-relaxed">
              Expansion followed client demand abroad. Multidisciplinary teams delivered detailed design in Kazakhstan
              while continuing to serve domestic partners such as Srbija Gas and StandardGas, including the wide hydrocarbon
              fraction plant in Odzaci. Today, thirty-plus engineers collaborate across disciplines to deliver dependable
              documentation and coordinated supervision across Southeast Europe.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {growthHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-brand-primary/10 bg-white/80 p-6 shadow-[0_28px_70px_rgba(8,20,51,0.12)]"
                >
                  <h3 className="font-display text-xl font-semibold text-brand-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-neutral">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-[2.5rem] border border-brand-primary/10 bg-gradient-to-br from-brand-secondary/10 via-white to-white p-8 shadow-[0_32px_80px_rgba(8,20,51,0.14)]">
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-accent">Growth snapshot</span>
            <ul className="space-y-4 text-sm leading-relaxed text-brand-primary">
              {growthSnapshot.map((item) => (
                <li key={item.label} className="rounded-2xl bg-white/70 p-4 shadow-[0_22px_55px_rgba(8,20,51,0.08)]">
                  <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-brand-accent/70">
                    {item.label}
                  </span>
                  <span className="mt-2 block text-sm text-brand-primary">{item.value}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-dashed border-brand-primary/20 bg-white/60 p-5 text-sm leading-relaxed text-brand-neutral">
              <p>
                Visual ideas: regional map with project markers, refinery photo essay, or timeline bar showing headcount
                growth from 2008 to 2025.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        variant="muted"
        align="left"
        title="National infrastructure contribution."
        description="Our teams contributed to the Serbian Gas Interconnector linking Bulgaria and Hungary as part of the South Stream network, providing mechanical, electrical, automation, and civil design expertise."
        contentClassName="gap-14"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:items-start">
          <div className="space-y-6 text-brand-neutral">
            <p>
              Coordinated delivery across disciplines ensured reliable documentation for one of the country’s most strategic
              energy corridors. Each package balanced regulatory compliance, constructability, and commissioning readiness,
              reducing rework once construction began.
            </p>
            <p>
              The project demonstrated our ability to integrate pipeline hydraulics, power supply, instrumentation, and civil
              works into a single coherent design package—setting the benchmark for future national infrastructure programmes.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-[2rem] border border-brand-primary/15 bg-white p-6 shadow-[0_30px_70px_rgba(8,20,51,0.12)]">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-accent/70">
              Visual direction
            </span>
            <p className="text-sm leading-relaxed text-brand-neutral">
              Overlay suggestions: simplified pipeline map across Serbia, gradient line drawing showing gas flow, or drone
              imagery from interconnection sites.
            </p>
          </div>
        </div>
      </Section>

      <Section
        align="left"
        title="Multidisciplinary engineering expertise."
        description="Our integrated structure keeps every discipline under one roof so coordination, documentation, and site supervision stay aligned from concept to handover."
        contentClassName="gap-12"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => (
            <div
              key={department}
              className="flex h-full flex-col justify-between gap-4 rounded-3xl border border-brand-primary/10 bg-white/85 p-6 shadow-[0_24px_60px_rgba(8,20,51,0.1)]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-accent">Discipline</span>
              <h3 className="font-display text-xl font-semibold text-brand-primary">{department}</h3>
              <p className="text-sm leading-relaxed text-brand-neutral">
                Coordinated design reviews, clash resolution, and site-ready documentation handled directly by senior
                discipline leads.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        variant="muted"
        align="left"
        title="Certified quality, safety, and reliability."
        description="An integrated management system guides every project, ensuring compliance, efficiency, and dependable delivery for regulated assets."
        contentClassName="gap-14"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {isoCertifications.map((cert) => (
            <div
              key={cert.code}
              className="flex h-full flex-col gap-3 rounded-3xl border border-brand-primary/10 bg-white p-6 text-brand-primary shadow-[0_24px_60px_rgba(8,20,51,0.08)]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-accent">{cert.code}</span>
              <h3 className="font-display text-lg font-semibold">{cert.focus}</h3>
              <p className="text-sm leading-relaxed text-brand-neutral">
                Audited system covering design, documentation, environmental impact, data security, and workforce safety.
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 rounded-3xl border border-dashed border-brand-primary/20 bg-white/70 p-6 text-sm text-brand-neutral">
          <span className="inline-flex items-center rounded-full bg-brand-secondary/15 px-4 py-2 font-semibold uppercase tracking-[0.24em] text-brand-primary">
            4 ISO certificates
          </span>
          <span className="inline-flex items-center rounded-full bg-brand-secondary/15 px-4 py-2 font-semibold uppercase tracking-[0.24em] text-brand-primary">
            30+ engineers
          </span>
          <span className="inline-flex items-center rounded-full bg-brand-secondary/15 px-4 py-2 font-semibold uppercase tracking-[0.24em] text-brand-primary">
            17 years of experience
          </span>
        </div>
      </Section>

      <Section
        align="left"
        title="Licensed for design and construction."
        description="We maintain the full set of national licenses required for design and construction works across mechanical, technological, electrical, civil, and supervision scopes."
        contentClassName="gap-12"
      >
        <div className="rounded-[2.5rem] border border-brand-primary/10 bg-white p-8 shadow-[0_30px_75px_rgba(8,20,51,0.1)]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {licenseCodes.map((code) => (
              <span
                key={code}
                className="flex items-center justify-center rounded-2xl border border-brand-primary/15 bg-brand-secondary/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary"
              >
                {code}
              </span>
            ))}
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-brand-neutral">
          Visual treatment suggestion: license document mock-ups, embossed seals, or animated counters highlighting the
          breadth of certified services.
        </p>
      </Section>

      <Section
        variant="muted"
        align="left"
        title="Modern tools for precise design."
        description="Continuous investment in software and training keeps design coordination precise, reduces errors, and shortens construction feedback loops."
        contentClassName="gap-12"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {softwareSuites.map((suite) => (
            <div
              key={suite}
              className="rounded-3xl border border-brand-primary/10 bg-white p-5 text-sm font-semibold text-brand-primary shadow-[0_24px_60px_rgba(8,20,51,0.08)]"
            >
              {suite}
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-dashed border-brand-primary/20 bg-white/70 p-6 text-sm leading-relaxed text-brand-neutral">
          Suggested art direction: software logo grid, CAD workspace screenshots, or a metric bar highlighting “10+ specialised
          software suites.”
        </div>
      </Section>

      <Section
        align="left"
        title="Mission and vision."
        description="Structured for clarity today, ready for richer storytelling—think leadership commentary, project photography, or animated timelines."
        contentClassName="gap-10"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {missionVision.map((item) => (
            <div
              key={item.title}
              className="flex h-full flex-col gap-4 rounded-3xl border border-brand-primary/10 bg-white p-6 shadow-[0_28px_70px_rgba(8,20,51,0.1)]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-accent">{item.title}</span>
              <p className="text-lg leading-relaxed text-brand-primary">{item.description}</p>
              <div className="rounded-2xl border border-dashed border-brand-primary/20 bg-brand-secondary/10 p-4 text-xs uppercase tracking-[0.22em] text-brand-primary">
                Future enhancement: embed regional map overlays or project video shorts.
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        variant="brand"
        align="center"
        title="Built on discipline. Driven by knowledge."
        description="Neopetrol Engineering combines local expertise with regional experience to deliver projects that stand the test of time. Let us know what information helps your decision-making and we will prioritise it next."
        contentClassName="gap-12"
      >
        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
          <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-2">
            Documentation that withstands audits
          </span>
          <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-2">
            Coordination grounded in site realities
          </span>
          <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-2">
            Supervision that keeps crews safe
          </span>
        </div>
      </Section>

      <ContactSection />
    </>
  )
}

export default AboutPage
