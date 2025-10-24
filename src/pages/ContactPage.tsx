import ContactSection from '../components/ContactSection'
import HeroPrimary from '../components/HeroPrimary'
import Section from '../components/Section'

const contactChannels = [
  {
    title: 'Project enquiries',
    description:
      'Use the form for new tenders, feasibility studies or urgent site support. Include key dates and decision makers.',
    detail: 'Response within one business day from the relevant discipline lead.',
  },
  {
    title: 'Supplier partnerships',
    description:
      'Vendors and OEM partners can share catalogues, certifications and partnership proposals through the form.',
    detail: 'We route submissions to procurement and technical reviewers.',
  },
  {
    title: 'Careers & internships',
    description:
      'Interested candidates can submit CVs, portfolios and availability. Attach preferred disciplines or project types.',
    detail: 'HR will respond with current openings and next steps.',
  },
]

const meetingPreparation = [
  {
    label: 'Project background',
    detail: 'Summarise existing assets, documentation status and any regulatory drivers.',
  },
  {
    label: 'Desired outcomes',
    detail: 'Clarify whether you need studies, design, supervision or compliance support.',
  },
  {
    label: 'Stakeholders involved',
    detail: 'List decision makers, site contacts and external partners we should coordinate with.',
  },
]

const officeDetails = [
  {
    label: 'Office hours',
    value: 'Monday to Friday, 08:00 - 16:00 CET.',
  },
  {
    label: 'Address',
    value: 'Bulevar Vudroa Vilsona 12, Beograd. Visitor access by appointment.',
  },
  {
    label: 'Parking & access',
    value: 'Dedicated visitor parking available. Please bring a valid ID for site entry.',
  },
]

export function ContactPage() {
  return (
    <>
      <HeroPrimary
        eyebrow="Contact"
        title="Get in touch with our engineering leads."
        description="Share your project objectives and existing infrastructure. We will respond within one business day with next steps and relevant references."
      />
      <Section
        align="left"
        title="How we triage your request."
        description="Each submission is reviewed by our coordination team before assigning it to the right discipline leads."
        contentClassName="gap-12"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {contactChannels.map((channel) => (
            <div
              key={channel.title}
              className="flex h-full flex-col gap-3 rounded-3xl border border-brand-primary/10 bg-white/90 p-6 shadow-[0_24px_60px_rgba(8,20,51,0.1)]"
            >
              <h3 className="font-display text-xl font-semibold text-brand-primary">{channel.title}</h3>
              <p className="text-sm leading-relaxed text-brand-neutral">{channel.description}</p>
              <p className="mt-auto text-xs uppercase tracking-[0.2em] text-brand-neutral/80">{channel.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        variant="muted"
        align="left"
        title="Preparing for the intro call."
        description="We are developing a full briefing template. Until then, use this checklist to make our first session efficient."
        contentClassName="gap-10"
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] md:items-center">
          <div className="space-y-4 text-brand-neutral">
            <p>
              During the call we will cover scope, constraints and any immediate risks. Feel free to attach supporting
              documents or share secure download links once we confirm NDAs.
            </p>
            <p>
              For site visits, include preferred dates and any safety inductions required. We will coordinate travel and
              access details in advance.
            </p>
          </div>
          <ul className="grid gap-4">
            {meetingPreparation.map((item) => (
              <li
                key={item.label}
                className="rounded-2xl border border-brand-primary/10 bg-white p-5 shadow-[0_22px_55px_rgba(8,20,51,0.08)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">{item.label}</p>
                <p className="mt-2 text-sm text-brand-neutral">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        align="left"
        title="Visiting our office."
        description="We welcome on-site coordination sessions and technical workshops. Logistics will be finalised in the updated contact guide."
        contentClassName="gap-6"
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] md:items-center">
          <div className="rounded-3xl border border-brand-primary/10 bg-gradient-to-br from-white via-white/95 to-brand-secondary/10 p-6 shadow-[0_24px_55px_rgba(8,20,51,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">On-site coordination</p>
            <p className="mt-3 text-lg font-semibold text-brand-primary">
              Workshop rooms equipped for multidisciplinary design reviews and vendor meetings.
            </p>
          </div>
          <ul className="space-y-3 text-sm leading-relaxed text-brand-neutral">
            {officeDetails.map((item) => (
              <li key={item.label}>
                <span className="font-semibold text-brand-primary">{item.label}:</span> {item.value}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        align="left"
        title="Next steps"
        description="A refreshed contact playbook and downloadable briefing template are underway. Share feedback on what would help your team best."
      >
        <div className="max-w-2xl space-y-3 text-brand-neutral">
          <p>
            After submitting the form, you will receive a confirmation email with reference number and follow-up timing.
            We can sign NDAs electronically if required before exchanging detailed documentation.
          </p>
          <p>
            Prefer coordinating by phone? Mention the best time to reach you and we will schedule a call with the right
            specialists.
          </p>
        </div>
      </Section>

      <ContactSection id="contact-form" />
    </>
  )
}

export default ContactPage
