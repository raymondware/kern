---
description: "Scan design communities for new AI anti-patterns. Files validated patterns as PRs."
allowed-tools: ["Read", "Write", "Bash", "Glob", "Grep", "WebSearch"]
---

# /research

Manually triggers the research-scout agent. Scans Reddit, HN, and X for new design complaints. Files validated patterns as PRs.

## How to Run

```
/research
```

With no argument: runs a general scan of all sources in `${CLAUDE_PLUGIN_ROOT}/research/sources.json`.

With a topic: runs a focused scan on that topic.

```
/research "loading states as marketing"
/research "bounce animations"
```

## What the Agent Does

See `${CLAUDE_PLUGIN_ROOT}/agents/research-scout.md` for the full agent definition.

Spawns the research-scout agent which:
1. Reads state files from `${CLAUDE_PLUGIN_ROOT}/research/`
2. Scans community sources for complaints about specific design patterns
3. Validates with 2+ independent sources
4. Files patterns to `${CLAUDE_PLUGIN_ROOT}/anti-patterns/sourced-from-research/`
5. Opens a PR for review (never auto-merges)
