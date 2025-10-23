import AboutTeaser from '../components/AboutTeaser'
import ContactSection from '../components/ContactSection'
import FeaturedServicesSection from '../components/FeaturedServicesSection'
import FooterCTA from '../components/FooterCTA'
import HeroLanding from '../components/HeroLanding'
import LogoWall from '../components/LogoWall'
import ProjectsTeaserSection from '../components/ProjectsTeaserSection'
import ValueIconsSection from '../components/ValueIconsSection'

export function HomePage() {
  return (
    <>
      <HeroLanding />
      <ValueIconsSection />
      <AboutTeaser />
      <FeaturedServicesSection />
      <ProjectsTeaserSection />
      <LogoWall />
      <ContactSection id="contact" />
      <FooterCTA />
    </>
  )
}

export default HomePage
