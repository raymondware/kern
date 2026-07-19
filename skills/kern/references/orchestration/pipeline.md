# Pipeline State Machine

The conductor agent manages the kern design pipeline. This document defines the state transitions, parallel execution groups, and termination conditions.

## States

```
INIT -> DRAW -> PLAN -> INTERVIEW -> DEVELOP -> REVIEW -> PRESENT
                  ^                              |
                  |                              v
                  +-------- REWORK --------------+
```

DRAW always runs first. The selected_subset is locked once the audit log line is written. Rework operates within the original draw.

## Phase 0: DRAW

**Purpose**: Pick a varied anti-pattern subset for this run and write the audit log. This is the rotation rule that keeps two distinct prompts from producing identical critiques.

**Sequence**:
1. Generate `run_id` (timestamp + 4 hex chars).
2. Spawn `anti-pattern-selector` with: command, product description, persona (or "unknown"), surface, industry, audience, competitors, brand_tokens.
3. Selector reads `${CLAUDE_PLUGIN_ROOT}/anti-patterns/manifest.json` and the last 5 lines of `${CLAUDE_PLUGIN_ROOT}/state/draws.jsonl`.
4. Selector picks subset, appends one JSON line to `state/draws.jsonl`, returns audit_header + subset.
5. Conductor verifies the append happened (last line of draws.jsonl matches the selector's output).

**Artifacts produced**:
- `audit_header`: markdown block printed at top of every output
- `selected_subset`: list of anti-pattern IDs threaded through every downstream agent
- One appended line in `state/draws.jsonl`

**Gate to PLAN**: Audit log line written and verified. Selector returned a non-empty subset. If either fails, abort the run with a hard error -- the audit rule is non-negotiable.

## Phase 1: PLAN

**Purpose**: Understand requirements, detect persona, establish design direction.

**Sequence**:
1. Read user description
2. Detect persona (or ask if ambiguous)
3. Load persona file from `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/personas/`
4. Spawn design-researcher agent (reference sites)
5. Spawn in parallel:
   - typography-specialist
   - color-specialist
   - layout-specialist
   - motion-specialist

   Each specialist receives the `selected_subset` and avoids generating designs that match patterns in the subset.
6. Wait for all specialists to complete
7. Spawn component-architect (consumes specialist outputs + selected_subset)

**Artifacts produced**:
- `plan-context`: persona, product description, references, constraints, surface, industry, audience, competitors
- `design-spec`: typography, color, layout, motion specifications
- `component-spec`: component tree, variant strategy, composition

**Gate to Phase 2**: All spec artifacts exist. Color spec uses typography spec's font families. Layout spec spacing matches token scale.

## Phase 2: INTERVIEW (conditional)

**Purpose**: Fill gaps the description left.

**Trigger**: Conductor evaluates `plan-context` for completeness. If any of these are missing, ask:
- Brand color or color constraint
- Existing component library or design system
- Target breakpoints or device priorities
- Content that will populate the design (real copy vs placeholder)

**Skip condition**: Description + persona detection provide sufficient context for all specialist specs.

**Gate to Phase 3**: `plan-context` is complete with no placeholders.

**Special case**: If interview answers change the persona, the prior draw is invalidated. Re-enter DRAW once with the new persona, then proceed. This is the only path that re-enters DRAW.

## Phase 3: DEVELOP

**Purpose**: Implement the design in code.

**Sequence** (sequential, each builds on the previous):
1. style-implementer: CSS custom properties, Tailwind config, global styles
2. component-implementer: React/TSX components using style variables
3. accessibility-implementer: ARIA attributes, keyboard nav, focus management

Each implementer receives the `selected_subset` and avoids generating code that maps to subset patterns.

**Artifacts produced**: Code files (TSX, CSS, Tailwind config).

**Gate to Phase 4**: Code files exist. Quick lint check passes (conductor runs via Bash).

## Phase 4: REVIEW

**Purpose**: Validate against the selected subset, accessibility, and copy quality.

**Spawn in parallel** (critic ensemble, all six receive `selected_subset`):
- design-critic (broad subset scan, score capped at 40)
- hierarchy-critic (layout/density slice, score capped at 40)
- interaction-critic (motion/feedback/dark-pattern slice, score capped at 40)
- microcopy-critic (inline product copy slice, score capped at 40)
- copy-editor (headline and marketing copy)
- accessibility-auditor (WCAG 2.1 AA)

**Synthesis** (sequential, after ensemble):
- critique-synthesizer: deduplicates, weights by reviewer agreement, computes consensus 0-100 score, applies gate, emits final report

**Gate evaluation** (synthesizer):
- Sameness score <= gate_threshold (40 for kern-produced, 60 for /kern:audit on external): PASS
- Sameness score > gate_threshold: REWORK
- Critical accessibility violations: REWORK

## REWORK (sub-state of REVIEW)

**Purpose**: Fix specific issues identified by reviewers without re-running the full pipeline.

The `selected_subset` does not change during rework. The original draw is locked.

**Routing table**:

| Finding category | Rework target | Re-review agent |
|---|---|---|
| Color/palette issue | color-specialist -> style-implementer | design-critic, hierarchy-critic |
| Typography issue | typography-specialist -> style-implementer | design-critic |
| Layout issue | layout-specialist -> component-implementer | hierarchy-critic, design-critic |
| Copy issue | copy-editor applies fix directly | None |
| Microcopy issue | microcopy-critic produces patch, component-implementer applies | microcopy-critic |
| Interaction issue | motion-specialist or component-implementer | interaction-critic |
| Accessibility issue | accessibility-implementer | accessibility-auditor |
| Component structure | component-architect -> component-implementer | hierarchy-critic, design-critic |

**Termination conditions**:
1. Max 2 rework cycles per issue category
2. Score must decrease on each cycle (monotonic improvement)
3. If score does not decrease: stop, present output with remaining issues flagged
4. Never return from REVIEW to PLAN (no cross-phase rollback)
5. Never re-enter DRAW (the audit log line is locked for this run)

## Phase 5: PRESENT

**Purpose**: Deliver final output.

**Output includes**:
- Audit header (verbatim from selector, at the very top)
- Synthesizer report (consensus score, findings, top three actions)
- Implemented code files
- Status line: which agents ran, which failed, rework cycle counts
- References used

**Format**:
```markdown
<audit header from anti-pattern-selector verbatim>

---

# Kern Design: <component or page name>

<synthesizer report verbatim>

## Code

<final component code>

## References

<list with notes>

## Run Status

- Agents spawned: <list>
- Rework cycles: <category: count>
- Time to complete: <if available>
```

## Error Handling

- DRAW failures (selector cannot append to draws.jsonl) abort the run with a hard error. The audit rule is non-negotiable.
- If any other agent fails (timeout, error): conductor logs the failure, skips that agent's contribution, and notes the gap in the final output.
- If the conductor itself encounters an unrecoverable error: present whatever artifacts exist with a status report. Always include the audit header that was already written.
- No silent failures: every skipped step is reported.
