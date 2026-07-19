# Kern Plugin - Contributor Guide

## What This Is

Kern is a Claude Code plugin that orchestrates specialist agents to produce high-quality UI designs. It catches AI-generated design defaults before they ship.

## Structure

```
kern/
├── .claude-plugin/     # Plugin manifest (plugin.json, marketplace.json)
├── agents/             # Flat directory, auto-discovered by Claude Code
├── commands/           # /kern:* slash commands
├── skills/kern/        # SKILL.md + reference files
├── anti-patterns/      # Base + research-sourced anti-pattern library
│   └── manifest.json   # Stable ID catalog read by the selector and critics
├── research/           # Research pipeline state files
└── state/              # Append-only audit log (state/draws.jsonl)
```

## Conventions

- All internal paths use `${CLAUDE_PLUGIN_ROOT}/` prefix
- Agents are flat in `agents/` (no subdirectories - breaks auto-discovery)
- Anti-patterns at repo root (not nested in skills/) because many agents read them
- Design specialists use Haiku (fast, cheap, constrained output)
- Implementation agents use Sonnet (code generation)
- Conductor, design critic, copy editor, and synthesizer use Opus 4.8 (complex reasoning, judgment, synthesis)
- Conductor never designs or implements - only coordinates

## Adding a New Agent

1. Create `agents/your-agent.md` with YAML frontmatter (name, model, description)
2. Reference files using `${CLAUDE_PLUGIN_ROOT}/path/to/file`
3. Define clear inputs, outputs, and constraints
4. If the agent participates in the pipeline, update `skills/kern/references/orchestration/pipeline.md`

## Adding a New Anti-Pattern

Community-sourced patterns go in `anti-patterns/sourced-from-research/` via the research-scout agent. Base patterns in `anti-patterns/visual.md`, `copy.md`, or `interaction.md` are manually curated.

## Adding a New Persona

Create a file in `skills/kern/references/personas/` following the existing format. Update `skills/kern/references/personas/README.md` and `skills/kern/SKILL.md`.

## Code Style

- No em-dashes in any content
- Dev-to-dev voice: specific, direct, no marketing register
- Conventional commits (feat:, fix:, docs:)
