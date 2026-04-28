# Pipeline State Machine

The conductor agent manages the kern design pipeline. This document defines the state transitions, parallel execution groups, and termination conditions.

## States

```
INIT -> PLAN -> INTERVIEW -> DEVELOP -> REVIEW -> PRESENT
                   ^                       |
                   |                       v
                   +---- REWORK -----------+
```

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
6. Wait for all specialists to complete
7. Spawn component-architect (consumes specialist outputs)

**Artifacts produced**:
- `plan-context`: persona, product description, references, constraints
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

## Phase 3: DEVELOP

**Purpose**: Implement the design in code.

**Sequence** (sequential, each builds on the previous):
1. style-implementer: CSS custom properties, Tailwind config, global styles
2. component-implementer: React/TSX components using style variables
3. accessibility-implementer: ARIA attributes, keyboard nav, focus management

**Artifacts produced**: Code files (TSX, CSS, Tailwind config).

**Gate to Phase 4**: Code files exist. Quick lint check passes (conductor runs via Bash).

## Phase 4: REVIEW

**Purpose**: Validate against anti-patterns, accessibility, and copy quality.

**Spawn in parallel**:
- design-critic (reads anti-patterns + persona, produces sameness score)
- copy-editor (reads copy anti-patterns + persona, produces before/after table)
- accessibility-auditor (reads implemented code, produces pass/fail report)

**Gate evaluation**:
- Sameness score <= 60: PASS
- Sameness score > 60: REWORK
- Critical copy violations: REWORK (copy-editor fixes directly)
- Critical accessibility violations: REWORK

## REWORK (sub-state of REVIEW)

**Purpose**: Fix specific issues identified by reviewers without re-running the full pipeline.

**Routing table**:

| Finding category | Rework target | Re-review agent |
|---|---|---|
| Color/palette issue | color-specialist -> style-implementer | design-critic |
| Typography issue | typography-specialist -> style-implementer | design-critic |
| Layout issue | layout-specialist -> component-implementer | design-critic |
| Copy issue | copy-editor applies fix directly | None |
| Accessibility issue | accessibility-implementer | accessibility-auditor |
| Component structure | component-architect -> component-implementer | design-critic |

**Termination conditions**:
1. Max 2 rework cycles per issue category
2. Score must decrease on each cycle (monotonic improvement)
3. If score does not decrease: stop, present output with remaining issues flagged
4. Never return from REVIEW to PLAN (no cross-phase rollback)

## Phase 5: PRESENT

**Purpose**: Deliver final output.

**Output includes**:
- Implemented code files
- Design critic report (sameness score, violations fixed, remaining items)
- Copy editor changes table
- Accessibility audit results
- References used

**Format**:
```markdown
# Kern Design: [component or page name]

**Persona**: [persona]
**Sameness score**: [final score] / 100

## Design
[final component code]

## Critic Report
**Violations fixed**: [list]
**Remaining items**: [if any]

## Copy Changes
[before/after table]

## Accessibility
[audit results]

## References
[list with notes]
```

## Error Handling

- If any agent fails (timeout, error): conductor logs the failure, skips that agent's contribution, and notes the gap in the final output
- If conductor itself encounters an unrecoverable error: present whatever artifacts exist with a status report
- No silent failures: every skipped step is reported
