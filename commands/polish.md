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

Spawns `anti-pattern-selector` to pick a varied subset (weighted toward the input's surface and persona). Then the critic ensemble runs against the subset. Then the affected specialists or implementers apply changes for in-scope findings only. Produces a unified diff.

Reference files for hue, font, and token guidance: `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/`.

## What Kern Does NOT Change

- Business logic
- API calls
- State management
- Component structure beyond what's directly tied to visual/copy patterns
