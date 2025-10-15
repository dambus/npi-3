import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

type SharedProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  loading?: boolean
  className?: string
  children?: ReactNode
}

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
  }

type ButtonAsAnchor = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a'
    href: string
  }

type ButtonAsRouterLink = SharedProps &
  LinkProps & {
    as: 'router-link'
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsRouterLink

type RouterLinkRestProps = Omit<ButtonAsRouterLink, keyof SharedProps | 'as'>
type AnchorRestProps = Omit<ButtonAsAnchor, keyof SharedProps | 'as'>
type NativeButtonRestProps = Omit<ButtonAsButton, keyof SharedProps | 'as'>

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-4 text-base',
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-accent text-white shadow-[0_22px_55px_rgba(0,158,65,0.32)] hover:bg-brand-accent/90 focus-visible:outline-white/70',
  secondary:
    'bg-white text-brand-primary ring-1 ring-brand-primary/10 hover:ring-brand-primary/30 focus-visible:outline-brand-secondary/40',
  tertiary:
    'bg-surface-muted text-brand-primary hover:bg-surface-muted/80 focus-visible:outline-brand-secondary/40',
  ghost:
    'bg-transparent text-brand-accent ring-1 ring-brand-accent/40 hover:bg-brand-accent/10 focus-visible:outline-brand-accent/60',
  link: 'bg-transparent px-0 py-0 text-brand-accent underline decoration-2 underline-offset-4 hover:text-brand-accent/80 focus-visible:outline-none',
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    leadingIcon,
    trailingIcon,
    loading,
    className,
    children,
    as = 'button',
    ...restProps
  } = props

  const isLinkVariant = variant === 'link'
  const resolvedSize: ButtonSize = size
  const resolvedVariant: ButtonVariant = variant
  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70',
    isLinkVariant ? '' : 'rounded-[--radius-pill]',
    isLinkVariant ? 'text-sm' : sizeClasses[resolvedSize],
    variantClasses[resolvedVariant],
    className,
  )

  const content = (
    <>
      {leadingIcon ? (
        <span className="inline-flex items-center justify-center text-lg">
          {leadingIcon}
        </span>
      ) : null}
      <span className="inline-flex items-center">{children}</span>
      {loading ? (
        <span className="inline-flex h-4 w-4 items-center justify-center">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </span>
      ) : trailingIcon ? (
        <span className="inline-flex items-center justify-center text-lg">
          {trailingIcon}
        </span>
      ) : null}
    </>
  )

  if (as === 'router-link') {
    const linkProps = restProps as RouterLinkRestProps
    return (
      <Link
        className={baseClasses}
        aria-busy={loading || undefined}
        {...linkProps}
      >
        {content}
      </Link>
    )
  }

  if (as === 'a') {
    const anchorProps = restProps as AnchorRestProps
    return (
      <a
        className={baseClasses}
        aria-busy={loading || undefined}
        {...anchorProps}
      >
        {content}
      </a>
    )
  }

  const buttonProps = restProps as NativeButtonRestProps
  const { type = 'button', ...nativeButtonProps } = buttonProps

  return (
    <button
      type={type}
      className={baseClasses}
      aria-busy={loading || undefined}
      {...nativeButtonProps}
    >
      {content}
    </button>
  )
}

export default Button
