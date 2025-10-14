import Button from './Button'
import Section from './Section'

export function FooterCTA() {
  return (
    <Section
      variant="inverse"
      align="center"
      eyebrow="Ready to discuss your next project?"
      title="Download our company profile or schedule a call with our engineering leads."
      description="We respond within one business day with relevant references, available capacity and the next steps to scope your assignment."
      contentClassName="gap-8"
    >
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          as="a"
          href="/downloads/npi-company-profile.pdf"
          size="lg"
          className="bg-white text-brand-primary hover:bg-brand-accent hover:text-white"
        >
          Download profile (PDF)
        </Button>
        <Button as="a" href="#contact" variant="ghost" size="lg" className="text-white">
          Plan a consultation
        </Button>
      </div>
    </Section>
  )
}

export default FooterCTA
