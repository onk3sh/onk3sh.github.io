export type Project = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  featured?: boolean;
  type: 'project' | 'article';
  projectType?: 'work' | 'personal' | 'open-source';
  tags?: string[];
  // Where the work itself lives. Falls back to the GitHub profile when absent.
  link?: { label: string; href: string };
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
    summary: 'A Java and Spring Boot service that handles Google Ads campaign data on a production ad-tech platform. I found and fixed four root causes: missing indexes, N+1 queries, lock contention, and a concurrency bug. The service then absorbed 4× workload growth at flat p99 latency.',
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
    summary: 'A changelog system I built from scratch for delivery publishing on a production ad-tech platform. It diffs before and after snapshots, calculates changes field by field, and categorizes them on the server. It now records 500 events a day across more than 5 million rows for over 100 internal users.',
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
      'The combined view of the ad-tech platform work. Performance engineering absorbed 4× load growth at flat p99 latency, and a new changelog system now serves more than 100 internal users.',
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
      'A six-phase development pipeline for AI coding agents, with a gate between every phase. Each gate answers a failure that kept recurring in my own PR reviews. It carries a three-tier audited memory layer, a custom Bitbucket MCP server, ast-grep and LSP search that cuts tokens by 70%, and a reviewer that returns its own go or no-go verdict. I use it on my own engineering work.',
    featured: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Most AI coding workflows optimize the wrong variable. They tune prompts, swap models, and chase context windows. Then they ship the same defects the human-only workflow shipped, only faster. The harness takes the opposite bet. Hold the model constant, and engineer the process around it the way you would engineer a deploy pipeline.',
          'The harness runs a six-phase lifecycle: Requirements, Plan, Stress-Test, Implement, Self-Review, Completion. A gate sits between each phase, and none of them can be skipped. Every gate answers a failure I saw at least three times in my own pull-request review history. Reviewers kept catching scope creep, so the Plan phase exists. They kept catching design choices that collapsed under a follow-up question, so the Stress-Test phase exists. They flagged thirteen categories more often than any others, so Self-Review runs thirteen ordered checks across four parallel agents.',
          'A supporting stack sits underneath the lifecycle. ast-grep and LSP queries replace grep, which cuts tokens per task by about 70%. difft produces structural diffs that sub-agents can parse. A three-tier memory layer (LLM Wiki, Obsidian, and a JSONL session graph) is audited by three independent linters. A custom Bitbucket MCP server fills a gap where no official plugin existed, and shellcheck runs as a hard PostToolUse hook. All of it lives in ~/.claude/, with no company code and no proprietary infrastructure.',
        ],
      },
      {
        heading: 'Architecture',
        bullets: [
          'A six-phase lifecycle: Requirements → Plan → Stress-Test → Implement → Self-Review → Completion. No phase can be skipped, and each gate traces back to a failure that kept recurring in PR review.',
          'Completion requires evidence. No success claim passes without raw command output, so the lint and test logs are the artifact rather than a summary of them.',
          'Self-review runs thirteen checks across four parallel agents. Findings are classified AUTO, BATCH, or MANUAL, and written to Obsidian before completion is allowed.',
          'An autonomous reviewer, dd-reviewer, runs the full thirteen-check pass on any PR and returns a go or no-go report. It reads /project-commands.md at runtime, so the review logic stays current.',
          'Token-cost engineering: ast-grep and LSP replace grep across the search layer, cutting tokens per task by about 70%. difft replaces text diffs so sub-agents can parse them.',
          'Three-tier audited memory: an LLM Wiki on a weekly garbage-collection cycle, an Obsidian second brain, and a JSONL session knowledge graph. Three auditors check them independently: lint-memory, lint-skills, and system-gc.',
          'A custom Bitbucket MCP server, built from scratch because no official plugin existed. It powers PR-Pulse, which tracks live PR state.',
          'The safety boundary is three layers: Claude Code sandbox mode, a shellcheck PostToolUse hook, and a human kept in the loop on every review.',
          'Async observability: Slack integration across all routines for status reporting when away from the machine.',
          'Scope so far: about 10 of my own tickets shipped end to end, and more than 30 external open-source PRs reviewed by dd-reviewer. All the infrastructure lives in ~/.claude/, with no company code involved.',
        ],
      },
      {
        heading: 'Status',
        paragraphs: [
          'In active use. The core pipeline, the memory layer with all three tiers and three auditors, dd-reviewer, PR-Pulse, and Slack reporting all work today. A performance optimization on a 76M-row table shipped in May 2026, and its results are still pending.',
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
      'Most agent memory designs either forget everything between sessions or fill with noise until they are useless. This one runs three tiers: a Karpathy-pattern LLM wiki, an Obsidian second brain, and a JSONL session knowledge graph. Each tier has its own auditor and its own cleanup cycle.',
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
      'A benchmark across four production codebases. rg wins on hit rate everywhere. ast-grep wins on one narrow class of query, structural patterns, where rg returns nothing and reports no error. The answer is to route by query class instead of switching tools.',
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
      'I read more than 100 PR review comments across two production codebases over three months. Sixteen failure categories kept recurring. Each one became a gate in an AI-assisted development pipeline that the agent cannot skip. The gates exist because specific reviewers kept catching specific failures.',
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
      'ETF research for Canadian retail investors, rebuilt as two systems over one SQLite database. A nightly pipeline scores 16 equity sectors through eight weighted lenses, then deliberates over the result. A LangGraph advisor answers questions by fanning out to four discipline agents per turn. Every recommendation is graded again once its horizon elapses, and each lens is graded on its own, so the weights have to earn themselves.',
    featured: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Canadian retail investors work from scattered data, opaque fees, and generic advice that ignores their risk tolerance and tax situation. CanvestAI started as a set of composable ETF-scoring skills run from a terminal. It is now two systems sharing one SQLite database. The split matters because the part that must run unattended does not depend on the part that talks.',
          'The nightly pipeline uses no LLM at all. It is cron-safe Python and bash. The conversational orchestrator sits on top and reads the pipeline output through a read-only MCP surface, adding live market and web data at question time. If the orchestrator goes down, the pipeline still produces its verdicts. If a data feed goes down, the pipeline degrades that one lens and still finishes the night.',
        ],
      },
      {
        heading: 'The nightly pipeline',
        paragraphs: [
          'Eight lens agents score 16 equity sectors in parallel. Each carries a fixed weight: technical (0.25), business cycle (0.20), monetary policy (0.15), astro (0.15), geopolitical (0.10), sentiment (0.08), social media (0.05), and numerology (0.02). A deliberation agent combines them into a weighted score. It also detects conflict between lenses and keeps a dissent log. That makes a verdict that looks confident only because seven lenses stayed quiet easy to tell apart from one where the lenses actually agreed.',
          'Ephemeris data, charts, and the Vedic lens no longer live in this repo. They were extracted into a separate astro agent reached over A2A, with a single client module in CanvestAI speaking that protocol.',
          'Verdicts go into a recommendations table and are then graded. Once a recommendation reaches its horizon, the outcome is scored against what happened. Each lens is scored separately, at its own horizon. That is what keeps the weights honest: a lens carrying 0.25 of the vote has a track record you can read.',
        ],
      },
      {
        heading: 'The conversational orchestrator',
        bullets: [
          'LangGraph supervisor spine: fold memory, route the turn, then either clarify, answer directly, or run the full chain.',
          'A recommendation turn fans out to four discipline agents in parallel: fundamental, technical, astro, and research. The results then join, deliberate, rank ETFs in code, produce a recommendation, and challenge it before composing a reply.',
          'Ranking stays in code rather than in a prompt, so the same inputs produce the same ordering and the step is testable.',
          'A dedicated challenge agent argues against the recommendation before the user sees it.',
          'Narrow routes skip the deliberation chain entirely: research only, astro only, sky only, and portfolio review. None of them pays for a fan-out that has nothing to merge.',
          'Agents are reached only through an A2A seam — no graph node imports an agent directly.',
          'Every turn has a cost ceiling. A callback meters real token usage and prices it live. On a hard breach, nodes degrade to no-ops and record themselves, so the turn still reaches a reply built from whatever was gathered.',
        ],
      },
      {
        heading: 'Status',
        paragraphs: [
          'Both systems run. The pipeline scores sectors nightly and grades its own past calls; the orchestrator answers turns end to end.',
          'The open problem is trade construction rather than signal generation. Paper-trading results stay off the public dashboard because the engine books positions the target account cannot place. A bearish sector view was being written as a direct index short instead of an instrument the account can actually buy. Until that is fixed, the recorded P&L measures the modelling error more than the model.',
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
      'A conversational advisor that fans out to four agents per turn, deliberates, and composes a reply. The decision that mattered was not the model or the prompt. It was refusing to let any node import an agent directly. Here are two production bugs, one cost ceiling, and what that seam paid back.',
    featured: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'The CanvestAI orchestrator answers a question in stages. It fans out to four discipline agents in parallel — fundamental, technical, astro, and research — then joins their verdicts and deliberates over them. It ranks ETFs in code, makes a recommendation, challenges that recommendation, and composes a reply. The spine is a LangGraph supervisor, and on paper it is a normal multi-agent chatbot.',
          'The decision that shaped it was not which model to route to. It was a rule: no graph node may import an agent. Every call goes through a single function — `dispatch(name, task)` — on an A2A client. Nodes know agent names, not agent modules.',
          'That is a hub topology, and for the MVP it is only half true. The agents run in the same Python process as the graph, because the box has 16 GB of RAM and one server per agent would not fit. The seam is real even though the network is not. Moving to full A2A — the SDK, one server per agent, agent cards — means reimplementing one module. No node changes.',
          'That shortcut is already half-retired. Planetary positions, aspects, and dasha periods used to be computed inside the repo. They now live in a separate service reached over real A2A: a JSON-RPC 2.0 `message/send` carrying a named op and its parameters, pointed at `ASTRO_AGENT_URL`. One module in CanvestAI speaks that protocol. Everything upstream of it changed a single import line. The client functions kept the same names, signatures, and return types as the local functions they replaced, so dates still come back as `datetime.date` instead of ISO strings.',
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
          'The first bug: the A2A client is a process-wide singleton, built lazily. The original code published the singleton and then filled its registry. The four discipline nodes run in one superstep on separate threads, and all of them call the accessor. Any thread that arrived after publication but before registration dispatched against a half-built registry. One live turn lost fundamental, technical, and research to `no A2A agent registered` while astro succeeded. The fix is unglamorous: build the client fully, then publish it, under a lock.',
          'The second bug: agent registration imports each agent module. A comment claimed a broken module would simply fail to register. It did not. One bad import raised out of the builder, and the builder runs inside the singleton construction, so a single broken agent took down every agent in the process. Each import is now isolated, and a failure costs only that agent. The graph already knows how to degrade one lens, record why, and compose a reply from the rest.',
          'Both bugs have the same shape. Concurrency turned a latent ordering assumption into a partial outage, and in a fan-out system the partial outage is the dangerous one. The turn still returns an answer, only a quieter and worse-informed one.',
        ],
      },
      {
        heading: 'Efficiency is a budget, not a prompt',
        paragraphs: [
          'Multi-agent fan-out multiplies the cost of every turn, so the ceiling is enforced instead of hoped for. A LangChain callback meters real token usage across every LLM call in a turn, prices it from a models config, and exposes soft and hard breach checks. One meter runs per graph invocation.',
          'Enforcement is graceful by default. Nodes check the meter before they spawn optional work. On a hard breach, a node degrades to a no-op and records itself in a `degraded` list on the state. The turn still reaches compose, and the reply is assembled from whatever was gathered. Raising a budget error at the user is possible, but it is an opt-in path.',
          'Cost is attributed per agent as well as per turn. Every model the factory builds carries an `agent:<name>` tag, so the meter can say which agent spent the money. That is the number you need before you cut a lens or route it to a cheaper model. The meter also counts cache reads and writes separately from fresh input tokens. Those sit at zero everywhere, which is itself the finding: nothing is being cached yet.',
        ],
      },
      {
        heading: 'What the seam paid back',
        bullets: [
          'Agents moved from in-process to a separate service without touching a single graph node. The astro migration changed one import line at each call site.',
          'A broken agent degrades one lens with a recorded reason instead of failing the turn, because there is exactly one place that knows how to dispatch and how to fail.',
          'Cost is attributable per agent, which makes routing decisions arguable from data rather than intuition.',
          'The in-process shortcut stayed honest. It is confined to one module, and the 16 GB constraint that forced it is written down next to it.',
          'The failure modes above were fixable in one file each. That is the actual return on refusing to let nodes import agents.',
        ],
      },
    ],
  },
  {
    slug: 'pytest-approx-nested-containers',
    title: 'pytest \u2014 approx() and nested containers',
    date: '2026-08-25',
    type: 'project',
    projectType: 'open-source',
    tags: ['open source', 'Python'],
    summary:
      'Merged into pytest. approx() refused to descend into a nested container and said so clearly, but only when that container matched the type of the one holding it. A dict inside a list slipped past and was compared exactly, so the tolerance was ignored without warning. Reported in 2022 and still reproducing on main.',
    link: { label: 'pytest-dev/pytest #14934 \u2014 merged', href: 'https://github.com/pytest-dev/pytest/pull/14934' },
    sections: [
      {
        heading: 'What was wrong',
        paragraphs: [
          'Both nesting guards tested the child against the type of its parent: isinstance(value, type(expected)) in ApproxMapping, and the same shape in ApproxSequenceLike. A list inside a list matched and raised the intended error. A dict inside a list did not match, so approx treated it as a leaf and compared it with ==.',
          'That comparison is exact, which makes the failure quiet. [{"a": 0.1 + 1e-9}] == approx([{"a": 0.1}]) returned False even though the values sit well inside the default tolerance. Passing rel= explicitly produced a third behaviour: an error from a lower layer that never mentions nesting at all.',
        ],
      },
      {
        heading: 'The change',
        paragraphs: [
          'Ask whether the value is a container at all, rather than whether it matches the parent type. A single helper tests for Collection and excludes str, bytes, and bytearray, which approx treats as leaves on purpose.',
          'An earlier attempt in 2022 patched only ApproxSequenceLike, which would have left approx({"a": [1.0]}) quietly wrong. This one covers both sides and leaves both existing error messages untouched, so each container still reports in its own wording.',
        ],
      },
      {
        heading: 'Behaviour change worth flagging',
        paragraphs: [
          'A numpy array nested inside a list or dict now raises instead of returning a result. That case was already broken: it returned False for values inside the tolerance. The change turns a quiet wrong answer into a clear error. A top-level array is unaffected, because ApproxNumpy handles it and does its own nesting.',
        ],
      },
      {
        heading: 'Tests',
        bullets: [
          'Extended the type-error test with every cross-kind combination: list-of-tuple, list-of-set, list-of-dict, tuple-of-dict, dict-of-list, dict-of-tuple, dict-of-set.',
          'Added a test that pins the actual bug, where values inside the default tolerance used to compare unequal instead of raising.',
          'Extended the non-numeric equality test with bytes leaves, so the str/bytes exclusion is held by a test rather than by the implementation.',
          'Eleven of these failed before the change. After it, 149 passed in the approx suite and 4,483 passed across the full run, with ruff and mypy clean on both touched files.',
        ],
      },
    ],
  },
  {
    slug: 'fortymm-email-templates',
    title: 'FortyMM \u2014 transactional email templates',
    date: '2025-09-17',
    type: 'project',
    projectType: 'open-source',
    tags: ['open source', 'Ruby on Rails'],
    summary:
      'Merged into FortyMM, an open-source table tennis league platform. I rewrote the Devise mailer templates, adding a plain-text alternative to every HTML mail, email-safe responsive CSS, and wording that sounds like the sport the product is about.',
    link: { label: 'mightymoose/fortymm-- #341 \u2014 merged', href: 'https://github.com/mightymoose/fortymm--/pull/341' },
    sections: [
      {
        heading: 'What changed',
        bullets: [
          'Every Devise mailer template rewritten, with the wording aligned to the product instead of the framework defaults.',
          'Added a plain-text version of each template. HTML-only mail is a deliverability liability, and Devise ships no text part by default.',
          'Reworked the mail layouts around email-safe CSS and a responsive width, so the templates survive clients that ignore modern layout.',
          'Pulled the shared markup into an email helper instead of repeating it per template.',
        ],
      },
      {
        heading: 'Why it mattered',
        paragraphs: [
          'Transactional mail is the first thing a user meets, before they even have an account, and it was still speaking in framework defaults. The change touched 29 files and added roughly 1,500 lines.',
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
    summary: 'A production ad-tech platform for media agencies. It handles campaign creation, line item management, and delivery publishing across Google Ads, Meta, LinkedIn, and CM360.',
    sections: [
      {
        heading: 'Search Campaign Builder',
        paragraphs: [
          'Search Campaign Builder lets users create and manage Google Ads search campaigns without leaving the platform. The backend is a Java and Spring Boot service. It sits between the Rails platform and Google Ads, and stores campaign hierarchy data for every entity. As campaign counts grew, the service began to struggle under load, and a customer-reported production incident confirmed it.',
          'I led the investigation and the fixes end to end, pairing with the tech lead at the key decision points. Diagnosis started in Datadog, where the query breakdown showed sequential scans on the hot paths alongside query counts and cumulative execution time. I replicated the same scenarios locally to confirm and isolate them. A benchmark that imported Google Ads campaigns with different entity counts across iterations mapped the scaling curve precisely. Three root causes emerged independently: missing indexes on hot query paths, N+1 queries in the campaign fetch layer, and transaction lock contention.',
          'A fourth issue surfaced during benchmarking. The same long-running campaign collided with itself when two builds imported it at the same time. That was a correctness problem hiding inside the performance failure.',
          'Each issue needed its own fix. I added indexes on the hot paths and consolidated the N+1 queries. I narrowed the transaction scope, accepting a slightly wider consistency window in exchange for shorter lock durations. The idempotency guard went at the import layer instead of into a database constraint, because the coordination had to happen before the transaction opened and across build boundaries. I re-ran the benchmark harness at 4× load to confirm the fixes held.',
          'Delivered across three sprints. The service absorbed 4× workload growth at flat p50, p95, and p99 latency. The Postgres index hit rate rose from 81% to 93%, and query latency on the hot campaign fetch path fell with it.',
        ],
      },
      {
        heading: 'Media Activation — Delivery & Changelog',
        paragraphs: [
          'Media Activation publishes line item placements to external systems, starting with CM360. The internal media agency team had no way to see what changed in the delivery view without opening CM360 directly, so every discrepancy became a support request. More than 100 users were affected.',
          'The existing changelog was a plain append log. It had no query management, no categorization, and no structured output the UI could consume. Extending it was risky, because the old system had accumulated complexity, so I built a new one. It is 80% net-new and shares only the ActiveRecord integration layer and the table schema. Reusing the schema avoided a data migration, and owning the logic gave full control over query management and event structure. The tradeoff is some duplication with the old system that will need consolidating later.',
          'The core is a before-and-after snapshot. Before a save, the system captures a filtered hashmap of the tracked fields. After the save, a change calculator compares old and new values key by key and produces a structured diff. It includes only tracked fields, which keeps the JSONB payload lean. The diff then flows into a categorization layer and is formatted server-side into the structure the UI needs, so the diff logic lives in one place and event grouping stays consistent. Virtual list pagination keeps long histories from slowing the render.',
          'The delivery tab sits on an open-source client-side state chart library that couples the UI tightly to the backend. A full refactor would have risked regressions across every existing delivery flow, so I worked alongside the library and kept contact with its surface to a minimum.',
          'Since launch it has recorded 500 events a day and more than 5 million rows in production, and it removed the CM360 round-trip for over 100 internal agency users.',
        ],
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const featuredWorkProjects = projects.filter((p) => p.featured && p.type === 'project' && p.projectType === 'work');
export const featuredPersonalProjects = projects.filter((p) => p.featured && p.type === 'project' && p.projectType === 'personal');
export const featuredArticles = projects.filter((p) => p.featured && p.type === 'article');

// Merged upstream contributions only. Newest first.
export const openSourceContributions = projects
  .filter((p) => p.projectType === 'open-source')
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const recentProjects = [...projects].sort((a, b) =>
  a.date < b.date ? 1 : -1
);

// Newest first. `recentWork` backs /post/, `recentWriting` backs /writing/, and
// `openSourceContributions` backs /open-source/. Work excludes the open-source
// entries so each contribution is listed under exactly one tab.
export const recentWork = recentProjects.filter(
  (p) => p.type === 'project' && p.projectType !== 'open-source'
);
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
