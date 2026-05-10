# Portfolio Design — Onkesh Bansal

**Date:** 2026-05-06  
**Status:** Approved

## Goal

Build a personal portfolio site at `onk3sh.github.io` that serves job hunting, freelance client acquisition, and personal brand — adapted from the `arhumsavera/arhumsavera.github.io` Astro starter. All references to the original owner must be fully removed.

## Stack

- **Framework:** Astro (static site generator)
- **Styling:** Vanilla CSS (copied from starter, then modified)
- **Content:** TypeScript data files in `astro-src/src/data/`
- **Deploy:** GitHub Pages at `onk3sh.github.io`, built via `build.sh`

## Approach

Option B — port and reframe. Copy starter structure verbatim, replace all content and identity references, adjust narrative and visualizations to fit Onkesh's background.

## Sections & Content

### Hero
- Name: Onkesh Bansal
- Tagline: Senior Full Stack Developer & AI/ML Engineer — 10+ years across Adobe, Quark, Basis Technologies
- Interactive terminal (ops-shell) kept as-is, commands updated to reflect Onkesh's background

### Background / About
- Journey from QA/automation → full stack → AI/ML
- University of Windsor (3.9 GPA, 2020–2021)
- Career: Quark Software (2011–2014) → Adobe (2016–2017) → Centric Consulting (2019–2021) → Basis Technologies (2022–present)
- Based in Toronto, Canada

### Production Impact Bullets
- Basis Platform (2022–present)
- Central Mutual Insurance: built automation framework from scratch with DevOps + reporting pipeline
- Adobe Acrobat / Digital Media team contributions
- Volunteer web tech instructor for Chicago high school students (2022–2024)

### Visualization (replacing "Agent Run Replay")
- Replace with a CI/CD / test automation pipeline visualization
- Reflects Onkesh's QA automation and DevOps background
- Interactive play/reset buttons retained

### Projects
- Manual curation (GitHub repos not in shape yet)
- Initial list: url-shortener (Spring Boot + Redis), Bolt (Muse Export Automation Framework), BulkDealsSensex (BSE/NSE bulk deals utility)
- Add more over time

### Blog
- Section structure kept, empty initially

### Tech Stack Page
- Java, Spring Boot, Python, Redis, Kubernetes, Jenkins, Selenium, JavaScript/TypeScript, PostgreSQL, HTML/CSS

### Contact
- LinkedIn: `linkedin.com/in/onkesh`
- Twitter/X: `@onk3sh`
- No resume PDF — remove resume.pdf and all links to it

## Data Architecture

Expand `astro-src/src/data/` from single `projects.ts` to:
- `projects.ts` — project cards
- `experience.ts` — work history timeline
- `stack.ts` — tech stack items
- `impact.ts` — production impact bullet points

Each section component reads from its own data file. No content lives in `.astro` component files.

## Identity Scrub

Remove all of the following from the codebase:
- Name: Arhum Savera, arhumsavera
- Google site verification file (`google19f9187a2f912035.html.txt`)
- Original social links (Twitter, LinkedIn, GitHub of original owner)
- `resume.pdf`
- Any hardcoded bio, tagline, or project data referencing the original owner
- `_config.yml` site metadata (title, description, author, url)

## Deployment

- Repo: `onk3sh/onk3sh.github.io` on GitHub
- `build.sh` runs `astro build`, copies `dist/` output to repo root
- GitHub Pages served from root of `main` branch
- Custom domain: TBD (buy later, configure via CNAME)
