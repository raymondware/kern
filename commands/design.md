---
description: "Full design pipeline: plan, design, implement, review with quality gates"
allowed-tools: ["Read", "Write", "Edit", "Glob", "Grep", "Bash"]
---

# /kern:design

Full design workflow for a new UI. Persona-aware. Anti-pattern resistant from the start. Uses the conductor agent to orchestrate specialist agents through a 5-phase pipeline.

## Usage

```
/kern:design <description>
```

The description should include:
- What the component or page is (hero section, pricing page, dashboard, etc.)
- What the product does
- Who the primary user is
- Any constraints (existing tech stack, existing components, color requirements)

## Pipeline

Read `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/orchestration/pipeline.md` for the full state machine.

The conductor agent manages 5 phases:

1. **PLAN**: Detect persona, research references, run design specialists (typography, color, layout, motion) in parallel, then component architect
2. **INTERVIEW** (conditional): Ask targeted questions if specs have gaps
3. **DEVELOP**: Style implementer -> component implementer -> accessibility implementer
4. **REVIEW**: Design critic + copy editor + accessibility auditor in parallel. Targeted rework if needed (max 2 cycles).
5. **PRESENT**: Final code + design report + sameness score + references

## Sameness Gate

The design-critic agent reviews output in the REVIEW phase. If sameness score exceeds 60, the conductor routes specific issues to the relevant specialist for targeted rework. Max 2 rework cycles. Score must decrease monotonically.

## Example

```
/kern:design hero section for a Postgres branching tool, primary users are backend developers
```

Expected behavior:
1. Persona detected: `developer-tool`
2. References: neon.tech, planetscale.com, railway.app hero sections
3. Specialists produce: Geist font, custom dark palette, left-aligned dense layout, subtle motion spec
4. Component architect: single hero component with embedded code sample
5. Implementation: React/TSX with Tailwind, CSS variables
6. Review: sameness score probably 20-30 if applied correctly
7. Copy edit: headline made more specific

## Notes

- For existing designs, use `/kern:audit` instead
- For making an existing design less AI-looking, use `/kern:differentiate`
- The workflow can be interrupted; intermediate artifacts are usable independently
