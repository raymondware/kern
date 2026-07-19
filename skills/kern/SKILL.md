---
name: kern
description: Multi-agent design quality harness for dev-built UIs. Orchestrates specialist agents for typography, color, layout, copy, and accessibility through a 6-phase pipeline (draw, plan, interview, develop, review, present). Picks a VARIED subset of anti-patterns per run with an audit log so two distinct prompts cannot produce identical critiques. Runs four critics in parallel (design, hierarchy, interaction, microcopy) and synthesizes their findings. Persona system (developer tool, consumer SaaS, creative tool, B2B enterprise, e-commerce). Sameness score catches AI defaults. Built for Shadcn/Radix/Next.js stacks.
---

# Kern v1.0.0

Multi-agent design harness for developers who care about craft. Named after kerning: the small adjustments that make type feel right. Kern orchestrates specialist agents to find and fix the small adjustments that make UIs feel right.

## Quick Start (5 minutes)

```bash
# Generate a component or page from scratch
/kern:design hero section for a CI/CD observability platform for platform engineers

# Audit existing code
/kern:audit
# (paste in TSX or describe the component to audit)

# De-AI an existing design
/kern:differentiate

# Run only the anti-pattern selector (verifies rotation)
/kern:draw landing page for a creative-agency workflow tool
```

What kern does behind the scenes:
1. anti-pattern-selector picks a varied subset of anti-patterns for THIS run, weighted by site signals (persona, surface, industry, audience, competitors, brand tokens). Excludes the previous run's subset. Audits to `state/draws.jsonl`.
2. Detects one of 5 product personas from your brief or code
3. Loads that persona's font, color, layout, copy rules
4. Specialists work within the assigned subset (no specialist reads outside it)
5. Critic ensemble runs in parallel; synthesizer merges into a 0-100 sameness score
6. Score above gate threshold (40 for kern output, 60 for external audit) routes to targeted rework

**Respect for stated direction:** kern targets AI-default USES of elements (gradients, glow, identical-card grids, undeclared default fonts), not the elements themselves. If the user says "electric violet on dark with Inter," use those. Apply Sameness discipline within their constraints.

---

## The Core Problem

Every AI-generated UI looks the same. Indigo-500 buttons. Centered hero with a radial glow. Three feature cards. Inter font. Starter/Pro/Business pricing. FAQ accordion.

Kern's job is to catch these defaults before they ship, using a team of specialized agents that plan, design, implement, and review collaboratively.

## The Variation Rule

The biggest failure mode of any "anti-pattern checker" is that the checker itself becomes a template. If kern critiqued every site against the same 48 patterns, two distinct prompts would produce identical critiques and the design direction would converge.

Kern enforces a hard rule:

1. **Vary the draw per run.** Each run selects a different subset of anti-patterns weighted by site-specific signals (persona, surface, industry, audience, competitors, brand tokens).
2. **Never reuse the same subset two runs in a row.** The selector reads `state/draws.jsonl` and excludes the most recent draw.
3. **Audit trail.** Every draw is appended to `state/draws.jsonl` and printed at the top of every kern output.
4. **Site-specific signal.** At least one input signal must influence the selection. Generic selection produces generic output.

The `anti-pattern-selector` agent enforces all four rules. It runs first in every kern command. If the audit log fails to append, the run aborts.

## Agent Team

### Orchestration
| Agent | Model | Role |
|---|---|---|
| `conductor` | Opus 4.8 | Pipeline orchestrator. Manages state, spawns specialists, enforces quality gates. |
| `anti-pattern-selector` | Sonnet | Picks the varied subset for this run, writes the audit log. Runs first in every pipeline. |
| `critique-synthesizer` | Opus 4.8 | Merges parallel critic outputs, deduplicates, computes consensus sameness score. |

### Design Specialists (read-only, produce specs)
| Agent | Model | Role |
|---|---|---|
| `typography-specialist` | Haiku | Font selection, type scale, hierarchy |
| `color-specialist` | Haiku | OKLCH palette, contrast, brand color derivation |
| `layout-specialist` | Haiku | Grid, spacing, density, breakpoints |
| `component-architect` | Sonnet | Component tree, variants, composition patterns |
| `motion-specialist` | Haiku | Animation timing, interaction feedback, transitions |

### Development (produce code)
| Agent | Model | Role |
|---|---|---|
| `component-implementer` | Sonnet | React/TSX from design specs |
| `style-implementer` | Sonnet | CSS variables, Tailwind config, token system |
| `accessibility-implementer` | Sonnet | ARIA, keyboard nav, focus management |

### Review (parallel ensemble, each scoped to one slice of the subset)
| Agent | Model | Role |
|---|---|---|
| `design-critic` | Opus 4.8 | Broad anti-pattern scan; per-dimension score capped at 40 |
| `hierarchy-critic` | Haiku | Layout, density, hero/feature/pricing structure slice |
| `interaction-critic` | Haiku | Motion, feedback, modal, toast, dark-pattern slice |
| `microcopy-critic` | Haiku | Inline product copy: button labels, errors, empty states |
| `copy-editor` | Opus 4.8 | Headline and marketing copy slice |
| `accessibility-auditor` | Haiku | WCAG 2.1 AA compliance |
| `responsive-validator` | Haiku | Cross-breakpoint layout validation |

### Research
| Agent | Model | Role |
|---|---|---|
| `design-researcher` | Haiku | Reference site finder |
| `research-scout` | Sonnet | Community pattern scanner |

## Pipeline

The `/kern:design` command runs the full 6-phase pipeline via the conductor agent:

1. **DRAW**: anti-pattern-selector picks a varied subset, writes the audit log line, emits the audit_header. Every downstream agent receives `selected_subset`.
2. **PLAN**: Persona detection -> reference research -> parallel specialists (typography, color, layout, motion) -> component architect
3. **INTERVIEW** (conditional): Targeted questions if specs have gaps
4. **DEVELOP**: Style implementer -> component implementer -> accessibility implementer
5. **REVIEW**: Critic ensemble in parallel (design + hierarchy + interaction + microcopy + copy-editor + accessibility) followed by the synthesizer. Targeted rework if needed (max 2 cycles).
6. **PRESENT**: audit_header + synthesizer report + final code

See `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/orchestration/pipeline.md` for the state machine.
See `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/orchestration/quality-gates.md` for gate criteria.

## Anti-Pattern Pool & Manifest

The pattern pool is catalogued at `${CLAUDE_PLUGIN_ROOT}/anti-patterns/manifest.json`. Each entry has a stable `id`, `categories`, `tags`, `severity_default`, `source_file`, `anchor`, `personas`, and `site_signals`. Critics read the manifest to look up where to find the rule for an ID, then read only the relevant section of the source file.

The pool is grouped into three base files plus a research-sourced directory:

| File | Patterns |
|---|---|
| `${CLAUDE_PLUGIN_ROOT}/anti-patterns/visual.md` | Gradient slop, nested card soup, Inter default, centered glowing hero, AI palettes, decorative shadows, fake dark mode, neon, stock icons |
| `${CLAUDE_PLUGIN_ROOT}/anti-patterns/copy.md` | Em-dashes, marketing verbs, hedging, filler, self-descriptors, passive voice, vague headlines, broken microcopy |
| `${CLAUDE_PLUGIN_ROOT}/anti-patterns/interaction.md` | Dishonest CTAs, loading as marketing, motivational empty states, bouncy interactions, modal fatigue, toast spam, dark patterns |
| `${CLAUDE_PLUGIN_ROOT}/anti-patterns/sourced-from-research/` | Filed by the research-scout agent. Each pattern requires 2+ independent complaints. |

Total: 69 anti-patterns across base and sourced files (manifest v1.1.0). The base files include community citations on each pattern. Add a new pattern by writing it into the source file and appending an entry to `manifest.json`.

## Persona System

| Persona | File | Register |
|---|---|---|
| Developer tool | `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/personas/developer-tool.md` | Restrained, dense, function-first |
| Consumer SaaS | `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/personas/consumer-saas.md` | Warm, spacious, approachable |
| Creative tool | `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/personas/creative-tool.md` | Bold, editorial, personality-forward |
| B2B enterprise | `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/personas/b2b-enterprise.md` | Conservative, trust-building, data-forward |
| E-commerce | `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/personas/e-commerce.md` | Product-first, conversion-focused |

## Sameness Score

Every audit and design workflow produces a sameness score (0-100) computed by the synthesizer from the four parallel critics' contributions.

| Score | Meaning |
|---|---|
| 0-20 | Distinctive. Clear decisions made. Ready to ship. |
| 21-40 | Has character. Some defaults showing but not dominant. |
| 41-60 | Generic. Could be any AI-generated SaaS site. |
| 61-80 | Default AI aesthetic. Multiple tool fingerprints present. |
| 81-100 | Template unmodified. The tool's defaults, shipped as-is. |

Gate threshold: **40** for kern-produced output, **60** for `/kern:audit` on external designs.

## Commands

| Command | Does |
|---|---|
| `/kern:design <desc>` | Full 6-phase pipeline via conductor |
| `/kern:plan <desc>` | Plan phase only (specs, no code) |
| `/kern:audit` | DRAW + parallel critic ensemble + synthesizer |
| `/kern:review` | Same as audit, broader scope (also runs copy-editor and accessibility) |
| `/kern:differentiate` | De-AI an existing design (subset weighted to tool-fingerprint patterns) |
| `/kern:compare` | Compare two designs |
| `/kern:polish` | Refine a component (critic + copy) |
| `/kern:copy` | Copy audit only |
| `/kern:research` | Scan communities for new patterns |
| `/kern:draw <desc>` | Run the anti-pattern-selector standalone (rotation verification) |

## State

Append-only audit log lives at `${CLAUDE_PLUGIN_ROOT}/state/draws.jsonl`. Every kern run appends one record before any other agent runs. See `${CLAUDE_PLUGIN_ROOT}/state/README.md` for the schema.

## Reference Files

| File | Purpose |
|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/fonts.md` | Font stacks with context |
| `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/tokens.md` | Spacing, radius, type scale, color philosophy |
| `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/exemplars.md` | Sites that get it right and why |
| `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/dribbble-refs.md` | Reference shots by category |
| `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/ai-fingerprints.md` | Tool-specific fingerprints (v0, Lovable, Bolt.new, Cursor) for `/kern:differentiate` |
| `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/orchestration/single-agent-workflow.md` | Simple non-conductor workflow for single-agent invocation |
| `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/orchestration/subagent-contract.md` | Protocol for external systems spawning kern as a subagent (used by app-factory) |
| `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/orchestration/differentiate-detailed.md` | Iter-evolved worked examples for v0/Lovable/Bolt.new/Cursor de-AI-ing |
| `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/orchestration/compare-detailed.md` | Iter-evolved compare workflow with vs-baseline mode |

## Tools

| File | Purpose |
|---|---|
| `${CLAUDE_PLUGIN_ROOT}/tools/render-check.sh` | Validate generated TSX compiles (Tailwind + Shadcn type shims) |
| `${CLAUDE_PLUGIN_ROOT}/tools/reproducibility-report.sh` | Windowed history of audit scores |
| `${CLAUDE_PLUGIN_ROOT}/tools/draw_simulator.py` | Reference Python implementation of anti-pattern-selector for deterministic rotation testing |

## Tests

| File | Purpose |
|---|---|
| `${CLAUDE_PLUGIN_ROOT}/tests/audit-fixtures/` | 12 .tsx fixtures with seeded violations + expected results |
| `${CLAUDE_PLUGIN_ROOT}/tests/run-audit-fixtures.sh` | Regression runner against expected results |
| `${CLAUDE_PLUGIN_ROOT}/tests/audit-agent.md` | Audit-fixture evaluator agent spec |
| `${CLAUDE_PLUGIN_ROOT}/tests/onboarding-test.md` | 5-minute onboarding test (verifies new contributors can run kern in under 5 min) |

## Voice

Kern talks dev-to-dev. No em-dashes. No marketing register. Short sentences. Specific recommendations over general observations.
