# kern audit-agent — automated fixture evaluator

A self-contained agent for programmatic audit of TSX fixtures against kern anti-patterns.
No interactive skill invocation required. Callable from subagents and CI pipelines.

## Purpose

Evaluate a TSX file against all kern anti-pattern definitions and report which
violations are present. Used by the fixture validation suite to measure the audit
hit rate without requiring a human to run `/kern audit` interactively.

## Invocation (for a subagent)

Spawn a general-purpose subagent with this prompt (fill in `<FIXTURE_PATH>`):

```
You are running a kern audit evaluation.

1. Read the TSX fixture at: <FIXTURE_PATH>
2. Read all three anti-pattern files:
   - ${CLAUDE_PLUGIN_ROOT}/anti-patterns/visual.md
   - ${CLAUDE_PLUGIN_ROOT}/anti-patterns/copy.md
   - ${CLAUDE_PLUGIN_ROOT}/anti-patterns/interaction.md
3. For each named anti-pattern in those files, check whether the fixture
   exhibits that pattern. Match by structural code signals (class names,
   component structure, JSX patterns, copy strings), not by comments in
   the fixture that name violations.
4. Output a JSON object with this exact shape:
   {"fixture": "<FIXTURE_PATH>", "hits": ["violation-id-1", ...], "notes": "..."}
   Use the exact pattern IDs from the anti-pattern files (e.g. "gradient-slop",
   "centered-glowing-hero", "marketing-verbs"). Do NOT include patterns that
   are only mentioned in comments or fixtures labels — only flag patterns
   that are genuinely detectable from the code structure.
5. Save the JSON result to: <OUTPUT_PATH>
```

## Batch runner prompt (for evaluating all 12 fixtures)

```
You are running a kern audit fixture batch evaluation.

Goal: Evaluate all 12 fixtures in ${CLAUDE_PLUGIN_ROOT}/tests/audit-fixtures/
against the kern anti-pattern library and write results to
${CLAUDE_PLUGIN_ROOT}/tests/audit-fixtures/results.json

Steps:
1. Read ${CLAUDE_PLUGIN_ROOT}/tests/audit-fixtures/manifest.json to get the
   fixture list and expected violations.
2. Read all three anti-pattern files:
   - ${CLAUDE_PLUGIN_ROOT}/anti-patterns/visual.md
   - ${CLAUDE_PLUGIN_ROOT}/anti-patterns/copy.md
   - ${CLAUDE_PLUGIN_ROOT}/anti-patterns/interaction.md
3. For EACH fixture in the manifest:
   a. Read the fixture file from ${CLAUDE_PLUGIN_ROOT}/tests/audit-fixtures/<file>
   b. Check the fixture code against every named anti-pattern
   c. Collect the violation IDs that are genuinely present in the code structure
      (not just in code comments that say "seeded violation: X")
4. Write results.json with this shape:
   {
     "fx-01": {"hits": ["violation-id", ...], "notes": "..."},
     "fx-02": {"hits": ["violation-id", ...], "notes": "..."},
     ...all 12 fixtures...
   }
5. After writing, print a summary: how many fixtures have >= min_expected_hits matches.
```

## Output schema

```json
{
  "fx-01": {
    "hits": ["gradient-slop", "centered-glowing-hero", "gradient-text"],
    "notes": "get-started-cta not flagged — 'Get Started' present but not checked as CTA copy pattern"
  },
  "fx-02": {
    "hits": ["nested-card-soup"],
    "notes": "drop-shadow-decoration not flagged"
  }
}
```

## Scoring

After generating `results.json`, run:
```bash
bash ${CLAUDE_PLUGIN_ROOT}/tests/run-audit-fixtures.sh --record
```

Release criterion: hit rate ≥ 90% (≥ 11/12 fixtures passing their `min_expected_hits`).

## Anti-pattern ID reference

IDs come from pattern headers in the three anti-pattern files. Key ones:

**visual.md**: gradient-slop, centered-glowing-hero, gradient-text, nested-card-soup,
drop-shadow-decoration, inter-default, identical-three-card-grid, ai-palette,
neon-without-context, pure-black-background, inverted-light-as-dark

**copy.md**: marketing-verbs, self-descriptors, hedging-language,
passive-voice-action-context, vague-headlines, filler-opener, get-started-cta

**interaction.md**: motivational-empty-state, dishonest-cta, unnecessary-confirmation,
generic-cta, toast-spam, loading-as-marketing
