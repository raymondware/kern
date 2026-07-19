# Kern State

Append-only state files written by kern agents. Audit trail for the variation rule.

## `draws.jsonl`

One JSON record per kern run that drew an anti-pattern subset. Written by the `anti-pattern-selector` agent before any specialist or critic runs. Read by the same agent on the next run to enforce the no-repeat rule.

Each record is a single line of JSON with these fields:

```json
{
  "ts": "2026-04-28T14:32:11Z",
  "run_id": "kern-2026-04-28-143211-ab12",
  "command": "design",
  "selector_version": "1.0.0",
  "input_signal": {
    "product": "string the user typed",
    "persona": "developer-tool",
    "industry": "infra",
    "audience": "backend engineers",
    "competitors": ["neon.tech", "planetscale.com"],
    "surface": "landing-page"
  },
  "pool_size": 48,
  "subset_size": 16,
  "subset": ["indigo-500-everywhere", "centered-symmetry", "..."],
  "site_specific_inclusions": ["hero-dashboard-screenshot", "three-tier-pricing-table"],
  "rotation_excluded": ["inter-default", "vague-headlines"],
  "previous_subsets_consulted": 3,
  "rationale": "one-paragraph human readable explanation"
}
```

## Why This Exists

Two distinct prompts produced identical design direction on 2026-04-16. The fix is to vary the anti-pattern subset per run AND make the variation auditable. If two consecutive runs produce the same subset, this file makes that visible. If the design output is generic, this file shows whether the selector actually rotated.

Do not edit `draws.jsonl` by hand. The selector agent is the only writer. Append-only. Never overwrite.

If you need to clear history during local development, move the file to a `_local/` ignored directory rather than deleting it.
