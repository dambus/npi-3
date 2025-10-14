import Section from './Section'

const logos = [
  {
    name: 'NIS Gazprom Neft',
    image: '/media/clients/nis.png',
  },
  {
    name: 'Gastrans',
    image: '/media/clients/gas-trans.png',
  },
  {
    name: 'Standards Gas',
    image: '/media/clients/std-gas.png',
  },
  {
    name: 'Siemens Energy',
    image: '/media/clients/siemens.png',
  },
  {
    name: 'NPI Group',
    image: '/media/clients/npi-main.png',
  },
]

export function LogoWall() {
  return (
    <Section
      variant="muted"
      align="center"
      eyebrow="Trusted by leading operators"
      title="Long-term partnerships across oil, gas and energy infrastructure."
      description="We support client teams from early investment planning through commissioning and operations, providing consistent documentation and supervision."
      contentClassName="gap-10"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center justify-center rounded-2xl border border-white/20 bg-white/70 px-6 py-8 shadow-[0_18px_45px_rgba(8,18,40,0.1)] backdrop-blur transition hover:-translate-y-1"
          >
            <img
              src={logo.image}
              alt={`${logo.name} logo`}
              className="h-10 w-auto object-contain grayscale transition hover:grayscale-0"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </Section>
  )
}

export default LogoWall
