export type VisualizerStep = {
  title: string;
  icon: string;
  color: string;
  what: string;
  how: string[];
  why: string;
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

/* ── Model cascade simulator ──────────────────────────────────────────────
 *
 * A cascade runs the cheap model first, has a verifier judge the output, and
 * escalates to the frontier model only when the verifier is unhappy.
 *
 * The interesting part is that the verifier is imperfect in two directions,
 * and back-of-envelope cascade math usually prices only one of them. It misses
 * some wrong answers, which then ship wrong. It also flags some correct ones,
 * so you pay the frontier model to redo work that was already right. Both are
 * priced here.
 */
export type CascadeField = {
  key: string;
  label: string;
  hint: string;
  /** 'usd' and 'count' are absolute; 'pct' is stored 0-1 and shown as 0-100. */
  unit: 'usd' | 'count' | 'pct';
  value: number;
  step: number;
};

/* Illustrative starting points, not quoted prices — every field is editable,
 * and the point of the panel is that the visitor puts their own numbers in.
 * Costs are per task rather than per token so the model does not depend on any
 * vendor's price sheet, which would go stale here the way live data does. */
export const cascadeFields: CascadeField[] = [
  {
    key: 'volume',
    label: 'Tasks per month',
    hint: 'How many times the pipeline runs.',
    unit: 'count',
    value: 10000,
    step: 500,
  },
  {
    key: 'cheapCost',
    label: 'Cheap model — cost per task',
    hint: 'Averaged over a typical task, input and output together.',
    unit: 'usd',
    value: 0.004,
    step: 0.001,
  },
  {
    key: 'expCost',
    label: 'Frontier model — cost per task',
    hint: 'The same task run on the expensive model.',
    unit: 'usd',
    value: 0.06,
    step: 0.005,
  },
  {
    key: 'verifierCost',
    label: 'Verifier — cost per task',
    hint: 'Runs on every task. Zero if the check is a test suite or a heuristic.',
    unit: 'usd',
    value: 0.001,
    step: 0.001,
  },
  {
    key: 'pCheap',
    label: 'Cheap model solves the task',
    hint: 'Share of tasks it gets right on its own.',
    unit: 'pct',
    value: 0.72,
    step: 0.01,
  },
  {
    key: 'pExp',
    label: 'Frontier model solves the task',
    hint: 'Not 100%. Escalating is not the same as being right.',
    unit: 'pct',
    value: 0.94,
    step: 0.01,
  },
  {
    key: 'catchRate',
    label: 'Verifier catches a wrong answer',
    hint: 'Of the cheap answers that are wrong, the share it escalates.',
    unit: 'pct',
    value: 0.8,
    step: 0.01,
  },
  {
    key: 'falseAlarm',
    label: 'Verifier escalates a right answer',
    hint: 'Wasted spend — the frontier model redoes work that was already correct.',
    unit: 'pct',
    value: 0.1,
    step: 0.01,
  },
];
