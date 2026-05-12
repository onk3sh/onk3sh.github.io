export type Project = {
  slug: string;
  title: string;
  date: string;
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
    slug: 'claude-code-harness',
    title: 'Claude Code Office Harness',
    date: '2026-05-01',
    summary:
      'A five-phase gate-enforced development pipeline built around Claude Code. Each gate maps to a recurring PR review failure mode. Includes a three-tier audited memory layer, custom Bitbucket MCP server, ast-grep + LSP search (70% token reduction), and autonomous go/no-go reviewer. Used on my own engineering work.',
    featured: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Most AI coding workflows optimize the wrong variable. They tune prompts, swap models, chase context windows — and ship the same defects their human-only workflow shipped, just faster. The Claude Code Harness is the opposite bet: hold the model constant, and engineer the process around it the way you would engineer a deploy pipeline.',
          'The Harness is a five-phase lifecycle — Requirements, Plan, Stress-Test, Implement, Self-Review, Completion — with non-skippable gates between each. Every gate maps to a specific failure mode observed recurring three or more times in my own pull-request review history. The Plan phase exists because reviewers kept catching scope creep. The Stress-Test phase exists because reviewers kept catching design choices that wouldn\'t survive a follow-up question. The Self-Review phase runs thirteen ordered checks across four parallel agents because those are the thirteen categories my reviewers have flagged most often.',
          'Underneath the lifecycle sits a supporting stack: ast-grep and LSP queries instead of grep (about a 70% token reduction per task), difft for structural diffs that sub-agents can parse, a three-tier memory layer (LLM Wiki, Obsidian, JSONL session graph) audited by three independent linters, a custom Bitbucket MCP server built from scratch, and shellcheck wired as a hard PostToolUse hook. All of it lives in ~/.claude/ — zero company code, zero proprietary infra.',
        ],
      },
      {
        heading: 'Architecture',
        bullets: [
          'Five-phase iron-law lifecycle: Requirements → Plan → Stress-Test → Implement → Self-Review → Completion. No phase skippable. Each gate traces to a recurring PR review failure mode.',
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
          'In active use. Core pipeline (all five phases), memory layer (all three tiers + three auditors), dd-reviewer, PR-Pulse, and Slack observability are working. V0085 performance optimization (76M row table) deployed May 2026 — results pending.',
        ],
      },
    ],
  },
  {
    slug: 'agent-memory-three-tiers',
    title: 'The three-tier memory layer for coding agents',
    date: '2026-05-25',
    summary:
      'Most agent memory designs either forget everything between sessions or accumulate noise until they\'re useless. A Karpathy-pattern LLM wiki, an Obsidian second brain, and a JSONL session knowledge graph — each with its own auditor and GC cycle.',
    featured: true,
    sections: [],
  },
  {
    slug: 'rg-vs-ast-grep',
    title: 'rg beats ast-grep 87% of the time',
    date: '2026-05-12',
    summary:
      'A benchmark across four production codebases. rg wins hit rate everywhere. ast-grep wins on one narrow query class — structural patterns — where rg returns zero with no error. The fix is routing by query class, not switching tools.',
    featured: true,
    sections: [],
  },
  {
    slug: 'iron-law-gates',
    title: 'Iron-Law Gates',
    date: '2026-05-11',
    summary:
      'I audited 100+ PR review comments across two production codebases over 3 months, found 16 recurring failure categories, and encoded each one as a non-skippable gate in an AI-assisted development pipeline. The gates exist because specific reviewers kept catching specific failures.',
    featured: true,
    sections: [],
  },
  {
    slug: 'canvestai',
    title: 'CanvestAI',
    date: '2026-03-17',
    summary:
      'Conversational ETF research and portfolio analysis for Canadian markets. Composable Claude Code skills over live TSX data — scoring, risk-matched recommendations, and drift-based rebalancing. Phase 1 working; Phase 2 (portfolio tracking) in progress.',
    featured: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Canadian retail investors face a fragmented research experience — scattered data, opaque fees, and generic advice that doesn\'t account for personal risk tolerance or tax situation. CanvestAI wraps live ETF data, scoring logic, and a conversational interface into a single tool you can run from your terminal.',
        ],
      },
      {
        heading: 'Architecture',
        bullets: [
          'Claude Code skill system: composable sub-skills for fetching, scoring, filtering, and recommending ETFs.',
          'Live market data via yfinance — covers TSX-listed ETFs (XIU, XIC, VFV, ZEB, XRE and 25+ others) with no API key required.',
          'Scoring engine: ranks ETFs by MER, 1/3/5yr returns, volatility, and dividend yield against a risk profile.',
          'Phase 2 (in progress): portfolio tracking with SQLite, P&L analysis, and drift-based rebalancing suggestions.',
        ],
      },
      {
        heading: 'Status',
        paragraphs: [
          'Phase 1 (ETF recommendations) is working. Phase 2 (portfolio tracking and rebalancing) is in active development.',
        ],
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
