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
  {ticker:'XIU', name:'iShares S&P/TSX 60 Index ETF',      cat:'equity',       risk:'medium', mer:0.18, aum:14200, ytd:5.2,  score:92},
  {ticker:'XIC', name:'iShares Core S&P/TSX Capped Composite', cat:'equity',   risk:'medium', mer:0.06, aum:11400, ytd:4.8,  score:95},
  {ticker:'VCN', name:'Vanguard FTSE Canada All Cap Index ETF', cat:'equity',  risk:'medium', mer:0.05, aum:6900,  ytd:5.0,  score:96},
  {ticker:'XUS', name:'iShares Core S&P 500 Index ETF (CAD)', cat:'equity',    risk:'medium', mer:0.10, aum:8700,  ytd:12.3, score:91},
  {ticker:'VFV', name:'Vanguard S&P 500 Index ETF',          cat:'equity',     risk:'medium', mer:0.09, aum:10200, ytd:12.5, score:93},
  {ticker:'XQQ', name:'iShares NASDAQ 100 Index ETF (CAD)',   cat:'equity',     risk:'high',   mer:0.39, aum:3100,  ytd:15.8, score:78},
  {ticker:'HXQ', name:'Horizons NASDAQ-100 Index ETF',        cat:'equity',     risk:'high',   mer:0.28, aum:1800,  ytd:16.1, score:81},
  {ticker:'XEQT', name:'iShares Core Equity ETF Portfolio',   cat:'balanced',   risk:'medium', mer:0.20, aum:5600,  ytd:7.1,  score:88},
  {ticker:'VEQT', name:'Vanguard All-Equity ETF Portfolio',   cat:'balanced',   risk:'medium', mer:0.24, aum:4900,  ytd:7.3,  score:87},
  {ticker:'XGRO', name:'iShares Core Growth ETF Portfolio',   cat:'balanced',   risk:'medium', mer:0.20, aum:3800,  ytd:6.0,  score:89},
  {ticker:'VGRO', name:'Vanguard Growth ETF Portfolio',       cat:'balanced',   risk:'medium', mer:0.24, aum:3200,  ytd:6.2,  score:86},
  {ticker:'XBAL', name:'iShares Core Balanced ETF Portfolio', cat:'balanced',   risk:'low',    mer:0.20, aum:2100,  ytd:4.5,  score:88},
  {ticker:'VBAL', name:'Vanguard Balanced ETF Portfolio',     cat:'balanced',   risk:'low',    mer:0.24, aum:1900,  ytd:4.7,  score:86},
  {ticker:'XBB',  name:'iShares Core Canadian Universe Bond ETF', cat:'fixed-income', risk:'low', mer:0.10, aum:3700, ytd:2.1, score:84},
  {ticker:'VAB',  name:'Vanguard Canadian Aggregate Bond Index ETF', cat:'fixed-income', risk:'low', mer:0.09, aum:4100, ytd:2.3, score:86},
  {ticker:'ZAG',  name:'BMO Aggregate Bond Index ETF',        cat:'fixed-income', risk:'low',  mer:0.09, aum:3500,  ytd:2.2,  score:85},
  {ticker:'XSB',  name:'iShares Core Canadian Short Term Bond ETF', cat:'fixed-income', risk:'low', mer:0.10, aum:2800, ytd:3.8, score:83},
  {ticker:'XHYC', name:'iShares Canadian High Yield Bond ETF', cat:'fixed-income', risk:'medium', mer:0.61, aum:1100, ytd:5.1, score:68},
  {ticker:'ZRE',  name:'BMO Equal Weight REITs Index ETF',    cat:'sector',     risk:'medium', mer:0.61, aum:1050,  ytd:1.8,  score:71},
  {ticker:'XRE',  name:'iShares S&P/TSX Capped REIT Index ETF', cat:'sector',  risk:'medium', mer:0.61, aum:1200,  ytd:1.6,  score:70},
  {ticker:'XEG',  name:'iShares S&P/TSX Capped Energy Index ETF', cat:'sector', risk:'high',  mer:0.61, aum:1600,  ytd:-2.4, score:62},
  {ticker:'XFN',  name:'iShares S&P/TSX Capped Financials Index ETF', cat:'sector', risk:'medium', mer:0.61, aum:2100, ytd:6.8, score:74},
  {ticker:'ZGD',  name:'BMO Junior Gold Index ETF',           cat:'commodity',  risk:'high',   mer:0.61, aum:310,   ytd:18.3, score:59},
  {ticker:'CGL',  name:'iShares Gold Bullion ETF (Hedged)',   cat:'commodity',  risk:'medium', mer:0.55, aum:580,   ytd:14.1, score:67},
  {ticker:'HUG',  name:'Horizons Gold ETF',                   cat:'commodity',  risk:'medium', mer:0.35, aum:420,   ytd:14.4, score:71},
];
