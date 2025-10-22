import Button from './Button'
import Section from './Section'

import aboutImage from '../../input data/design/promo pictures/DSC_8772.jpg'

const heading = 'Engineering partner focused on dependable project delivery.'

const subheading =
  'Neopetrol Inzenjering d.o.o. is a Novi Sad-based engineering and consulting company specialised in the oil, gas and petrochemical sectors. Since 2008 we have delivered reliable documentation and expert support across all phases - from studies and concept designs to detail documentation and site supervision.'

const historySummary =
  'We opened our doors in 2008 as a small drafting office beside the Petrohemija refinery. The founding team kept the same desks, slowed the pace only long enough to mentor graduates, and grew the practice through steady partnerships rather than headline projects.'

const quickFacts = [
  {
    value: '2008',
    label: 'Registration of Neopetrol Inzenjering in Novi Sad',
  },
  {
    value: '17',
    suffix: '',
    label: 'Continuous practice with the original leadership group',
  },
  {
    value: '1200+',
    label: 'Drawings and documents archived from our earliest programmes',
  },
]

export function AboutTeaser() {
  return (
    <Section
      id="about"
      variant="muted"
      align="left"
      fullWidth
      className="relative overflow-hidden lg:py-0"
      contentClassName="relative isolate gap-0 p-0"
    >
      <div className="pointer-events-none absolute inset-y-0 left-[48%] hidden w-[420px] -translate-x-1/2 rounded-full bg-brand-accent/10 blur-3xl lg:block" />
      <div className="grid w-full items-stretch lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)]">
        <div className="relative z-10 flex flex-col justify-center gap-10 px-6 py-16 sm:px-10 md:py-20 lg:pl-[var(--spacing-container)] lg:pr-14 xl:pl-[var(--spacing-container)] xl:pr-16 2xl:pl-[calc((100vw-var(--size-content))/2)] 2xl:pr-20">
          <div className="flex max-w-[620px] flex-col gap-6 text-brand-primary">
            <h2 className="font-display text-4xl font-semibold leading-tight text-balance md:text-[3.25rem] lg:text-[3.6rem]">
              {heading}
            </h2>
            <p className="text-lg leading-relaxed text-brand-neutral md:text-xl md:leading-relaxed text-pretty">
              {subheading}
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <p className="max-w-[520px] text-sm leading-relaxed text-brand-primary/75 md:text-base">
              {historySummary}
            </p>

            <div className="mt-4 mb-6 grid gap-6 sm:grid-cols-3">
              {quickFacts.map((item, index) => (
                <div
                  key={item.label}
                  className="group relative flex flex-col items-center gap-4 rounded-xl border border-brand-primary/0 bg-white/10 p-6 py-12 text-center shadow-[0_32px_70px_rgba(8,24,55,0.12)] backdrop-blur"
                >
                  <div className="relative flex flex-col items-center gap-3">
                    <div className="relative inline-flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-white/70 bg-white text-brand-primary shadow-[0_16px_30px_rgba(8,24,55,0.22)]">
                      <span className="pointer-events-none absolute inset-0 rounded-full border border-brand-secondary/10 transition-transform duration-300 group-hover:scale-105" />
                      <span className="pointer-events-none absolute inset-1 rounded-full border border-brand-secondary/15 opacity-80" />
                      <span
                        className="pointer-events-none absolute -inset-2 z-0 rounded-full bg-brand-secondary/60 blur-sm mix-blend-screen animate-orbit-one scale-80"
                        style={{ animationDelay: `${index * 3}s` }}
                      />
                      <span
                        className="pointer-events-none absolute -inset-4 z-0 rounded-full bg-brand-accent/50 blur-none mix-blend-screen animate-orbit-two scale-75"
                        style={{ animationDelay: `${index * 0.9 + 0.45}s` }}
                      />
                      <span className="relative z-10 font-display text-3xl font-bold tracking-tight md:text-3xl text-brand-secondary/75">
                        {item.value}
                        {item.suffix ? (
                          <span className="ml-1 align-baseline text-sm font-semibold uppercase tracking-[0.22em] text-brand-secondary/70">
                            {item.suffix}
                          </span>
                        ) : null}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-brand-neutral md:text-base mt-4">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              as="router-link"
              to="/about"
              variant="primary"
              size="lg"
              className="inline-flex items-center gap-2 self-start rounded-full px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] shadow-[0_28px_60px_rgba(0,158,65,0.28)]"
            >
              Learn more
            </Button>
          </div>
        </div>

        <div className="relative isolate order-first h-[320px] overflow-hidden sm:h-[460px] lg:order-none lg:h-full">
          <img
            src={aboutImage}
            alt="Neopetrol team working at the Novi Sad studio"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-brand-primary/85 via-brand-primary/45 to-transparent" />
          <div className="absolute inset-0 bg-brand-primary/15 mix-blend-multiply" />
          <span className="pointer-events-none absolute -right-16 top-8 hidden h-44 w-44 rounded-full border border-white/15 lg:block" />
          <span className="pointer-events-none absolute bottom-8 right-8 inline-flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-full border border-white/60 bg-white/12 text-center uppercase tracking-[0.28em] text-white/85 shadow-[0_25px_60px_rgba(6,20,46,0.45)] backdrop-blur-sm transition-transform duration-300 sm:h-36 sm:w-36 sm:gap-1.5 md:bottom-10 md:right-10 lg:h-40 lg:w-40">
            <span className="text-[0.6rem] font-semibold text-white/70 sm:text-[0.65rem]">
              Since
            </span>
            <span className="font-display text-2xl font-bold tracking-[0.12em] text-white sm:text-[1.75rem] md:text-[2rem]">
              2008
            </span>
          </span>
        </div>
      </div>
    </Section>
  )
}

export default AboutTeaser
