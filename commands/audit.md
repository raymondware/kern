---
description: "Full anti-pattern scan with sameness score. Persona-aware."
allowed-tools: ["Read", "Glob", "Grep"]
---

# /audit

Full anti-pattern scan. Severity-bucketed output. Persona-aware. Includes sameness score.

## When to Use

Run `/audit` when:
- Starting to work on an existing component or page
- Before a design review
- After a fast implementation pass that prioritized shipping over craft
- When something feels off but you cannot articulate why
- After using an AI tool to generate UI

## How to Run

```
/audit [--persona <persona>]
```

Paste in (or reference) the content you want audited after the command. Accepted inputs:
- React/TSX component code
- Plain HTML
- A CSS/Tailwind class list
- Copy/marketing text
- A description of an interaction or flow

Persona flag is optional. If omitted, Kern infers the persona from the input. If inference is ambiguous, Kern asks.

Valid personas: `developer-tool`, `consumer-saas`, `creative-tool`, `b2b-enterprise`, `e-commerce`

## What Kern Does

1. **DRAW**: Spawns the `anti-pattern-selector` agent. The selector reads `${CLAUDE_PLUGIN_ROOT}/anti-patterns/manifest.json` and the rotation history at `${CLAUDE_PLUGIN_ROOT}/state/draws.jsonl`, picks a varied subset weighted by site-specific signals, and appends the draw to the audit log.
2. **REVIEW** (parallel ensemble): Spawns design-critic, hierarchy-critic, interaction-critic, microcopy-critic, and accessibility-auditor in parallel. Each critic reads only the source-file sections referenced by IDs in the assigned subset. Each produces a per-dimension score capped at 40 plus specific findings.
3. **SYNTHESIZE**: Spawns critique-synthesizer. It deduplicates across critics, computes the consensus sameness score, and emits the final report.
4. **PRESENT**: The audit_header from the selector appears at the top of the output, then the synthesizer report.

External `/kern:audit` runs use a gate threshold of **60** (vs **40** for kern-produced output). The synthesizer applies the threshold based on the command.

## Output Format

Audit header (from anti-pattern-selector) followed by the synthesizer report. See `agents/critique-synthesizer.md` for the format.

## Sameness Score Thresholds

**0-20**: Distinctive. Clear design decisions made. Ready to ship.
**21-40**: Has character, some defaults showing. Low / moderate fixes will close the gap.
**41-60**: Generic. Moderate fixes required. Consider `/kern:differentiate` if this is a landing page or marketing surface.
**61-80**: Default AI aesthetic. Run `/kern:differentiate` before shipping. Multiple critical fixes required.
**81-100**: Template unmodified. This is the output of a tool run with default settings. Do not ship without significant redesign.

## Notes

- Kern does not report "this looks great" unless it specifically checked for all patterns and found none.
- Kern applies the Shadcn/Radix context: it knows what `<Card>`, `<Dialog>`, `<Button>` etc. look like and will flag misuse of those primitives.
- Persona-specific flags are additions to, not replacements for, the base audit.
