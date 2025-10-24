# Design Notes

## Brand & Mood
- Base palette: dark, refined tones with high-contrast accents; validate against assets in `input data/design`.
- Typography: pairing of geometric sans for headings (e.g., Inter, Poppins) and humanist sans for body (e.g., Source Sans 3); maintain 1.25–1.33 modular scale.
- Tone: professional, engineering-focused copy with restrained marketing language.
- White space: generous spacing to emphasize clarity and premium feel.

## Layout & Grid
- Use 12-column grid with 24px base gutter on desktop, collapsing to 4-column grid on tablet and single-column stack on mobile.
- Max content width 1200–1280px; hero sections may extend full width with background imagery.
- Section vertical rhythm: 80–96px desktop, 56–64px tablet, 40–48px mobile.
- Introduce `Section` component wrapper to standardize padding, background variants (default, dark, muted), and align SEO headings.

## Navigation & Header
- Sticky header with transparent background over hero, switching to solid background on scroll.
- Include language toggle placeholder (SR/EN) even if secondary language deferred.
- Mobile menu: hamburger-triggered fullscreen drawer with focus trap, quick contact shortcuts and CTA mirrored from desktop; closes on route change and `Esc`.

## Key Components
- `HeroPrimary`: eyebrow, H1, supporting copy, primary CTA, optional secondary CTA.
- `ValueIconsSection`: floating KPI ribbon that overlaps preceding hero (gradient split navy/white), counters in display font, centered eyebrow/title copy followed by tabbed content (icons, animated underline). Each tab pairs narrative copy with irregular masked imagery and orbiting accent layers; ensure tabs stay keyboard accessible.
- `AboutTeaser`: muted background section with two-column layout; left side uses numbered highlight tiles + KPI cards, right side features glassy “Integrated disciplines” card with discipline pills and supporting details. CTA mirrors hero primary button treatment.
- `ServiceCard` and `ProjectCard`: use shared elevation styles (border + subtle shadow), highlight CTA arrow on hover.
- `LogoWall`: grayscale logos with 50% opacity baseline; increase opacity on hover/focus.
- `FilterBar`: pill buttons with active state accent color; support keyboard navigation.
- `ContactForm` / `ApplyForm`: two-column on desktop, stacked on mobile; integrate validation states with Tailwind error styles.
- `FeaturedServicesSection`: single merged services band. Top block: intro copy left, featured trio of image-driven cards right/stacked with per-card accent gradients. Middle CTA: horizontal gradient panel with left-aligned messaging, vertically stacked steps timeline, and luminous secondary button. Bottom grid: detailed services cards share height, no tinted icon background by default (`iconStyle="none"`).
- `ProjectsTeaserSection`: headline and description introduce the references section, followed by centred About-style orbit counters. Project cards sit below in a responsive grid with brand-gradient industry tags and a ghost “See all projects” button.
- `FooterPrimary` (`SiteFooter`): dark navy band using `src/assets/footer/footer.jpg` at low opacity beneath radial gradients. Top row holds phone/email/hours as inline items with circular icon badges and slim vertical dividers on desktop (no card backgrounds). Main grid: brand logo image + description + contact list + download CTA on the left, two navigation columns on the right. Footer remains linkable to `/` without hover color shift; download CTA uses ghost button variant.
- `FooterCTA`: inverse band with primary CTA for PDF download (matching contact form button styling) and secondary ghost button linking to contact form. (Use only if additional mid-page CTA required; main footer already includes download link.)
- `ProjectDetailPage`: hero uses blurred project imagery with gradient overlay, stacked breadcrumb, category pill, H1 and summary. Below, overview content occupies `lg:col-span-7`/`xl:col-span-8` with the sidebar on the remaining columns. Sidebar contains rounded detail card, tag chips, and gradient contact callout. Gallery thumbnails display in a responsive grid (1/2/3 columns) with hover overlay; modal viewer locks scroll and supports keyboard navigation. Previous/next navigation renders as uppercase pill buttons that stack on mobile.

## Imagery & Media
- Source hero/background images from `input data/design`; convert to WebP (1600px width) and provide fallback if necessary.
- Maintain aspect ratios: project cards 3:2, logo tiles 1:1, team imagery 4:3.
- Store optimized assets under `public/media` or `src/assets`; document naming convention (`project_slug-hero.webp`).
- Footer background image lives at `src/assets/footer/footer.jpg`; apply 30–40% opacity with blend overlay so typography remains readable.
- Provide descriptive alt text referencing engineering context (e.g., “Process piping 3D model for refinery revamp”).

## Component System
- Base Tailwind theme tokens: `--color-brand-primary #0E1E2A`, `--color-brand-secondary #104CBA`, `--color-brand-accent #009E41`, `--color-brand-neutral #898889`; expose as `bg-brand-*`, `text-brand-*`, `border-brand-*` via Tailwind 4 theme API.
- `Section` layout wrapper with props for background tone (`default`, `muted`, `brand`, `inverse`), optional eyebrow, headline slot, content grid (12/6/4 columns responsive).
- `HeroPrimary` for marketing heroes: supports media on right/left, primary/secondary CTA buttons, optional badge, gradient overlay control.
- `StatsStrip` for KPI counters with icon, value, label; multi-column responsive 4/2/1 layout.
- `LogoWall` grid with optional `variant="carousel"`; accepts array of logos with monochrome toggle.
- `ServiceCard` reusable card with icon slot, title, body, CTA; variant knobs: `outline`, `filled`, `ghost`.
- `FeatureTiles` (3-up feature blocks) with icon, heading, description; supports light/dark backgrounds.
- `TestimonialCard` with avatar, quote, attribution; layout toggle `vertical`/`horizontal` and rating optional.
- `TeamMemberCard` with photo, role, social links; consistent aspect (3:4) and hover overlay variant.
- `PricingTable` with tier cards, supports featured tier badge, bullet list, CTA alignment.
- `ContactForm` module with FormFields grid, info sidebar slot, success/error state messaging.
- `CTAInline` banner (newsletter/signup) with background options, input/CTA arrangement.
- `ProjectGallery` for portfolio grid w/ filter and masonry support; integrate quick view modal option.
- `ProjectDetailLayout` for single case study: hero, metadata summary, rich body blocks, related projects.
- `BlogCard` (news tile) with meta, excerpt, categories; variant for horizontal list vs grid.
- `FooterPrimary` multi-column layout with brand block, nav columns, contact info; expandable accordions on mobile.
- `TopBar` utility strip for contact info and hours; sticky optional.
- `Breadcrumb` inline component with separators; themeable focus states.
- `ContactInfoCard` (single instance currently) but good candidate for reuse across pages.
- `FAQAccordion` for future expansions; base collapsible component styled with brand tokens.
- `MetricsBadge` small stat pill used in hero ribbons (e.g., "520+ Projects Done").
- `StepsTimeline` for process sections; vertical on desktop, accordion on mobile.
- `ResourceCard` for downloads/whitepapers; includes icon, title, description, metadata chip.
- `FormField` primitives (Input, Select, Textarea, Checkbox) with integrated label, help text, validation states; central Tailwind classes.
- `Button` variations (`primary`, `secondary`, `tertiary`, `link`, `icon`), size scale, icon slots, loading state.
- `Badge` / `Pill` tokens for status labels (e.g., "IT Support").
- `Modal` shell for contact prompts or gallery quick views.
- `Carousel` wrapper to power sliding sections (testimonials, logos) with arrow/dot controls.
- `Tabs` component for content switching (future knowledge base).
## Color & Theming
- Legacy brand colors sampled from `npiLogo_original.png`: `#898889` (graphite gray) for structural elements and `#009E41` (petroleum green) for accent blocks; incorporate into palette decisions and Tailwind tokens.
- Primary: deep navy/charcoal for backgrounds. Secondary accent: desaturated amber or petroleum green for CTAs.
- Neutral scale for cards/backgrounds: `charcoal-900`, `slate-700`, `gray-100`.
- Define CSS variables (via Tailwind config) for brand palette and spacing tokens for consistent usage.

## Motion & Interaction
- Use subtle fade + translateY (12–24px) on scroll-triggered sections; respect `prefers-reduced-motion`.
- Buttons: 200ms ease-out transitions, focus ring color aligned to accent palette.
  - Logo wall and cards: scale 1.02 on hover with shadow accent.
  - ValueIconsSection tabs fade between panels (~420ms) and keep two masked orbit layers visible; ensure motion pauses under `prefers-reduced-motion`.

## Accessibility
- Maintain minimum 4.5:1 contrast for text/background combinations.
- Use semantic heading structure (one H1 per page, descending order).
- Ensure keyboard navigation coverage, visible focus states, ARIA labels for icon-only controls.
- Validate forms with inline error messaging and screen reader announcements.

## SEO & Metadata
- Coordinate with `SEOHead` component for per-page `<title>`, meta description, structured data (Organization, LocalBusiness, BreadcrumbList).
- Prepare OG/Twitter image templates (1200x630) reflecting hero style.
- Exclude admin routes from sitemap and robots (`Disallow: /admin`).

## Admin & Hidden Routes
- Place admin dashboard under `/admin` (and optional nested `/admin/projects`, etc.) with basic authentication guard.
- Admin UI should reuse same design system but can operate with denser tables/forms; avoid exposing links in main navigation or footer.

## Responsive Guidelines
- Mobile-first approach; ensure hero copy remains readable (max 5 lines).
- Switch value cards and service cards to carousel/stack on narrow viewports.
- For complex tables (e.g., licenses), provide collapsible accordions on mobile.

## Outstanding Questions
- Confirm brand typography licensing and availability for web use.
- Decide on final accent color and whether gradients are acceptable.
- Clarify image upload workflow for admin (direct file system vs. external storage).
- Determine need for bilingual content at launch vs. post-launch enhancement.
