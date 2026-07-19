---
description: "Run the anti-pattern selector standalone to verify the rotation rule and audit log."
allowed-tools: ["Read", "Write", "Bash", "Glob"]
---

# /kern:draw

Runs the anti-pattern-selector by itself, prints the drawn subset, and confirms the audit append. No design, no critique, no implementation. Use this to:

- Verify rotation works (run twice in a row, compare subsets)
- Inspect the audit log
- Sanity-check site-specific inclusions for a given input
- Debug why a recent kern run produced a generic critique (look at the draw)

## Usage

```
/kern:draw <description>
```

Optional flags (free-text, parsed by the selector):
- `--persona <persona>`
- `--surface <surface>`
- `--industry <industry>`
- `--audience <audience>`
- `--competitors <comma-separated list>`

## What It Does

1. Spawns the `anti-pattern-selector` agent with the parsed inputs.
2. The selector reads `${CLAUDE_PLUGIN_ROOT}/anti-patterns/manifest.json` and the last 5 lines of `${CLAUDE_PLUGIN_ROOT}/state/draws.jsonl`.
3. Computes the subset following the algorithm in `agents/anti-pattern-selector.md`.
4. Appends one JSON line to `state/draws.jsonl`.
5. Returns the audit_header markdown block.

## Output

The selector's standard audit_header block. See `agents/anti-pattern-selector.md` for the format.

## Verifying Rotation

Run the same description twice and confirm `Excluded this run (rotation rule)` is non-empty on the second run. If the two subsets are identical, that is a bug -- file an issue.

```
/kern:draw hero section for a Postgres branching tool
/kern:draw hero section for a Postgres branching tool
```

The second draw must differ from the first. Counts may overlap on tool-fingerprint patterns (those can repeat every 3 runs); structural patterns must rotate.
