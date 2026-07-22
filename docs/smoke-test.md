# Kern smoke test and release evidence

This document defines the evidence Kern needs before a release tag or public launch claim. It is intentionally conservative: if a step has not been run, record it as missing instead of implying the plugin works.

## Install smoke

Use a fresh Claude Code session and the public marketplace path:

```text
/plugin marketplace add raymondware/kern
/plugin install kern@raymondware
```

After install, restart Claude Code and confirm the `/kern:*` commands are visible.

Record the transcript path, date, Claude Code version, repo commit, and any warnings in a future release note. Do not tag a release from install instructions alone.

## Minimal command smoke

Run these three commands in a disposable test project:

```text
/kern:draw dashboard for a developer observability tool
/kern:audit
/kern:plan pricing page for a developer API product
```

For `/kern:audit`, paste one fixture from `tests/audit-fixtures/`, then record whether Kern flagged the seeded violations. Save only compact evidence: command, fixture id, violations detected, known misses, date, and commit SHA.

## Fixture recording procedure

1. View the fixture plan:

```bash
bash tests/run-audit-fixtures.sh
```

2. Run each fixture manually through `/kern:audit`.
3. Update `tests/audit-fixtures/results.json` with the violations Kern actually flagged.
4. Compute the release hit rate:

```bash
bash tests/run-audit-fixtures.sh --record
```

The release threshold is 90 percent passing fixtures. Empty `hits` arrays mean manual audit evidence has not been recorded yet. Empty results must not be treated as product failure or release proof.

## Lightweight CI evidence

CI should check evidence shape, not pretend to run Claude Code:

- Parse plugin marketplace metadata and fixture manifests as JSON.
- Validate every fixture has a result slot with `hits`, `notes`, and `run_date` fields.
- Run `bash tests/run-audit-fixtures.sh` to prove the fixture plan renders.
- Do not require `--record` to pass until manual hits are populated.

## Release-ready gate

Before tagging `v1.0.0` as launch-ready, Kern needs:

- JSON and fixture-plan CI passing on `main`.
- A recorded plugin install smoke transcript from a fresh Claude Code session.
- Populated fixture results with at least 90 percent passing fixtures.
- One short before/after example showing `/kern:audit` findings and a differentiated output.
- A note that Kern is not an accessibility, performance, or design-system compliance tool.

## Current evidence status

As of 2026-07-21, this repository has valid plugin metadata, fixtures, and fixture-plan scripts. It does not yet contain populated manual fixture results, a release tag, or a plugin install smoke transcript.
