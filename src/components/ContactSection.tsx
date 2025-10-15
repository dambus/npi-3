import Button from './Button'
import FormField from './FormField'
import Section from './Section'

const serviceFocusOptions = [
  { value: '', label: 'Select focus area' },
  { value: 'project-management', label: 'Project management' },
  { value: 'studies', label: 'Studies & analysis' },
  { value: 'conceptual-design', label: 'Conceptual design' },
  { value: 'detail-design', label: 'Detail design' },
  { value: 'supervision', label: 'Supervision & commissioning' },
  { value: 'consulting', label: 'Consulting & compliance' },
]

export interface ContactSectionProps {
  id?: string
  title?: string
  description?: string
}

export function ContactSection({
  id = 'contact',
  title = "Share a few details and we'll align the right engineering squad.",
  description = "We respond within one business day. Expect a short call to clarify objectives, current systems, and success metrics before we assemble the project pod.",
}: ContactSectionProps) {
  return (
    <Section
      id={id}
      align="left"
      eyebrow="Kick-off window"
      title={title}
      description={description}
      contentClassName="gap-12"
    >
      <form
        className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            id={`${id}-name`}
            label="Full name"
            placeholder="Ana Petrović"
            required
          />
          <FormField
            id={`${id}-email`}
            label="Work email"
            type="email"
            placeholder="ana.petrovic@npi.rs"
            required
          />
          <FormField
            id={`${id}-phone`}
            label="Phone"
            type="tel"
            placeholder="+381 64 123 456"
            hint="Include country code if outside Serbia."
          />
          <FormField
            id={`${id}-company`}
            label="Company"
            placeholder="NPI Engineering"
          />
          <FormField
            id={`${id}-service`}
            label="Service focus"
            type="select"
            defaultValue=""
            options={serviceFocusOptions}
          />
          <div className="md:col-span-2">
            <FormField
              id={`${id}-message`}
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
  )
}

export default ContactSection
