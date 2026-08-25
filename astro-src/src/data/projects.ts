export type Project = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  featured?: boolean;
  type: 'project' | 'article';
  projectType?: 'work' | 'personal';
  tags?: string[];
  sections: Array<{
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
};

export const projects: Project[] = [
  {
    slug: 'search-campaign-builder',
    title: 'Search Campaign Builder — Performance Engineering',
    date: '2026-05-14',
    type: 'project',
    projectType: 'work',
    tags: ['work', 'Performance Engineering'],
    summary: 'Java/Spring Boot service handling Google Ads campaign data on a production ad-tech platform. Diagnosed and resolved 4 root causes (missing indexes, N+1 queries, lock contention, concurrency bug) — absorbed 4× workload growth at flat p99.',
    featured: true,
    sections: [],
  },
  {
    slug: 'media-activation',
    title: 'Media Activation — Delivery & Changelog',
    date: '2026-05-13',
    type: 'project',
    projectType: 'work',
    tags: ['work', 'Ruby on Rails'],
    summary: 'Built a from-scratch changelog system for delivery publishing on a production ad-tech platform. Before/after snapshot diffing, field-level change calculator, server-side categorization. 500 events/day, 5M+ rows, serving 100+ internal users.',
    featured: true,
    sections: [],
  },
  {
    slug: 'adtech-platform',
    title: 'Ad-Tech Platform — Production Engineering',
    date: '2026-05-10',
    type: 'project',
    projectType: 'work',
    tags: ['work', 'Platform'],
    summary:
      'The umbrella view of the ad-tech platform work: performance engineering that absorbed 4× load growth at flat p99, and a from-scratch changelog system serving 100+ internal users.',
    sections: [],
  },
  {
    slug: 'agent-development-harness',
    title: 'Agent Development Harness',
    date: '2026-05-01',
    type: 'project',
    projectType: 'work',
    tags: ['work', 'AI Systems'],
    summary:
      'A six-phase gate-enforced development pipeline for AI coding agents. Each gate maps to a recurring PR review failure mode. Includes a three-tier audited memory layer, custom Bitbucket MCP server, ast-grep + LSP search (70% token reduction), and autonomous go/no-go reviewer. Used on my own engineering work.',
    featured: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Most AI coding workflows optimize the wrong variable. They tune prompts, swap models, chase context windows — and ship the same defects their human-only workflow shipped, just faster. The harness is the opposite bet: hold the model constant, and engineer the process around it the way you would engineer a deploy pipeline.',
          'The Harness is a six-phase lifecycle — Requirements, Plan, Stress-Test, Implement, Self-Review, Completion — with non-skippable gates between each. Every gate maps to a specific failure mode observed recurring three or more times in my own pull-request review history. The Plan phase exists because reviewers kept catching scope creep. The Stress-Test phase exists because reviewers kept catching design choices that wouldn\'t survive a follow-up question. The Self-Review phase runs thirteen ordered checks across four parallel agents because those are the thirteen categories my reviewers have flagged most often.',
          'Underneath the lifecycle sits a supporting stack: ast-grep and LSP queries instead of grep (about a 70% token reduction per task), difft for structural diffs that sub-agents can parse, a three-tier memory layer (LLM Wiki, Obsidian, JSONL session graph) audited by three independent linters, a custom Bitbucket MCP server built from scratch, and shellcheck wired as a hard PostToolUse hook. All of it lives in ~/.claude/ — zero company code, zero proprietary infra.',
        ],
      },
      {
        heading: 'Architecture',
        bullets: [
          'Six-phase iron-law lifecycle: Requirements → Plan → Stress-Test → Implement → Self-Review → Completion. No phase skippable. Each gate traces to a recurring PR review failure mode.',
          'Evidence-required completion: no success claim without raw command output. Lint and test logs are the artifact, not a summary.',
          'Thirteen-check self-review across four parallel agents. Findings classified AUTO / BATCH / MANUAL and persisted to Obsidian before completion is allowed.',
          'Autonomous reviewer (dd-reviewer): runs the full thirteen-check pass on any PR and returns a go/no-go report. References /project-commands.md at runtime so review logic stays current.',
          'Token-cost engineering: ast-grep + LSP replace grep across the search layer for ~70% token reduction per task. difft replaces text diffs for sub-agent consumption.',
          'Three-tier audited memory: LLM Wiki (weekly GC, Karpathy pattern), Obsidian second brain, JSONL session knowledge graph. Independently audited by lint-memory, lint-skills, and system-gc.',
          'Custom Bitbucket MCP server: built from scratch — no official plugin existed. Powers PR-Pulse live PR state tracking.',
          'Safety boundary: Claude Code sandbox mode + shellcheck PostToolUse hook + human-in-the-loop locked on all reviews.',
          'Async observability: Slack integration across all routines for status reporting when away from the machine.',
          'Scope: ~10 own tickets shipped end-to-end, 30+ external OSS PRs reviewed by dd-reviewer. All infrastructure in ~/.claude/ — zero company code involved.',
        ],
      },
      {
        heading: 'Status',
        paragraphs: [
          'In active use. Core pipeline (all six phases), memory layer (all three tiers + three auditors), dd-reviewer, PR-Pulse, and Slack observability are working. A performance optimization on a 76M-row table deployed May 2026 — results pending.',
        ],
      },
    ],
  },
  {
    slug: 'agent-memory-three-tiers',
    title: 'The three-tier memory layer I built for my coding agent',
    date: '2026-05-25',
    type: 'article',
    projectType: 'work',
    tags: ['work', 'AI Systems'],
    summary:
      'Most agent memory designs either forget everything between sessions or accumulate noise until they\'re useless. A Karpathy-pattern LLM wiki, an Obsidian second brain, and a JSONL session knowledge graph — each with its own auditor and GC cycle.',
    featured: true,
    sections: [],
  },
  {
    slug: 'rg-vs-ast-grep',
    title: 'Code search tool benchmark: rg, ast-grep, MCP, and what the data actually says',
    date: '2026-05-12',
    type: 'article',
    projectType: 'work',
    tags: ['work', 'AI Tooling'],
    summary:
      'A benchmark across four production codebases. rg wins hit rate everywhere. ast-grep wins on one narrow query class — structural patterns — where rg returns zero with no error. The fix is routing by query class, not switching tools.',
    featured: true,
    sections: [],
  },
  {
    slug: 'iron-law-gates',
    title: 'Iron-Law Gates: How I Turned My PR Review History Into an AI Pipeline',
    date: '2026-05-11',
    type: 'article',
    projectType: 'work',
    tags: ['work', 'Engineering'],
    summary:
      'I audited 100+ PR review comments across two production codebases over 3 months, found 16 recurring failure categories, and encoded each one as a non-skippable gate in an AI-assisted development pipeline. The gates exist because specific reviewers kept catching specific failures.',
    featured: true,
    sections: [],
  },
  {
    slug: 'canvestai',
    title: 'CanvestAI',
    date: '2026-08-25',
    type: 'project',
    projectType: 'personal',
    tags: ['personal', 'AI Systems'],
    summary:
      'ETF research for Canadian retail investors, rebuilt as two systems over one SQLite database: a nightly pipeline where eight weighted lenses score 16 equity sectors and deliberate, and a LangGraph conversational advisor that fans out to four discipline agents per turn. Every recommendation is scored again once its horizon elapses — including each lens separately, so the weights have to earn themselves.',
    featured: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Canadian retail investors face a fragmented research experience — scattered data, opaque fees, and generic advice that doesn\'t account for personal risk tolerance or tax situation. CanvestAI started as a set of composable ETF-scoring skills run from a terminal. It is now two systems sharing one SQLite database, and the split is the point: the part that must run unattended does not depend on the part that talks.',
          'The nightly pipeline requires no LLM at all. It is cron-safe Python and bash. The conversational orchestrator sits on top and reads the pipeline\'s output through a read-only MCP surface, adding live market and web data at question time. If the orchestrator is down, the pipeline still produces its verdicts; if a data feed is down, the pipeline degrades a lens rather than skipping the night.',
        ],
      },
      {
        heading: 'The nightly pipeline',
        paragraphs: [
          'Eight lens agents score 16 equity sectors in parallel, each carrying a fixed weight: technical (0.25), business cycle (0.20), monetary policy (0.15), astro (0.15), geopolitical (0.10), sentiment (0.08), social media (0.05), numerology (0.02). A deliberation agent combines them into a weighted score and — more usefully — detects conflict between lenses and keeps a dissent log, so a verdict that only looks confident because seven lenses were quiet is distinguishable from one where they agreed.',
          'Ephemeris data, charts, and the Vedic lens no longer live in this repo. They were extracted into a separate astro agent reached over A2A, with a single client module in CanvestAI speaking that protocol.',
          'Verdicts are written to a recommendations table and then graded. Once a recommendation\'s horizon elapses, the outcome is scored against what actually happened — and each lens is scored separately, at its own horizon. That is the part that keeps the weights honest: a lens that carries 0.25 of the vote has a track record you can go and read.',
        ],
      },
      {
        heading: 'The conversational orchestrator',
        bullets: [
          'LangGraph supervisor spine: fold memory, route the turn, then either clarify, answer directly, or run the full chain.',
          'Recommendation turns fan out to four discipline agents in parallel — fundamental, technical, astro, research — then join, deliberate, rank ETFs in code, recommend, and challenge the recommendation before composing a reply.',
          'Ranking stays in code rather than in a prompt, so the same inputs produce the same ordering and the step is testable.',
          'A dedicated challenge agent argues against the recommendation before the user sees it.',
          'Narrow routes (research only, astro only, sky only, portfolio review) skip the deliberation chain entirely instead of paying for a fan-out that has nothing to merge.',
          'Agents are reached only through an A2A seam — no graph node imports an agent directly.',
          'Per-turn cost ceiling: a callback meters real token usage and prices it live. On a hard breach, nodes degrade to no-ops and record themselves, so the turn always reaches a reply built from what was gathered.',
        ],
      },
      {
        heading: 'Status',
        paragraphs: [
          'Both systems run. The pipeline scores sectors nightly and grades its own past calls; the orchestrator answers turns end to end.',
          'The open problem is trade construction, not signal generation. Paper-trading results are currently withheld from the public dashboard because the engine books positions the target account cannot actually place — a bearish sector view was being expressed as a direct index short rather than through an available instrument. Until that is fixed, the recorded P&L measures the modelling error more than the model.',
        ],
      },
    ],
  },
  {
    slug: 'a2a-agent-orchestration',
    title: 'Every agent behind one seam: what A2A orchestration actually bought me',
    date: '2026-08-25',
    type: 'article',
    projectType: 'personal',
    tags: ['personal', 'AI Systems'],
    summary:
      'A conversational advisor that fans out to four agents per turn, deliberates, and composes a reply. The design decision that mattered was not the model or the prompt — it was refusing to let any node import an agent directly. Two production bugs, one cost ceiling, and what the seam paid back.',
    featured: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'CanvestAI\'s orchestrator answers a question by fanning out to four discipline agents in parallel — fundamental, technical, astro, research — joining their verdicts, deliberating over them, ranking ETFs in code, recommending, challenging its own recommendation, and composing a reply. It is a LangGraph supervisor spine, and on paper it is a normal multi-agent chatbot.',
          'The decision that shaped it was not which model to route to. It was a rule: no graph node may import an agent. Every call goes through a single function — `dispatch(name, task)` — on an A2A client. Nodes know agent names, not agent modules.',
          'That is a hub topology, and for the MVP it is a lie in the useful sense: the agents run in-process, in the same Python process as the graph, because the box has 16 GB of RAM and per-agent server processes would not fit. The seam is real even though the network is not. Promoting to full A2A — the SDK, one server per agent, agent cards — means reimplementing one module. No node changes.',
          'The lie is already half-retired. Planetary positions, aspects, and dasha periods used to be computed inside the repo. They now live in a separate service reached over actual A2A: a JSON-RPC 2.0 `message/send` carrying a named op and its parameters, pointed at `ASTRO_AGENT_URL`. One module in CanvestAI speaks that protocol. Everything upstream of it changed a single import line, because the client functions kept the same names, the same signatures, and the same return types as the local functions they replaced — dates still come back as `datetime.date`, not ISO strings.',
        ],
      },
      {
        heading: 'The contracts are deliberately different',
        paragraphs: [
          'The same remote agent is reached two ways, and the difference is the whole point of putting a seam there.',
          '`call(op, **params)` never raises. It returns an unavailable marker. The orchestrator uses this, because a dead astro agent should cost you one lens out of four, not the entire turn.',
          '`require(op, **params)` raises, and names both the URL and how to start the agent. Batch scripts use this, because silently writing a nightly report with no astrology in it is worse than stopping and saying so.',
          'A single "handle the error" convention would have gotten one of those two cases wrong. Which failure is acceptable depends on who is waiting for the answer.',
        ],
      },
      {
        heading: 'What parallelism broke',
        paragraphs: [
          'Two bugs came out of running the four discipline nodes concurrently, and both are worth writing down because neither is visible in a sequential test.',
          'The first: the A2A client is a process-wide singleton, built lazily. The original code published the singleton and then filled its registry. The four discipline nodes run in one superstep, on separate threads, and all of them call the accessor. Whichever threads arrived after publication but before registration dispatched against a half-built registry — a live turn lost fundamental, technical, and research to `no A2A agent registered`, while astro succeeded. The fix is unglamorous: build the client fully, then publish it, under a lock.',
          'The second: agent registration imports each agent module. A comment claimed a broken module would simply fail to register. It did not. One bad import raised out of the builder, and because the builder runs inside the singleton construction, a single broken agent took down every agent for the process. Now each import is isolated and a failure costs only that agent — the graph already knows how to degrade one lens, record why, and compose from the rest.',
          'The shape of both bugs is the same. Concurrency turned a latent ordering assumption into a partial outage, and in a fan-out system the partial outage is the dangerous one: the turn still returns an answer, just a quieter and worse-informed one.',
        ],
      },
      {
        heading: 'Efficiency is a budget, not a prompt',
        paragraphs: [
          'Multi-agent fan-out multiplies cost per turn, so the ceiling is enforced rather than hoped for. A LangChain callback meters real token usage across every LLM call in a turn, prices it from a models config, and exposes soft and hard breach checks. One meter per graph invocation.',
          'Enforcement is graceful by default. Nodes check the meter before spawning optional work; on a hard breach a node degrades to a no-op and records itself in a `degraded` list on the state. The turn always reaches compose, and the reply is assembled from whatever was actually gathered. Raising a budget error at the user is available, but it is the opt-in path, not the normal one.',
          'Cost is attributed per agent, not just per turn. Every model the factory builds is stamped with an `agent:<name>` tag, so the meter can say which agent spent the money — the number you need before deciding which lens to cut or route to a cheaper model. The meter also tracks cache reads and writes separately from fresh input tokens. Those are currently zero everywhere, which is itself the finding: no prefix is being cached yet.',
        ],
      },
      {
        heading: 'What the seam paid back',
        bullets: [
          'Agents moved from in-process to a separate service without touching a single graph node — the astro migration changed one import line at each call site.',
          'A broken agent degrades one lens with a recorded reason instead of failing the turn, because there is exactly one place that knows how to dispatch and how to fail.',
          'Cost is attributable per agent, which makes routing decisions arguable from data rather than intuition.',
          'The in-process shortcut stayed honest: it is confined to one module, and the constraint that forced it (16 GB) is written down next to it.',
          'The failure modes above were fixable in one file each. That is the actual return on refusing to let nodes import agents.',
        ],
      },
    ],
  },
];

export type ProductionProject = {
  title: string;
  summary: string;
  sections: Array<{
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
};

export const productionWork: ProductionProject[] = [
  {
    title: 'Ad-Tech Platform',
    summary: 'Production ad-tech platform serving media agencies — campaign creation, line item management, and delivery publishing across Google Ads, Meta, LinkedIn, and CM360.',
    sections: [
      {
        heading: 'Search Campaign Builder',
        paragraphs: [
          'Search Campaign Builder lets platform users create and manage Google Ads search campaigns directly from the platform. The backend — a Java/Spring Boot service — acts as the middle layer between the Rails platform and Google Ads, storing campaign hierarchy data for all entities. As campaign counts grew, the service started showing performance issues under load. A customer-reported production incident confirmed it.',
          'Led the investigation and fixes end-to-end, pairing with the tech lead at key decision points and checkpoints. Diagnosis started in Datadog — query breakdown surfaced sequential scans across the hot paths, total query counts, and cumulative execution time. The same scenarios were replicated locally to confirm and isolate. A structured benchmarking exercise — importing Google Ads campaigns with variable entity counts across iterations — mapped the scaling curve precisely. Three root causes emerged independently: missing indexes on hot query paths, N+1 queries in the campaign fetch layer, and transaction lock contention.',
          'A fourth issue surfaced during benchmarking: the same long-running campaign, when imported at different builds concurrently, caused collisions. This was a correctness problem hiding inside the performance failure.',
          'Each issue required a separate fix. Indexes were added on the hot paths. N+1 queries were consolidated. Transaction scope was narrowed — accepting a slightly wider consistency window in exchange for shorter lock durations. An idempotency guard was added at the import layer rather than a DB-level constraint, as the coordination needed to happen before the transaction opened, across build boundaries. The benchmark harness was re-run at 4× load to verify the fixes held.',
          'Delivered across 3 sprints. Result: 4× workload growth absorbed with flat p50/p95/p99 latency. Postgres index hit rate lifted from 81% to 93%, with a corresponding drop in query latency on the hot campaign fetch path.',
        ],
      },
      {
        heading: 'Media Activation — Delivery & Changelog',
        paragraphs: [
          'Media Activation handles publishing line item placements to external systems, starting with CM360. The internal media agency team had no way to track what changed in the delivery view without going to CM360 directly — every discrepancy meant a support request across 100+ users.',
          'The existing changelog was a simple append log with no query management, no categorization, and no structured output for UI consumption. Rather than extend it — the existing system had accumulated complexity that made modification risky — a new changelog was built: 80% net-new, sharing only the ActiveRecord integration layer and the data table schema. Reusing the schema avoided a data migration; owning the logic gave full control over query management and event structure. The tradeoff: some duplication with the old system that will need consolidating over time.',
          'The core is a before/after snapshot approach. Before a save, a filtered hashmap of tracked fields is captured inline. After the save, a field-level change calculator compares old and new values key-by-key, producing a structured diff. Only tracked fields are included — keeping the JSONB payload lean and avoiding unnecessary storage. That diff flows into a categorization layer, then formatted into a UI-ready output structure server-side, so diff logic lives in one place and event grouping stays consistent. Virtual list pagination handles large changelog histories without degrading rendering performance.',
          'The delivery tab was built on top of an open-source client-side state chart library that tightly coupled the UI to the backend. Full refactoring would have introduced significant regression risk across existing delivery flows — changes were made alongside it with minimal surface contact instead.',
          'Result: 500 events/day, 5M+ rows in production since launch. Eliminated CM360 round-trips for 100+ internal agency users.',
        ],
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const featuredWorkProjects = projects.filter((p) => p.featured && p.type === 'project' && p.projectType === 'work');
export const featuredPersonalProjects = projects.filter((p) => p.featured && p.type === 'project' && p.projectType === 'personal');
export const featuredArticles = projects.filter((p) => p.featured && p.type === 'article');

export const recentProjects = [...projects].sort((a, b) =>
  a.date < b.date ? 1 : -1
);

// Newest first. `recentWork` backs /post/ (projects only); `recentWriting` backs /writing/.
export const recentWork = recentProjects.filter((p) => p.type === 'project');
export const recentWriting = recentProjects.filter((p) => p.type === 'article');

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Build a Date from a `date` field without going through UTC.
 *
 * These are calendar dates ("2026-08-25"). `new Date()` reads that form as UTC
 * midnight, which lands on the previous day anywhere west of Greenwich — a post
 * dated the 25th rendered as the 24th, and one dated the 1st rendered in the
 * previous month. Build from the parts instead.
 */
export function parseDay(value: string): Date {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}
