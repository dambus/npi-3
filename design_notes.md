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
- Mobile menu: slide-in panel with focus trap; ensure accessible toggle button.

## Key Components
- `HeroPrimary`: eyebrow, H1, supporting copy, primary CTA, optional secondary CTA.
- `ValueIcons`: icon + numeric/stat text; keep consistent icon shape (64px square) and align to grid.
- `ServiceCard` and `ProjectCard`: use shared elevation styles (border + subtle shadow), highlight CTA arrow on hover.
- `LogoWall`: grayscale logos with 50% opacity baseline; increase opacity on hover/focus.
- `FilterBar`: pill buttons with active state accent color; support keyboard navigation.
- `ContactForm` / `ApplyForm`: two-column on desktop, stacked on mobile; integrate validation states with Tailwind error styles.

## Imagery & Media
- Source hero/background images from `input data/design`; convert to WebP (1600px width) and provide fallback if necessary.
- Maintain aspect ratios: project cards 3:2, logo tiles 1:1, team imagery 4:3.
- Store optimized assets under `public/media` or `src/assets`; document naming convention (`project_slug-hero.webp`).
- Provide descriptive alt text referencing engineering context (e.g., “Process piping 3D model for refinery revamp”).

## Color & Theming
- Primary: deep navy/charcoal for backgrounds. Secondary accent: desaturated amber or petroleum green for CTAs.
- Neutral scale for cards/backgrounds: `charcoal-900`, `slate-700`, `gray-100`.
- Define CSS variables (via Tailwind config) for brand palette and spacing tokens for consistent usage.

## Motion & Interaction
- Use subtle fade + translateY (12–24px) on scroll-triggered sections; respect `prefers-reduced-motion`.
- Buttons: 200ms ease-out transitions, focus ring color aligned to accent palette.
- Logo wall and cards: scale 1.02 on hover with shadow accent.

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
