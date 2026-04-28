---
description: "Rewrite a component with Kern aesthetic. Shows diff, explains each change."
allowed-tools: ["Read", "Write", "Edit", "Glob", "Grep"]
---

# /polish

Rewrites a component or file with the Kern aesthetic applied. Shows a diff, not a replacement. Every change is explained.

## When to Use

Run `/polish` when:
- You want a before/after view of what applying Kern's standards looks like
- You have a component that fails multiple audit checks and want help fixing them
- You're translating a design from "AI-generated" to "deliberate"

## How to Run

```
/polish
```

Paste the component or file after the command.

## What Kern Changes

Applies changes from all three anti-pattern files (`${CLAUDE_PLUGIN_ROOT}/anti-patterns/visual.md`, `${CLAUDE_PLUGIN_ROOT}/anti-patterns/copy.md`, `${CLAUDE_PLUGIN_ROOT}/anti-patterns/interaction.md`) and the reference files (`${CLAUDE_PLUGIN_ROOT}/skills/kern/references/`).

Spawns the design-critic agent first for assessment, then the copy-editor agent for copy changes. Produces a unified diff.

## What Kern Does NOT Change

- Business logic
- API calls
- State management
- Component structure beyond what's directly tied to visual/copy patterns
