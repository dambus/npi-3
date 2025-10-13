# npi_sitemap_v1.md
Neopetrol Inženjering d.o.o. — korporativno‑minimalistička arhitektura sajta (v1.0)  
_Last updated: 2025‑10‑13_

> Ovaj dokument je spreman za rad u VS Code / Cursor / Codex. Sadrži **sitemap**, **routing**, **SEO meta**, **kontent skeleton**, **komponentizaciju** i **checkliste**. Ton je stručan, jasan i pouzdan, sa diskretnim marketinškim elementima.

---

## 0) Globalne smernice
- **Tone of voice:** stručan, precizan, sa fokusom na reference i kvalitet (bez “over‑marketing” fraza).  
- **Vizuelno:** tamna, čista paleta; grid 12 kolona; plenty of whitespace; diskretne animacije (fade / translate Y 12–24px).  
- **A11y:** kontrast ≥ 4.5:1; alt tekstovi; fokus stanja; semantika zaglavlja (H1–H3).  
- **SEO osnove:** jedan H1 po stranici; 50–60 kar. za `<title>`, 140–160 za meta description; kanonske URL; hreflang (SR/EN, opc. RU/FR).  
- **Copy stil:** rečenice 12–22 reči; bullet‑i za benefite; izbegavati žargon kada nije nužan.  

---

## 1) Informaciona arhitektura (SITEMAP & ROUTING)

```
/
/about
/services
/industries
/projects
/quality
/careers
/contact

/legal/privacy
/legal/cookies
/sitemap.xml
/robots.txt
```
**Napomena:** Ako bude i EN verzija, koristiti prefiks `/en/*` i hreflang tagove.

---

## 2) HOME (`/`)

### SEO
- `<title>`: Neopetrol Inženjering — Engineering design & consulting for oil, gas & energy
- `<meta name="description">`: Leading Serbian engineering company for oil, gas and petrochemical projects. Licensed experts, ISO 9001. Conceptual & detail design, project management, supervision.
- Primarne ključne reči: engineering design services Serbia, oil and gas engineering, petrochemical design consultancy
- Sekundarne: project management industrial, process & instrumentation, detail design documentation

### H1
**Designing reliable solutions for oil, gas & energy industries**

### Strukturni blokovi (komponente)
1. `HeroPrimary`
   - eyebrow: *Engineering excellence since 2008*
   - h1: (vidi gore)
   - sub: *We turn complex industrial requirements into sustainable engineering solutions.*
   - CTA: “Explore our Services” → `/services`
2. `ValueIcons` (3–4 kartice)
   - “15+ years experience”, “Integrated disciplines”, “ISO‑certified QMS”, “Licensed experts”
3. `AboutTeaser`
   - 2–3 rečenice + link na `/about`
4. `FeaturedServices` (3 stavke) → link na `/services`
5. `ProjectsTeaser` (grid 3–4) → `/projects`
6. `LogoWall` (grayscale klijenti/partneri)
7. `FooterCTA` → download profile (PDF) + kontakt

### Minimalni copy (skica)
- “Since 2008, we deliver reliable documentation and expert support across all engineering phases, from studies to detail design and supervision.”

---

## 3) ABOUT (`/about`)

### SEO
- `<title>`: About Neopetrol Inženjering — Licensed engineering company (ISO 9001)
- `<meta description>`: Novi Sad–based engineering and consulting company founded in 2008. Multi‑disciplinary team, licenses and ISO‑certified QMS.

### H1
**Committed to excellence in industrial design and engineering**

### Sekcije
1. `CompanyOverview` — osnivanje, lokacija, tim (brojevi), čime se bavimo
2. `MissionVision` — 2 kratka odeljka sa fokusom na pouzdanost, timski rad, rok/budžet
3. `LicensesCerts` — lista licenci (kartice) + ISO 9001 badge
4. `OrgStructure` — odseci (Process, Mechanical, Electrical, I&C, Civil)
5. `CTA` — “See our Services”

---

## 4) SERVICES (`/services`)

### SEO
- `<title>`: Engineering services — Project management, conceptual & detail design, supervision
- `<meta description>`: End‑to‑end engineering support: studies & analysis, conceptual and detail design, consulting and supervision.

### H1
**Integrated engineering services from concept to commissioning**

### Servisi (podsajdovi opcionalno)
- Project Management
- Studies & Analysis
- Conceptual Design
- Detail Design
- Supervision
- Consulting

**Svaka karta/sekcija sadrži:**
- opis (50–80 reči), 3 benefita, standardi/usaglašenost, tipični deliverables
- CTA: “Discuss your project” → `/contact`

---

## 5) INDUSTRIES / EXPERTISE (`/industries`)

### SEO
- `<title>`: Industries we serve — Oil & Gas, Petrochemical, Energy, Automation
- `<meta description>`: Sector‑specific expertise with proven references: production, refining, gas storage & transport, energy, industrial automation.

### H1
**Sector‑specific expertise backed by real projects**

### Kategorije
- Oil & Gas Production
- Refining & Petrochemical
- Gas Storage & Transport
- Energy & Power Plants
- Industrial Automation

**Svaka kategorija:**
- kratak opis (50–70 reči), “Relevant projects” (link filter na `/projects?industry=...`)

---

## 6) PROJECTS (`/projects`)

### SEO
- `<title>`: Engineering projects — Oil & Gas, Petrochemical, Energy
- `<meta description>`: A curated selection of reference projects by industry, country and client.

### H1
**Our expertise proven through real‑world projects**

### Funkcija
- Filteri: by industry, country, client
- Karta projekta: naziv, lokacija, klijent, kratak opis (≤100 reči), thumbnail
- Detalj (opciono): `/projects/<slug>` sa opsegom posla, deliverables, standardi

---

## 7) QUALITY (`/quality`)

### SEO
- `<title>`: Quality management system — ISO 9001 and document control
- `<meta description>`: ISO 9001 certified QMS, procedures, change management and document control for reliable engineering deliverables.

### H1
**Quality management that ensures engineering reliability**

### Sekcije
- QMS Overview (ISO 9001:2015, organizacija odgovornosti)
- Document Control & Revisions (nomenklatura, checklist, kontrola verzija)
- Procedures & Change Management
- Certification timeline (grafika)

---

## 8) CAREERS (`/careers`)

### SEO
- `<title>`: Careers at Neopetrol — Process, Mechanical, I&C, CAD, QA
- `<meta description>`: Join a multi‑disciplinary engineering team. Open roles, internships and spontaneous applications.

### H1
**Join a team that builds the future of energy infrastructure**

### Sadržaj
- Intro + vrednosti tima
- Otvorene pozicije (lista)
- CTA: “Send your CV” (forma + e‑mail)

---

## 9) CONTACT (`/contact`)

### SEO
- `<title>`: Contact Neopetrol Inženjering — Novi Sad, Serbia
- `<meta description>`: Get in touch with our engineering experts. Address, phone, email, map and contact form.

### H1
**Get in touch with our engineering experts**

### Sadržaj
- Podaci (adresa, tel, email), mapa
- Kontakt forma (ime, email, kompanija, poruka)
- CTA: “Download company profile (PDF)”

---

## 10) Footer & Legal
- Footer: adresa, kontakt, ISO badge, brzi linkovi, social (LinkedIn)
- Legal: `/legal/privacy`, `/legal/cookies`
- Tehničke strane: `/sitemap.xml`, `/robots.txt` (+ `Disallow` za admin rute)

---

## 11) Komponentizacija (predlog imenovanja)
- Layout: `SiteHeader`, `SiteFooter`, `LangSwitcher`, `TopBar`
- Home: `HeroPrimary`, `ValueIcons`, `AboutTeaser`, `FeaturedServices`, `ProjectsTeaser`, `LogoWall`, `FooterCTA`
- Shared: `Section`, `Grid`, `Card`, `Badge`, `Pill`, `Stat`, `FilterBar`, `ProjectCard`, `ServiceCard`
- Forms: `ContactForm`, `ApplyForm`
- SEO: `SEOHead` (title, description, canonical, hreflang, OG/Twitter)

---

## 12) SEO & Schema.org

**Global (JSON‑LD):**
- `Organization` (name, url, logo, sameAs)
- `LocalBusiness` (address, geo, openingHours) — ako primenljivo
- `BreadcrumbList` za glavne sekcije

**Open Graph / Twitter:**
- `og:title`, `og:description`, `og:type=website`, `og:image`, `og:locale`
- `twitter:card=summary_large_image`

**Linking:**
- Interno povezivanje Services → Projects; Industries → Projects; About → Quality; Footer → PDF

**Media:**
- Alt tekstovi opisni (“P&ID detail for gas processing unit…”)  
- WebP + lazy‑loading, prefetch za kritične rute

---

## 13) Predlošci copy‑a (skraćene verzije)

**Home / About teaser (SR):**  
“Neopetrol Inženjering d.o.o. je projektantska i konsultantska kompanija iz Novog Sada, specijalizovana za naftnu, gasnu i petrohemijsku industriju. Od 2008. isporučujemo pouzdanu dokumentaciju i ekspertsku podršku kroz sve faze projekta — od studija i koncepata do glavnih i izvedbenih projekata i stručnog nadzora.”

**Services / Intro (EN):**  
“We provide end‑to‑end engineering support — studies & analysis, conceptual and detail design, consulting and supervision — aligned with ISO 9001 and relevant EU/industry standards.”

**Quality / Intro (EN):**  
“Our ISO 9001‑certified QMS, rigorous document control and change management ensure consistent, compliant and verifiable engineering deliverables.”

---

## 14) Ključne reči (primeri)
- Primary: engineering design services serbia; oil and gas engineering; petrochemical design consultancy
- Secondary: process & instrumentation design; mechanical and electrical design Novi Sad; gas plant engineering; industrial automation

---

## 15) URL, meta i heading checklista (po stranici)
- [ ] Kanonski URL
- [ ] Jedan H1, logična hijerarhija H2–H3
- [ ] `<title>` 50–60 karaktera
- [ ] `<meta description>` 140–160 karaktera
- [ ] Structured data (JSON‑LD)
- [ ] OG/Twitter tagovi
- [ ] Interni linkovi ka relevantnim sekcijama
- [ ] Alt tekstovi za sve media elemente

---

## 16) Buduća proširenja
- `/software` (alatke i platforme u upotrebi)
- `/downloads` (Company Profile SR/EN PDF, referentne liste)
- `/news` (ako bude potrebno; SSG‑friendly)

---

## 17) Minimalna mapa fajlova (React + Vite + Tailwind 4)
```
src/
  pages/
    index.tsx
    about.tsx
    services.tsx
    industries.tsx
    projects.tsx
    quality.tsx
    careers.tsx
    contact.tsx
  components/
    layout/{SiteHeader.tsx,SiteFooter.tsx,LangSwitcher.tsx,SEOHead.tsx}
    home/{HeroPrimary.tsx,ValueIcons.tsx,AboutTeaser.tsx,FeaturedServices.tsx,ProjectsTeaser.tsx,LogoWall.tsx,FooterCTA.tsx}
    shared/{Section.tsx,Grid.tsx,Card.tsx,Badge.tsx,Pill.tsx,Stat.tsx,FilterBar.tsx,ProjectCard.tsx,ServiceCard.tsx}
    forms/{ContactForm.tsx,ApplyForm.tsx}
  lib/seo.ts
  lib/routes.ts
  assets/{logo.svg,og-default.jpg}
```

---

## 18) Content to‑do (za kopiraj/zalepi u issue tracker)
- [ ] Dopuniti liste projekata (naziv, lokacija, klijent, opis ≤100 reči)
- [ ] Potvrditi tačnu listu licenci i sertifikata (brojevi i nazivi)
- [ ] Prevesti SR/EN; definisati hreflang i kanonikalne
- [ ] Nabaviti/pregenerisati slike (WebP, 1600px širina, kvalitet 70–80)
- [ ] Pripremiti Company Profile PDF (SR/EN)
- [ ] Definisati kontakt e‑mail za forme i privacy pravila
