---
name: kern
description: Multi-agent design quality harness for dev-built UIs. Orchestrates specialist agents for typography, color, layout, copy, and accessibility through a 5-phase pipeline (plan, interview, design, develop, review). Audits visual, copy, and interaction anti-patterns. Persona system (developer tool, consumer SaaS, creative tool, B2B enterprise, e-commerce). Sameness score catches AI defaults. Research-backed pattern library sourced from v0, Lovable, Bolt.new, and Cursor criticism. Built for Shadcn/Radix/Next.js stacks.
---

# Kern v3

Multi-agent design harness for developers who care about craft. Named after kerning - the small adjustments that make type feel right. Kern orchestrates specialist agents to find and fix the small adjustments that make UIs feel right.

## The Core Problem

Every AI-generated UI looks the same. Indigo-500 buttons. Centered hero with a radial glow. Three feature cards. Inter font. Starter/Pro/Business pricing. FAQ accordion.

Kern's job is to catch these defaults before they ship, using a team of specialized agents that plan, design, implement, and review collaboratively.

## Agent Team

### Orchestration
| Agent | Model | Role |
|---|---|---|
| `conductor` | Sonnet | Pipeline orchestrator. Manages state, spawns specialists, enforces quality gates. |

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

### Review (produce reports)
| Agent | Model | Role |
|---|---|---|
| `design-critic` | Sonnet | Anti-pattern detection + sameness scoring |
| `copy-editor` | Sonnet | Voice/tone rewriting per persona |
| `accessibility-auditor` | Haiku | WCAG 2.1 AA compliance |
| `responsive-validator` | Haiku | Cross-breakpoint layout validation |

### Research
| Agent | Model | Role |
|---|---|---|
| `design-researcher` | Haiku | Reference site finder |
| `research-scout` | Sonnet | Community pattern scanner |

## Pipeline

The `/kern:design` command runs the full 5-phase pipeline via the conductor agent:

1. **PLAN**: Persona detection -> reference research -> parallel specialists (typography, color, layout, motion) -> component architect
2. **INTERVIEW** (conditional): Targeted questions if specs have gaps
3. **DEVELOP**: Style implementer -> component implementer -> accessibility implementer
4. **REVIEW**: Parallel critics (design, copy, accessibility). Targeted rework if needed (max 2 cycles).
5. **PRESENT**: Final code + design report + sameness score

See `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/orchestration/pipeline.md` for the state machine.
See `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/orchestration/quality-gates.md` for gate criteria.

## Persona System

| Persona | File | Register |
|---|---|---|
| Developer tool | `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/personas/developer-tool.md` | Restrained, dense, function-first |
| Consumer SaaS | `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/personas/consumer-saas.md` | Warm, spacious, approachable |
| Creative tool | `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/personas/creative-tool.md` | Bold, editorial, personality-forward |
| B2B enterprise | `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/personas/b2b-enterprise.md` | Conservative, trust-building, data-forward |
| E-commerce | `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/personas/e-commerce.md` | Product-first, conversion-focused |

## Anti-Pattern Library

### Base Patterns
| File | Patterns |
|---|---|
| `${CLAUDE_PLUGIN_ROOT}/anti-patterns/visual.md` | Gradient slop, nested card soup, Inter default, centered glowing hero, AI palettes, decorative shadows, fake dark mode, neon, stock icons |
| `${CLAUDE_PLUGIN_ROOT}/anti-patterns/copy.md` | Em-dashes, marketing verbs, hedging, filler, self-descriptors, passive voice, vague headlines, broken microcopy |
| `${CLAUDE_PLUGIN_ROOT}/anti-patterns/interaction.md` | Dishonest CTAs, loading as marketing, motivational empty states, bouncy interactions, modal fatigue, toast spam, dark patterns |

### Sourced From Research
Filed by the research-scout agent. Each pattern requires 2+ independent complaints. See `${CLAUDE_PLUGIN_ROOT}/anti-patterns/sourced-from-research/`.

Total: 50+ anti-patterns across base and sourced files.

## Sameness Score

Every audit and design workflow produces a sameness score (0-100).

| Score | Meaning |
|---|---|
| 0-20 | Distinctive. Clear decisions made. Ready to ship. |
| 21-40 | Has character. Some defaults showing but not dominant. |
| 41-60 | Generic. Could be any AI-generated SaaS site. |
| 61-80 | Default AI aesthetic. Multiple tool fingerprints present. |
| 81-100 | Template unmodified. The tool's defaults, shipped as-is. |

## Commands

| Command | Does |
|---|---|
| `/kern:design <desc>` | Full 5-phase pipeline via conductor |
| `/kern:plan <desc>` | Plan phase only (specs, no code) |
| `/kern:audit` | Anti-pattern scan + sameness score |
| `/kern:review` | Full review without generation |
| `/kern:differentiate` | De-AI an existing design |
| `/kern:compare` | Compare two designs |
| `/kern:polish` | Refine a component (critic + copy) |
| `/kern:copy` | Copy audit only |
| `/kern:research` | Scan communities for new patterns |

## Reference Files

| File | Purpose |
|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/fonts.md` | Font stacks with context |
| `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/tokens.md` | Spacing, radius, type scale, color philosophy |
| `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/exemplars.md` | Sites that get it right and why |
| `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/dribbble-refs.md` | Reference shots by category |

## Voice

Kern talks dev-to-dev. No em-dashes. No marketing register. Short sentences. Specific recommendations over general observations.
