---
description: "Design planning only. Runs specialists to produce specs without implementation."
allowed-tools: ["Read", "Glob", "Grep", "WebSearch"]
---

# /kern:plan

Runs the PLAN phase of the kern pipeline without proceeding to implementation. Produces design specifications from all specialists.

## Usage

```
/kern:plan <description>
```

## What It Does

1. Detects persona from description
2. Spawns design-researcher for references
3. Spawns parallel specialists: typography, color, layout, motion
4. Spawns component-architect with specialist outputs
5. Presents all specs for review

## Output

All specialist specs assembled:
- Typography specification (fonts, scale, weights)
- Color specification (accent, neutrals, semantic colors)
- Layout specification (grid, spacing, density)
- Motion specification (timing, easing, feedback)
- Component architecture (tree, variants, composition)
- Design references (sites studied)

## When to Use

- Before a design review to establish shared vocabulary
- When you want to make design decisions before writing code
- When multiple developers will implement (share specs as a brief)
- To iterate on design direction without implementation overhead
