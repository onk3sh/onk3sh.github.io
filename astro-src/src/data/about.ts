export type AboutContent = {
  headline: string;
  paragraphs: string[];
};

export const about: AboutContent = {
  headline: 'I build AI systems that work outside the demo.',
  paragraphs: [
    'Most of what I do comes down to a single problem: getting an autonomous agent to behave sensibly across a long horizon, on a real codebase, without a human babysitting every step. That means designing persistent memory layers so context survives across sessions, building self-critique loops so the agent catches its own bad output before a human has to, and engineering the recovery paths — retries, rollbacks, escalation — that decide whether a system is actually trustworthy or just a good demo.',
    'The clearest expression of that work is a ticket-to-PR harness I built for coding agents: it scans session history and long-form engineering notes before touching the repo, drafts the change, runs it past a self-improving review agent, and hands the engineer something worth reviewing rather than rewriting. The interesting engineering wasn\'t the model call — it was the orchestration around it: state that persists, judgment about when to stop, and a review loop that gets sharper over time.',
    'A second strand of the work applies the same instincts to a non-developer domain — conversational ETF analysis for Canadian investors, with live market data, risk-matched scoring, and plain-language rebalancing. The specific failure that shaped the architecture: yfinance returns partial data for low-liquidity TSX ETFs without any error signal — the model would score confidently on stale numbers. The fix was a data-freshness gate and an explicit degradation path that surfaces the uncertainty rather than hiding it. Same class of problem as the memory work: the failure mode isn\'t the model, it\'s the unvalidated assumption upstream of the model call.',
    'The through-line, across desktop software at 200M-user scale, test architecture for US BFSI enterprise that cut CI from 5 hours to 45 minutes, and performance work on a production ad-tech platform: I went from writing tests that verified quality, to building the infrastructure that guaranteed it, to engineering the review process that makes autonomous agents produce it. Same instinct each time, one layer further upstream.',
  ],
};
