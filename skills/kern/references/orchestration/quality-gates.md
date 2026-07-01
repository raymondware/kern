# Quality Gates

Criteria for transitioning between pipeline phases. The conductor evaluates these gates.

## Gate: INIT -> DRAW

**Pass if**: Always. DRAW is the entry point for every kern command that involves critique or generation. The only way to skip DRAW is to use a non-kern command.

## Gate: DRAW -> PLAN

**Pass if ALL true**:
- `state/draws.jsonl` had exactly one line appended this run
- The selector returned a non-empty `selected_subset`
- The audit_header markdown block is non-empty
- The subset does not equal the previous run's subset (set comparison)

**Fail triggers**: Any false condition aborts the run with a hard error. The audit rule is the foundation of the variation guarantee. There is no recovery path.

## Gate: PLAN -> INTERVIEW

**Pass if ALL true**:
- Persona is detected or explicitly set
- typography-specialist produced a font spec (families, scale, weights)
- color-specialist produced a palette (accent, neutrals, semantic colors)
- layout-specialist produced layout constraints (grid, spacing, density)
- motion-specialist produced a motion spec (timing, easing, behaviors)
- component-architect produced a component tree with variant strategy
- design-researcher returned 3+ reference sites
- For brand-match requests, `brand-evidence` exists with at least two official reference URLs or screenshots. If not, `claim_calibration` is set to `brand-informed draft` and unknowns are listed.
- Brand evidence extracts colors, typography, spacing rhythm, button treatment, card or form treatment, image treatment, section order and persuasion rhythm, voice, and CTA patterns.
- Brand evidence includes `match`, `do_not_copy`, and `unknowns_or_risks` lists.

**Fail triggers**: Missing specialist output. Conductor re-runs the failed specialist once before failing the gate.

## Gate: INTERVIEW -> DEVELOP

**Pass if ALL true**:
- Brand color or color direction is established (not "TBD" or placeholder)
- Component types are defined (what to build)
- Target context is clear (page type, product type, user type)
- Persona-specific constraints are loaded
- Brand-match work has a claim calibration: `style-match`, `brand-informed`, `loose inspiration`, or `rejected/mismatched`
- If persona changed during interview: a fresh DRAW has been performed and the new audit log line written

**Skip INTERVIEW entirely if**: All of the above were established during PLAN from the user's description alone.

## Gate: DEVELOP -> REVIEW

**Pass if ALL true**:
- At least one code file was produced
- No syntax errors in produced code (conductor runs quick validation)
- Style system (CSS variables or Tailwind config) is defined
- Component code references the style system (not hardcoded values)

**Fail triggers**: Syntax errors. Conductor sends error to the relevant implementer for a fix (not counted as a rework cycle).

## Gate: REVIEW -> PRESENT

The synthesizer evaluates this gate on behalf of the conductor.

**Pass if ALL true**:
- Consensus sameness score <= gate_threshold
  - Threshold = 40 for kern-produced output (`/kern:design`, `/kern:differentiate`, `/kern:polish`)
  - Threshold = 60 for external designs being audited (`/kern:audit`, `/kern:review` on third-party code)
- Zero critical microcopy violations remaining
- Zero critical accessibility violations remaining (WCAG 2.1 AA)
- For brand-match or page-level work, desktop and mobile screenshot review completed, or the final report states style-match scoring is incomplete
- If final wording claims `style match`, style-match score is 85 or higher and evidence includes at least two official references

**Fail triggers rework with these bounds**:

| Issue | Max rework cycles | On exhaustion |
|---|---|---|
| Sameness score > threshold | 2 | Present with score + full synthesizer report |
| Microcopy violations | 1 | Present with before/after table, user decides |
| Accessibility violations | 1 | Present with violation list |
| Style-match score below claimed level | 1 | Downgrade claim and list gaps |
| Missing screenshot review | 0 | State scoring is incomplete |

**Rework rules**:
1. Only re-run the agents in the rework path (see pipeline.md routing table)
2. The selected_subset is locked. Rework operates within the original draw.
3. Score must decrease after rework (monotonic improvement required)
4. If score increases or stays same: stop, present the better version
5. Cross-category rework is sequential (fix color first, then re-score, then fix layout if still needed)

## Sameness Score Interpretation

| Score | Gate decision |
|---|---|
| 0-20 | Pass. Distinctive. |
| 21-40 | Pass. Has character. |
| 41-60 | Fail for kern-produced. Pass for external audit. |
| 61-80 | Fail in both modes. Significant rework required. |
| 81-100 | Fail. Critical. Multiple spec violations likely. |

## Style-Match Score

Style-match score is separate from Sameness Score. Use it only for brand-match or brand-informed work, and only after brand evidence has been extracted.

Rubric:

| Dimension | Points |
|---|---:|
| Brand color fidelity | 15 |
| Typography fidelity | 20 |
| Layout and spacing rhythm | 20 |
| Component fidelity | 15 |
| Imagery and content treatment | 10 |
| Voice and CTA fidelity | 10 |
| Persona appropriateness | 10 |
| Total | 100 |

Claim calibration:

| Score | Allowed claim |
|---|---|
| 85-100 | style match |
| 70-84 | brand-informed |
| 50-69 | loose inspiration |
| 0-49 | mismatched or rejected |

Rules:
- Do not report `style match` if official evidence is missing, even when the score is high. Use `brand-informed draft`.
- Do not report a numeric style-match score as complete unless desktop and mobile screenshots were reviewed.
- The synthesizer must downgrade final wording when score, evidence, screenshots, or persona do not support the stronger claim.

## Screenshot Review Gate

Required for brand-match or page-level work before REVIEW -> PRESENT:

- Desktop screenshot reviewed.
- Mobile screenshot reviewed.
- Typography questions answered.
- Spacing and density questions answered.
- Brand-match questions answered.
- Copy and claims questions answered.

If screenshots cannot be captured, continue only with explicit limitation text: `Style-match scoring incomplete: desktop and mobile screenshot review was not completed.`

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
- Real copy vs placeholder (affects copy-editor and microcopy-critic value)

**Nice to have (do not block for)**:
- Specific breakpoint requirements
- Animation preferences
- Competitor references (the selector uses these as a site-specific signal, but the run can proceed without)
- Content inventory

## Audit Log Verification

Before any agent other than the anti-pattern-selector runs, verify:

1. `state/draws.jsonl` exists and is writable
2. The last line of `state/draws.jsonl` matches the selector's reported audit line (string equality)
3. The selector's run_id is unique vs the prior 5 lines

If any check fails, abort the run. There is no soft-fail path. The variation rule and the audit rule are the foundation of kern's value proposition.
