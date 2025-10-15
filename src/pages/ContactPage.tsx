import ContactSection from '../components/ContactSection'
import HeroPrimary from '../components/HeroPrimary'

export function ContactPage() {
  return (
    <>
      <HeroPrimary
        eyebrow="Contact"
        title="Get in touch with our engineering leads."
        description="Share your project objectives and existing infrastructure. We will respond within one business day with next steps and relevant references."
      />
      <ContactSection id="contact-form" />
    </>
  )
}

export default ContactPage
