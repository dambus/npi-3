import HeroPrimary from '../components/HeroPrimary'
import Section from '../components/Section'

export function CareersPage() {
  return (
    <>
      <HeroPrimary
        eyebrow="Careers"
        title="Join a multidisciplinary engineering team delivering complex energy projects."
        description="We are assembling role descriptions, career path outlines and application guidelines. In the meantime, introduce yourself and we will reach out when aligned opportunities open."
      />
      <Section
        align="left"
        title="Currently preparing"
        description="Detailed job descriptions, benefits overview and culture highlights are being drafted."
      >
        <div className="max-w-2xl space-y-3 text-sm text-brand-neutral">
          <p>
            Send your CV and preferred discipline to{' '}
            <a href="mailto:careers@npi.rs" className="font-semibold text-brand-secondary hover:text-brand-accent">
              careers@npi.rs
            </a>{' '}
            so we can align future opportunities.
          </p>
          <p>
            This page will soon include an application form, early talent programme details, and interview process guidance.
          </p>
        </div>
      </Section>
    </>
  )
}

export default CareersPage
