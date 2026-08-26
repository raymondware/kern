# Reference-Led Design Contract

Use this contract whenever `/kern:design`, `/kern:compare`, or `/kern:differentiate` receives a reference URL, screenshot, existing component, or named style recipe. A reference is evidence for decisions. It is not a cloning instruction.

## 1. Classify the input

Record each supplied input in `reference_context` with:

| Input | Required handling |
|---|---|
| Reference URL | Inspect the named page or relevant surface. Record the URL, access date if available, and the exact section studied. If it cannot be inspected, mark the limitation instead of guessing. |
| Screenshot | Inspect the visible composition and annotate which decisions are observable versus unknown. Record the file or attachment identifier. |
| Existing component | Read the implementation and, when available, its rendered state. Separate intentional product constraints from incidental implementation details. |
| Named style recipe | Load the matching recipe from `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/style-recipes.md` or the supplied recipe source. Record its name and version. |

Multiple inputs may be combined. A recipe supplies a reusable language, while a URL, screenshot, or component supplies surface evidence.

## 2. Build the benchmark brief in PLAN

Before specialists run, create a short `benchmark_brief`. It must state:

- target surface, persona, and user task;
- `reference_context` and `style_recipe_context`, including provenance and limits;
- `regression_context` when an existing implementation, prior screenshot, or accepted version is available;
- observable decisions extracted from every usable input;
- what the new design must preserve for the current product direction;
- the divergence contract and the decisions that must be made independently.

Extract observations, not praise. Use this checklist for each reference:

| Decision area | Record observable evidence |
|---|---|
| Hierarchy | Entry point, focal point, grouping, reading order, emphasis changes |
| Type roles and weights | Display, heading, body, label, numeric, and mono roles; families, sizes, weights, line heights |
| Spacing rhythm | Container widths, section gaps, local gaps, alignment rules, density |
| Color roles | Canvas, surface, text, muted text, accent, action, status, and image treatment |
| Radius, border, shadow | Shape hierarchy, border use, elevation, separators, and material cues |
| Imagery | Subject, crop, aspect ratio, placement, art direction, and absence of imagery |
| Density | Information per viewport, whitespace, repetition, and content length |
| Interaction and motion | Hover, focus, loading, transition, feedback, scroll, and static areas |
| Content pattern | Headline structure, labels, CTA specificity, proof, metadata, and state language |

If a decision is not observable, write `unknown`. Never infer a full token system from a screenshot alone.

For each observation, preserve structured evidence instead of only a prose impression:

```yaml
decision_area: spacing_rhythm
observation: Section gaps use a repeated medium-to-large rhythm.
source: screenshot:hero-desktop
evidence_type: measured | visible | inferred
confidence: high | medium | low
measurement: "64px section gap when rendered evidence permits measurement"
```

Use `measured` only when the source or rendered evidence supports a measurement. Use `visible` for directly observable relationships and `inferred` for a cautious hypothesis. Inferred observations cannot become hard implementation requirements without confirmation.

## 3. Make adaptation explicit

Every benchmark brief includes this table, even when a cell is `none`:

| Reference decision | Take | Adapt | Avoid |
|---|---|---|---|
| [observable decision] | [useful principle to carry forward] | [change for persona, task, content, or product constraints] | [copy, dependency, or pattern that does not belong] |

Use the exact key `take_adapt_avoid` for machine-readable state. Add one row for each material decision area. The `avoid` column must call out direct copying, borrowed content, unsupported interactions, and any choice that conflicts with the current user direction.

## 4. Divergence contract

The brief must include an explicit `divergence_contract` with:

1. **Reference role**: what the reference proves or helps calibrate.
2. **Protected user direction**: current requirements, brand tokens, content, accessibility constraints, and persona rules that outrank the reference.
3. **Required differences**: at least two meaningful differences when the reference is visual. Prefer differences in structure, content, type roles, imagery, or interaction. Cosmetic color changes alone do not count.
4. **No-copy rule**: do not reproduce source copy, logos, proprietary imagery, exact page structures, or distinctive assets. Do not present a borrowed decision as original.
5. **Decision ownership**: list the new decisions Kern makes for this product and why they serve the user task.
6. **Conflict rule**: when a reference conflicts with user direction or an existing system, preserve user direction and log the tradeoff.

Compare and differentiate may identify overlap, but their fixes must use the divergence contract rather than applying an opposite style by default.

## 5. No-reference fallback

When no reference or recipe is supplied, do not invent a benchmark. Choose a small set of persona-appropriate exemplars from `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/exemplars.md` and, where useful, `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/dribbble-refs.md`. Select only the examples needed for the surface. For each exemplar, state why it fits the persona and user task, what decision area it informs, and what Kern will not borrow. The fallback still produces `reference_context`, `take_adapt_avoid`, and `divergence_contract`.

## 6. Provenance in the final brief

The final design brief must include:

- `provenance`: every URL, screenshot identifier, component path, recipe name and version, or fallback exemplar used;
- `observations`: the extracted decisions and whether each was observed or unknown;
- `adaptation_notes`: the meaningful changes made for the current persona, task, content, and constraints;
- `divergence_contract`: the agreed differences and any unresolved conflict;
- `regression_context`: the baseline artifact, comparison scope, and any behavior or visual change that must not regress;
- `reference_limits`: inaccessible sources, unverified details, and assumptions.

Pass this brief to specialists, implementers, critics, the synthesizer, and the design gauntlet. The anti-pattern draw, rotation, and persona gates remain mandatory and are never replaced by benchmark work.
