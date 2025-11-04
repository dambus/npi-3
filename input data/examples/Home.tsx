// src/pages/Home.tsx
import SEO from "../components/ui/SEO";
import { absUrl } from "../lib/site";
import HomeHero from "../components/sections/HomeHero";
import AboutLead from "../components/sections/AboutLead";
import ServicesGrid from "../components/sections/ServicesGrid";
import CTA from "../components/sections/CTA";
import LogoCloud from "../components/sections/LogoCloud";
import Metrics from "../components/sections/Metrics";
import FeaturedWork from "../components/sections/FeaturedWork";
import LatestNews from "../components/sections/LatestNews";

export default function Home() {
  return (
    <>
      <SEO
        title="Spark Systems - Helping you meet the goals of the digital age."
        description="Access control, parking ecosystems, and mobility solutions designed for seamless guest journeys."
        url={absUrl("/")}
        canonical={absUrl("/")}
        image={absUrl("/og/og-card.svg")}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Spark Systems",
          url: absUrl("/"),
          logo: absUrl("/spark-favicon.svg"),
          sameAs: [
            "https://linkedin.com/company/sparksystems",
            "mailto:info@sparksystems.com",
          ],
        }}
      />
      <HomeHero />
      <AboutLead />
      <ServicesGrid />
      <CTA />
      <LogoCloud />
      <Metrics />
      <FeaturedWork />
      <LatestNews />
    </>
  );
}
