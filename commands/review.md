---
description: "Full review without generation. Runs critic, copy editor, and accessibility auditor in parallel."
allowed-tools: ["Read", "Glob", "Grep"]
---

# /kern:review

Runs the REVIEW phase of the kern pipeline against existing code without designing or implementing. Produces reports from design critic, copy editor, and accessibility auditor in parallel.

## Usage

```
/kern:review [--persona <persona>]
```

Paste or reference the code to review.

## What It Does

1. **DRAW**: Spawns `anti-pattern-selector` to pick a varied subset for this run and append the audit log line.
2. **REVIEW** (parallel critic ensemble):
   - **design-critic**: Anti-pattern scan + per-dimension score
   - **hierarchy-critic**: Layout and information density slice
   - **interaction-critic**: Motion, feedback, dark-pattern slice
   - **microcopy-critic**: Inline product copy slice
   - **copy-editor**: Headline and marketing copy slice
   - **accessibility-auditor**: WCAG 2.1 AA compliance check
3. **SYNTHESIZE**: `critique-synthesizer` merges, deduplicates, computes consensus sameness score, emits final report.

For brand-match or page-level review, provide desktop and mobile screenshots plus at least two official references when possible. Without two official references, the strongest supported wording is `brand-informed draft`. Without screenshots, style-match scoring is incomplete. The synthesizer must calibrate claims using the style-match thresholds in quality-gates.md.

## Output

Audit header (verbatim from selector) followed by the synthesizer report:
- Consensus sameness score with per-critic breakdown
- Critical / Moderate / Low findings with consensus tags
- Microcopy before/after table
- Accessibility pass/fail report
- Top three actions

## When to Use

- Before shipping any UI
- After another developer's implementation pass
- When you want a comprehensive review without the full pipeline
- As a lighter alternative to `/kern:audit` that also covers copy and accessibility
