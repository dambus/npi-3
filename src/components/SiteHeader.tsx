import { createPortal } from 'react-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from './Button'
import { useHeaderMetrics } from '../hooks/useHeaderMetrics'

type ClassValue = string | false | null | undefined

function cx(...values: ClassValue[]) {
  return values.filter(Boolean).join(' ')
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-6 items-center justify-center" aria-hidden="true">
      <motion.span
        layout
        initial={false}
        animate={{
          rotate: open ? 45 : 0,
          y: open ? 0 : -6,
          width: open ? '100%' : '90%',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute h-0.5 rounded-full bg-current"
      />
      <motion.span
        layout
        initial={false}
        animate={{
          opacity: open ? 0 : 1,
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="absolute h-0.5 w-3/4 rounded-full bg-current"
      />
      <motion.span
        layout
        initial={false}
        animate={{
          rotate: open ? -45 : 0,
          y: open ? 0 : 6,
          width: open ? '100%' : '60%',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute h-0.5 rounded-full bg-current"
      />
    </span>
  )
}

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const location = useLocation()
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const { setHeaderElement } = useHeaderMetrics()
  const scrollStateRef = useRef({
    lastY: 0,
    hidden: false,
    scrolled: false,
  })
  const SCROLL_COMPACT_THRESHOLD = 140
  const SCROLL_COMPACT_HYSTERESIS = 48 // hysteresis keeps header from oscillating when scroll position jitters near the top
  const SCROLL_COMPACT_ENTER_THRESHOLD = SCROLL_COMPACT_THRESHOLD + SCROLL_COMPACT_HYSTERESIS
  const SCROLL_COMPACT_EXIT_THRESHOLD = Math.max(
    0,
    SCROLL_COMPACT_THRESHOLD - SCROLL_COMPACT_HYSTERESIS,
  )
  const HIDE_SCROLL_THRESHOLD = 220
  const TOGGLE_DELTA = 12

  const assignHeaderRef = useCallback(
    (node: HTMLElement | null) => {
      headerRef.current = node
      setHeaderElement(node)
    },
    [setHeaderElement],
  )

  useEffect(() => {
    scrollStateRef.current.hidden = hidden
  }, [hidden])

  useEffect(() => {
    scrollStateRef.current.scrolled = scrolled
  }, [scrolled])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const originalOverflow = document.body.style.overflow
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }

      if (event.key !== 'Tab' || !mobileMenuRef.current) return

      const focusableSelectors =
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      const focusable = Array.from(
        mobileMenuRef.current.querySelectorAll<HTMLElement>(focusableSelectors),
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault()
          last.focus()
        }
      } else if (document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const menuEl = mobileMenuRef.current
    menuEl?.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keydown', handleKeyDown)

    if (menuEl) {
      const focusable = menuEl.querySelector<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])',
      )
      focusable?.focus()
    }

    return () => {
      menuEl?.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const state = scrollStateRef.current
    state.lastY = window.scrollY ?? window.pageYOffset ?? 0
    state.scrolled = state.lastY > SCROLL_COMPACT_THRESHOLD
    setScrolled(state.scrolled)

    if (state.lastY <= 0) {
      state.hidden = false
      setHidden(false)
    }

    let frame: number | null = null

    const update = () => {
      frame = null
      const current = Math.max(window.scrollY ?? window.pageYOffset ?? 0, 0)
      const delta = current - state.lastY

      const nextScrolled = state.scrolled
        ? current > SCROLL_COMPACT_EXIT_THRESHOLD
        : current > SCROLL_COMPACT_ENTER_THRESHOLD
      if (nextScrolled !== state.scrolled) {
        state.scrolled = nextScrolled
        setScrolled(nextScrolled)
      }

      if (mobileOpen) {
        if (state.hidden) {
          state.hidden = false
          setHidden(false)
        }
        state.lastY = current
        return
      }

      if (current <= 0) {
        if (state.hidden) {
          state.hidden = false
          setHidden(false)
        }
        state.lastY = current
        return
      }

      if (delta > TOGGLE_DELTA && current > HIDE_SCROLL_THRESHOLD) {
        if (!state.hidden) {
          state.hidden = true
          setHidden(true)
        }
      } else if (delta < -TOGGLE_DELTA) {
        if (state.hidden) {
          state.hidden = false
          setHidden(false)
        }
      }

      state.lastY = current
    }

    const handleScroll = () => {
      if (frame !== null) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [mobileOpen])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const state = scrollStateRef.current
    state.lastY = window.scrollY ?? window.pageYOffset ?? 0
    state.hidden = false
    state.scrolled = state.lastY > SCROLL_COMPACT_THRESHOLD

    setHidden(false)
    setScrolled(state.scrolled)

    if (mobileOpen) {
      setMobileOpen(false)
    }
  }, [location.pathname]) // eslint-disable-line react-hooks-exhaustive-deps // eslint-disable-line react-hooks/exhaustive-deps

  const mobileNavLayer =
    isClient &&
    createPortal(
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[110] flex flex-col bg-[rgba(4,12,28,0.75)] backdrop-blur-sm lg:hidden"
            role="presentation"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="pointer-events-auto flex h-full w-full flex-col px-4 pb-5 pt-[6rem] sm:px-6 sm:pt-[6.5rem]"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/12 bg-[rgba(6,16,40,0.94)] text-white shadow-[0_45px_95px_rgba(5,12,32,0.6)]"
                id="mobile-nav"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                tabIndex={-1}
                ref={mobileMenuRef}
              >
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                    Navigate
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    aria-label="Close navigation"
                  >
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-6 pt-6">
                  <nav aria-label="Mobile primary" className="flex-1">
                    <ul className="flex flex-col gap-2 text-lg font-semibold">
                      {navLinks.map((link) => (
                        <li key={link.label}>
                          <NavLink
                            to={link.to}
                            end={link.to === '/'}
                            className={({ isActive }: { isActive: boolean }) =>
                              cx(
                                'flex items-center justify-between rounded-xl border px-4 py-4 text-base transition-all duration-200',
                                isActive
                                  ? 'border-white/35 bg-white/10 text-white shadow-[0_18px_45px_rgba(7,16,40,0.45)]'
                                  : 'border-white/10 text-white/80 hover:border-white/20 hover:bg-white/6 hover:text-white',
                              )
                            }
                          >
                            {({ isActive }: { isActive: boolean }) => (
                              <>
                                <span className="flex items-center gap-3">
                                  <span
                                    aria-hidden="true"
                                    className={cx(
                                      'inline-flex h-1.5 w-1.5 rounded-full transition-all duration-300',
                                      isActive ? 'scale-100 bg-brand-accent' : 'scale-75 bg-white/25',
                                    )}
                                  />
                                  <span>{link.label}</span>
                                </span>

                                <span
                                  className={cx(
                                    'inline-flex h-1 w-7 rounded-full transition-all duration-300',
                                    isActive ? 'bg-brand-accent/80' : 'bg-white/10',
                                  )}
                                >
                                </span>
                              </>
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    )

  return (
    <>
      <motion.header
        ref={assignHeaderRef}
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
      data-site-header
    >
      <motion.div
        layout
        className={cx(
          'transition-all duration-300 ease-out',
          scrolled ? 'py-3' : 'py-5',
        )}
      >
        <motion.div
          layout
          className={cx(
            'flex w-full items-center justify-between gap-4 lg:grid lg:grid-cols-[220px_minmax(0,1fr)]',
            scrolled && 'gap-3',
          )}
        >
            <Link to="/" className="flex items-center justify-start" aria-label="NPI home">
              <img
                src="/media/npi-logo.png"
                alt="NPI logo"
                className={cx(
                  'w-auto drop-shadow-[0_18px_35px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out',
                  scrolled ? 'h-14' : 'h-16',
                )}
              />
            </Link>

          <motion.div
            layout
            className={cx(
              'flex w-full items-center justify-end gap-3 transition-all duration-300 ease-out',
              scrolled ? 'py-1' : 'py-2',
            )}
          >
              <nav aria-label="Primary" className="hidden flex-1 justify-end lg:flex">
                <ul className="flex flex-wrap items-center gap-7 text-base font-semibold text-white/80">
                  {navLinks.map((link) => (
                    <li key={link.label} className="relative flex items-center">
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }: { isActive: boolean }) =>
                          cx(
                            'relative inline-flex items-center px-1.5 py-2 transition-colors duration-200 ease-out',
                            isActive ? 'text-white' : 'text-white/70 hover:text-white',
                          )
                        }
                      >
                        {({ isActive }: { isActive: boolean }) => (
                          <>
                            <span>{link.label}</span>
                            <span
                              className={cx(
                                'pointer-events-none absolute left-1/2 top-full mt-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[color:var(--color-brand-accent,#009E41)] transition-all duration-200 ease-out',
                                isActive
                                  ? 'scale-100 opacity-100'
                                  : 'scale-50 opacity-0',
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <Button
                as="router-link"
                to="/contact"
                variant="primary"
                size="md"
                className="inline-flex flex-shrink-0 whitespace-nowrap rounded-full px-4 py-3 text-[0.625rem] font-semibold uppercase tracking-[0.18em] shadow-[0_18px_40px_rgba(0,158,65,0.28)] sm:text-xs lg:px-6 lg:text-xs"
              >
                Meet with us
              </Button>

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                className={cx(
                  'inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/35 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 lg:hidden',
                  mobileOpen && 'border-white/40 bg-white/10',
                )}
                aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                <Hamburger open={mobileOpen} />
                <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
    </motion.header>

      {mobileNavLayer}
    </>
  )
}

export default SiteHeader
