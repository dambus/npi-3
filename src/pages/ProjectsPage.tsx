import ContactSection from '../components/ContactSection'
import HeroPrimary from '../components/HeroPrimary'
import ProjectCard from '../components/ProjectCard'
import ProjectsTeaserSection from '../components/ProjectsTeaserSection'
import Section from '../components/Section'
import { getAllProjects } from '../data/projects'

const upcomingCaseStudies = [
  {
    title: 'Gas storage expansion',
    summary:
      'Detail design coordination for compressor upgrades, underground cavern integration and commissioning support.',
    status: 'In review: imagery & KPI dashboard.',
  },
  {
    title: 'Petrochemical revamp',
    summary:
      'Process optimisation, piping redesign and automation migration delivered in parallel with outage windows.',
    status: 'In review: document set & vendor list.',
  },
  {
    title: 'District heating upgrade',
    summary:
      'Boiler plant modernisation with thermal storage, controls retrofit and compliance documentation.',
    status: 'In review: as-built package & lessons learned.',
  },
]

const collaborationNotes = [
  {
    title: 'Data rooms',
    description:
      'We are preparing sample data room structures with redacted deliverables, showing how we organise drawings, reports and correspondence.',
  },
  {
    title: 'Performance snapshots',
    description:
      'Expect KPI overviews mapping schedule adherence, change management and commissioning punch list closure.',
  },
  {
    title: 'Site photography',
    description:
      'Dedicated galleries will document before/after states, installation progress and QA inspections where NDAs permit.',
  },
]

const requestChecklist = [
  {
    label: 'Industry and asset type',
    detail: 'Let us know if you need upstream, midstream, refining, chemical or energy references.',
  },
  {
    label: 'Project scale',
    detail: 'Specify CAPEX range, timeline and delivery model (EPCM, turnkey, owner-managed).',
  },
  {
    label: 'Documentation needs',
    detail: 'Identify the drawings, reports or procedures required for your review or tender.',
  },
]

export function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <>
      <HeroPrimary
        eyebrow="Projects"
        title="References that demonstrate our multidisciplinary delivery."
        description="Full project catalogue with filters, technical scope and documentation samples is coming soon. Explore selected highlights below and contact us for specific references."
      />
      <ProjectsTeaserSection />
      <Section
        align="left"
        title="Active project references"
        description="Browse a sample of live case studies. Each entry links to a detailed overview with scope, approach, and gallery."
        contentClassName="gap-12"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.name}
              industry={project.category}
              description={project.shortDescription}
              image={project.heroImage.src}
              href={`/projects/${project.slug}`}
            />
          ))}
        </div>
      </Section>
      <Section
        align="left"
        title="Need a detailed case study?"
        description="We are curating individual project dossiers (scope, deliverables, KPIs, imagery). Let us know which industries or project scales you want to see first."
      >
        <p className="max-w-2xl text-sm text-brand-neutral">
          Send a request through the contact page specifying industry, project size, and required documentation (P&IDs, 3D models, specifications, QA packs). We will share redacted samples aligned with NDA requirements.
        </p>
      </Section>

      <Section
        variant="muted"
        align="left"
        title="Case studies in production."
        description="We are structuring each reference with a consistent flow so you can compare scope, deliverables and impact. Previews below will expand into full articles."
        contentClassName="gap-12"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {upcomingCaseStudies.map((caseStudy) => (
            <div
              key={caseStudy.title}
              className="flex h-full flex-col gap-4 rounded-3xl border border-brand-primary/10 bg-white/95 p-6 shadow-[0_26px_60px_rgba(8,20,51,0.08)]"
            >
              <h3 className="font-display text-xl font-semibold text-brand-primary">{caseStudy.title}</h3>
              <p className="text-sm leading-relaxed text-brand-neutral">{caseStudy.summary}</p>
              <p className="mt-auto text-xs uppercase tracking-[0.2em] text-brand-neutral/80">{caseStudy.status}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        align="left"
        title="What the full project hub will include."
        description="These notes outline the content structure in development. They help plan photography, permissions and data collection ahead of launch."
        contentClassName="gap-10"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {collaborationNotes.map((note) => (
            <div
              key={note.title}
              className="flex h-full flex-col gap-3 rounded-3xl border border-brand-primary/10 bg-white/85 p-6 shadow-[0_22px_55px_rgba(8,20,51,0.1)]"
            >
              <h3 className="font-display text-xl font-semibold text-brand-primary">{note.title}</h3>
              <p className="text-sm leading-relaxed text-brand-neutral">{note.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        variant="brand"
        align="left"
        title="Checklist for reference requests."
        description="Use this to prepare your enquiry so we can share the most relevant project dossier. A detailed template will follow shortly."
        contentClassName="gap-10"
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] md:items-center">
          <div className="rounded-3xl border border-white/12 bg-white/10 p-6 shadow-[0_28px_65px_rgba(3,10,28,0.35)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Preparation guide</p>
            <p className="mt-3 text-lg font-semibold text-white">
              Assemble key facts and confidentiality constraints so we can match the right case study.
            </p>
          </div>
          <ul className="grid gap-4 text-sm leading-relaxed text-white/85">
            {requestChecklist.map((item) => (
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
        align="left"
        title="Next steps"
        description="Full references, technical galleries and testimonial quotes will roll out progressively. Tell us which projects should be prioritised."
      >
        <div className="max-w-2xl space-y-3 text-brand-neutral">
          <p>
            Provide the project context and confidentiality scope via the form below. We can arrange a private review
            session with the discipline leads who delivered similar work.
          </p>
          <p>
            If you require NDAs, please attach your template or request ours so we can expedite document sharing.
          </p>
        </div>
      </Section>

      <ContactSection id="projects-contact" />
    </>
  )
}

export default ProjectsPage
