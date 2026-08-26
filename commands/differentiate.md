---
description: "De-AI an existing design. Identifies tool fingerprint and applies targeted opposites."
allowed-tools: ["Read", "Write", "Edit", "Glob", "Grep"]
---

# /kern:differentiate

Takes an existing design and makes it not look like AI generated it. Identifies which tool's defaults the design most closely matches, then applies targeted opposites.

## When to Use

Run `/kern:differentiate` when:
- You have a design that works functionally but reads as generic or AI-generated
- The sameness score from `/kern:audit` came back above 60
- A reviewer said "this looks like v0 output" or "this looks like every other SaaS site"
- You used an AI tool to bootstrap the UI and want to make it yours

## Usage

```
/kern:differentiate <file or component> [--reference URL | screenshot | component | recipe:name@version]
```

## Workflow

### Step 1: Draw + Baseline
The `anti-pattern-selector` picks a varied subset weighted toward tool-fingerprint patterns (since differentiation is about removing the fingerprint). The critic ensemble plus `critique-synthesizer` produce a baseline sameness score and identify the tool fingerprint.

If a reference or recipe is supplied, build the benchmark brief before applying changes. Read `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/orchestration/reference-led-design.md` and `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/style-recipes.md`. Extract the observable decisions, fill `take_adapt_avoid`, and write a divergence contract. Use the input as evidence for intentional adaptation, not as a cloning or blind opposite-style instruction. With no reference, record the persona-appropriate exemplar fallback.

### Step 2: Apply Targeted Opposites
For each identified tool or pattern cluster in the subset, apply the inverse. See `${CLAUDE_PLUGIN_ROOT}/anti-patterns/sourced-from-research/` for tool-specific defaults.

### Step 3: Introduce One Distinctive Element
Every well-designed product has one element that is unmistakably its own. Kern suggests one appropriate to the persona.

### Step 4: Verify Score Dropped
The critic ensemble + synthesizer run again on the same `selected_subset` (no second draw -- rework operates within the original draw). Score must drop below input score to confirm differentiation worked.

When a benchmark was supplied, also report `provenance`, `adaptation_notes`, `reference_limits`, and the divergence result. Keep user direction, existing system constraints, persona gates, and the original anti-pattern draw ahead of the reference.

## Output Format

```markdown
# Kern Differentiate: [component or page name]

## Before
**Sameness score**: [input score] / 100
**Matched to**: [tool identification]
**Top contributing factors**: [list with point values]

## Changes Applied
[Per-category: Color, Typography, Layout, Distinctive element]

## After
**Sameness score**: [new score] / 100
**Score reduction**: [delta]

## Remaining Issues
[Factors that could not be addressed without more context]
```
