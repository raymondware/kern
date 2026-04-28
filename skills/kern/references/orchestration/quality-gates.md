# Quality Gates

Criteria for transitioning between pipeline phases. The conductor evaluates these gates.

## Gate: PLAN -> INTERVIEW

**Pass if ALL true**:
- Persona is detected or explicitly set
- typography-specialist produced a font spec (families, scale, weights)
- color-specialist produced a palette (accent, neutrals, semantic colors)
- layout-specialist produced layout constraints (grid, spacing, density)
- motion-specialist produced a motion spec (timing, easing, behaviors)
- component-architect produced a component tree with variant strategy
- design-researcher returned 3+ reference sites

**Fail triggers**: Missing specialist output. Conductor re-runs the failed specialist once before failing the gate.

## Gate: INTERVIEW -> DEVELOP

**Pass if ALL true**:
- Brand color or color direction is established (not "TBD" or placeholder)
- Component types are defined (what to build)
- Target context is clear (page type, product type, user type)
- Persona-specific constraints are loaded

**Skip INTERVIEW entirely if**: All of the above were established during PLAN from the user's description alone.

## Gate: DEVELOP -> REVIEW

**Pass if ALL true**:
- At least one code file was produced
- No syntax errors in produced code (conductor runs quick validation)
- Style system (CSS variables or Tailwind config) is defined
- Component code references the style system (not hardcoded values)

**Fail triggers**: Syntax errors. Conductor sends error to the relevant implementer for a fix (not counted as a rework cycle).

## Gate: REVIEW -> PRESENT

**Pass if ALL true**:
- Sameness score <= 60
- Zero critical copy violations remaining
- Zero critical accessibility violations remaining (WCAG 2.1 AA)

**Fail triggers rework with these bounds**:

| Issue | Max rework cycles | On exhaustion |
|---|---|---|
| Sameness score > 60 | 2 | Present with score + full critic report |
| Copy violations | 1 | Present with before/after table, user decides |
| Accessibility violations | 1 | Present with violation list |

**Rework rules**:
1. Only re-run the agents in the rework path (see pipeline.md routing table)
2. Score must decrease after rework (monotonic improvement required)
3. If score increases or stays same: stop, present the better version
4. Cross-category rework is sequential (fix color first, then re-score, then fix layout if still needed)

## Sameness Score Interpretation

| Score | Gate decision |
|---|---|
| 0-20 | Pass. Distinctive. |
| 21-40 | Pass. Has character. |
| 41-60 | Pass. Generic but acceptable. |
| 61-80 | Fail. Rework required. |
| 81-100 | Fail. Significant rework required. |

## Completeness Check for INTERVIEW

When the conductor evaluates whether to skip the INTERVIEW phase, it checks these specific fields:

**Required (cannot proceed without)**:
- Product type (what it does)
- Primary user (who uses it)
- Persona assignment

**Strongly recommended (ask if missing)**:
- Brand color or color preference
- Existing design system or component library
- Tech stack constraints
- Real copy vs placeholder (affects copy-editor value)

**Nice to have (do not block for)**:
- Specific breakpoint requirements
- Animation preferences
- Competitor references
- Content inventory
