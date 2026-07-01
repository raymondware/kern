# Coding agent prompt: improve Kern nonprofit style-match harness

You are working in `/Users/ottobot/clawd/worktrees/kern-nonprofit-style-match-harness` on branch `feat/nonprofit-style-match-harness`.

Read first:

- `CLAUDE.md`
- `docs/agent-harness/worldvision-nonprofit-style-match-harness.md`
- `skills/kern/references/orchestration/pipeline.md`
- `skills/kern/references/orchestration/quality-gates.md`
- `skills/kern/references/personas/README.md`
- `skills/kern/SKILL.md`

Goal:

Implement the harness improvements from the brief. This is not a prototype. This is not a PoC. This is not an MVP. This application and its tech stack needs to be production ready. We are planning to deploy to Vercel.

Do not push. Commit locally only when verification is complete.

Required changes:

1. Add `nonprofit-charity` persona and wire it into persona docs/SKILL detection.
2. Add brand evidence gate documentation and agent prompt instructions.
3. Add style-match score rubric and claim calibration.
4. Add screenshot visual QA gate for brand-match/page-level work.
5. Add charity copy anti-pattern coverage.
6. Add at least one audit fixture for charity/nonprofit AI-isms.
7. Run available verification commands and capture results.
8. Commit with a conventional commit message.

Important design intent:

The World Vision failure was not just bad copy. It exposed that Kern can produce polished but wrong category output if the persona, brand evidence, screenshot review, and claim calibration gates are missing. Fix the process so future brand-match work cannot overclaim fidelity or ship obvious spacing/typography issues without review.

Return a final summary containing:

- Files changed.
- Key behavior/documentation changes.
- Tests/commands run with exact results.
- Commit SHA.
- Any known limitations.
