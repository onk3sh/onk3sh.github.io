# Content Layer Design

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Decouple all page copy and structured data from `.astro` page files so that the visual theme can be swapped without touching content.

**Architecture:** All content lives in TypeScript data files under `src/data/`. Pages import and render — no copy, URLs, or structured data defined inline in `.astro` files. Pages become thin presentational shells.

**Tech Stack:** Astro 5, TypeScript, existing `src/data/` pattern.

---

## Principles

- One data file per content domain. Pages are not the source of truth for any string.
- All types are explicitly defined and exported. Pages consume typed interfaces, never raw strings passed as props.
- Existing files (`experience.ts`, `projects.ts`, `impact.ts`, `stack-map.json`) are kept as-is except for stale content fixes in `impact.ts`.
- No new tooling — no Content Collections, no MDX, no CMS. Pure TypeScript.

---

## File Map

### New files to create

| File | Owns |
|---|---|
| `src/data/about.ts` | About page intro paragraphs, page headline |
| `src/data/hero.ts` | Index hero name, tagline, background blurb, page meta description |
| `src/data/contact.ts` | Social links, "open to" list, messaging tips, hero copy |
| `src/data/lab.ts` | Workflow visualizer step definitions, ETF dataset |

### Existing files to fix

| File | Change |
|---|---|
| `src/data/impact.ts` | Fix stale copy (Chicago → remove, "North America since 2019" → update) |

### Pages that become thin shells

| Page | Currently hardcodes |
|---|---|
| `src/pages/about.astro` | 4 intro paragraphs |
| `src/pages/index.astro` | Hero name, tagline, background blurb |
| `src/pages/contact.astro` | Social links, "open to" list, messaging tips, hero copy |
| `src/pages/lab.astro` | `STEPS` array (visualizer), `ETFS` array (screener) |

---

## Type Definitions

### `src/data/about.ts`

```ts
export type AboutContent = {
  headline: string;
  paragraphs: string[];
};

export const about: AboutContent = {
  headline: 'I build AI systems that work outside the demo.',
  paragraphs: [
    'Most of what I do...',   // paragraph 1
    'The clearest expression...',  // paragraph 2
    'A second strand...',     // paragraph 3
    'The rest of my background...', // paragraph 4
  ],
};
```

### `src/data/hero.ts`

```ts
export type HeroContent = {
  name: string;
  tagline: string;
  blurb: string;
  metaDescription: string;
};

export const hero: HeroContent = {
  name: 'Onkesh Bansal',
  tagline: 'Senior engineer building production AI systems — autonomous workflows, persistent memory, and tools that make AI actually useful in a real codebase. Based in Toronto.',
  blurb: 'I build full-stack systems and AI tooling that work in production — not demos...',
  metaDescription: 'Senior engineer building production AI systems. Full-stack depth, real-world instincts, based in Toronto.',
};
```

### `src/data/contact.ts`

```ts
export type SocialLink = {
  label: string;
  href: string;
};

export type OpenToItem = {
  label: string;
  description: string;
};

export type ContactContent = {
  hero: { headline: string; subline: string };
  intro: { heading: string; body: string };
  links: SocialLink[];
  openTo: { heading: string; items: OpenToItem[] };
  messagingTips: { heading: string; intro: string; tips: string[] };
  metaDescription: string;
};

export const contact: ContactContent = {
  hero: {
    headline: 'Get in Touch',
    subline: 'Open to senior engineering roles, technical collaborations, and conversations about backend architecture and production AI systems.',
  },
  intro: {
    heading: "Let's talk",
    body: 'Reach me on LinkedIn — I check it regularly and respond to messages that include enough context to have a real conversation.',
  },
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/onkesh' },
    { label: 'GitHub',   href: 'https://github.com/onk3sh' },
    { label: 'X / Twitter', href: 'https://twitter.com/onk3sh' },
  ],
  openTo: {
    heading: "What I'm open to",
    items: [
      { label: 'Senior IC roles', description: 'Backend, AI/ML platform, or full-stack with a strong systems focus.' },
      { label: 'AI platform work', description: 'LLM orchestration, agent tooling, retrieval systems, production ML.' },
      { label: 'Technical collaboration', description: 'Open-source, side projects, or consulting on backend and AI architecture.' },
      { label: 'Talks & writing', description: 'Happy to discuss agent engineering, voice workflows, or production AI patterns.' },
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
  metaDescription: 'Get in touch with Onkesh Bansal — senior engineer building production AI systems, open to Staff/Senior roles.',
};
```

### `src/data/lab.ts`

```ts
export type VisualizerStep = {
  title: string;
  icon: string;
  color: string;
  what: string;
  how: string[];
  why: string;
};

export type Etf = {
  ticker: string;
  name: string;
  cat: 'equity' | 'fixed-income' | 'balanced' | 'sector' | 'commodity';
  risk: 'low' | 'medium' | 'high';
  mer: number;
  aum: number;
  ytd: number;
  score: number;
};

export const visualizerSteps: VisualizerStep[] = [ /* current STEPS array */ ];
export const etfs: Etf[] = [ /* current ETFS array */ ];
```

---

## Page Changes

Each page change follows the same pattern:

1. Add import(s) from the relevant data file(s)
2. Replace every hardcoded string/array with a reference to the imported data
3. No logic changes — only data sourcing changes

### `about.astro`
```astro
import { about } from '../data/about';
// h2 → {about.headline}
// paragraphs → {about.paragraphs.map(p => <p>{p}</p>)}
```

### `index.astro`
```astro
import { hero } from '../data/hero';
// h1 → {hero.name}
// tagline p → {hero.tagline}
// blurb p → {hero.blurb}
// BaseLayout description → {hero.metaDescription}
```

### `contact.astro`
```astro
import { contact } from '../data/contact';
// All strings, links, and lists replaced with contact.* references
```

### `lab.astro`
```astro
import { visualizerSteps, etfs } from '../data/lab';
// inline STEPS const removed → visualizerSteps passed to script via data attribute or window var
// inline ETFS const removed → same pattern
```

**Note on lab.astro scripts:** The visualizer and ETF screener scripts are `is:inline` and run in the browser. Data must be serialised into the page for the scripts to consume — use a `<script is:inline>` that defines `window.__LAB_DATA__` from a JSON-serialised server-side import, then the browser scripts read from `window.__LAB_DATA__` instead of inline constants.

---

## impact.ts Fix

Remove stale references:
- "Production software across North America since 2019 — Basis Technologies (Toronto) and Centric Consulting (Chicago)..." → rewrite to reflect accurate geography and drop Chicago

---

## What This Enables

- **Theme swap:** Clone `src/pages/` and `src/layouts/` into a new branch, rewrite presentation entirely, `src/data/` untouched.
- **Content update:** Change one data file, all pages that consume it update automatically.
- **Type safety:** TypeScript catches missing fields or wrong types if a data file is partially updated.
- **No CMS dependency:** Content is version-controlled, diffable, and reviewable in PRs.

---

## Out of Scope

- `stack-map.json` — already decoupled, no changes needed
- `projects.ts` — already decoupled, no changes needed
- `experience.ts` — already decoupled, no changes needed
- Terminal command handlers in `index.astro` — these are behaviour, not content; left in place
- Lab page styles and JS logic — only the data arrays move out, not the rendering logic
