# Session Batch Diversity Guard

Regression scenario from local outreach mockups: five related SMB redesign concepts were generated in one session and looked like the same template with swapped copy. This test fixture documents the expected Kern behavior for same-session or same-batch generation.

## Trigger phrases

Kern should create `batch_diversity_context` when the prompt contains any of these patterns:

- `five leads`
- `batch`
- `same outreach run`
- `another one`
- `generate for these businesses`
- multiple adjacent `/kern:design` calls in one chat/session

## Required PLAN output

When `batch_diversity_context` exists, the layout-specialist output must include `Batch Diversity Guard` with:

- forbidden repeats from prior same-session outputs;
- at least three concrete structural differences;
- one business-specific visual metaphor;
- a contact-sheet check that the concept should not read as the same template with swapped copy.

## Passing example

Five local SMB concepts in one run:

1. Restoration contractor: restoration intake panel, urgency card, insurance context.
2. Flooring company: wood plank/sample quote interface, room/material/photo steps.
3. Painting/remodel contractor: project board, photo/timeline/budget estimate fields.
4. Handyman service: mobile phone request flow, task/photo/urgency scheduler.
5. General contractor: blueprint board, service-specific estimate routing.

This passes because the visual metaphor, hero composition, proof surface, and component rhythm differ.

## Failing example

Five concepts that all use:

- same top bar;
- same split hero;
- same house illustration;
- same three trust cards;
- same bottom service-card row;
- only copy, initials, and business names changed.

This fails even if hashes, file sizes, colors, and text differ. The human-visible design is still the same shell.
