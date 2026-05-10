# kern onboarding test — 7-minute exercise

Verifies a fresh dev can use kern for design, audit, polish, and compare without prior context.

**Target time:** < 7 minutes end-to-end.
**What's being tested:** SKILL.md is clear enough to start without reading source files.

---

## Prerequisites (< 30 seconds)

1. You are inside a Claude Code session (terminal or IDE extension).
2. The kern skill is installed: `ls ${CLAUDE_PLUGIN_ROOT}/SKILL.md` should exist.
3. No prior kern knowledge required.

---

## Exercise 1 — Generate a component (< 2 min)

Run this command in Claude Code:

```
/kern design  pricing card for a B2B contract management SaaS
```

**Expected:** Claude detects the `b2b-enterprise` persona, loads references, generates a TSX pricing card component, runs a design-critic check, and presents a Sameness Score.

**Pass criteria:**
- [ ] Persona is detected (should be `b2b-enterprise`)
- [ ] TSX component is produced (not a mockup description)
- [ ] Sameness Score is reported (0-10)
- [ ] Score is ≤ 6 (not flagged for differentiation)

---

## Exercise 2 — Audit existing code (< 2 min)

Copy this minimal TSX snippet into a file (`/tmp/test-card.tsx`), then audit it:

```tsx
export function PricingCard() {
  return (
    <div className="rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-8 text-center shadow-lg">
      <h2 className="text-3xl font-bold text-white">Get Started</h2>
      <p className="mt-2 text-white/70">Everything you need to supercharge your workflow</p>
      <button className="mt-6 rounded-full bg-white px-8 py-3 font-semibold text-purple-600">
        Get Started Free
      </button>
    </div>
  )
}
```

Run:
```
/kern audit /tmp/test-card.tsx
```

**Pass criteria:**
- [ ] At least 3 violations are flagged (gradient-slop, centered-glowing-hero, marketing-verbs, get-started-cta, vague-headlines are all present)
- [ ] Violations include severity labels
- [ ] Output suggests fixes, not just flags issues

---

## Exercise 3 — Interpret the output (< 30 seconds)

After the audit, answer these without looking at source files:

1. What Sameness Score would you expect for this card? (answer: 7-8)
2. Which anti-pattern file covers "gradient-slop"? (answer: `anti-patterns/visual.md`)
3. What command would you run to fix the design? (answer: `/kern differentiate` or `/kern polish`)

---

## Exercise 4 — Polish with persona detection (< 1 min)

Copy this TSX snippet (it signals b2b-enterprise: table, checkbox column, status badges):

```tsx
export function ContractRow() {
  return (
    <tr className="border-b px-6 py-4 text-sm">
      <td><input type="checkbox" /></td>
      <td>Master Services Agreement</td>
      <td><span className="rounded-full bg-green-100 px-2 py-1 text-green-700">Active</span></td>
      <td>2024-03-15</td>
    </tr>
  )
}
```

Run:
```
/kern polish
```
(then paste the snippet)

**Pass criteria:**
- [ ] Output starts with `Persona: b2b-enterprise (confidence: high|medium)`
- [ ] At least one change is proposed (tabular-nums on date, compact row padding, or status badge shape+label fix)
- [ ] Diff format shown (before → after)

---

## Exercise 5 — Compare against AI baseline (< 1 min)

Run:
```
/kern compare --vs-baseline
```
(paste the PricingCard TSX from Exercise 2)

**Pass criteria:**
- [ ] Output includes "## AI Baseline Comparison" section header
- [ ] At least 2 "Matches AI Default" patterns are listed (gradient, centered layout, "Get Started" CTA)
- [ ] Sameness Score is reported

---

## Pass/Fail

**PASS:** All pass criteria met, total time ≤ 7 minutes.
**FAIL:** Any criterion missed, OR time > 7 minutes (SKILL.md needs clarification).

If fail: note which exercise failed and open a PLAN.md item targeting that specific gap.
