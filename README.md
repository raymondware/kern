# Kern

A Claude Code plugin that catches AI-generated design defaults before they ship.

Kern routes every design through a persona system, picks a varied subset of anti-patterns per run (so two runs never produce the same critique), scores output on a 0-100 sameness scale, and fixes copy, color, layout, and interaction before the code lands.

Built for Shadcn/Radix/Next.js stacks. Runs a team of specialist agents that plan, design, implement, and review collaboratively.

## The Problem

AI design tools (v0, Lovable, Bolt.new, Cursor Composer) converge on the same visual vocabulary. Purple/blue gradient, centered hero, Inter font, three identical feature cards, "Get Started" CTA. A developer tool and a consumer app look like the same product built on the same template.

Kern fixes this with persona-first generation and a sameness score that quantifies how close a design is to the AI default.

## Installation

Add the raymondware marketplace, then install Kern:

```
/plugin marketplace add raymondware/kern
/plugin install kern@raymondware
```

That's it. Restart Claude Code and the `/kern:*` commands are available.

## Quick Start

```bash
# Generate a component from scratch
/kern:design hero section for a CI/CD observability platform

# Audit existing code for AI-default patterns
/kern:audit
# (paste TSX when prompted)

# Make an existing design less AI-looking
/kern:differentiate

# Generate design specs without code
/kern:plan pricing page for a developer API product
```

## Commands

| Command | Does |
|---|---|
| `/kern:design <desc>` | Full pipeline: persona detection, specialists, implementation, review |
| `/kern:audit` | Anti-pattern scan with sameness score against existing code |
| `/kern:differentiate` | Identify which AI tool fingerprints are present and apply targeted fixes |
| `/kern:plan <desc>` | Design specs only (typography, color, layout, motion) -- no code |
| `/kern:review` | Full review pass: critic ensemble, copy editor, accessibility audit |
| `/kern:compare <a> <b>` | Side-by-side comparison with similarity score |
| `/kern:polish` | Rewrite a component against Kern's standards, show diff |
| `/kern:copy` | Microcopy audit: button labels, errors, empty states, CTAs |
| `/kern:research` | Scan design communities for new anti-patterns |
| `/kern:draw <desc>` | Run the anti-pattern selector standalone (rotation verification) |

## How It Works

### 1. Persona Detection

Kern picks a persona from your description, then loads that persona's rules for font, color, layout, and copy. Five personas:

| Persona | Register |
|---|---|
| `developer-tool` | Restrained, dense, function-first. Linear/Vercel register. |
| `consumer-saas` | Warm, spacious, approachable. Things 3 / Cron register. |
| `creative-tool` | Bold, editorial, personality-forward. Figma / iA Writer register. |
| `b2b-enterprise` | Conservative, trust-building, data-forward. Stripe / Ramp register. |
| `e-commerce` | Product-first, conversion-focused. Allbirds / Ridge register. |

### 2. Variation Rule

Every run picks a different subset of anti-patterns. Kern reads the audit log (`state/draws.jsonl`) and excludes the previous run's subset. Two runs on the same prompt produce different critiques. No template drift.

### 3. Anti-Pattern Selection

Each run draws 12-18 patterns from a pool of 69, weighted by surface (landing page, dashboard, pricing), persona, industry, and audience. The selection is logged to `state/draws.jsonl` before any agent runs.

### 4. Parallel Critics + Synthesizer

Four critics run in parallel (design, hierarchy, interaction, microcopy), plus a copy editor and accessibility auditor. The synthesizer merges their output, removes duplicates, and computes a consensus sameness score.

### 5. The Sameness Score

Every design gets a 0-100 score on AI-default similarity:

| Score | Meaning |
|---|---|
| 0-20 | Distinctive. Clear decisions made. Ship. |
| 21-40 | Has character. Some defaults showing. |
| 41-60 | Generic. Could be any AI-generated SaaS site. |
| 61-80 | Default AI aesthetic. Multiple tool fingerprints present. |
| 81-100 | Template unmodified. Do not ship. |

Gate threshold: **40** for Kern-produced output, **60** for external audits.

## Anti-Pattern Library

Kern ships with 69 anti-patterns across three base files and a research-sourced directory:

| File | Patterns |
|---|---|
| `anti-patterns/visual.md` | Gradient slop, nested card soup, Inter default, centered glowing hero, AI palettes, drop shadows, inverted dark mode, neon without context |
| `anti-patterns/copy.md` | Marketing verbs, hedging, filler openers, self-descriptors, em-dashes, passive voice, vague headlines, broken microcopy |
| `anti-patterns/interaction.md` | Dishonest CTAs, loading as marketing, motivational empty states, bouncy interactions, modal fatigue, toast spam, dark patterns |
| `anti-patterns/sourced-from-research/` | Community-sourced patterns with citations |

## Reference Files

| File | Purpose |
|---|---|
| `skills/kern/references/fonts.md` | Font stacks by context: display, body, mono, serif |
| `skills/kern/references/tokens.md` | Spacing, radius, type scale, color philosophy |
| `skills/kern/references/exemplars.md` | Sites that get it right and why |
| `skills/kern/references/dribbble-refs.md` | Reference shots by category |
| `skills/kern/references/ai-fingerprints.md` | Tool-specific fingerprints for `/kern:differentiate` |
| `skills/kern/references/personas/` | Five persona files with font, color, layout, copy rules |

## Agent Team

Kern runs a team of specialized agents:

### Design Specialists (Haiku)
`typography-specialist` `color-specialist` `layout-specialist` `motion-specialist`

### Development (Sonnet)
`component-architect` `component-implementer` `style-implementer` `accessibility-implementer`

### Critics (parallel ensemble)
`design-critic` `hierarchy-critic` `interaction-critic` `microcopy-critic` `copy-editor` `accessibility-auditor` `responsive-validator`

### Orchestration (Opus 4.8)
`conductor` `anti-pattern-selector` `critique-synthesizer`

## Contributing

See `CLAUDE.md` for the contributor guide. Agents live flat in `agents/`. Anti-patterns in `anti-patterns/`. Commands in `commands/`.

## License

MIT. See `LICENSE`.