# Progress Roadmap

## Update 2025-10-23
- Initiated "Project detail experience" workstream: planning JSON data storage, dynamic routing, and gallery requirements.
- Next: model project data (Phase 2), build detail layout (Phase 3), wire gallery/lightbox (Phase 4).


## Phase 0 — Discovery & Technical Foundation
- [ ] Confirm final tech stack (React + Vite + TailwindCSS + supporting tooling) and document baseline configuration decisions.
- [ ] Audit `input data/design` assets; catalogue reusable imagery, palettes and typography references.
- [ ] Derive component/page inventory from `input data/npi_sitemap_v1.md` and map to file structure under `src/pages` and `src/components`.
- [ ] Decide on content storage approach (JSON files vs. lightweight self-hosted DB); create decision log with pros/cons and hosting implications.

## Phase 1 — Project Scaffolding
- [ ] Enable TailwindCSS (postcss config, base styles, design tokens) and remove unused starter styling.
- [ ] Configure routing (React Router or alternative) matching sitemap: `/`, `/about`, `/services`, `/industries`, `/projects`, `/quality`, `/careers`, `/contact`, `/legal/*`, hidden `/admin/*`.
- [ ] Set up shared layout components (`SiteHeader`, `SiteFooter`, `SEOHead`, layout grid utilities).
- [ ] Integrate global SEO scaffolding (dynamic `<title>`, meta descriptions, canonical, hreflang placeholders).

## Phase 2 — Content & Data Layer
- [ ] Model structured data objects for services, industries, projects, quality docs, news placeholders.
- [ ] Implement storage layer:
  - Option A: version-controlled JSON files under `src/data`.
  - Option B: embedded lightweight DB (e.g. SQLite via WASM or low-footprint self-hosted service).
- [ ] Build helpers for CRUD operations in-memory with persistence to chosen storage.
- [ ] Define fallback mock data for initial frontend development.

## Phase 3 — Page Implementation
- [ ] Home (`/`): Hero, value propositions, featured services/projects, logo wall, CTA.
- [ ] About (`/about`): overview, mission/vision, licenses, org structure.
- [ ] Services (`/services`): service cards with benefits, CTA.
- [ ] Industries (`/industries`): sectors with project filters.
- [ ] Projects (`/projects`): filterable grid, detail modal/page, asset handling for images.
- [ ] Quality (`/quality`): ISO/QMS content blocks, document highlights.
- [ ] Careers (`/careers`): culture intro, open positions list, application form.
- [ ] Contact (`/contact`): contact info, embedded map, contact form, download CTA.
- [ ] Legal (`/legal/privacy`, `/legal/cookies`): structured policy templates.

## Phase 4 — Admin / Content Management
- [ ] Define hidden `/admin` route with auth gate (token, simple password or signed link).
- [ ] Create admin UI for managing projects, references, news with image upload workflow.
- [ ] Evaluate image storage strategy (static folder with build-time import vs. upload handler and CDN/local storage).
- [ ] Ensure admin routes excluded from navigation, sitemap, and SEO metadata.

## Phase 5 — Visual Design & Interaction
- [ ] Implement design system primitives (colors, typography scale, spacing, grid utilities) derived from design assets.
- [ ] Apply responsive breakpoints (mobile-first) across all sections with QA on common viewports.
- [ ] Add subtle motion (fade/translate Y) respecting performance and prefers-reduced-motion.
- [ ] Optimize imagery (WebP, lazy loading, aspect ratios) and verify alt text coverage.

## Phase 6 — Quality Assurance
- [ ] Unit test critical utilities (data helpers, forms).
- [ ] Perform accessibility audit (heading structure, contrast, focus states, form labels).
- [ ] Validate SEO checklist per page (titles, meta, structured data, internal links).
- [ ] Run performance checks (Lighthouse) and fix regressions.

## Phase 7 — Release & Handover
- [ ] Prepare build scripts, env configs, and deployment documentation.
- [ ] Document admin workflow, data schema, and future content updates.
- [ ] Confirm backup strategy for data storage approach.
- [ ] Collect outstanding tasks for post-launch backlog (multilingual support, news module, downloads center).

## Communication & Tracking
- [ ] Update `progress.md` as milestones complete.
- [ ] Log design decisions and component specs in `design_notes.md`.
- [ ] Aggregate open questions for stakeholder review (e.g., hosting constraints, auth mechanism, image sourcing responsibilities).
