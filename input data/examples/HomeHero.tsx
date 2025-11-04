import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";
import CTAButton from "../ui/CTAButton";
import { getPublishedServices } from "../../lib/cms";
import { usePageHeroImage } from "../../hooks/usePageHeroImage";

const FALLBACK_HIGHLIGHTS = [
  "Access control built for people",
  "Mobility ecosystems without friction",
  "Partners across four continents",
];

const DEFAULT_EYEBROW = "Welcome to Spark Systems";
const DEFAULT_HEADING =
  "Technology that lets your guests feel the welcome before they see the doors.";
const DEFAULT_SUPPORTING_COPY =
  "We orchestrate access, parking, and payment so journeys stay fluid from curb to seat. Every deployment is tuned to local teams, data insights, and the people arriving.";
const DEFAULT_PRIMARY_CTA = {
  label: "Talk with us",
  href: "/contact",
} as const;
const DEFAULT_SECONDARY_CTA = {
  label: "Explore services",
  href: "/services",
} as const;

const HERO_SERVICE_PRIORITY = [
  "parking-mobility",
  "access-control",
  "resort-commerce",
];

const FALLBACK_ALT = "Guests entering a venue with Spark Systems technology";
const STORAGE_KEY_IMAGE = "spark-home-hero-image";
const STORAGE_KEY_ALT = "spark-home-hero-alt";
const STORAGE_KEY_HIGHLIGHTS = "spark-home-hero-highlights";

function readCachedHero() {
  if (typeof window === "undefined") {
    return {
      image: null as string | null,
      alt: FALLBACK_ALT,
      highlights: FALLBACK_HIGHLIGHTS,
    };
  }
  const image = window.sessionStorage.getItem(STORAGE_KEY_IMAGE);
  const alt = window.sessionStorage.getItem(STORAGE_KEY_ALT) ?? FALLBACK_ALT;
  const highlightRaw = window.sessionStorage.getItem(STORAGE_KEY_HIGHLIGHTS);
  const highlights = highlightRaw
    ? highlightRaw
        .split("|")
        .map((item) => item.trim())
        .filter(Boolean)
    : FALLBACK_HIGHLIGHTS;
  return { image, alt, highlights };
}

function priorityIndex(slug: string): number {
  const index = HERO_SERVICE_PRIORITY.indexOf(slug);
  return index === -1 ? HERO_SERVICE_PRIORITY.length : index;
}

export default function HomeHero() {
  const cached = useMemo(() => readCachedHero(), []);
  const [serviceHeroImage, setServiceHeroImage] = useState<string | null>(
    cached.image,
  );
  const [serviceHeroAlt, setServiceHeroAlt] = useState<string>(cached.alt);
  const [serviceHighlights, setServiceHighlights] = useState<string[]>(
    cached.highlights,
  );
  const [loadingServiceHero, setLoadingServiceHero] = useState<boolean>(
    !cached.image,
  );
  const hasCachedServiceHero = useRef<boolean>(Boolean(cached.image));
  const {
    imageUrl: pageHeroImage,
    altText: pageHeroAlt,
    eyebrow: pageHeroEyebrow,
    heading: pageHeroHeading,
    subheading: pageHeroSubheading,
    supportingCopy: pageHeroSupportingCopy,
    highlights: heroHighlights,
    primaryCta: pageHeroPrimaryCta,
    secondaryCta: pageHeroSecondaryCta,
    loading: loadingPageHero,
  } = usePageHeroImage("home", { defaultAlt: FALLBACK_ALT });

  useEffect(() => {
    let cancelled = false;

    async function loadHero() {
      try {
        setLoadingServiceHero(!hasCachedServiceHero.current);
        const services = await getPublishedServices();
        if (cancelled || !services.length) {
          if (!hasCachedServiceHero.current) {
            setServiceHeroImage(null);
            setServiceHeroAlt(FALLBACK_ALT);
          }
          return;
        }

        const prioritized = services
          .slice()
          .sort((a, b) => priorityIndex(a.slug) - priorityIndex(b.slug));

        const derivedHighlights = prioritized
          .map(
            (service) =>
              service.hero_punchline?.trim() ||
              service.hero_heading?.trim() ||
              "",
          )
          .filter((value) => value.length > 0);

        if (!cancelled && derivedHighlights.length) {
          const unique = Array.from(new Set(derivedHighlights)).slice(0, 3);
          if (unique.length) {
            setServiceHighlights(unique);
            if (typeof window !== "undefined") {
              window.sessionStorage.setItem(
                STORAGE_KEY_HIGHLIGHTS,
                unique.join("|"),
              );
            }
          }
        }

        const heroCandidate = prioritized.find(
          (service) => service.hero_image_url,
        );
        if (!heroCandidate) {
          if (!hasCachedServiceHero.current) {
            setServiceHeroImage(null);
            setServiceHeroAlt(FALLBACK_ALT);
            setLoadingServiceHero(false);
          }
          return;
        }

        if (!cancelled) {
          const heroAltText =
            heroCandidate.hero_heading ?? heroCandidate.name ?? FALLBACK_ALT;
          setServiceHeroImage(heroCandidate.hero_image_url ?? null);
          setServiceHeroAlt(heroAltText);
          hasCachedServiceHero.current = Boolean(heroCandidate.hero_image_url);
          setLoadingServiceHero(false);
          if (typeof window !== "undefined" && heroCandidate.hero_image_url) {
            window.sessionStorage.setItem(
              STORAGE_KEY_IMAGE,
              heroCandidate.hero_image_url,
            );
            window.sessionStorage.setItem(STORAGE_KEY_ALT, heroAltText);
          }
        }
      } catch {
        if (!cancelled) {
          setLoadingServiceHero(false);
        }
      }
    }

    void loadHero();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !pageHeroImage) {
      return;
    }

    window.sessionStorage.setItem(STORAGE_KEY_IMAGE, pageHeroImage);
    window.sessionStorage.setItem(STORAGE_KEY_ALT, pageHeroAlt);
  }, [pageHeroAlt, pageHeroImage]);

  useEffect(() => {
    if (typeof window === "undefined" || !heroHighlights.length) {
      return;
    }

    window.sessionStorage.setItem(
      STORAGE_KEY_HIGHLIGHTS,
      heroHighlights.join("|"),
    );
  }, [heroHighlights]);

  const heroImage =
    pageHeroImage ?? (!loadingPageHero ? serviceHeroImage : null);
  const heroAlt = pageHeroImage ? pageHeroAlt : serviceHeroAlt;
  const loadingHero = loadingPageHero && !pageHeroImage;
  const fallbackLoading = !heroImage && loadingServiceHero;

  const eyebrowCopy = pageHeroEyebrow?.trim() || DEFAULT_EYEBROW;
  const headingCopy = pageHeroHeading?.trim() || DEFAULT_HEADING;
  const subheadingCopy = pageHeroSubheading?.trim() || "";
  const supportingCopy = pageHeroSupportingCopy?.trim() || "";
  const showSubheading = Boolean(
    subheadingCopy && supportingCopy && subheadingCopy !== supportingCopy,
  );
  const paragraphCopy =
    supportingCopy || subheadingCopy || DEFAULT_SUPPORTING_COPY;

  const trimmedPrimaryLabel = pageHeroPrimaryCta?.label?.trim() ?? "";
  const trimmedPrimaryHref = pageHeroPrimaryCta?.href?.trim() ?? "";
  const primaryCta =
    trimmedPrimaryLabel && trimmedPrimaryHref
      ? { label: trimmedPrimaryLabel, href: trimmedPrimaryHref }
      : DEFAULT_PRIMARY_CTA;

  const trimmedSecondaryLabel = pageHeroSecondaryCta?.label?.trim() ?? "";
  const trimmedSecondaryHref = pageHeroSecondaryCta?.href?.trim() ?? "";
  const hasSecondaryCta = Boolean(
    trimmedSecondaryLabel && trimmedSecondaryHref,
  );
  const secondaryCta = hasSecondaryCta
    ? { label: trimmedSecondaryLabel, href: trimmedSecondaryHref }
    : DEFAULT_SECONDARY_CTA;
  const highlightSource = heroHighlights.length
    ? heroHighlights
    : serviceHighlights.length
      ? serviceHighlights
      : FALLBACK_HIGHLIGHTS;
  const resolvedHighlights = highlightSource
    .map((item) => item.replace(/\\n/g, " ").trim())
    .filter((item) => item.length > 0);

  const showSkeleton = loadingHero || fallbackLoading;

  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 -z-10">
        {heroImage ? (
          <img
            src={heroImage}
            alt={heroAlt}
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="block h-full w-full object-cover transition-opacity duration-700 ease-out"
          />
        ) : null}
        <div className="absolute inset-0 bg-neutral-900/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/10 via-neutral-900/25 to-neutral-900/90" />
      </div>

      <div className="section py-28 sm:py-32 lg:py-44">
        <div className="max-w-3xl space-y-7">
          {showSkeleton ? (
            <div className="space-y-5 text-white/0 animate-pulse" aria-hidden>
              <span className="inline-flex items-center gap-4">
                <span className="inline-block h-1 w-20 bg-white/30" />
                <span className="block h-3 w-48 rounded bg-white/25" />
              </span>
              <span className="block h-12 w-3/4 rounded bg-white/25" />
              <span className="block h-3 w-1/2 rounded bg-white/20" />
              <span className="block h-3 w-2/3 rounded bg-white/15" />
              <div className="mt-6 flex gap-3">
                <span className="block h-11 w-44 rounded bg-white/20" />
                <span className="block h-11 w-44 rounded border border-white/20" />
              </div>
              <div className="pt-4">
                <span className="block h-3 w-1/3 rounded bg-white/15" />
              </div>
            </div>
          ) : (
            <>
              <Reveal>
                <span className="inline-flex items-center gap-4 text-[0.75rem] uppercase tracking-[0.32em] text-white/65">
                  <span
                    className="inline-block h-1 w-20 bg-[var(--accent)]"
                    aria-hidden
                  />
                  {eyebrowCopy}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-4xl font-semibold leading-tight text-[var(--accent)] sm:text-5xl lg:text-[3.5rem]">
                  {headingCopy}
                </h1>
              </Reveal>
              {showSubheading ? (
                <Reveal delay={0.1}>
                  <p className="text-sm uppercase tracking-[0.24em] text-white/60">
                    {subheadingCopy}
                  </p>
                </Reveal>
              ) : null}
              <Reveal delay={showSubheading ? 0.14 : 0.1}>
                <p className="text-lg text-white/75">{paragraphCopy}</p>
              </Reveal>
              <Reveal delay={showSubheading ? 0.18 : 0.15}>
                <div className="flex flex-wrap items-center gap-3">
                  <CTAButton href={primaryCta.href}>
                    {primaryCta.label}
                  </CTAButton>
                  {secondaryCta?.href ? (
                    <a
                      className="inline-flex items-center gap-3 rounded-none border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white/10"
                      href={secondaryCta.href}
                    >
                      {secondaryCta.label}
                    </a>
                  ) : null}
                </div>
              </Reveal>
              <Reveal delay={showSubheading ? 0.22 : 0.2}>
                <ul className="flex flex-col gap-3 pt-6 text-sm text-white/70">
                  {resolvedHighlights.map((item) => (
                    <li key={item} className="inline-flex items-center gap-2">
                      <span className="h-px w-10 bg-white/30" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
