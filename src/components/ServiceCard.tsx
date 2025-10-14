import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import Button from './Button'

type ServiceCardVariant = 'outline' | 'filled' | 'ghost'

const variantClasses: Record<ServiceCardVariant, string> = {
  outline:
    'border border-brand-primary/10 bg-white/95 backdrop-blur hover:border-brand-accent/50 hover:shadow-[0_24px_55px_rgba(0,158,65,0.18)]',
  filled:
    'bg-brand-secondary text-white shadow-[var(--shadow-card)] hover:shadow-[0_28px_60px_rgba(16,76,186,0.35)]',
  ghost:
    'border border-transparent bg-surface-muted/60 hover:border-brand-accent/40',
}

export interface ServiceCardProps {
  icon?: ReactNode
  title: string
  description?: string
  href?: string
  ctaLabel?: string
  variant?: ServiceCardVariant
  className?: string
  footer?: ReactNode
  children?: ReactNode
}

export function ServiceCard({
  icon,
  title,
  description,
  href,
  ctaLabel = 'Learn more',
  variant = 'outline',
  className,
  footer,
  children,
}: ServiceCardProps) {
  const isFilled = variant === 'filled'

  return (
    <article
      className={cn(
        'flex h-full flex-col gap-6 rounded-xl p-6 transition-transform duration-200 ease-out hover:-translate-y-1 focus-within:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent',
        variantClasses[variant],
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        {icon ? (
          <span
            className={cn(
              'inline-flex h-12 w-12 items-center justify-center rounded-[--radius-pill] text-xl',
              isFilled ? 'bg-white/15 text-white' : 'bg-brand-accent/10 text-brand-accent',
            )}
          >
            {icon}
          </span>
        ) : null}
        <h3 className="font-display text-2xl font-semibold leading-snug text-balance">
          {title}
        </h3>
        {description ? (
          <p
            className={cn(
              'text-base leading-relaxed text-pretty',
              isFilled ? 'text-white/80' : 'text-brand-neutral',
            )}
          >
            {description}
          </p>
        ) : null}
        {children}
      </div>

      {(href || footer) && (
        <div className="mt-auto flex items-end justify-between gap-4">
          {href ? (
            <Button
              as="a"
              href={href}
              variant={isFilled ? 'secondary' : 'link'}
              size="sm"
              className={cn(
                'uppercase tracking-[0.14em]',
                isFilled
                  ? 'rounded-[--radius-pill] px-5 py-2 text-xs font-semibold text-brand-primary shadow-none hover:bg-white/90'
                  : 'no-underline text-brand-accent hover:text-brand-accent/80',
              )}
            >
              {ctaLabel}
            </Button>
          ) : null}
          {footer}
        </div>
      )}
    </article>
  )
}

export default ServiceCard
