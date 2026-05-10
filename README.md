# Kern v2

A design quality skill for developers. Kern solves the "everything I generate looks the same" problem by routing through product personas before generating, and provides tools to detect and fix AI-default design patterns.

## The Core Problem

AI design tools (v0, Lovable, Bolt.new, Cursor Composer) produce designs that converge on the same visual vocabulary: purple/blue gradient, centered hero, Inter font, identical 3-column feature grid, "Get Started" CTA. A developer tool and a consumer app look like the same product built on the same template.

Kern fixes this with persona-first generation and a Sameness Score that quantifies AI-default-ness.

## Quickstart

```
/kern design hero section for a CI/CD dashboard
```

Kern will detect the persona (developer-tool), load the appropriate references, make differentiation decisions explicit, generate, score the output, fix the copy, and present.

## All Commands

Main entry point: `/kern design [description]` — full persona-first generation workflow.

Full command reference and agent roster: see [SKILL.md](SKILL.md).

## Personas

Kern branches design decisions by persona. Use `/kern design` and it detects automatically, or confirm manually.

- `developer-tool` -- Dense, dark, keyboard-first. Linear/Vercel register.
- `consumer-saas` -- Approachable, light, progressive disclosure. Things 3 / Cron register.
- `creative-tool` -- Chrome-minimal, canvas-first. Figma / iA Writer register.
- `b2b-enterprise` -- Formal, data-dense, tabular. Stripe / Ramp register.
- `e-commerce` -- Product-first, trust-driven, mobile-optimized. Allbirds / Ridge register.

Full files in `references/personas/`.

## The Sameness Score

Every design output gets scored 0-10 on AI-default similarity. Score of 7+ = do not ship. Run `/kern differentiate`. Score of 4 or below = intentional decisions deviate from AI defaults.

Scoring indicators (10 total): see [SKILL.md § The Sameness Score](SKILL.md#the-sameness-score).

## Anti-Pattern Library

Three compiled files plus community research in `anti-patterns/`. What each catches: see [SKILL.md § Anti-Pattern Library](SKILL.md#anti-pattern-library).

## Research Harness

`/kern research` mines Reddit/HN/X for new anti-patterns. Config: `research/sources.json`. Full details: [SKILL.md § Research Harness](SKILL.md#research-harness).

## Reference Library

- `references/fonts.md` -- Font choices by context: display, body, mono, serif, with avoid list
- `references/tokens.md` -- Tailwind-compatible spacing, radius, type scale, color philosophy
- `references/exemplars.md` -- Linear, Vercel, Railway, 37signals, Tailscale, Anthropic, Buttondown with specific annotations
- `references/dribbble-refs.md` -- Reference shots by category with technique extraction notes
- `references/personas/` -- Five persona files with font, color, layout, exemplars, anti-patterns
