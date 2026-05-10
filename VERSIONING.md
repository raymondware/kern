# Kern Versioning Policy

Current version: **2.0.0**

## Scheme

`MAJOR.MINOR.PATCH`

## What triggers each level

### Patch (`2.0.x`) — backwards-compatible fixes
- Typo fixes in anti-pattern descriptions, persona files, or agent prompts
- Corrected exemplar URLs or company names
- Fixture updates (adding or fixing test cases, not changing thresholds)
- Minor wording improvements that don't change behavior

### Minor (`2.x.0`) — new capabilities, backwards-compatible
- A new anti-pattern added to any of the three anti-pattern files
- A new persona added to the persona registry
- A new agent added under `agents/`
- A new command added to `commands/`
- New exemplar references added to persona files (5 → 6+)
- New fingerprint patterns added to `references/ai-fingerprints.md`
- Edge case coverage added to `commands/design.md`
- New test fixtures added to `tests/audit-fixtures/`
- New tool added under `tools/`
- Scope boundary changes (`OUT_OF_SCOPE.md`)

### Major (`x.0.0`) — breaking changes
- Sameness Score rubric changes (indicators added or removed)
- Persona registry restructured (rename, merge, or split personas)
- Anti-pattern file format changes (frontmatter schema, severity scale)
- Agent contract changes (input/output format of any agent in `agents/`)
- Subagent invocation contract changes (`commands/design.md` "Invocation from subagent" section)
- Any change that would cause a previously-passing `run-audit-fixtures.sh` run to fail

## How to bump

1. Update the `version:` field in `SKILL.md` frontmatter.
2. Summarize the change in the commit message.
3. Tag the kern repo: `git tag kern-vMAJOR.MINOR.PATCH`.

No changelog file is required — the git log is authoritative.

## Notes

- Research-scout deposits in `anti-patterns/sourced-from-research/` do NOT trigger a version bump until the pattern is promoted to `visual.md`, `copy.md`, or `interaction.md`.
- Baseline score improvements in the Ralph loop are not versioned — they reflect validation harness outcomes, not the skill's public API.
