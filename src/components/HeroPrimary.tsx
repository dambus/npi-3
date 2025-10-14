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
}: HeroPrimaryProps) {
  return (
    <Section
      variant={variant === 'inverse' ? 'inverse' : 'brand'}
      className="relative overflow-hidden"
      contentClassName="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16"
      align="left"
    >
      <div
        className={cn(
          'flex flex-col gap-6',
          orientation === 'image-left' ? 'lg:order-2' : 'lg:order-1',
        )}
      >
        {eyebrow ? (
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
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
          <dl className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <dt className="text-sm uppercase tracking-[0.2em] text-white/60">
                  {stat.label}
                </dt>
                <dd className="font-display text-3xl font-semibold text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      {media ? (
        <div
          className={cn(
            'relative h-full w-full overflow-hidden rounded-[--radius-card] bg-white/10 p-4 ring-1 ring-white/10 lg:order-2',
            orientation === 'image-left' ? 'lg:order-1' : 'lg:order-2',
          )}
        >
          {media}
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/10 via-transparent to-black/40 opacity-70" />
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 h-full w-1/3 bg-[radial-gradient(circle_at_top_right,_rgba(0,158,65,0.4),_transparent_60%)]" />
    </Section>
  )
}

export default HeroPrimary
