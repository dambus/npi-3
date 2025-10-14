import {
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import Button from './Button'

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
  return (
    <header className="relative z-20 bg-[color:var(--color-header-nav)] px-6 text-white shadow-[0_16px_32px_rgba(7,16,40,0.35)] sm:px-10 lg:px-16">
      <div className="py-4">
        <div className="grid w-full items-center gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <a href="#" className="flex items-center justify-start">
            <img
              src="/media/npi-logo.png"
              alt="NPI logo"
              className="h-16 w-auto drop-shadow-[0_18px_35px_rgba(0,0,0,0.35)]"
            />
          </a>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 border-b border-white/10 pb-2 text-[11px] text-white/70">
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
            </div>

            <div className="flex flex-wrap items-center justify-end gap-7 pt-2">
              <nav aria-label="Primary" className="flex flex-1 justify-end">
                <ul className="flex flex-wrap items-center gap-7 text-base font-semibold text-white/80">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="px-1.5 py-2 transition-colors duration-200 ease-out hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <Button
                as="a"
                href="#contact"
                variant="primary"
                size="md"
                className="whitespace-nowrap rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em]"
              >
                Meet with us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
