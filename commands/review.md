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

Spawns in parallel:
1. **design-critic**: Anti-pattern scan + sameness score
2. **copy-editor**: Copy audit with persona voice
3. **accessibility-auditor**: WCAG 2.1 AA compliance check

## Output

Combined report:
- Sameness score with breakdown
- Copy changes table (before/after)
- Accessibility pass/fail report
- Priority recommendations

## When to Use

- Before shipping any UI
- After another developer's implementation pass
- When you want a comprehensive review without the full pipeline
- As a lighter alternative to `/kern:audit` that also covers copy and accessibility
