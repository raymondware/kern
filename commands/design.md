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

The conductor agent manages 6 phases:

1. **DRAW**: anti-pattern-selector picks a varied subset for this run, writes the audit log to `state/draws.jsonl`, and emits the audit_header. Every downstream agent receives `selected_subset`.
2. **PLAN**: Detect persona, research references, run design specialists (typography, color, layout, motion) in parallel, then component architect
3. **INTERVIEW** (conditional): Ask targeted questions if specs have gaps
4. **DEVELOP**: Style implementer -> component implementer -> accessibility implementer
5. **REVIEW**: Critic ensemble in parallel (design-critic, hierarchy-critic, interaction-critic, microcopy-critic, copy-editor, accessibility-auditor) followed by the critique-synthesizer. Targeted rework if needed (max 2 cycles).
6. **PRESENT**: Audit header + synthesizer report + final code

## Sameness Gate

The critique-synthesizer combines per-dimension scores from the four parallel critics into a consensus 0-100 sameness score. For kern-produced output the gate threshold is **40**. If the score exceeds the threshold, the conductor routes specific issues to the relevant specialist for targeted rework. Max 2 rework cycles. Score must decrease monotonically.

## Example

```
/kern:design hero section for a Postgres branching tool, primary users are backend developers
```

Expected behavior:
1. DRAW: selector picks ~14 patterns weighted toward developer-tool + landing-page signals; writes the line to `state/draws.jsonl`; the second run on the same prompt produces a different subset
2. Persona detected: `developer-tool`
3. References: neon.tech, planetscale.com, railway.app hero sections
4. Specialists produce: Geist font, custom dark palette, left-aligned dense layout, subtle motion spec (all read only the assigned subset)
5. Component architect: single hero component with embedded code sample
6. Implementation: React/TSX with Tailwind, CSS variables
7. Review: parallel critic ensemble produces per-dimension scores; synthesizer merges into a consensus score (target <= 40)
8. Output: audit_header at the top, then the synthesizer report, then the code

## Notes

- For existing designs, use `/kern:audit` instead
- For making an existing design less AI-looking, use `/kern:differentiate`
- The workflow can be interrupted; intermediate artifacts are usable independently
