import ContactSection from '../components/ContactSection'
import HeroPrimary from '../components/HeroPrimary'
import Section from '../components/Section'

import deliveryImage from '../assets/services/timeline-delivery.jpg'
import supervisionImage from '../assets/services/service-concept.jpg'
import assuranceImage from '../assets/services/service-compliance.jpg'

const disciplineMetrics = [
  { value: '5', label: 'Disciplines in one workflow' },
  { value: '30+', label: 'Engineers sharing templates' },
  { value: '120+', label: 'Coordinated project packs' },
]

const deliveryMetrics = [
  { value: '3', label: 'formal review gates' },
  { value: '48h', label: 'markup turnaround' },
  { value: '1200+', label: 'documents hosted digitally' },
]

const supervisionMetrics = [
  { value: '24h', label: 'avg response to site queries' },
  { value: '50+', label: 'site visits logged yearly' },
  { value: '30+', label: 'commissionings assisted' },
]

const assuranceMetrics = [
  { value: '4', label: 'ISO standards active' },
  { value: '9', label: 'national license categories' },
  { value: '10+', label: 'specialised software suites' },
]

const isoCertifications = [
  { code: 'ISO 9001', focus: 'Quality' },
  { code: 'ISO 14001', focus: 'Environment' },
  { code: 'ISO 27001', focus: 'Information security' },
  { code: 'ISO 45001', focus: 'Occupational safety' },
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

const infinitySymbol = '\u221e';

export function AboutPage() {
  return (
    <>
      <HeroPrimary
        eyebrow="About our studio"
        title="Lean studio. Measured impact."
        description="Seventeen years of industrial documentation, coordination, and technical supervision delivered by one focused team."
        stats={[
          { label: 'Years active', value: '17' },
          { label: 'Disciplines in-house', value: '5' },
          { label: 'Engineers', value: '27' },
          {label: 'projects', value: '150+'},
          {label: 'clients', value: '30+'},
          {label: 'motivation', value: infinitySymbol},
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
      />

      <Section
        fullWidth
        className="relative lg:py-0"
        contentClassName="relative isolate gap-0 p-0"
      >
        <div className="grid w-full items-center lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)]">
          <div className="order-2 flex flex-col gap-10 px-6 py-14 sm:px-12 md:py-20 lg:order-1 lg:pl-[var(--spacing-container)] lg:pr-12 xl:pr-16 2xl:pl-[calc((100vw-var(--size-content))/2)] 2xl:pr-20">
            <div className="flex flex-col gap-6 text-brand-primary">
              <h2 className="font-display text-4xl font-semibold leading-tight text-balance md:text-[3.25rem] lg:text-[3.5rem]">
                Disciplines working as one team.
              </h2>
              <p className="text-lg leading-relaxed text-brand-neutral md:text-xl">
                Process, mechanical, electrical, automation, and civil specialists share identical checklists, review loops,
                and data vaults, so every deliverable reflects the same standard.
              </p>
            </div>
            <p className="text-base leading-relaxed text-brand-neutral">
              Team members work inside a single scheduling board, which keeps markups, calculations, and quantities aligned
              even when the scope shifts mid-project.
            </p>
            <p className="text-base leading-relaxed text-brand-neutral">
              The same discipline leads who model the solution also refine the handover set and prepare technical supervision
              notes, keeping the hand-off clean for the field.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {disciplineMetrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-brand-primary/10 bg-white/90 p-5 text-center shadow-[0_28px_70px_rgba(8,20,51,0.12)]"
                >
                  <span className="text-3xl font-display font-semibold text-brand-primary">{item.value}</span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-neutral">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 h-full min-h-[480px] w-full border border-brand-primary/10 bg-white shadow-[0_40px_90px_rgba(8,20,51,0.08)] lg:order-2 lg:pr-[var(--spacing-container)] 2xl:pr-[calc((100vw-var(--size-content))/2)]">
            <img
              src="/media/about/Disciplines.webp"
              alt="Team reviewing multidisciplinary documentation"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      <Section
        variant="muted"
        fullWidth
        className="relative lg:py-0"
        contentClassName="relative isolate gap-0 p-0"
      >
        <div className="grid w-full items-center lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]">
          <div className="order-1 px-6 py-14 sm:px-12 md:py-20 lg:pl-[var(--spacing-container)] lg:pr-12 xl:pr-16 2xl:pl-[calc((100vw-var(--size-content))/2)] 2xl:pr-20">
            <div className="relative isolate h-full min-h-[420px] w-full overflow-hidden border border-brand-primary/10 bg-brand-primary/90 shadow-[0_40px_90px_rgba(8,20,51,0.18)]">
              <img
                src={deliveryImage}
                alt="Engineers reviewing a delivery timeline"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/80 via-brand-primary/30 to-transparent" />
              <div className="absolute inset-0 bg-brand-primary/15 mix-blend-multiply" />
              <span className="pointer-events-none absolute -left-8 top-8 hidden h-44 w-44 border border-white/15 lg:block animate-orbit-two" />
              <span className="pointer-events-none absolute bottom-8 right-8 inline-flex h-24 w-24 flex-col items-center justify-center gap-1 border border-white/30 bg-white/15 text-center text-xs font-semibold uppercase tracking-[0.28em] text-white shadow-[0_25px_60px_rgba(6,20,46,0.4)] backdrop-blur">
                <span className="text-[0.55rem]">Gate</span>
                <span className="font-display text-2xl">03</span>
              </span>
            </div>
          </div>
          <div className="order-2 flex flex-col gap-10 px-6 pb-14 pt-0 sm:px-12 sm:pb-20 lg:pl-12 lg:pr-[var(--spacing-container)] lg:pt-20 xl:pl-16 2xl:pr-[calc((100vw-var(--size-content))/2)]">
            <div className="flex flex-col gap-6 text-brand-primary">
              <h2 className="font-display text-4xl font-semibold leading-tight text-balance md:text-[3.25rem] lg:text-[3.5rem]">
                Planning, models, and markups move together.
              </h2>
              <p className="text-lg leading-relaxed text-brand-neutral md:text-xl">
                Every package follows the same capture–resolve–release loop, so document owners keep control over versions
                without slowing down schedules.
              </p>
            </div>
            <p className="text-base leading-relaxed text-brand-neutral">
              Review gates are simple: capture inputs, resolve clashes, release the approved pack. Each step is time-stamped
              and transparent to project owners.
            </p>
            <p className="text-base leading-relaxed text-brand-neutral">
              Because the same team tracks markups, clarifications arrive quickly and site crews never see conflicting drawings.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {deliveryMetrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-brand-primary/10 bg-white p-5 text-center shadow-[0_28px_70px_rgba(8,20,51,0.12)]"
                >
                  <span className="text-3xl font-display font-semibold text-brand-primary">{item.value}</span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-neutral">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        fullWidth
        className="relative lg:py-0"
        contentClassName="relative isolate gap-0 p-0"
      >
        <div className="grid w-full items-center lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)]">
          <div className="order-2 flex flex-col gap-10 px-6 py-14 sm:px-12 md:py-20 lg:order-1 lg:pl-[var(--spacing-container)] lg:pr-12 xl:pr-16 2xl:pl-[calc((100vw-var(--size-content))/2)] 2xl:pr-20">
            <div className="flex flex-col gap-6 text-brand-primary">
              <h2 className="font-display text-4xl font-semibold leading-tight text-balance md:text-[3.25rem] lg:text-[3.5rem]">
                Technical supervision of works.
              </h2>
              <p className="text-lg leading-relaxed text-brand-neutral md:text-xl">
                Site requests go straight to the engineers who authored the documentation, keeping installation notes, tests,
                and punch items aligned.
              </p>
            </div>
            <p className="text-base leading-relaxed text-brand-neutral">
              Supervision is purely technical: monitoring works, checking quantities, validating tests, and confirming that
              each activity matches the drawings.
            </p>
            <p className="text-base leading-relaxed text-brand-neutral">
              Weekly digital logs include photos, remarks, and decisions, so investors can act on verified information without
              waiting for the next meeting.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {supervisionMetrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-brand-primary/10 bg-white/90 p-5 text-center shadow-[0_28px_70px_rgba(8,20,51,0.12)]"
                >
                  <span className="text-3xl font-display font-semibold text-brand-primary">{item.value}</span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-neutral text-pretty">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 px-6 pb-14 pt-0 sm:px-12 sm:pb-20 lg:order-2 lg:pr-[var(--spacing-container)] lg:pl-12 lg:pt-20 xl:pl-16 2xl:pr-[calc((100vw-var(--size-content))/2)]">
            <div className="relative isolate h-full min-h-[420px] w-full overflow-hidden border border-white/15 bg-brand-primary/90 shadow-[0_40px_90px_rgba(8,20,51,0.2)]">
              <img
                src={supervisionImage}
                alt="Technical supervisor reviewing site work"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/85 via-brand-primary/35 to-transparent" />
              <div className="absolute inset-0 bg-brand-primary/15 mix-blend-multiply" />
              <span className="pointer-events-none absolute left-6 top-6 inline-flex h-28 w-28 flex-col items-center justify-center gap-1 border border-white/25 bg-white/10 text-center text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-white shadow-[0_25px_60px_rgba(6,20,46,0.35)] backdrop-blur animate-orbit-two">
                <span>Report</span>
                <span className="font-display text-2xl">48h</span>
              </span>
              <span className="pointer-events-none absolute bottom-6 right-6 inline-flex h-16 w-16 items-center justify-center border border-white/30 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-white/80 shadow-[0_25px_60px_rgba(6,20,46,0.35)] backdrop-blur animate-orbit-one">
                Tech QA
              </span>
            </div>
          </div>
        </div>
      </Section>

      <Section
        variant="muted"
        fullWidth
        className="relative lg:py-0"
        contentClassName="relative isolate gap-0 p-0"
      >
        <div className="grid w-full items-center lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]">
          <div className="order-1 px-6 py-14 sm:px-12 md:py-20 lg:pl-[var(--spacing-container)] lg:pr-12 xl:pr-16 2xl:pl-[calc((100vw-var(--size-content))/2)] 2xl:pr-20">
            <div className="relative isolate h-full min-h-[420px] w-full overflow-hidden border border-brand-primary/10 bg-brand-primary/90 shadow-[0_40px_90px_rgba(8,20,51,0.18)]">
              <img
                src={assuranceImage}
                alt="Quality and digital assurance tools"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/75 via-brand-primary/25 to-transparent" />
              <div className="absolute inset-0 bg-brand-primary/15 mix-blend-multiply" />
              <span className="pointer-events-none absolute top-6 right-6 inline-flex h-24 w-24 flex-col items-center justify-center gap-1 border border-white/30 bg-white/15 text-center text-xs font-semibold uppercase tracking-[0.28em] text-white shadow-[0_25px_60px_rgba(6,20,46,0.35)] backdrop-blur">
                <span>ISO</span>
                <span className="font-display text-2xl">4</span>
              </span>
            </div>
          </div>
          <div className="order-2 flex flex-col gap-10 px-6 pb-14 pt-0 sm:px-12 sm:pb-20 lg:pl-12 lg:pr-[var(--spacing-container)] lg:pt-20 xl:pl-16 2xl:pr-[calc((100vw-var(--size-content))/2)]">
            <div className="flex flex-col gap-6 text-brand-primary">
              <h2 className="font-display text-4xl font-semibold leading-tight text-balance md:text-[3.25rem] lg:text-[3.5rem]">
                Tools, certifications, and traceability.
              </h2>
              <p className="text-lg leading-relaxed text-brand-neutral md:text-xl">
                Audited management systems, licensed experts, and a full digital toolbox keep every calculation, drawing,
                and supervision note traceable.
              </p>
            </div>
            <p className="text-base leading-relaxed text-brand-neutral">
              Quality, environmental, information security, and safety certificates remain active through yearly audits.
              Workflows, templates, and toolchains reflect those standards.
            </p>
            <p className="text-base leading-relaxed text-brand-neutral">
              Licensed experts cover each discipline and the full scope of technical supervision, giving investors one accountable
              partner for documentation, coordination, and close-out.
            </p>
            <div className="flex flex-wrap gap-3">
              {isoCertifications.map((cert) => (
                <span
                  key={cert.code}
                  className="inline-flex items-center rounded-full border border-brand-primary/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary shadow-[0_18px_45px_rgba(8,20,51,0.12)]"
                >
                  {cert.code} · {cert.focus}
                </span>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {licenseCodes.map((code) => (
                <span
                  key={code}
                  className="rounded-2xl border border-dashed border-brand-primary/30 bg-white/80 px-4 py-3 text-center text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-primary"
                >
                  {code}
                </span>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {assuranceMetrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-brand-primary/10 bg-white p-5 text-center shadow-[0_28px_70px_rgba(8,20,51,0.12)]"
                >
                  <span className="text-3xl font-display font-semibold text-brand-primary">{item.value}</span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-neutral">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <ContactSection />
    </>
  )
}

export default AboutPage
