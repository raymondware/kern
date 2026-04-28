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

1. Reads all three base anti-pattern files: `${CLAUDE_PLUGIN_ROOT}/anti-patterns/visual.md`, `${CLAUDE_PLUGIN_ROOT}/anti-patterns/copy.md`, `${CLAUDE_PLUGIN_ROOT}/anti-patterns/interaction.md`
2. Reads all files in `${CLAUDE_PLUGIN_ROOT}/anti-patterns/sourced-from-research/`
3. Loads the persona file from `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/personas/` (detected or specified)
4. Scans the input against every base pattern AND persona-specific patterns
5. Calculates the sameness score
6. Reports findings bucketed by severity

## Output Format

The output follows the design-critic agent's format. Spawn the design-critic agent to perform the audit.

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
