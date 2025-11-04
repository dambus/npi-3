import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CTAButton from "../ui/CTAButton";
import type { HeroCta } from "../../hooks/usePageHeroImage";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subheading?: string;
  description?: string;
  imageUrl?: string | null;
  imageAlt?: string;
  loading?: boolean;
  primaryCta?: HeroCta | null;
  secondaryCta?: HeroCta | null;
  highlights?: string[];
  children?: ReactNode;
}

const FALLBACK_ALT = "Spark Systems hero background";

export function PageHero({
  eyebrow,
  title,
  subheading,
  description,
  imageUrl,
  imageAlt,
  loading = false,
  primaryCta,
  secondaryCta,
  highlights,
  children,
}: PageHeroProps) {
  const resolvedAlt = (imageAlt ?? FALLBACK_ALT).trim() || FALLBACK_ALT;
  const prefersReducedMotion = useReducedMotion();
  const normalizedHighlights = (highlights ?? [])
    .map((item) => item.replace(/\\n/g, " ").trim())
    .filter((item) => item.length > 0);
  const hasPrimaryCta = Boolean(primaryCta?.label && primaryCta?.href);
  const hasSecondaryCta = Boolean(secondaryCta?.label && secondaryCta?.href);
  const hasActions = hasPrimaryCta || hasSecondaryCta;
  const hasHighlights = normalizedHighlights.length > 0;
  const showSkeleton = loading;

  let delayIndex = 0;
  const nextDelay = () => {
    const value = delayIndex * 0.06;
    delayIndex += 1;
    return value;
  };

  function motionProps(delay = 0) {
    if (prefersReducedMotion) {
      return {};
    }
    return {
      initial: { opacity: 0, y: 28 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
    } as const;
  }

  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={resolvedAlt}
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="block h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-neutral-900/40" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-neutral-950/10 via-neutral-950/45 to-neutral-950/70"
          aria-hidden
        />
      </div>

      <div className="relative section py-24 sm:py-28 lg:py-32">
        <div className="max-w-3xl space-y-6">
          {showSkeleton ? (
            <div className="space-y-5 text-white/0 animate-pulse" aria-hidden>
              <div className="flex items-center gap-4">
                <span className="inline-block h-1 w-16 bg-white/30" />
                <span className="h-3 w-40 rounded bg-white/20" />
              </div>
              <span className="block h-10 w-3/4 rounded bg-white/20" />
              <span className="block h-3 w-2/3 rounded bg-white/10" />
              <span className="block h-3 w-1/2 rounded bg-white/10" />
              <div className="mt-6 flex gap-3">
                <span className="block h-10 w-40 rounded bg-white/20" />
                <span className="block h-10 w-40 rounded border border-white/20" />
              </div>
            </div>
          ) : (
            <>
              {eyebrow ? (
                <motion.div {...motionProps(nextDelay())}>
                  <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.32em] text-white/70">
                    <span
                      className="inline-block h-1 w-16 bg-[var(--accent)]"
                      aria-hidden
                    />
                    {eyebrow}
                  </div>
                </motion.div>
              ) : null}
              <motion.h1
                {...motionProps(nextDelay())}
                className="text-4xl font-semibold leading-tight sm:text-[3rem]"
              >
                {title}
              </motion.h1>
              {subheading ? (
                <motion.p
                  {...motionProps(nextDelay())}
                  className="text-xs uppercase tracking-[0.28em] text-white/60"
                >
                  {subheading}
                </motion.p>
              ) : null}
              {description ? (
                <motion.p
                  {...motionProps(nextDelay())}
                  className="text-lg text-white/75"
                >
                  {description}
                </motion.p>
              ) : null}
              {children ? (
                <motion.div {...motionProps(nextDelay())}>
                  {children}
                </motion.div>
              ) : null}
              {hasActions ? (
                <motion.div
                  {...motionProps(nextDelay())}
                  className="flex flex-wrap items-center gap-3"
                >
                  {hasPrimaryCta ? (
                    <CTAButton href={primaryCta!.href}>
                      {primaryCta!.label}
                    </CTAButton>
                  ) : null}
                  {hasSecondaryCta ? (
                    <a
                      className="inline-flex items-center gap-3 rounded-none border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white/10"
                      href={secondaryCta!.href}
                    >
                      {secondaryCta!.label}
                    </a>
                  ) : null}
                </motion.div>
              ) : null}
              {hasHighlights ? (
                <motion.ul
                  {...motionProps(nextDelay())}
                  className="flex flex-col gap-3 pt-4 text-sm text-white/70"
                >
                  {normalizedHighlights.map((item) => (
                    <li key={item} className="inline-flex items-center gap-2">
                      <span className="h-px w-10 bg-white/30" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </motion.ul>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
