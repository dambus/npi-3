import type { ElementType, ReactNode } from 'react'
import { cn } from '../lib/cn'

type SectionVariant = 'default' | 'muted' | 'brand' | 'inverse'

const variantStyles: Record<SectionVariant, string> = {
  default: 'bg-surface-default text-brand-primary',
  muted: 'bg-surface-muted text-brand-primary',
  brand: 'bg-surface-brand text-white',
  inverse: 'bg-surface-inverse text-white',
}

export interface SectionProps {
  as?: ElementType
  id?: string
  variant?: SectionVariant
  align?: 'left' | 'center'
  eyebrow?: ReactNode
  title?: ReactNode
  description?: ReactNode
  className?: string
  contentClassName?: string
  headerClassName?: string
  children?: ReactNode
  fullWidth?: boolean
}

export function Section({
  as: Component = 'section',
  id,
  variant = 'default',
  align = 'left',
  eyebrow,
  title,
  description,
  className,
  contentClassName,
  headerClassName,
  children,
  fullWidth = false,
}: SectionProps) {
  const alignmentClasses =
    align === 'center'
      ? 'items-center text-center'
      : 'items-start text-left'

  const eyebrowClasses =
    variant === 'brand' || variant === 'inverse'
      ? 'text-white/70'
      : 'text-brand-accent'

  const descriptionClasses =
    variant === 'brand' || variant === 'inverse'
      ? 'text-white/80'
      : 'text-brand-neutral'

  return (
    <Component
      id={id}
      className={cn('section-spacing', variantStyles[variant], className)}
    >
      <div
        className={cn(
          fullWidth ? 'w-full' : 'container-inset',
          'flex flex-col gap-10',
          alignmentClasses,
          contentClassName,
        )}
      >
        {(eyebrow || title || description) && (
          <div
            className={cn(
              'flex flex-col max-w-3xl gap-5 md:gap-6',
              alignmentClasses,
              headerClassName,
            )}
          >
            {eyebrow ? (
              <p className={cn('text-sm font-semibold tracking-[0.18em] uppercase', eyebrowClasses)}>
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="font-display text-4xl font-semibold leading-tight text-balance md:text-[3.25rem] lg:text-[3.75rem]">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className={cn('text-lg leading-relaxed md:text-xl md:leading-relaxed text-pretty', descriptionClasses)}>
                {description}
              </p>
            ) : null}
          </div>
        )}

        {children}
      </div>
    </Component>
  )
}

export default Section
