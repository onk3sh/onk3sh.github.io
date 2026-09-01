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
