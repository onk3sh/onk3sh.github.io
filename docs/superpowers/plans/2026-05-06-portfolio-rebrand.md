# Portfolio Rebrand — Onkesh Bansal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all Arhum Savera content in the Astro portfolio with Onkesh Bansal's identity, career, and projects — with zero leftover references to the original owner.

**Architecture:** Static Astro site; content lives in TypeScript data files and `.astro` page files. We expand `src/data/` with `experience.ts` and `impact.ts`, replace `projects.ts`, and update every page and config file. No structural changes to CSS or build pipeline.

**Tech Stack:** Astro 5, vanilla CSS, TypeScript, GitHub Pages (`onk3sh.github.io`)

---

## File Map

| Action | File |
|--------|------|
| Modify | `astro-src/src/layouts/BaseLayout.astro` |
| Modify | `astro-src/src/pages/index.astro` |
| Modify | `astro-src/src/pages/about.astro` |
| Modify | `astro-src/src/pages/contact.astro` |
| Modify | `astro-src/public/data/terminal-commands.json` |
| Modify | `astro-src/public/data/stack-map.json` |
| Replace | `astro-src/src/data/projects.ts` |
| Create | `astro-src/src/data/experience.ts` |
| Create | `astro-src/src/data/impact.ts` |
| Modify | `_config.yml` |
| Delete | `google19f9187a2f912035.html.txt` |
| Delete | `resume.pdf` |
| Delete | `astro-src/src/pages/post/agent-memory-framework/index.astro` |
| Delete | `astro-src/src/pages/post/applyops-agentic-job-search/index.astro` |
| Delete | `astro-src/src/pages/post/project-3/index.astro` |

---

## Task 1: Scrub identity from config and layout

**Files:**
- Modify: `_config.yml`
- Modify: `astro-src/src/layouts/BaseLayout.astro`

- [ ] **Step 1: Update `_config.yml`**

Replace the entire file with:

```yaml
exclude:
  - astro-src
  - exotic-earth
  - node_modules
  - package.json
  - package-lock.json
  - README.md
```

(The original has no site metadata we need to keep. `_config.yml` is only used by Jekyll fallback — GitHub Pages ignores it when `.nojekyll` is present. Just preserve the exclude list.)

- [ ] **Step 2: Update `BaseLayout.astro` — default description and title**

In `astro-src/src/layouts/BaseLayout.astro`, find:

```typescript
const { title, description = 'Arhum Savera Portfolio' } = Astro.props;
```

Replace with:

```typescript
const { title, description = 'Onkesh Bansal Portfolio' } = Astro.props;
```

- [ ] **Step 3: Update nav brand and title tag**

In `BaseLayout.astro`, find:

```html
<title>{title} | Arhum Savera</title>
```

Replace with:

```html
<title>{title} | Onkesh Bansal</title>
```

Find:

```html
<a class="brand" href="/">Arhum Savera</a>
```

Replace with:

```html
<a class="brand" href="/">Onkesh Bansal</a>
```

- [ ] **Step 4: Remove resume nav link and replace with LinkedIn/Twitter**

In `BaseLayout.astro`, find the entire nav-links div and replace with:

```html
<div class="nav-links">
  <a class={path.startsWith('/about') ? 'active' : ''} href="/about/">About</a>
  <a class={path.startsWith('/post') ? 'active' : ''} href="/post/">Projects</a>
  <a class={path.startsWith('/stack') ? 'active' : ''} href="/stack/">Stack</a>
  <a class={path.startsWith('/lab') ? 'active' : ''} href="/lab/">Lab</a>
  <a class={path.startsWith('/contact') ? 'active' : ''} href="/contact/">Contact</a>
  <a href="https://github.com/onk3sh" target="_blank" rel="noopener noreferrer">GitHub</a>
  <a href="https://www.linkedin.com/in/onkesh" target="_blank" rel="noopener noreferrer">LinkedIn</a>
</div>
```

- [ ] **Step 5: Remove the resume download modal**

In `BaseLayout.astro`, delete the entire `<!-- Resume download confirmation modal -->` block (the `<div id="resume-modal" ...>` element and all its children).

Also delete the `<script is:inline>` block immediately after it (the one containing `var modal = document.getElementById('resume-modal')`).

Also delete the `<style is:inline>` block that follows (the one containing `.rm-overlay`, `.rm-box`, `.rm-title`, etc.).

- [ ] **Step 6: Update footer**

Find:

```html
<p>© Arhum Savera 2026</p>
```

Replace with:

```html
<p>© Onkesh Bansal 2026</p>
```

- [ ] **Step 7: Commit**

```bash
cd /Users/onkesh/coding_projects/personal_portfolio_website/onk3sh.github.io
git add astro-src/src/layouts/BaseLayout.astro _config.yml
git commit -m "rebrand: update layout, nav, and config to Onkesh Bansal"
```

---

## Task 2: Delete stale files

**Files:**
- Delete: `google19f9187a2f912035.html.txt`
- Delete: `resume.pdf`
- Delete: `astro-src/src/pages/post/agent-memory-framework/index.astro`
- Delete: `astro-src/src/pages/post/applyops-agentic-job-search/index.astro`
- Delete: `astro-src/src/pages/post/project-3/index.astro`

- [ ] **Step 1: Delete stale files**

```bash
cd /Users/onkesh/coding_projects/personal_portfolio_website/onk3sh.github.io
rm google19f9187a2f912035.html.txt
rm resume.pdf
rm astro-src/src/pages/post/agent-memory-framework/index.astro
rm astro-src/src/pages/post/applyops-agentic-job-search/index.astro
rm astro-src/src/pages/post/project-3/index.astro
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "rebrand: remove Arhum's resume, Google verification, and old project pages"
```

---

## Task 3: Replace `projects.ts` with Onkesh's projects

**Files:**
- Replace: `astro-src/src/data/projects.ts`

- [ ] **Step 1: Replace the entire file**

```typescript
export type Project = {
  slug: string;
  title: string;
  date: string;
  hero: string;
  summary: string;
  featured?: boolean;
  sections: Array<{
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
};

export const projects: Project[] = [
  {
    slug: 'bolt-automation',
    title: 'Bolt: Muse Export Automation Framework',
    date: '2022-05-01',
    hero: '/images/projects-bg-img.png',
    summary:
      'Automation framework at Basis Technologies that streamlined Muse export workflows, reducing manual effort and improving reliability across campaign delivery pipelines.',
    featured: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Bolt is an internal automation framework built to replace error-prone manual export processes in the Basis platform. The goal was to turn a multi-step, human-driven workflow into a reliable, auditable pipeline that ops teams could run without engineering involvement.',
        ],
      },
      {
        heading: 'What It Does',
        bullets: [
          'Automates end-to-end Muse export workflows with configurable pipeline stages.',
          'Built-in retry logic and failure reporting so operators see actionable errors, not stack traces.',
          'Audit trail for every export run — who triggered it, what changed, what succeeded or failed.',
          'Integrates with existing Basis platform APIs with no changes required to upstream services.',
        ],
      },
      {
        heading: 'Tech Stack',
        bullets: ['Java, Spring Boot, REST APIs, PostgreSQL.'],
      },
    ],
  },
  {
    slug: 'url-shortener',
    title: 'URL Shortener',
    date: '2021-06-01',
    hero: '/images/projects-bg-img.png',
    summary:
      'High-performance URL shortening service built with Spring Boot and Redis. Sub-millisecond redirect lookups via in-memory caching with a persistent PostgreSQL backend.',
    featured: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'A production-grade URL shortener designed to explore the performance characteristics of Redis as a caching layer in front of a relational store. The constraint was simple: redirect latency under 5ms at any request rate.',
        ],
      },
      {
        heading: 'Architecture',
        bullets: [
          'Spring Boot REST API handles encode/decode requests.',
          'Redis cache stores active short→long URL mappings with configurable TTL.',
          'PostgreSQL persists all URLs as the source of truth — cache misses fall through to DB.',
          'Base62 encoding for compact, URL-safe short codes.',
          'Cache-aside pattern: on miss, DB record is fetched and cached for subsequent requests.',
        ],
      },
      {
        heading: 'Tech Stack',
        bullets: ['Java, Spring Boot, Redis, PostgreSQL, Docker.'],
      },
    ],
  },
  {
    slug: 'bulk-deals-sensex',
    title: 'BulkDealsSensex',
    date: '2020-01-01',
    hero: '/images/projects-bg-img.png',
    summary:
      'Utility to fetch and parse bulk deal data from BSE and NSE. Automates manual data collection from exchange portals into a structured, queryable format.',
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'BSE and NSE publish bulk deal data daily — large institutional trades that can signal market sentiment. The data is available but requires manual download and parsing. BulkDealsSensex automates the fetch, normalizes the data across both exchanges, and stores it for analysis.',
        ],
      },
      {
        heading: 'Features',
        bullets: [
          'Fetches bulk deal CSV/HTML data from BSE and NSE exchange endpoints.',
          'Normalizes and deduplicates records across both sources into a unified schema.',
          'Outputs structured data ready for downstream analysis or alerting.',
          'Configurable date range and exchange selection.',
        ],
      },
      {
        heading: 'Tech Stack',
        bullets: ['Python, requests, pandas, CSV parsing.'],
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const recentProjects = [...projects].sort((a, b) =>
  a.date < b.date ? 1 : -1
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/onkesh/coding_projects/personal_portfolio_website/onk3sh.github.io
git add astro-src/src/data/projects.ts
git commit -m "rebrand: replace projects with Onkesh's work"
```

---

## Task 4: Create `experience.ts` and `impact.ts`

**Files:**
- Create: `astro-src/src/data/experience.ts`
- Create: `astro-src/src/data/impact.ts`

- [ ] **Step 1: Create `experience.ts`**

```typescript
export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  description: string;
};

export type Degree = {
  institution: string;
  degree: string;
  period: string;
  location: string;
  detail?: string;
};

export const roles: Role[] = [
  {
    company: 'Basis Technologies',
    title: 'Senior Full Stack Developer',
    period: '2022 – Present',
    location: 'Toronto, ON',
    description:
      'Building and maintaining full-stack features across the Basis ad-tech platform. Developed the Bolt automation framework to eliminate manual Muse export workflows. Working across Java Spring Boot services and modern frontend systems.',
  },
  {
    company: 'Centric Consulting',
    title: 'Senior Software Engineer',
    period: '2019 – 2021',
    location: 'Chicago, IL',
    description:
      'Built the Central Mutual Insurance test automation framework from scratch — QA pipeline, DevOps integration with Jenkins, and reporting infrastructure. Multiple Star of the Month awards for delivery quality.',
  },
  {
    company: 'Adobe Systems',
    title: 'Software Engineer',
    period: '2016 – 2017',
    location: 'Noida & Bangalore, IN',
    description:
      'Contributed to Acrobat and Digital Media teams. Worked on quality engineering for document cloud products.',
  },
  {
    company: 'Quark Software',
    title: 'Software Engineer',
    period: '2011 – 2014',
    location: 'Chandigarh, IN',
    description:
      'Worked on the Quark XML Author enterprise platform. Delivered multiple back-to-back high-quality releases. Received employee recognition award in 2014.',
  },
];

export const education: Degree[] = [
  {
    institution: 'University of Windsor',
    degree: 'Graduate Studies, Computer Science',
    period: '2020 – 2021',
    location: 'Windsor, ON',
    detail: 'GPA 3.9 / 4.0',
  },
];
```

- [ ] **Step 2: Create `impact.ts`**

```typescript
export type ImpactItem = {
  text: string;
};

export const impactItems: ImpactItem[] = [
  {
    text: 'Built Bolt, an automation framework at Basis Technologies replacing manual Muse export workflows — reduced operator time and introduced a full audit trail for campaign delivery.',
  },
  {
    text: 'Built the Central Mutual Insurance QA automation framework from scratch at Centric Consulting — full CI/CD integration with Jenkins, end-to-end reporting, zero prior framework in place.',
  },
  {
    text: 'Contributed to Adobe Acrobat and Digital Media platform quality across Noida and Bangalore teams.',
  },
  {
    text: 'Volunteer instructor teaching web technologies to Chicago high school students (2022–2024) — hands-on HTML, CSS, and JavaScript curriculum.',
  },
];
```

- [ ] **Step 3: Commit**

```bash
cd /Users/onkesh/coding_projects/personal_portfolio_website/onk3sh.github.io
git add astro-src/src/data/experience.ts astro-src/src/data/impact.ts
git commit -m "rebrand: add experience and impact data files"
```

---

## Task 5: Update `index.astro` — hero, background, impact, visualization

**Files:**
- Modify: `astro-src/src/pages/index.astro`

- [ ] **Step 1: Update the frontmatter imports**

Replace the existing frontmatter block:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { featuredProjects, recentProjects } from '../data/projects';
---
```

With:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { featuredProjects, recentProjects } from '../data/projects';
import { impactItems } from '../data/impact';
---
```

- [ ] **Step 2: Update the BaseLayout meta**

Find:

```astro
<BaseLayout
  title="Home"
  description="Senior software engineer building production AI systems, backend platforms, and developer tooling."
>
```

Replace with:

```astro
<BaseLayout
  title="Home"
  description="Senior Full Stack Developer and AI/ML Engineer with 10+ years across Adobe, Quark, and Basis Technologies."
>
```

- [ ] **Step 3: Update the hero section**

Find the `<section id="hero-shell" ...>` block's `<div>` content:

```html
    <div>
      <h1>Arhum Savera</h1>
      <p>
        Seven years of making AI work outside the notebook — on constrained
        hardware, at scale, in environments that weren't designed for it.
        That's the part I'm good at.
      </p>
    </div>
```

Replace with:

```html
    <div>
      <h1>Onkesh Bansal</h1>
      <p>
        Ten years building production software — full-stack systems, test
        automation frameworks, and AI/ML tools. From Quark and Adobe to
        Basis Technologies. Based in Toronto.
      </p>
    </div>
```

- [ ] **Step 4: Update the background section**

Find the `<section class="section reveal-up">` that contains the single `<div class="panel">`:

```html
  <section class="section reveal-up">
    <div class="panel">
      <p>
        My background started in ML research and moved into production engineering,
        which tends to produce specific instincts. I care about inference latency,
        failure modes under load, and what happens when your model encounters an
        input it's never seen at 3am. Recently I've been building the tooling
        layer underneath AI agents: persistent memory, reliable orchestration,
        and a local voice interface that doesn't phone home.
      </p>
    </div>
  </section>
```

Replace with:

```html
  <section class="section reveal-up">
    <div class="panel">
      <p>
        My background spans enterprise software, QA automation, and full-stack
        development — built across Quark Software, Adobe, Centric Consulting, and
        Basis Technologies. I care about systems that hold up under real conditions:
        reliable pipelines, auditable workflows, and code that doesn't require
        heroics to maintain. Currently exploring AI/ML tooling on the side.
      </p>
    </div>
  </section>
```

- [ ] **Step 5: Update the production impact section**

Find the `<section class="section reveal-up">` that contains `<h2>Selected Production Impact</h2>` and its `<ul>`:

```html
  <section class="section reveal-up">
    <h2>Selected Production Impact</h2>
    <div class="panel">
      <ul>
        <li>Shipped AI review moderation that cut manual queue time ~80% — pgvector semantic retrieval, tiktoken cost budgeting, full audit trail for compliance.</li>
        <li>Built the Kafka event backbone from scratch across 8 microservices. Analytics throughput 5x. No more polling.</li>
        <li>Owned the CV pipeline for 100+ Amazon Dash Carts: TensorRT inference on Nvidia edge devices, running live in grocery stores.</li>
        <li>KMS encryption rollout across 4 teams in 6 weeks, on a compliance deadline, zero production regressions.</li>
      </ul>
    </div>
  </section>
```

Replace with:

```astro
  <section class="section reveal-up">
    <h2>Selected Production Impact</h2>
    <div class="panel">
      <ul>
        {impactItems.map((item) => (
          <li>{item.text}</li>
        ))}
      </ul>
    </div>
  </section>
```

- [ ] **Step 6: Replace Agent Run Replay with CI/CD Pipeline visualization**

Find the entire `<section class="section reveal-up">` block with `<h2>Agent Run Replay</h2>`:

```html
  <section class="section reveal-up">
    <h2>Agent Run Replay</h2>
    <div class="panel run-replay">
      <div class="run-controls">
        <button id="run-play" type="button">Play Run</button>
        <button id="run-reset" type="button">Reset</button>
      </div>
      <ol id="run-steps" class="run-steps">
        <li data-step>Task received and classified by domain router.</li>
        <li data-step>Planner compiles execution graph and tool sequence.</li>
        <li data-step>Executors run typed steps with retry/backoff policy.</li>
        <li data-step>Memory writer updates episodic and semantic layers.</li>
        <li data-step>Telegram notification dispatched with run summary.</li>
      </ol>
    </div>
  </section>
```

Replace with:

```html
  <section class="section reveal-up">
    <h2>CI/CD Pipeline</h2>
    <div class="panel run-replay">
      <div class="run-controls">
        <button id="run-play" type="button">Run Pipeline</button>
        <button id="run-reset" type="button">Reset</button>
      </div>
      <ol id="run-steps" class="run-steps">
        <li data-step>Code pushed — pull request opened against main.</li>
        <li data-step>Jenkins pipeline triggered, unit and integration tests run.</li>
        <li data-step>Build artifacts compiled, static analysis and coverage checks pass.</li>
        <li data-step>Deployment to staging, smoke tests validate critical paths.</li>
        <li data-step>Promotion to production, health checks confirmed green.</li>
      </ol>
    </div>
  </section>
```

- [ ] **Step 7: Commit**

```bash
cd /Users/onkesh/coding_projects/personal_portfolio_website/onk3sh.github.io
git add astro-src/src/pages/index.astro
git commit -m "rebrand: update homepage hero, background, impact, and CI/CD visualization"
```

---

## Task 6: Update terminal commands

**Files:**
- Modify: `astro-src/public/data/terminal-commands.json`
- Modify: `astro-src/src/pages/index.astro` (terminal script block)

- [ ] **Step 1: Replace `terminal-commands.json`**

```json
{
  "commands": {
    "help": "commands: help, whoami, about, projects, stack, contact, lab, clear",
    "about": "Senior Full Stack Developer and AI/ML Engineer — 10+ years across Quark, Adobe, Centric, Basis Technologies.",
    "projects": "featured: Bolt automation framework, URL shortener (Spring Boot + Redis), BulkDealsSensex.",
    "stack": "Java, Spring Boot, Python, JavaScript/TypeScript, Redis, PostgreSQL, Kubernetes, Jenkins, Selenium.",
    "contact": "linkedin.com/in/onkesh · github.com/onk3sh · @onk3sh on X"
  }
}
```

- [ ] **Step 2: Update the `whoami` command in `index.astro`**

In the `<script is:inline>` block, find the `whoami` command handler:

```javascript
    whoami: function() {
      [
        ['name',     'Arhum Savera'],
        ['role',     'Senior Software Engineer'],
        ['focus',    'Production AI &middot; Backend &middot; Developer Tooling'],
      ].forEach(function(row) {
        rich('<span class="term-key">' + row[0].padEnd(10) + '</span>' + row[1]);
      });
    },
```

Replace with:

```javascript
    whoami: function() {
      [
        ['name',     'Onkesh Bansal'],
        ['role',     'Senior Full Stack Developer'],
        ['focus',    'Full Stack &middot; AI/ML &middot; Automation'],
        ['location', 'Toronto, Canada'],
      ].forEach(function(row) {
        rich('<span class="term-key">' + row[0].padEnd(10) + '</span>' + row[1]);
      });
    },
```

- [ ] **Step 3: Update `about` command**

Find:

```javascript
    about: function() {
      type('Senior Software Engineer with 7+ years across backend systems, ML pipelines, and local-first AI products. I build things that run in production.', 'term-muted');
    },
```

Replace with:

```javascript
    about: function() {
      type('Senior Full Stack Developer and AI/ML Engineer with 10+ years across Quark, Adobe, Centric Consulting, and Basis Technologies. Based in Toronto.', 'term-muted');
    },
```

- [ ] **Step 4: Update `projects` command**

Find:

```javascript
    projects: function() {
      line('flagship work:', 'term-muted');
      [
        ['Agent Memory Framework',        'agent-memory-framework'],
        ['ApplyOps — Agentic Job Search', 'applyops-agentic-job-search'],
        ['Amazon Dash Cart',              'amazon-dash-cart'],
        ['Signify LightFinder',           'signify-lightfinder'],
        ['Speakeasy',                     'speakeasy'],
      ].forEach(function(p) {
        rich('  &rarr; <a href="/post/' + p[1] + '/" class="term-link">' + p[0] + '</a>');
      });
    },
```

Replace with:

```javascript
    projects: function() {
      line('featured work:', 'term-muted');
      [
        ['Bolt — Muse Export Automation', 'bolt-automation'],
        ['URL Shortener (Spring Boot + Redis)', 'url-shortener'],
        ['BulkDealsSensex', 'bulk-deals-sensex'],
      ].forEach(function(p) {
        rich('  &rarr; <a href="/post/' + p[1] + '/" class="term-link">' + p[0] + '</a>');
      });
    },
```

- [ ] **Step 5: Update `ls` command**

Find:

```javascript
    ls: function() {
      [
        ['agent-memory-framework',        '/post/agent-memory-framework/'],
        ['applyops-agentic-job-search',   '/post/applyops-agentic-job-search/'],
        ['amazon-dash-cart',              '/post/amazon-dash-cart/'],
        ['signify-lightfinder',           '/post/signify-lightfinder/'],
        ['speakeasy',                     '/post/speakeasy/'],
      ].forEach(function(p) {
        rich('drwxr-xr-x &nbsp;<a href="' + p[1] + '" class="term-link">' + p[0] + '/</a>', 'term-muted');
      });
    },
```

Replace with:

```javascript
    ls: function() {
      [
        ['bolt-automation',     '/post/bolt-automation/'],
        ['url-shortener',       '/post/url-shortener/'],
        ['bulk-deals-sensex',   '/post/bulk-deals-sensex/'],
      ].forEach(function(p) {
        rich('drwxr-xr-x &nbsp;<a href="' + p[1] + '" class="term-link">' + p[0] + '/</a>', 'term-muted');
      });
    },
```

- [ ] **Step 6: Update `stack` command**

Find:

```javascript
    stack: function() {
      [
        ['languages', 'Python &middot; TypeScript &middot; SQL'],
        ['backend',   'Django &middot; FastAPI &middot; Celery &middot; Kafka'],
        ['ai/ml',     'PyTorch &middot; LangChain &middot; OpenAI &middot; pgvector'],
        ['infra',     'PostgreSQL &middot; Redis &middot; Docker &middot; AWS'],
      ].forEach(function(row) {
        rich('<span class="term-key">' + row[0].padEnd(10) + '</span>' + row[1]);
      });
    },
```

Replace with:

```javascript
    stack: function() {
      [
        ['languages', 'Java &middot; Python &middot; JavaScript &middot; TypeScript'],
        ['backend',   'Spring Boot &middot; REST APIs &middot; PostgreSQL &middot; Redis'],
        ['testing',   'Selenium &middot; JUnit &middot; TestNG &middot; Jenkins'],
        ['infra',     'Kubernetes &middot; Docker &middot; AWS &middot; Git'],
      ].forEach(function(row) {
        rich('<span class="term-key">' + row[0].padEnd(10) + '</span>' + row[1]);
      });
    },
```

- [ ] **Step 7: Update `contact` command**

Find:

```javascript
    contact: function() {
      [
        ['email',    'mailto:arhum.a.savera@gmail.com',      'arhum.a.savera@gmail.com'],
        ['linkedin', 'https://linkedin.com/in/arhumsavera', 'linkedin.com/in/arhumsavera'],
        ['github',   'https://github.com/arhumsavera',      'github.com/arhumsavera'],
      ].forEach(function(row) {
        rich('<span class="term-key">' + row[0].padEnd(10) + '</span><a href="' + row[1] + '" class="term-link" target="_blank" rel="noopener">' + row[2] + '</a>');
      });
    },
```

Replace with:

```javascript
    contact: function() {
      [
        ['linkedin', 'https://linkedin.com/in/onkesh',  'linkedin.com/in/onkesh'],
        ['github',   'https://github.com/onk3sh',       'github.com/onk3sh'],
        ['twitter',  'https://twitter.com/onk3sh',      '@onk3sh'],
      ].forEach(function(row) {
        rich('<span class="term-key">' + row[0].padEnd(10) + '</span><a href="' + row[1] + '" class="term-link" target="_blank" rel="noopener">' + row[2] + '</a>');
      });
    },
```

- [ ] **Step 8: Remove `resume` command**

Find:

```javascript
    resume: function() {
      line('opening resume.pdf …', 'term-muted');
      setTimeout(function() { window.open('/resume.pdf', '_blank'); }, 350);
    },
```

Replace with:

```javascript
    resume: function() {
      rich('resume &rarr; <a href="https://linkedin.com/in/onkesh" class="term-link" target="_blank" rel="noopener">linkedin.com/in/onkesh</a>');
    },
```

- [ ] **Step 9: Update `ping` easter egg**

Find:

```javascript
      line('PING arhumsavera.github.io (185.199.108.153): 56 bytes', 'term-muted');
```

Replace with:

```javascript
      line('PING onk3sh.github.io (185.199.108.153): 56 bytes', 'term-muted');
```

Find:

```javascript
        line('64 bytes from 185.199.108.153: icmp_seq=' + i + ' ttl=57 time=' + (1 + Math.random() * 4).toFixed(2) + ' ms', 'term-muted');
```

(no change needed — IP and format are generic)

Find:

```javascript
        line('--- arhumsavera.github.io ping statistics ---', 'term-muted');
```

Replace with:

```javascript
        line('--- onk3sh.github.io ping statistics ---', 'term-muted');
```

- [ ] **Step 10: Update `neofetch` easter egg**

Find:

```javascript
      var info = ['arhum@ops-shell','───────────────','OS:      portfolio v2','Kernel:  Astro 5 / GitHub Pages','Shell:   this terminal','Stack:   Python · TS · Kafka · LangChain','Uptime:  always'];
```

Replace with:

```javascript
      var info = ['onkesh@ops-shell','───────────────','OS:      portfolio v1','Kernel:  Astro 5 / GitHub Pages','Shell:   this terminal','Stack:   Java · Spring Boot · Python · TS','Uptime:  always'];
```

- [ ] **Step 11: Update `VISIBLE` commands list to remove `memory` and `orchestration`**

Find:

```javascript
  const VISIBLE = ['help','whoami','about','projects','ls','stack','memory','orchestration','contact','resume','lab','clear'];
```

Replace with:

```javascript
  const VISIBLE = ['help','whoami','about','projects','ls','stack','contact','resume','lab','clear'];
```

- [ ] **Step 12: Remove `memory` and `orchestration` command handlers**

Delete the `memory` handler:

```javascript
    memory: function() {
      type('3-layer memory architecture:', 'term-muted', 18).then(function() {
        wait(100).then(function() {
          [
            ['semantic',   'facts, entities, vector embeddings'],
            ['episodic',   'run traces, tool calls, outcomes'],
            ['procedural', 'playbooks, retry policies, heuristics'],
          ].forEach(function(row) {
            rich('  <span class="term-key">' + row[0].padEnd(11) + '</span>' + row[1]);
          });
        });
      });
    },
```

Delete the `orchestration` handler:

```javascript
    orchestration: function() {
      [
        '[1] domain router classifies task',
        '[2] planner compiles execution graph',
        '[3] executors run typed steps w/ retry/backoff',
        '[4] memory writer persists episodic trace',
        '[5] operator alert dispatched via Telegram',
      ].forEach(function(s, i) {
        setTimeout(function() { line(s, 'term-muted'); }, i * 110);
      });
    },
```

- [ ] **Step 13: Commit**

```bash
cd /Users/onkesh/coding_projects/personal_portfolio_website/onk3sh.github.io
git add astro-src/src/pages/index.astro astro-src/public/data/terminal-commands.json
git commit -m "rebrand: update terminal commands and easter eggs to Onkesh's identity"
```

---

## Task 7: Rewrite `about.astro`

**Files:**
- Modify: `astro-src/src/pages/about.astro`

- [ ] **Step 1: Replace the entire file**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { roles, education } from '../data/experience';
import { featuredProjects } from '../data/projects';
---

<BaseLayout title="About" description="Onkesh Bansal — Senior Full Stack Developer and AI/ML Engineer based in Toronto.">
  <section class="section">
    <div class="panel about-intro">
      <h2>I build things that hold up.</h2>
      <p>
        I started at Quark Software in Chandigarh, building enterprise XML authoring
        tools and shipping back-to-back releases with enough consistency to earn an
        employee recognition award in 2014. That set the tone: I care about delivery
        quality, not just working demos.
      </p>
      <p>
        Adobe came next — Acrobat and Digital Media teams in Noida and Bangalore.
        Then a move to North America, graduate studies at the University of Windsor
        (3.9 GPA), and a senior engineering role at Centric Consulting in Chicago.
        There I built the Central Mutual Insurance automation framework from scratch:
        no existing QA pipeline, no DevOps integration, no reporting — just a problem
        and a deadline. It shipped.
      </p>
      <p>
        I've been at Basis Technologies in Toronto since 2022, building full-stack
        features and automation tooling for an ad-tech platform. On the side, I
        teach web technologies to high school students — HTML, CSS, JavaScript —
        because the best way to stay sharp is to explain things simply.
      </p>
      <p>
        Currently exploring AI/ML tooling: how models fit into real workflows,
        where automation breaks down, and what it takes to make AI useful outside
        a notebook.
      </p>
    </div>
  </section>

  <section class="section">
    <h2>Selected Work</h2>
    <div class="grid-2">
      {featuredProjects.map((project) => (
        <a class="card" href={`/post/${project.slug}/`}>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </a>
      ))}
    </div>
  </section>

  <section class="section">
    <h2>Career</h2>
    <div class="panel timeline">
      {roles.map((role) => (
        <div class="tl-item">
          <div class="tl-meta">
            <span class="tl-date">{role.period}</span>
            <span class="tl-company">{role.company}</span>
          </div>
          <div class="tl-body">
            <strong>{role.title}</strong> &middot; {role.location}
            <p>{role.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  <section class="section">
    <h2>Education</h2>
    <div class="panel timeline">
      {education.map((deg) => (
        <div class="tl-item">
          <div class="tl-meta">
            <span class="tl-date">{deg.period}</span>
            <span class="tl-company">{deg.institution}</span>
          </div>
          <div class="tl-body">
            <strong>{deg.degree}</strong> &middot; {deg.location}
            {deg.detail && <p>{deg.detail}</p>}
          </div>
        </div>
      ))}
    </div>
  </section>

</BaseLayout>

<style is:inline>
  .about-intro h2 {
    margin: 0 0 0.85rem;
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    letter-spacing: -0.01em;
    line-height: 1.3;
  }

  /* ── timeline ── */
  .timeline {
    display: grid;
    gap: 0;
  }

  .tl-item {
    display: grid;
    grid-template-columns: 180px minmax(0, 1fr);
    gap: 0.75rem 1.25rem;
    padding: 1.1rem 0;
    border-bottom: 1px solid var(--line);
  }

  .tl-item:last-child { border-bottom: none; }

  .tl-meta {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding-top: 0.05rem;
  }

  .tl-date {
    font-size: 0.82rem;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
  }

  .tl-company {
    font-size: 0.9rem;
    font-weight: 600;
    color: #7fbfff;
  }

  .tl-body strong {
    font-size: 0.95rem;
    color: var(--text);
  }

  .tl-body p {
    margin: 0.4rem 0 0;
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  @media (max-width: 940px) {
    .tl-item { grid-template-columns: 1fr; gap: 0.25rem; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/onkesh/coding_projects/personal_portfolio_website/onk3sh.github.io
git add astro-src/src/pages/about.astro
git commit -m "rebrand: rewrite about page with Onkesh's bio and career"
```

---

## Task 8: Update `contact.astro`

**Files:**
- Modify: `astro-src/src/pages/contact.astro`

- [ ] **Step 1: Update BaseLayout description**

Find:

```astro
<BaseLayout title="Contact" description="Get in touch with Arhum Savera — open to backend, AI systems, and senior engineering roles.">
```

Replace with:

```astro
<BaseLayout title="Contact" description="Get in touch with Onkesh Bansal — open to senior engineering roles and technical collaborations.">
```

- [ ] **Step 2: Update contact links panel**

Find:

```html
        <a class="contact-email" href="mailto:arhum.a.savera@gmail.com">
          arhum.a.savera@gmail.com
        </a>
        <div class="contact-links">
          <a href="https://www.linkedin.com/in/arhumsavera/" target="_blank" rel="noopener noreferrer" class="contact-link-btn">
            LinkedIn
          </a>
          <a href="https://github.com/arhumsavera" target="_blank" rel="noopener noreferrer" class="contact-link-btn">
            GitHub
          </a>
          <a href="/resume.pdf" download="Arhum_Savera_Resume.pdf" class="contact-link-btn">
            Resume
          </a>
        </div>
```

Replace with:

```html
        <div class="contact-links">
          <a href="https://www.linkedin.com/in/onkesh" target="_blank" rel="noopener noreferrer" class="contact-link-btn">
            LinkedIn
          </a>
          <a href="https://github.com/onk3sh" target="_blank" rel="noopener noreferrer" class="contact-link-btn">
            GitHub
          </a>
          <a href="https://twitter.com/onk3sh" target="_blank" rel="noopener noreferrer" class="contact-link-btn">
            X / Twitter
          </a>
        </div>
```

Also remove the `<p>` paragraph that says "Email is the best way to reach me..." since we're not listing an email.

Replace the entire `<div class="panel contact-main">` block with:

```html
      <div class="panel contact-main">
        <h2>Let&rsquo;s talk</h2>
        <p>
          Reach me on LinkedIn — I check it regularly and respond to messages
          that include enough context to have a real conversation.
        </p>
        <div class="contact-links">
          <a href="https://www.linkedin.com/in/onkesh" target="_blank" rel="noopener noreferrer" class="contact-link-btn">
            LinkedIn
          </a>
          <a href="https://github.com/onk3sh" target="_blank" rel="noopener noreferrer" class="contact-link-btn">
            GitHub
          </a>
          <a href="https://twitter.com/onk3sh" target="_blank" rel="noopener noreferrer" class="contact-link-btn">
            X / Twitter
          </a>
        </div>
      </div>
```

- [ ] **Step 3: Commit**

```bash
cd /Users/onkesh/coding_projects/personal_portfolio_website/onk3sh.github.io
git add astro-src/src/pages/contact.astro
git commit -m "rebrand: update contact page with Onkesh's links"
```

---

## Task 9: Update `stack-map.json`

**Files:**
- Modify: `astro-src/public/data/stack-map.json`

- [ ] **Step 1: Replace the entire file**

```json
{
  "categories": [
    {"id": "backend",  "label": "Backend",         "color": "#7dd3fc"},
    {"id": "testing",  "label": "Testing & QA",    "color": "#34d399"},
    {"id": "infra",    "label": "Infra & DevOps",  "color": "#f59e0b"},
    {"id": "data",     "label": "Data",             "color": "#a78bfa"},
    {"id": "ai",       "label": "AI & ML",          "color": "#f472b6"}
  ],
  "skills": [
    {"name": "Java",          "category": "backend",  "level": 9,  "since": 2011, "summary": "Primary language for enterprise backend systems across Quark, Adobe, Centric, and Basis."},
    {"name": "Spring Boot",   "category": "backend",  "level": 8,  "since": 2016, "summary": "REST APIs and service layer for production full-stack applications."},
    {"name": "Python",        "category": "backend",  "level": 7,  "since": 2020, "summary": "Scripting, automation, and ML tooling."},
    {"name": "JavaScript",    "category": "backend",  "level": 7,  "since": 2014, "summary": "Frontend and full-stack web development."},
    {"name": "TypeScript",    "category": "backend",  "level": 6,  "since": 2021, "summary": "Type-safe frontend and Node.js development."},
    {"name": "Selenium",      "category": "testing",  "level": 9,  "since": 2014, "summary": "End-to-end UI automation across web platforms."},
    {"name": "JUnit",         "category": "testing",  "level": 8,  "since": 2011, "summary": "Unit and integration testing for Java services."},
    {"name": "TestNG",        "category": "testing",  "level": 7,  "since": 2016, "summary": "Test framework for data-driven and parallel test execution."},
    {"name": "Jenkins",       "category": "infra",    "level": 8,  "since": 2019, "summary": "CI/CD pipeline setup and maintenance for automation suites."},
    {"name": "Kubernetes",    "category": "infra",    "level": 6,  "since": 2021, "summary": "Container orchestration for service deployments."},
    {"name": "Docker",        "category": "infra",    "level": 7,  "since": 2019, "summary": "Containerized build and deployment pipelines."},
    {"name": "AWS",           "category": "infra",    "level": 6,  "since": 2020, "summary": "EC2, S3, and managed services for production deployments."},
    {"name": "PostgreSQL",    "category": "data",     "level": 7,  "since": 2019, "summary": "Relational data modeling and query optimization."},
    {"name": "Redis",         "category": "data",     "level": 7,  "since": 2021, "summary": "Caching and low-latency lookups for high-throughput services."},
    {"name": "HTML/CSS",      "category": "backend",  "level": 8,  "since": 2011, "summary": "Web UI development and responsive layouts."},
    {"name": "ML Fundamentals","category": "ai",      "level": 5,  "since": 2020, "summary": "Supervised learning, model evaluation, and applied ML via coursework and side projects."}
  ],
  "graph": {
    "nodes": [
      {"id": "bolt",       "label": "Bolt Framework",     "type": "project", "group": "backend",  "detail": "Muse export automation framework at Basis Technologies — replaces manual ops workflows with a reliable, auditable pipeline."},
      {"id": "urlshort",   "label": "URL Shortener",      "type": "project", "group": "backend",  "detail": "Spring Boot + Redis service with sub-millisecond redirect lookups and cache-aside pattern."},
      {"id": "automation", "label": "Central Mutual QA",  "type": "project", "group": "testing",  "detail": "Full QA automation framework built from scratch at Centric Consulting — Jenkins CI/CD, reporting, and E2E coverage."},
      {"id": "java",       "label": "Java",               "type": "tech",    "group": "backend",  "detail": "Core implementation language for enterprise backend services since 2011."},
      {"id": "springboot", "label": "Spring Boot",        "type": "tech",    "group": "backend",  "detail": "REST API and service layer for full-stack production applications."},
      {"id": "selenium",   "label": "Selenium",           "type": "tech",    "group": "testing",  "detail": "End-to-end UI test automation across web platforms."},
      {"id": "jenkins",    "label": "Jenkins",            "type": "tech",    "group": "infra",    "detail": "CI/CD pipeline setup and maintenance for automation suites."},
      {"id": "redis",      "label": "Redis",              "type": "tech",    "group": "data",     "detail": "Caching layer for high-throughput service lookups."},
      {"id": "postgres",   "label": "PostgreSQL",         "type": "tech",    "group": "data",     "detail": "Relational database for production data modeling."},
      {"id": "kubernetes", "label": "Kubernetes",         "type": "tech",    "group": "infra",    "detail": "Container orchestration for service deployments."}
    ],
    "links": [
      {"source": "bolt",       "target": "java"},
      {"source": "bolt",       "target": "springboot"},
      {"source": "urlshort",   "target": "springboot"},
      {"source": "urlshort",   "target": "redis"},
      {"source": "urlshort",   "target": "postgres"},
      {"source": "automation", "target": "selenium"},
      {"source": "automation", "target": "jenkins"},
      {"source": "springboot", "target": "java"},
      {"source": "jenkins",    "target": "kubernetes"}
    ]
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/onkesh/coding_projects/personal_portfolio_website/onk3sh.github.io
git add astro-src/public/data/stack-map.json
git commit -m "rebrand: update stack map with Onkesh's tech stack"
```

---

## Task 10: Build and verify

- [ ] **Step 1: Install dependencies**

```bash
cd /Users/onkesh/coding_projects/personal_portfolio_website/onk3sh.github.io/astro-src
npm install
```

Expected: installs without errors.

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: exits 0, `dist/` updated with no errors or warnings about missing files/imports.

- [ ] **Step 3: Verify no stale references remain**

```bash
cd /Users/onkesh/coding_projects/personal_portfolio_website/onk3sh.github.io
grep -ri "arhum" astro-src/src/ astro-src/public/ --include="*.astro" --include="*.ts" --include="*.json" --include="*.css"
```

Expected: no output.

- [ ] **Step 4: Preview the site**

```bash
cd astro-src
npm run preview
```

Open `http://localhost:4321` and verify:
- Hero shows "Onkesh Bansal"
- Terminal `whoami` shows Onkesh's details
- Navigation has no Resume link
- About page shows correct career timeline
- Contact page links to LinkedIn/GitHub/Twitter
- Stack map shows Java/Spring Boot/Selenium/Jenkins categories

- [ ] **Step 5: Commit dist if build script copies it**

```bash
cd /Users/onkesh/coding_projects/personal_portfolio_website/onk3sh.github.io
bash build.sh
git add -A
git commit -m "build: rebuild dist for GitHub Pages deployment"
```
