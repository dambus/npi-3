import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Section from '../components/Section'

export function NotFoundPage() {
  return (
    <Section
      variant="muted"
      align="center"
      title="Page not found"
      description="The page you were looking for does not exist or is being prepared."
    >
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-brand-neutral">
          If you followed a saved link, the content may have moved while we finish the new sitemap.
        </p>
        <Button as="router-link" to="/" size="md">
          Return to homepage
        </Button>
        <Link
          to="/contact"
          className="text-sm font-semibold text-brand-accent hover:text-brand-accent/80"
        >
          Contact us for the information you need
        </Link>
      </div>
    </Section>
  )
}

export default NotFoundPage
