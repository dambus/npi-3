import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import Button from './Button'

type ClassValue = string | false | null | undefined

function cx(...values: ClassValue[]) {
  return values.filter(Boolean).join(' ')
}

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#portfolio' },
  { label: 'Blog', href: '#news' },
  { label: 'Contact', href: '#contact' },
]

const topBarItems = [
  {
    icon: PhoneIcon,
    label: 'Call us:',
    value: '+381 11 405 52 90',
    href: 'tel:+381114055290',
  },
  {
    icon: EnvelopeIcon,
    label: 'Email:',
    value: 'office@npi.rs',
    href: 'mailto:office@npi.rs',
  },
  {
    icon: MapPinIcon,
    label: 'Address:',
    value: 'Bulevar Vudroa Vilsona 12, Beograd',
    href: 'https://maps.google.com/?q=Bulevar%20Vudroa%20Vilsona%2012%20Beograd',
  },
  {
    icon: ClockIcon,
    label: 'Hours:',
    value: '08:00 - 16:00 CET',
  },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeHref, setActiveHref] = useState<string>(() => {
    if (typeof window === 'undefined') return '#'
    return window.location.hash || '#'
  })

  const lastYRef = useRef(0)
  const hiddenRef = useRef(false)
  const upAccumRef = useRef(0)
  const scrolledRef = useRef(false)
  const COMPACT_ENTER = 180
  const COMPACT_EXIT = 120
  const HIDE_THRESHOLD = 260

  useEffect(() => {
    hiddenRef.current = hidden
  }, [hidden])

  useEffect(() => {
    scrolledRef.current = scrolled
  }, [scrolled])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const getHash = () => window.location.hash || '#'

    const onHashChange = () => {
      setActiveHref(getHash())
    }

    onHashChange()
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    let ticking = false

    const getY = () => {
      const winOffset = window.scrollY ?? window.pageYOffset ?? 0
      const docOffset = document.documentElement?.scrollTop ?? 0
      const bodyOffset = document.body?.scrollTop ?? 0
      return Math.max(winOffset, docOffset, bodyOffset, 0)
    }

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = getY()
        const last = lastYRef.current
        const dy = y - last
        const atTop = y <= 0
        const beyondFold = y >= (window.innerHeight || 0)
        const hideThresholdReached = y > HIDE_THRESHOLD

        let nextScrolled = scrolledRef.current
        if (nextScrolled) {
          if (y < COMPACT_EXIT) {
            nextScrolled = false
          }
        } else if (y > COMPACT_ENTER) {
          nextScrolled = true
        }

        if (nextScrolled !== scrolledRef.current) {
          scrolledRef.current = nextScrolled
          setScrolled(nextScrolled)
        }

        if (atTop) {
          if (hiddenRef.current) setHidden(false)
          upAccumRef.current = 0
          lastYRef.current = y
          ticking = false
          return
        }

        if (dy > 0) {
          upAccumRef.current = 0
          if (!hiddenRef.current && hideThresholdReached) {
            setHidden(true)
          }
        } else if (dy < 0) {
          if (hiddenRef.current && beyondFold) {
            upAccumRef.current += -dy
            if (upAccumRef.current >= 16) {
              setHidden(false)
              upAccumRef.current = 0
            }
          } else if (!hiddenRef.current && !hideThresholdReached) {
            setHidden(false)
          }
        }

        lastYRef.current = y
        ticking = false
      })
    }

    lastYRef.current = getY()
    const initialScrolled = lastYRef.current > COMPACT_ENTER
    scrolledRef.current = initialScrolled
    setScrolled(initialScrolled)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <motion.header
      layout
      initial={false}
      transition={{ layout: { duration: 0.28, ease: 'easeOut' } }}
      className={cx(
        'sticky top-0 z-30 w-full border-b border-transparent bg-[color:var(--color-header-nav)] px-6 text-white transition-[transform,opacity] duration-300 ease-out will-change-transform sm:px-10 lg:px-16',
        scrolled && 'backdrop-blur-md border-white/10 shadow-[0_18px_45px_rgba(7,16,40,0.5)]',
        hidden
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100 pointer-events-auto',
      )}
    >
      <motion.div
        layout
        className={cx(
          'transition-all duration-300 ease-out',
          scrolled ? 'py-2' : 'py-4',
        )}
      >
        <motion.div
          layout
          className={cx(
            'grid w-full items-center gap-6 lg:grid-cols-[220px_minmax(0,1fr)]',
            scrolled && 'gap-4',
          )}
        >
          <a href="#" className="flex items-center justify-start">
            <img
              src="/media/npi-logo.png"
              alt="NPI logo"
              className={cx(
                'w-auto drop-shadow-[0_18px_35px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out',
                scrolled ? 'h-14' : 'h-16',
              )}
            />
          </a>

          <motion.div
            layout
            className={cx(
              'flex flex-col transition-all duration-300 ease-out',
              scrolled ? 'gap-2' : 'gap-4',
            )}
          >
            <AnimatePresence initial={false}>
              {!scrolled && (
                <motion.div
                  key="top-bar"
                  layout
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -12, height: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 border-b border-white/10 pb-2 text-[11px] text-white/70"
                  style={{ overflow: 'hidden' }}
                >
                  {topBarItems.map((item) => {
                    const Icon = item.icon
                    const inner = (
                      <>
                        <Icon className="h-3.5 w-3.5 text-brand-secondary" aria-hidden="true" />
                        <span className="font-medium text-white/60">{item.label}</span>
                        <span className="font-semibold text-white">{item.value}</span>
                      </>
                    )

                    return (
                      <span key={item.label} className="flex items-center gap-2">
                        {item.href ? (
                          <a
                            href={item.href}
                            className="flex items-center gap-2 text-white/70 transition hover:text-white"
                          >
                            {inner}
                          </a>
                        ) : (
                          <span className="flex items-center gap-2 text-white/70">
                            {inner}
                          </span>
                        )}
                      </span>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              layout
              className={cx(
                'flex flex-wrap items-center justify-end gap-7 transition-all duration-300 ease-out',
                scrolled ? 'pt-1' : 'pt-2',
              )}
            >
              <nav aria-label="Primary" className="flex flex-1 justify-end">
                <ul className="flex flex-wrap items-center gap-7 text-base font-semibold text-white/80">
                  {navLinks.map((link) => {
                    const isActive =
                      activeHref === link.href ||
                      (!activeHref && link.href === '#') ||
                      (activeHref === '#' && link.href === '#')

                    return (
                      <li key={link.label} className="relative flex items-center">
                        <a
                          href={link.href}
                          className={cx(
                            'px-1.5 py-2 transition-colors duration-200 ease-out',
                            isActive ? 'text-white' : 'text-white/70 hover:text-white',
                          )}
                          onClick={() => setActiveHref(link.href)}
                        >
                          {link.label}
                        </a>
                        <span
                          className={cx(
                            'pointer-events-none absolute left-1/2 top-full mt-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[color:var(--color-brand-accent,#009E41)] transition-all duration-200 ease-out',
                            isActive
                              ? 'scale-100 opacity-100'
                              : 'scale-50 opacity-0',
                          )}
                          aria-hidden="true"
                        />
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <Button
                as="a"
                href="#contact"
                variant="primary"
                size="md"
                className="whitespace-nowrap rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em]"
              >
                Meet with us
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.header>
  )
}

export default SiteHeader
