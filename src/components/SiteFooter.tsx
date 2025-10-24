import {
  ArrowDownTrayIcon,
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import Button from './Button'
import footerBackground from '../assets/footer/footer.jpg'

const quickContacts = [
  {
    title: 'Call us',
    value: '+381 21 302 05 46',
    href: 'tel:+381213020546',
    icon: PhoneIcon,
  },
  {
    title: 'Email',
    value: 'office@npi.rs',
    href: 'mailto:office@npi.rs',
    icon: EnvelopeIcon,
  },
  {
    title: 'Office hours',
    value: 'Mon - Fri · 08:00-16:00 CET',
    icon: ClockIcon,
  },
]

const navigationGroups = [
  {
    heading: 'Page links',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About us', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Projects', to: '/projects' },
      { label: 'Quality', to: '/quality' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Service focus',
    links: [
      { label: 'Core service lines', to: '/services#services-core' },
      { label: 'Delivery frameworks', to: '/services#services-delivery' },
      { label: 'Documentation packages', to: '/services#services-documentation' },
      { label: 'Workshop readiness', to: '/services#services-workshop' },
      { label: 'Services contact', to: '/services#services-contact' },
    ],
  },
]

const companyDetails = [
  {
    icon: MapPinIcon,
    label: 'Address',
    value: (
      <>
        Fruškogorska 1, NTP
        <br />
        21000 Novi Sad, Serbia
      </>
    ),
  },
  {
    icon: PhoneIcon,
    label: 'Phone',
    value: (
      <a href="tel:+381213020546" className="text-white transition hover:text-brand-accent">
        +381 21 302 05 46
      </a>
    ),
  },
  {
    icon: EnvelopeIcon,
    label: 'Email',
    value: (
      <a href="mailto:office@npi.rs" className="text-white transition hover:text-brand-accent">
        office@npi.rs
      </a>
    ),
  },
]

export function SiteFooter() {
  const currentYear = new Date().getFullYear()
  const logoSrc = '/src/assets/npi logo/npiLogo_original_vectorized_small.png'

  return (
    <footer className="relative mt-auto overflow-hidden bg-[#07163a] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-10 mix-blend-luminosity"
          style={{
            backgroundImage: `url(${footerBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(31,78,216,0.18),transparent_55%),radial-gradient(circle_at_bottom,rgba(0,158,65,0.1),transparent_50%),linear-gradient(135deg,#0b1f4c 0%,#06163a 55%,#040b1f 100%)] opacity-95" />
        <div className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-brand-secondary/25 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-brand-accent/20 blur-3xl" />
      </div>

      <div className="relative container-inset py-16 sm:py-20">
        <div className="grid gap-6 pb-4 sm:grid-cols-3">
          {quickContacts.map((item) => {
            const Icon = item.icon
            const baseClasses =
              'flex items-center gap-4 sm:border-l sm:border-white/12 sm:pl-6 first:sm:border-l-0 first:sm:pl-0'
            const inner = (
              <>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white">
                  <Icon className="h-6 w-6 text-brand-accent" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-normal uppercase tracking-[0.24em] text-white/60">
                    {item.title}
                  </p>
                  <p className="mt-1 text-base font-normal text-white">{item.value}</p>
                </div>
              </>
            )

            return item.href ? (
              <a key={item.title} href={item.href} className={baseClasses}>
                {inner}
              </a>
            ) : (
              <div key={item.title} className={baseClasses}>
                {inner}
              </div>
            )
          })}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.25fr)_minmax(0,0.25fr)]">
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-4 text-white">
              <img
                src={logoSrc}
                alt="Neopetrol Inženjering logo"
                className="h-12 w-auto object-contain"
                loading="lazy"
              />
              <span className="font-display text-2xl font-semibold leading-tight">Neopetrol Inženjering</span>
            </Link>
            <p className="max-w-md text-md leading-relaxed text-white/75">
              Licensed engineers supporting regulated energy and process operators with studies, design, supervision and
              compliance. Reliable documentation and coordination from Novi Sad to regional project sites.
            </p>
            <ul className="space-y-3 text-sm text-white/80">
              {companyDetails.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/8">
                    <Icon className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-normal uppercase tracking-[0.22em] text-white/50">{label}</p>
                    <div className="mt-1 leading-relaxed text-white">{value}</div>
                  </div>
                </li>
              ))}
            </ul>
            <Button
              as="a"
              href="/media/neopetrol-company-profile.pdf"
              download
              variant="ghost"
              size="md"
              leadingIcon={<ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />}
              className="border border-brand-accent/40 bg-brand-accent/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white hover:bg-brand-accent/20"
            >
              Download company profile
            </Button>
          </div>

          {navigationGroups.map((group) => (
            <div key={group.heading}>
              <p className="text-sm font-normal uppercase tracking-[0.28em] text-white/60">
                {group.heading}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="transition hover:text-brand-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Neopetrol Inženjering d.o.o. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="tel:+381213020546" className="transition hover:text-brand-accent">
              +381 21 302 05 46
            </a>
            <span aria-hidden="true" className="text-white/30">
              ·
            </span>
            <a href="mailto:office@npi.rs" className="transition hover:text-brand-accent">
              office@npi.rs
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
