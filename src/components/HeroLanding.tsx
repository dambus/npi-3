import {
  BeakerIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import Button from './Button'

const heroServices = [
  { name: 'Process & instrumentation design', icon: BeakerIcon },
  { name: 'Mechanical & piping packages', icon: Cog6ToothIcon },
  { name: 'Electrical & automation systems', icon: CpuChipIcon },
  { name: 'Project management & supervision', icon: ClipboardDocumentCheckIcon },
  { name: 'Regulatory compliance & permitting', icon: ShieldCheckIcon },
  { name: 'Commissioning & lifecycle support', icon: WrenchScrewdriverIcon },
]

export function HeroLanding() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-surface-inverse)] pb-36 pt-[5.5rem] text-white md:pb-44">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#152b63] via-[#0f1f4a] to-[#07143a]" />
      <div className="absolute -left-20 top-6 -z-10 h-52 w-52 rounded-full bg-brand-secondary/25 blur-2xl" />
      <div className="absolute bottom-14 left-1/3 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-secondary/15 blur-3xl" />
      <div className="absolute -right-24 top-8 -z-10 h-72 w-72 rounded-full bg-brand-secondary/35 blur-3xl" />

      <div className="container-inset">
        <div className="grid gap-10 pb-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.08fr)] lg:items-center lg:gap-16 xl:gap-20">
          <div className="flex flex-col gap-6">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
              Engineering excellence since 2008
            </span>
            <h1 className="font-display text-[3.35rem] font-extrabold leading-[1.02] text-white md:text-[3.75rem] xl:text-[4.2rem]">
              Designing reliable solutions for oil, gas & energy industries
            </h1>
            <p className="max-w-2xl text-lg text-white/80">
              We turn complex industrial requirements into sustainable engineering solutions that keep critical assets compliant, efficient, and ready for future expansion.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Button
                as="router-link"
                to="/services"
                size="lg"
                className="bg-brand-accent px-8 py-4 text-base uppercase tracking-[0.18em] shadow-[0_24px_55px_rgba(0,158,65,0.35)] hover:bg-brand-accent/90"
              >
                Explore services
              </Button>
              <Button
                as="router-link"
                to="/projects"
                variant="ghost"
                size="lg"
                className="border border-brand-accent/40 bg-transparent px-8 py-4 text-base text-white ring-0 hover:border-brand-accent/70 hover:bg-brand-accent/10"
              >
                View reference projects
              </Button>
            </div>

            <div className="h-2 md:h-3" />
          </div>

          <div className="relative mx-auto h-full w-full max-w-[540px] lg:max-w-[620px] xl:max-w-[680px]">
            <div className="absolute -left-10 top-0 h-16 w-16 rounded-full bg-brand-secondary" />
            <div className="absolute -right-8 bottom-24 h-7 w-7 rounded-full bg-white" />
            <div className="absolute -right-20 top-1/2 hidden h-24 w-24 -translate-y-1/2 rounded-full border-4 border-white/35 lg:block" />

            <div className="relative overflow-hidden rounded-[54px] rounded-b-none border-[6px] border-white/18 bg-white/5 p-4 shadow-[0_52px_100px_rgba(6,16,40,0.45)] backdrop-blur">
              <div className="overflow-hidden rounded-[46px] rounded-b-none">
                <img
                  src="/media/hero-landing.jpg"
                  alt="Engineering team collaborating in meeting room"
                  className="h-full w-full object-cover rounded-b-none"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[46px] rounded-b-none ring-1 ring-inset ring-white/20" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-inset relative">
        <div className="relative z-10 -mt-8 rounded-[1.65rem] border border-brand-accent/18 bg-brand-primary/12 p-5 shadow-[0_45px_90px_rgba(3,10,28,0.55)] backdrop-blur md:-mt-12 lg:-mt-16">
          <div className="grid gap-4 lg:grid-cols-6">
            {heroServices.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.name}
                  className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 text-center text-brand-primary shadow-[0_18px_45px_rgba(9,20,55,0.18)] ring-1 ring-brand-accent/15 transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(0,158,65,0.25)]"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <p className="font-semibold">{service.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroLanding
