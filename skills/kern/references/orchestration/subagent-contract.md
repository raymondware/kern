## Invocation from subagent

When a validation harness or automated system spawns a subagent to run the kern design workflow, the subagent must follow this protocol exactly. User-facing invocation (`/kern design`) and subagent invocation produce the same output; only the calling convention differs.

### Subagent prompt template

```
You are running the kern /kern design workflow for a validation run.

Design brief: {BRIEF}
Output path: {OUTPUT_PATH}

Follow these steps in order. Do not skip any step.

Step 0 — Edge case pre-flight:
  Check for mobile signals in the brief: "mobile", "mobile-only", "mobile-first", "iOS", "Android", "phone".
  If found, set MOBILE_MODE=true: base Tailwind classes target small screens, use md:/lg: overrides for desktop.
  Check for page-level signals: "page", "landing page", "full page", "homepage", "dashboard layout".
  If found, set PAGE_MODE=true: generate a full-page layout skeleton with named sections rather than a single component.
  The brief will always be provided (validation harness guarantee) — skip empty-input branch.

Step 1 — Detect persona:
  Read ${CLAUDE_PLUGIN_ROOT}/commands/design.md steps 1-2.
  Score each persona on the brief's signals. Output:
    Persona detected: {persona}
    Confidence: {0.0–1.0}
    Runner-up: {persona or "none"}
  If confidence < 0.7: proceed anyway (subagent mode — do not stop), but include the confidence
  in the output so the caller can flag it for human review.
  Read ${CLAUDE_PLUGIN_ROOT}/references/personas/{persona}.md fully before proceeding.

Step 2 — Load references:
  Read ${CLAUDE_PLUGIN_ROOT}/agents/design-researcher.md.
  Based on the persona, identify 2-3 real products that exemplify the persona aesthetic.
  State three differentiation decisions you will apply (font, color/layout, copy voice).

Step 3 — Generate TSX:
  Build the component. Apply all differentiation decisions.
  Avoid all patterns in ${CLAUDE_PLUGIN_ROOT}/anti-patterns/visual.md and copy.md.
  Use Tailwind + Shadcn/Radix unless the brief specifies otherwise.
  TSX output constraints (required for compilability):
    - Tailwind classes only — no inline style={} props, no CSS modules
    - Shadcn imports: @/components/ui/{name} path alias only
    - Self-contained: renders with no props — use hardcoded demo data
    - Single default export
    - No useEffect, no external API calls, no unknown custom hook paths
    - cn() utility imported from "@/lib/utils" if used

Step 4 — Self-score:
  Read ${CLAUDE_PLUGIN_ROOT}/agents/design-critic.md.
  Apply the Sameness Score rubric to your own output.
  Revision limit: 2 passes maximum.
  If self-score >= 7 on pass 1: revise Step 3 (change at least 3 elements) and re-score.
  If self-score >= 7 on pass 2: proceed with best attempt and include this warning in output:
    "Score remains {n}/10 after 2 revision passes — proceeding with best attempt."

Step 5 — Copy audit:
  Check all copy against ${CLAUDE_PLUGIN_ROOT}/anti-patterns/copy.md.
  Fix violations inline.

Step 6 — Save output to {OUTPUT_PATH}:
  Write a single markdown file with this structure:

  ## {Component} — {Persona}

  ### Persona Detected
  {persona name} — confidence {0.0–1.0}, runner-up: {runner_up or "none"}

  ### Differentiation Decisions
  - {decision 1}
  - {decision 2}
  - {decision 3}

  ### Sameness Score (self): {n}/10
  {one sentence explanation}

  ### Design Critic Findings
  {anti-pattern violations table or "None found"}

  ### Generated TSX
  ```tsx
  {component code}
  ```
```

### What the validation harness does with the output

After the kern-runner subagent completes:

1. An independent `external-judge` subagent reads `{OUTPUT_PATH}` — the TSX only, not the critic section.
2. It scores 0-10 using the Sameness Score rubric from `agents/design-critic.md` with no access to the kern-runner's reasoning.
3. The judge result is saved as `{OUTPUT_PATH}.judge.json`.

The external judge invocation prompt:

```
Read the file at {OUTPUT_PATH}. Extract only the TSX code block (under "Generated TSX").
Score it 0-10 on how much it resembles default AI design tool output, using this rubric:

  0-2: Distinctive — at least 3 unusual persona-specific decisions, would not be identified as AI-generated
  3-4: Mostly distinctive — 1-2 AI-default elements
  5-6: Neutral — no strong point of view but avoids obvious tells
  7-8: Recognizably AI — multiple default patterns present
  9-10: Default AI output — purple gradient, centered hero, Inter, card grid

Sameness indicators (each +1 to score):
  - Purple, blue, or cyan gradient anywhere
  - Centered hero with CTA button
  - Inter or system-default font with no explicit choice
  - "Get Started" CTA label
  - 3 identical cards (icon + heading + description)
  - Glow/shadow behind headline
  - Radial gradient hero background
  - Badge elements floating near headline
  - Gradient text on headline
  - Dark background with neon-adjacent accent

Return a JSON object:
  {"score": N, "indicators_hit": ["..."], "notes": "one sentence"}

Save it to {OUTPUT_PATH}.judge.json
```

### Rules for kern-runner subagents

- Read persona files fully before generating. Skipping this is the main source of sameness.
- The self-score in the output must reflect honest application of the rubric, not aspirational scoring.
- If the brief is genuinely ambiguous between two personas, state both and pick the closer one with a note.
- Do not read the external judge's output — these two subagents must never share context.
