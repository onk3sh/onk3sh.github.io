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
    'The rest of my background is full-stack engineering across three countries — Basis Technologies in Toronto, enterprise BFSI delivery at Centric Consulting in Gurgaon, and Adobe in Bangalore where I shipped the Edit PDF feature for Acrobat and joined the early beta team for XD.',
  ],
};
