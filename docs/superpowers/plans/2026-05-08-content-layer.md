# Content Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move all hardcoded copy and structured data out of `.astro` page files into typed TypeScript data files, so pages are pure presentational shells and the entire theme can be swapped by rewriting pages without touching content.

**Architecture:** One TypeScript data file per content domain under `src/data/`. Pages import typed exports and render them — no strings, URLs, or arrays defined inline in `.astro` files. For lab.astro's `is:inline` browser scripts, data is serialised into `<script type="application/json">` tags in the HTML and read at runtime via `JSON.parse`.

**Tech Stack:** Astro 5, TypeScript, no new dependencies.

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `astro-src/src/data/about.ts` | About page headline + 4 intro paragraphs |
| Create | `astro-src/src/data/hero.ts` | Index page name, tagline, blurb, meta description |
| Create | `astro-src/src/data/contact.ts` | Social links, open-to list, messaging tips, hero copy |
| Create | `astro-src/src/data/lab.ts` | Visualizer step definitions + ETF dataset |
| Modify | `astro-src/src/pages/about.astro` | Import about.ts, replace hardcoded strings |
| Modify | `astro-src/src/pages/index.astro` | Import hero.ts, replace hardcoded strings |
| Modify | `astro-src/src/pages/contact.astro` | Import contact.ts, replace all hardcoded content |
| Modify | `astro-src/src/pages/lab.astro` | Import lab.ts, inject via JSON script tags |
| Modify | `astro-src/src/data/impact.ts` | Fix stale Chicago/North America copy |

---

## Task 1: Create `src/data/about.ts` and update `about.astro`

**Files:**
- Create: `astro-src/src/data/about.ts`
- Modify: `astro-src/src/pages/about.astro`

- [ ] **Step 1: Create `about.ts`**

```typescript
// astro-src/src/data/about.ts

export type AboutContent = {
  headline: string;
  paragraphs: string[];
};

export const about: AboutContent = {
  headline: 'I build AI systems that work outside the demo.',
  paragraphs: [
    'Most of what I do comes down to a single problem: getting an autonomous agent to behave sensibly across a long horizon, on a real codebase, without a human babysitting every step. That means designing persistent memory layers so context survives across sessions, building self-critique loops so the agent catches its own bad output before a human has to, and engineering the recovery paths — retries, rollbacks, escalation — that decide whether a system is actually trustworthy or just a good demo.',
    'The clearest expression of that work is a ticket-to-PR harness I built around Claude Code: it scans session history and long-form engineering notes before touching the repo, drafts the change, runs it past a self-improving review agent, and hands the engineer something worth reviewing rather than rewriting. The interesting engineering wasn\'t the model call — it was the orchestration around it: state that persists, judgment about when to stop, and a review loop that gets sharper over time.',
    'A second strand of the work is applying the same instincts to a non-developer domain — conversational ETF analysis for Canadian investors, with live market data, risk-matched scoring, and plain-language rebalancing. The hard parts there are the same ones that show up everywhere serious AI work lives: grounding the model in real data, keeping reasoning auditable, and degrading gracefully when an upstream feed misbehaves.',
    'The rest of my background is full-stack engineering across three countries — currently at Basis Technologies in Toronto, previously delivering for US enterprise clients at Centric Consulting in Gurgaon, and earlier at Adobe in Bangalore across the Acrobat, XD, and Muse teams, with graduate studies at the University of Windsor (3.9 GPA).',
  ],
};
```

- [ ] **Step 2: Update `about.astro` to import and render from `about.ts`**

Replace the frontmatter import line and the entire `about-intro` panel content:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { roles, education } from '../data/experience';
import { featuredProjects } from '../data/projects';
import { about } from '../data/about';
---
```

Replace the panel content:
```astro
    <div class="panel about-intro">
      <h2>{about.headline}</h2>
      {about.paragraphs.map((p) => <p>{p}</p>)}
    </div>
```

- [ ] **Step 3: Build and verify**

```bash
cd astro-src && npm run build
```

Expected: `9 page(s) built` with no errors. Open `dist/about/index.html` and confirm the four paragraphs appear.

- [ ] **Step 4: Commit**

```bash
git add astro-src/src/data/about.ts astro-src/src/pages/about.astro astro-src/dist/
git commit -m "refactor: extract about page content to about.ts"
```

---

## Task 2: Create `src/data/hero.ts` and update `index.astro`

**Files:**
- Create: `astro-src/src/data/hero.ts`
- Modify: `astro-src/src/pages/index.astro`

- [ ] **Step 1: Create `hero.ts`**

```typescript
// astro-src/src/data/hero.ts

export type HeroContent = {
  name: string;
  tagline: string;
  blurb: string;
  metaDescription: string;
};

export const hero: HeroContent = {
  name: 'Onkesh Bansal',
  tagline: 'Senior engineer building production AI systems — autonomous workflows, persistent memory, and tools that make AI actually useful in a real codebase. Based in Toronto.',
  blurb: 'I build full-stack systems and AI tooling that work in production — not demos. Currently at Basis Technologies in Toronto, and building on the side: an AI engineering harness that gives Claude Code persistent memory and autonomous PR workflows, and CanvestAI, a conversational investment analysis tool for Canadian markets. The through-line is systems that hold up.',
  metaDescription: 'Senior engineer building production AI systems. Full-stack depth, real-world instincts, based in Toronto.',
};
```

- [ ] **Step 2: Update `index.astro` frontmatter**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { featuredProjects, recentProjects } from '../data/projects';
import { impactItems } from '../data/impact';
import { hero } from '../data/hero';
---
```

- [ ] **Step 3: Update the BaseLayout description and hero section**

Replace the `<BaseLayout>` opening tag:
```astro
<BaseLayout
  title="Home"
  description={hero.metaDescription}
>
```

Replace the hero `<h1>` and `<p>` tagline:
```astro
      <h1>{hero.name}</h1>
      <p>{hero.tagline}</p>
```

Replace the blurb panel `<p>`:
```astro
      <p>{hero.blurb}</p>
```

- [ ] **Step 4: Build and verify**

```bash
cd astro-src && npm run build
```

Expected: `9 page(s) built` with no errors.

- [ ] **Step 5: Commit**

```bash
git add astro-src/src/data/hero.ts astro-src/src/pages/index.astro astro-src/dist/
git commit -m "refactor: extract index page hero content to hero.ts"
```

---

## Task 3: Create `src/data/contact.ts` and update `contact.astro`

**Files:**
- Create: `astro-src/src/data/contact.ts`
- Modify: `astro-src/src/pages/contact.astro`

- [ ] **Step 1: Create `contact.ts`**

```typescript
// astro-src/src/data/contact.ts

export type SocialLink = {
  label: string;
  href: string;
};

export type OpenToItem = {
  label: string;
  description: string;
};

export type ContactContent = {
  metaDescription: string;
  hero: { headline: string; subline: string };
  intro: { heading: string; body: string };
  links: SocialLink[];
  openTo: { heading: string; items: OpenToItem[] };
  messagingTips: { heading: string; intro: string; tips: string[] };
};

export const contact: ContactContent = {
  metaDescription: 'Get in touch with Onkesh Bansal — senior engineer building production AI systems, open to Staff/Senior roles.',
  hero: {
    headline: 'Get in Touch',
    subline: 'Open to senior engineering roles, technical collaborations, and conversations about backend architecture and production AI systems.',
  },
  intro: {
    heading: "Let's talk",
    body: 'Reach me on LinkedIn — I check it regularly and respond to messages that include enough context to have a real conversation.',
  },
  links: [
    { label: 'LinkedIn',    href: 'https://www.linkedin.com/in/onkesh' },
    { label: 'GitHub',      href: 'https://github.com/onk3sh' },
    { label: 'X / Twitter', href: 'https://twitter.com/onk3sh' },
  ],
  openTo: {
    heading: "What I'm open to",
    items: [
      { label: 'Senior IC roles',         description: 'Backend, AI/ML platform, or full-stack with a strong systems focus.' },
      { label: 'AI platform work',         description: 'LLM orchestration, agent tooling, retrieval systems, production ML.' },
      { label: 'Technical collaboration',  description: 'Open-source, side projects, or consulting on backend and AI architecture.' },
      { label: 'Talks & writing',          description: 'Happy to discuss agent engineering, voice workflows, or production AI patterns.' },
    ],
  },
  messagingTips: {
    heading: 'Good messages to send',
    intro: 'I respond faster when the message has enough context to skip a round-trip. Anything like:',
    tips: [
      'What the team or company does and what the role looks like technically.',
      "Why you think there's a fit — specific is better than generic.",
      'Preferred timeline and next step (call, async, etc.).',
    ],
  },
};
```

- [ ] **Step 2: Rewrite `contact.astro` frontmatter and template**

Full file replacement (styles block is unchanged — only the template changes):

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { contact } from '../data/contact';
---

<BaseLayout title="Contact" description={contact.metaDescription}>
  <section class="hero">
    <h1>{contact.hero.headline}</h1>
    <p>{contact.hero.subline}</p>
  </section>

  <section class="section">
    <div class="contact-grid">

      <div class="panel contact-main">
        <h2>{contact.intro.heading}</h2>
        <p>{contact.intro.body}</p>
        <div class="contact-links">
          {contact.links.map((link) => (
            <a href={link.href} target="_blank" rel="noopener noreferrer" class="contact-link-btn">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div class="panel contact-detail">
        <h2>{contact.openTo.heading}</h2>
        <ul class="open-to-list">
          {contact.openTo.items.map((item) => (
            <li>
              <span class="ot-label">{item.label}</span>
              {item.description}
            </li>
          ))}
        </ul>
      </div>

    </div>
  </section>

  <section class="section">
    <div class="panel">
      <h2>{contact.messagingTips.heading}</h2>
      <p class="hint-intro">{contact.messagingTips.intro}</p>
      <ul class="hint-list">
        {contact.messagingTips.tips.map((tip) => (
          <li>{tip}</li>
        ))}
      </ul>
    </div>
  </section>
</BaseLayout>
```

Note: the frontmatter import path is `'../data/contact'` (contact.astro is at `src/pages/contact.astro`).

- [ ] **Step 3: Build and verify**

```bash
cd astro-src && npm run build
```

Expected: `9 page(s) built` with no errors. Check `dist/contact/index.html` to confirm all three sections render.

- [ ] **Step 4: Commit**

```bash
git add astro-src/src/data/contact.ts astro-src/src/pages/contact.astro astro-src/dist/
git commit -m "refactor: extract contact page content to contact.ts"
```

---

## Task 4: Create `src/data/lab.ts` and update `lab.astro`

**Files:**
- Create: `astro-src/src/data/lab.ts`
- Modify: `astro-src/src/pages/lab.astro`

The `is:inline` scripts in lab.astro run in the browser and cannot import TypeScript modules directly. The approach: Astro renders `<script type="application/json">` tags containing the serialised data using `set:html`. The browser scripts read those tags with `JSON.parse` instead of using inline constants.

- [ ] **Step 1: Create `lab.ts`**

```typescript
// astro-src/src/data/lab.ts

export type VisualizerStep = {
  title: string;
  icon: string;
  color: string;
  what: string;
  how: string[];
  why: string;
};

export type EtfCategory = 'equity' | 'fixed-income' | 'balanced' | 'sector' | 'commodity';
export type EtfRisk = 'low' | 'medium' | 'high';

export type Etf = {
  ticker: string;
  name: string;
  cat: EtfCategory;
  risk: EtfRisk;
  mer: number;
  aum: number;
  ytd: number;
  score: number;
};

export const visualizerSteps: VisualizerStep[] = [
  {
    title: '1 — Session Memory Scan',
    icon: '🧠',
    color: '#f472b6',
    what: 'Before touching a single file, the harness scans the last 50 Claude Code sessions stored in ~/.claude/projects/.',
    how: [
      'Parses JSONL session logs for relevant context — previous decisions, known issues, patterns the agent has learned.',
      'Queries the Obsidian long-term memory vault for project-level knowledge and past architectural decisions.',
      'Builds a context summary that gets prepended to every subsequent prompt in the pipeline.',
    ],
    why: 'Most AI coding tools are stateless. This is what makes the harness feel like a senior dev who remembers the codebase — not a fresh hire every time.',
  },
  {
    title: '2 — Codebase Analysis',
    icon: '🔍',
    color: '#7dd3fc',
    what: "With memory context loaded, the agent maps the codebase to understand what's relevant to the ticket.",
    how: [
      'Reads the ticket description and extracts intent, scope, and affected domains.',
      'Searches the repo for related files, interfaces, and existing patterns using grep and AST-aware tools.',
      'Identifies test coverage gaps and integration points that the implementation must respect.',
    ],
    why: "Targeted analysis prevents the agent from making changes in the wrong abstraction layer or duplicating existing logic it didn't know about.",
  },
  {
    title: '3 — Plan & Draft',
    icon: '📋',
    color: '#a78bfa',
    what: 'The agent produces a step-by-step implementation plan before writing a single line of code.',
    how: [
      'Writes a spec: what files to create or modify, what the interfaces look like, what the tests should verify.',
      'Flags ambiguities or missing information and surfaces them for human review before proceeding.',
      'The plan is committed to the repo so the human can review the approach independently of the code.',
    ],
    why: "Separating planning from execution catches design mistakes early — before they're baked into 300 lines of committed code.",
  },
  {
    title: '4 — Execute',
    icon: '⚙️',
    color: '#34d399',
    what: 'The agent implements the plan task by task, writing code, tests, and commits as it goes.',
    how: [
      'Follows TDD where applicable — failing test first, then minimal implementation to pass.',
      'Each task is committed independently so the diff is reviewable at a granular level.',
      'Self-reviews after each task: checks for spec drift, missing edge cases, and code quality issues.',
    ],
    why: 'Frequent commits and self-review catch scope creep and regressions before they compound into a hard-to-review wall of changes.',
  },
  {
    title: '5 — Review Loop',
    icon: '🔎',
    color: '#f59e0b',
    what: 'Before the PR is opened, the agent runs a two-stage review: spec compliance first, then code quality.',
    how: [
      'Spec compliance: did the implementation cover everything in the plan? Nothing extra, nothing missing.',
      'Code quality: are there smells, dead code, missing error handling at boundaries, or naming issues?',
      'The agent fixes its own findings and re-reviews until both stages pass — or escalates to the human.',
    ],
    why: 'This is the self-improving loop. Each review cycle produces feedback that gets written back into long-term memory, making future cycles sharper.',
  },
  {
    title: '6 — Open PR',
    icon: '🚀',
    color: '#60a5fa',
    what: 'A pull request is opened with a structured description generated from the plan and commit history.',
    how: [
      'PR body includes: summary of changes, test plan, architectural decisions made, and anything the reviewer should know.',
      "The human's job is to validate correctness and approve — not to write or direct the implementation.",
      'Reviewer feedback is captured and fed back into long-term memory for the next cycle.',
    ],
    why: 'The human stays in the loop as the quality gate, not the bottleneck. The agent handles execution; the engineer handles judgment.',
  },
];

export const etfs: Etf[] = [
  {ticker:'XIU',  name:'iShares S&P/TSX 60 Index ETF',                     cat:'equity',       risk:'medium', mer:0.18, aum:14200, ytd:5.2,  score:92},
  {ticker:'XIC',  name:'iShares Core S&P/TSX Capped Composite',             cat:'equity',       risk:'medium', mer:0.06, aum:11400, ytd:4.8,  score:95},
  {ticker:'VCN',  name:'Vanguard FTSE Canada All Cap Index ETF',             cat:'equity',       risk:'medium', mer:0.05, aum:6900,  ytd:5.0,  score:96},
  {ticker:'XUS',  name:'iShares Core S&P 500 Index ETF (CAD)',               cat:'equity',       risk:'medium', mer:0.10, aum:8700,  ytd:12.3, score:91},
  {ticker:'VFV',  name:'Vanguard S&P 500 Index ETF',                         cat:'equity',       risk:'medium', mer:0.09, aum:10200, ytd:12.5, score:93},
  {ticker:'XQQ',  name:'iShares NASDAQ 100 Index ETF (CAD)',                 cat:'equity',       risk:'high',   mer:0.39, aum:3100,  ytd:15.8, score:78},
  {ticker:'HXQ',  name:'Horizons NASDAQ-100 Index ETF',                      cat:'equity',       risk:'high',   mer:0.28, aum:1800,  ytd:16.1, score:81},
  {ticker:'XEQT', name:'iShares Core Equity ETF Portfolio',                  cat:'balanced',     risk:'medium', mer:0.20, aum:5600,  ytd:7.1,  score:88},
  {ticker:'VEQT', name:'Vanguard All-Equity ETF Portfolio',                  cat:'balanced',     risk:'medium', mer:0.24, aum:4900,  ytd:7.3,  score:87},
  {ticker:'XGRO', name:'iShares Core Growth ETF Portfolio',                  cat:'balanced',     risk:'medium', mer:0.20, aum:3800,  ytd:6.0,  score:89},
  {ticker:'VGRO', name:'Vanguard Growth ETF Portfolio',                      cat:'balanced',     risk:'medium', mer:0.24, aum:3200,  ytd:6.2,  score:86},
  {ticker:'XBAL', name:'iShares Core Balanced ETF Portfolio',                cat:'balanced',     risk:'low',    mer:0.20, aum:2100,  ytd:4.5,  score:88},
  {ticker:'VBAL', name:'Vanguard Balanced ETF Portfolio',                    cat:'balanced',     risk:'low',    mer:0.24, aum:1900,  ytd:4.7,  score:86},
  {ticker:'XBB',  name:'iShares Core Canadian Universe Bond ETF',            cat:'fixed-income', risk:'low',    mer:0.10, aum:3700,  ytd:2.1,  score:84},
  {ticker:'VAB',  name:'Vanguard Canadian Aggregate Bond Index ETF',         cat:'fixed-income', risk:'low',    mer:0.09, aum:4100,  ytd:2.3,  score:86},
  {ticker:'ZAG',  name:'BMO Aggregate Bond Index ETF',                       cat:'fixed-income', risk:'low',    mer:0.09, aum:3500,  ytd:2.2,  score:85},
  {ticker:'XSB',  name:'iShares Core Canadian Short Term Bond ETF',          cat:'fixed-income', risk:'low',    mer:0.10, aum:2800,  ytd:3.8,  score:83},
  {ticker:'XHYC', name:'iShares Canadian High Yield Bond ETF',               cat:'fixed-income', risk:'medium', mer:0.61, aum:1100,  ytd:5.1,  score:68},
  {ticker:'ZRE',  name:'BMO Equal Weight REITs Index ETF',                   cat:'sector',       risk:'medium', mer:0.61, aum:1050,  ytd:1.8,  score:71},
  {ticker:'XRE',  name:'iShares S&P/TSX Capped REIT Index ETF',              cat:'sector',       risk:'medium', mer:0.61, aum:1200,  ytd:1.6,  score:70},
  {ticker:'XEG',  name:'iShares S&P/TSX Capped Energy Index ETF',            cat:'sector',       risk:'high',   mer:0.61, aum:1600,  ytd:-2.4, score:62},
  {ticker:'XFN',  name:'iShares S&P/TSX Capped Financials Index ETF',        cat:'sector',       risk:'medium', mer:0.61, aum:2100,  ytd:6.8,  score:74},
  {ticker:'ZGD',  name:'BMO Junior Gold Index ETF',                          cat:'commodity',    risk:'high',   mer:0.61, aum:310,   ytd:18.3, score:59},
  {ticker:'CGL',  name:'iShares Gold Bullion ETF (Hedged)',                  cat:'commodity',    risk:'medium', mer:0.55, aum:580,   ytd:14.1, score:67},
  {ticker:'HUG',  name:'Horizons Gold ETF',                                  cat:'commodity',    risk:'medium', mer:0.35, aum:420,   ytd:14.4, score:71},
];
```

- [ ] **Step 2: Add data injection to `lab.astro` frontmatter and HTML**

In the frontmatter, add the import:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { visualizerSteps, etfs } from '../data/lab';
---
```

Immediately after the opening `<BaseLayout>` tag (before the first `<section>`), add two JSON script tags:
```astro
<script id="__lab-steps__" type="application/json" set:html={JSON.stringify(visualizerSteps)}></script>
<script id="__lab-etfs__" type="application/json" set:html={JSON.stringify(etfs)}></script>
```

- [ ] **Step 3: Update the visualizer `is:inline` script to read from the JSON tag**

In the first `<script is:inline>` block, replace the entire `const STEPS = [ ... ];` array with:
```js
const STEPS = JSON.parse(document.getElementById('__lab-steps__').textContent);
```

- [ ] **Step 4: Update the ETF screener `is:inline` script to read from the JSON tag**

In the second `<script is:inline>` block, replace the entire `const ETFS = [ ... ];` array with:
```js
const ETFS = JSON.parse(document.getElementById('__lab-etfs__').textContent);
```

- [ ] **Step 5: Build and verify**

```bash
cd astro-src && npm run build
```

Expected: `9 page(s) built` with no errors. Open `dist/lab/index.html`, confirm the two JSON script tags are present with correct content, and that the inline scripts no longer contain the data arrays.

- [ ] **Step 6: Commit**

```bash
git add astro-src/src/data/lab.ts astro-src/src/pages/lab.astro astro-src/dist/
git commit -m "refactor: extract lab page data to lab.ts, inject via JSON script tags"
```

---

## Task 5: Fix stale copy in `impact.ts`

**Files:**
- Modify: `astro-src/src/data/impact.ts`

- [ ] **Step 1: Update the stale impact item**

The fourth item still references "North America since 2019" and "Centric Consulting (Chicago)". Replace the entire `impactItems` array with:

```typescript
export const impactItems: ImpactItem[] = [
  {
    text: 'Building a production AI engineering harness on Claude Code — autonomous ticket-to-PR with persistent memory across sessions and a self-improving code review agent.',
  },
  {
    text: 'Built CanvestAI: conversational ETF analysis and portfolio rebalancing for Canadian investors, powered by live market data and a risk-matched scoring engine.',
  },
  {
    text: 'Senior full-stack engineer at Basis Technologies since 2022 — shipping across the ad-tech platform stack in Ruby on Rails and Java Spring Boot, and building internal AI tooling.',
  },
  {
    text: 'Engineering across three countries since 2015 — Basis Technologies (Toronto), Centric Consulting (Gurgaon), and Adobe (Bangalore) across the Acrobat, XD, and Muse teams.',
  },
];
```

- [ ] **Step 2: Build and verify**

```bash
cd astro-src && npm run build
```

Expected: `9 page(s) built` with no errors.

- [ ] **Step 3: Commit**

```bash
git add astro-src/src/data/impact.ts astro-src/dist/
git commit -m "fix: update impact.ts — correct geography, remove Chicago reference"
```
