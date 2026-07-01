# Kern Harness: Nonprofit style-match and brand evidence gates

## Mission

Improve Kern so it catches the failures exposed by the World Vision style-match exercise before final output.

The first World Vision pass looked polished, but it behaved like a Kern/SaaS case-study page instead of a donor-first nonprofit landing page. It lacked a real brand evidence gate, nonprofit persona, charity-copy scanner, screenshot visual QA, and style-match score.

## Branch and worktree

- Repo: `/Users/ottobot/clawd/worktrees/kern-nonprofit-style-match-harness`
- Branch: `feat/nonprofit-style-match-harness`
- Base: `origin/main`

## Hard rules

- Do not push to `main`.
- Do not edit the embedded Hermes skill snapshot. Work only in this repo/worktree.
- No official World Vision assets, scraping, or claims are needed for this implementation.
- No em-dashes in content.
- Keep Claude plugin conventions:
  - Agents are flat in `agents/`.
  - Internal paths use `${CLAUDE_PLUGIN_ROOT}/`.
  - Anti-patterns live at repo root.
  - Persona files live in `skills/kern/references/personas/`.

## Problem to fix

Kern currently has general AI-default defenses, but brand/style-match tasks can still pass with:

- Wrong persona for nonprofit/charity/donor contexts.
- Generic charity AI copy.
- SaaS feature-grid layouts applied to donation campaigns.
- Self-referential AI tooling explanation interrupting user-facing pages.
- Typography and spacing issues only visible in screenshots.
- Overclaiming “style match” without evidence or scoring.

## Required implementation

### 1. Add nonprofit-charity persona

Create `skills/kern/references/personas/nonprofit-charity.md`.

Include:

- Detection signals: nonprofit, charity, NGO, humanitarian, child sponsorship, disaster relief, donor, monthly giving, ministry, foundation, impact report, clean water, hunger, crisis response.
- Register: grounded, trustworthy, human, restrained.
- Design rules: mission-led editorial hierarchy, concrete donation module, stewardship near ask, human dignity, real imagery, restrained palette.
- Component prescriptions: donor landing page hero + giving module, impact/trust section, story block, accountability strip.
- Persona anti-patterns:
  - Emotional manipulation.
  - Generic “hope/change/empower” language without mechanism.
  - Fake or unsourced impact numbers.
  - SaaS feature grids for mission content.
  - Decorative stock photography without story/proof.
  - Donation CTA spam.
  - Self-referential design/tooling copy in donor flow.

Update:

- `skills/kern/references/personas/README.md`
- `skills/kern/SKILL.md`
- Any persona detection instructions in commands/agents that list the five personas.

### 2. Add brand evidence gate

Update orchestration docs and agent prompts so brand-match work requires:

- At least two official reference URLs/screenshots OR explicit fallback to “brand-informed draft”.
- Extracted evidence:
  - colors
  - typography
  - spacing rhythm
  - button treatment
  - card/form treatment
  - image treatment
  - section order/persuasion rhythm
  - voice and CTA patterns
- A clear list:
  - match
  - do not copy
  - unknowns/risks
- Claim calibration:
  - style-match
  - brand-informed
  - loose inspiration
  - rejected/mismatched

Update likely files:

- `skills/kern/references/orchestration/pipeline.md`
- `skills/kern/references/orchestration/quality-gates.md`
- relevant agents in `agents/`, especially conductor, design-researcher, critique-synthesizer, design-critic, hierarchy-critic, microcopy-critic.
- command docs for `/kern:design`, `/kern:audit`, `/kern:review` if applicable.

### 3. Add style-match score

Add a score separate from Sameness Score:

- Brand color fidelity: 15
- Typography fidelity: 20
- Layout and spacing rhythm: 20
- Component fidelity: 15
- Imagery and content treatment: 10
- Voice and CTA fidelity: 10
- Persona appropriateness: 10

Thresholds:

- 85+: style match
- 70-84: brand-informed
- 50-69: loose inspiration
- Below 50: mismatched or rejected

The synthesizer should calibrate final wording based on this score.

### 4. Add screenshot review gate

For brand-match or page-level work, docs/prompts should require:

- Desktop screenshot review.
- Mobile screenshot review.
- Typography critic questions.
- Spacing/density critic questions.
- Brand-match critic questions.
- Copy/claims critic questions.

If screenshots cannot be captured, output must say style-match scoring is incomplete.

### 5. Add charity copy anti-pattern coverage

Update `anti-patterns/copy.md` or add a sourced/base file if appropriate. The scanner/critics should flag:

- Transform lives.
- Make a difference today.
- Bring hope.
- Lasting change without mechanism.
- Together, we can.
- Empower communities.
- Every child deserves.
- Now more than ever.
- Generic donor journey language.
- Emotional copy without specific need/action.
- Unverified impact numbers.

Replacement pattern:

1. Specific need.
2. Specific donor action.
3. Specific support mechanism.
4. Stewardship or accountability cue.

### 6. Add test/fixture coverage where possible

Add or update audit fixtures so Kern has concrete failing examples for:

- Charity AI copy.
- Nonprofit page that incorrectly uses SaaS cards/tooling language.
- Style-match overclaim without evidence.

Update `tests/audit-fixtures/manifest.json` if needed.

## Acceptance criteria

- Nonprofit-charity persona exists and is referenced by README/SKILL docs.
- Brand evidence gate documented in pipeline and quality gates.
- Style-match score and thresholds documented in quality gates/synthesizer instructions.
- Screenshot review gate documented for brand-match/page-level work.
- Charity copy anti-patterns documented and connected to critic/audit behavior.
- At least one audit fixture covers charity/nonprofit AI-isms.
- Existing tests/scripts still pass or documented if unavailable.
- `git diff` shows focused changes only.

## Verification commands

Run what exists and report real output:

```bash
git status --short --branch
bash tests/run-audit-fixtures.sh
bash tools/reproducibility-report.sh || true
bash tools/render-check.sh || true
```

If a command fails due to missing runtime assumptions, capture the exact error and explain.

## Definition of done

- Changes implemented in the worktree.
- Verification attempted and real outputs captured.
- Commit created on `feat/nonprofit-style-match-harness` with conventional commit message.
- No push unless Ray asks.
