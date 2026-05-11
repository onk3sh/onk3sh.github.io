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
    slug: 'claude-code-harness',
    title: 'Claude Code Office Harness',
    date: '2026-05-01',
    hero: '/images/projects-bg-img.png',
    summary:
      'A personal ticket-to-PR pipeline built on Claude Code — autonomous from Jira to draft PR, with persistent memory across sessions and a self-improving PR review agent. Running in daily use on my engineering workflow at Basis.',
    featured: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Most AI coding tools are stateless — they forget everything between sessions and review code without any accumulated context about your codebase, patterns, or preferences. This project builds the infrastructure layer that fixes both problems.',
          'The harness gives Claude Code persistent memory (short-term across the last 50 sessions, long-term via Obsidian), autonomous ticket-to-PR execution with the human acting only as reviewer, and a self-improving PR review agent that gets better the more feedback it receives.',
        ],
      },
      {
        heading: 'Architecture',
        bullets: [
          'Short-term memory: scans last 50 Claude Code sessions (~/.claude/projects/) to surface relevant context before touching the codebase.',
          'Long-term memory: Obsidian vault integration for persistent project knowledge, decisions, and learned preferences.',
          'Ticket-to-PR pipeline: Claude Code skills and hooks that take a ticket from scratch to a reviewable PR with minimal human intervention.',
          'PR review agent: reviews external repo PRs with a self-improving feedback loop — learns from every review cycle.',
          'Human-in-the-loop: engineer validates code changes and approves before PR is opened. Not a replacement, a multiplier.',
        ],
      },
      {
        heading: 'Status',
        paragraphs: [
          'In active development. Long-term memory, ticket-to-PR pipeline, and PR review agent are working. Short-term session memory layer is in progress.',
        ],
      },
    ],
  },
  {
    slug: 'canvestai',
    title: 'CanvestAI',
    date: '2026-03-17',
    hero: '/images/projects-bg-img.png',
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
