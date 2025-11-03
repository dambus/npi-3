import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Section } from './Section'

export interface HeroStat {
  label: string
  value: string
}

export interface HeroPrimaryProps {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  media?: ReactNode
  orientation?: 'image-right' | 'image-left'
  stats?: HeroStat[]
  variant?: 'brand' | 'inverse'
  background?: ReactNode
  backgroundOverlayClassName?: string
}

export function HeroPrimary({
  eyebrow,
  title,
  description,
  actions,
  media,
  orientation = 'image-right',
  stats,
  variant = 'brand',
  background,
  backgroundOverlayClassName,
}: HeroPrimaryProps) {
  const overlayClasses =
    backgroundOverlayClassName ??
    'bg-gradient-to-br from-white/10 via-transparent to-black/40 opacity-70'

  return (
    <Section
      variant={variant === 'inverse' ? 'inverse' : 'brand'}
      className="relative isolate overflow-hidden"
      contentClassName="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16"
      align="left"
    >
      {background ? (
        <div className="pointer-events-none absolute inset-0 z-0">
          {background}
        </div>
      ) : null}
      <div
        className={cn(
          'relative z-20 flex flex-col gap-6',
          orientation === 'image-left' ? 'lg:order-2' : 'lg:order-1',
        )}
      >
        {eyebrow ? (
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="font-display text-4xl font-semibold leading-tight text-balance md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="text-lg leading-relaxed text-white/80 md:text-xl">
            {description}
          </p>
        ) : null}
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        {stats?.length ? (
          <dl className="grid w-full grid-cols-2 justify-items-center gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group flex flex-col items-center gap-3 text-center"
              >
                <dt className="order-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60 transition-colors duration-300 group-hover:text-white">
                  {stat.label}
                </dt>
                <dd className="order-1">
                  <div className="relative flex h-28 w-28 items-center justify-center overflow-visible">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-[-12%] rounded-full border border-white/20 opacity-50 blur-[1px] animate-hero-stat-pulse"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/25 via-white/10 to-transparent opacity-60 blur-md transition-opacity duration-500 group-hover:opacity-80"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-1 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm"
                    />
                    <span className="relative z-10 flex h-[85%] w-[85%] items-center justify-center rounded-full bg-gradient-to-br from-white/20 via-white/10 to-white/5 text-white shadow-[0_22px_55px_rgba(3,10,28,0.45)] transition-transform duration-500 group-hover:scale-105">
                      <span className="font-display text-3xl font-semibold text-white drop-shadow-[0_4px_12px_rgba(3,10,28,0.5)]">
                        {stat.value}
                      </span>
                    </span>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      {media ? (
        <div
          className={cn(
            'relative z-20 h-full w-full overflow-hidden rounded-[--radius-card] bg-white/10 p-4 ring-1 ring-white/10 lg:order-2',
            orientation === 'image-left' ? 'lg:order-1' : 'lg:order-2',
          )}
        >
          {media}
        </div>
      ) : null}

      <div className={cn('pointer-events-none absolute inset-0 z-10', overlayClasses)} />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] h-full w-1/3 bg-[radial-gradient(circle_at_top_right,_rgba(0,158,65,0.4),_transparent_60%)]" />
    </Section>
  )
}

export default HeroPrimary
