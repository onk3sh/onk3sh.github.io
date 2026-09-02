export type AboutContent = {
  headline: string;
  paragraphs: string[];
};

export const about: AboutContent = {
  headline: 'I build AI systems that work outside the demo.',
  paragraphs: [
    'Most of my work comes down to one problem. How do you get an autonomous agent to behave sensibly over a long task, on a real codebase, without a human checking every step?',
    'Three things decide the answer. Persistent memory layers keep context alive between sessions. Self-critique loops catch bad output before a human has to. Recovery paths separate a system you can trust from one that only demos well. Retries, rollbacks, escalation.',
    'The clearest example is a ticket-to-PR harness I built for coding agents. It reads session history and my engineering notes before it touches the repo. Then it drafts the change, sends it through a review agent that sharpens its own checks over time, and hands the engineer something worth reviewing instead of rewriting.',
    'The hard part was never the model call. It was the orchestration around it: state that survives, judgment about when to stop, and a review loop that improves.',
    'A second project applies the same instincts outside developer tooling. CanvestAI answers ETF questions for Canadian investors, using live market data, risk-matched scoring, and plain-language rebalancing.',
    'One failure shaped its architecture. For thinly traded TSX ETFs, yfinance returns partial data and raises no error. The model would then score stale numbers at full confidence. I added a data-freshness gate and a degradation path that shows the uncertainty instead of hiding it. The model behaved correctly. The unchecked assumption upstream of the model call was the real failure.',
    'One thread runs through the rest of my career: desktop software at 200M-user scale, test architecture for a US banking and financial services enterprise that cut CI from 5 hours to 45 minutes, and performance work on a production ad-tech platform.',
    'Each step moved one layer upstream. First I wrote tests that verified quality. Then I built the infrastructure that guaranteed it. Now I engineer the review process that makes autonomous agents produce it.',
  ],
};
