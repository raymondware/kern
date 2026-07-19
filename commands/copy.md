---
description: "Audit copy against all anti-pattern rules. Output: Location | Before | After table."
allowed-tools: ["Read", "Glob", "Grep"]
---

# /copy

Audits copy against all rules in `${CLAUDE_PLUGIN_ROOT}/anti-patterns/copy.md`. Output is a markdown table: Location, Before, After.

## When to Use

Run `/copy` when:
- You've written marketing or product copy and want it stripped of marketing verbs and filler
- You want to audit all the string literals in a component
- You're reviewing microcopy: tooltips, button labels, error messages, empty states

## How to Run

```
/copy
```

Paste the copy after the command.

## What Kern Checks

Every rule from `${CLAUDE_PLUGIN_ROOT}/anti-patterns/copy.md` plus AI-specific patterns from `${CLAUDE_PLUGIN_ROOT}/anti-patterns/sourced-from-research/2026-04-16-ai-copy-patterns.md`.

Spawns the copy-editor agent with the active persona.
