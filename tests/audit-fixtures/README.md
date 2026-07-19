# Kern Audit Fixtures

Regression test suite for `/kern audit`. Twelve TSX fixtures with seeded violations. Used to verify audit coverage against the 90% release threshold.

## How to run

### 1. View the test plan

```bash
bash tests/run-audit-fixtures.sh
```

Prints all fixtures with their expected violations and minimum hit requirements.

### 2. Run a fixture manually

```bash
bash tests/run-audit-fixtures.sh --fixture fx-01
```

Prints the fixture content and expected violations. Paste the TSX into a `/kern audit` session.

### 3. Record results

After running each fixture through `/kern audit`, record the violations kern flagged in `results.json`:

```json
{
  "fx-01": {
    "hits": ["gradient-slop", "centered-glowing-hero", "get-started-cta"],
    "notes": "missed gradient-text",
    "run_date": "2026-05-09"
  },
  "fx-02": {
    "hits": ["nested-card-soup", "drop-shadow-decoration"],
    "notes": "",
    "run_date": "2026-05-09"
  }
}
```

### 4. Compute hit rate

```bash
bash tests/run-audit-fixtures.sh --record
```

Reports pass/fail per fixture and overall hit rate. Release threshold: 90%.

## Fixture catalog

| ID | File | Violations seeded | Categories |
|----|------|------------------|------------|
| fx-01 | fx-01-gradient-hero.tsx | gradient-slop, centered-glowing-hero, gradient-text, get-started-cta | visual, copy |
| fx-02 | fx-02-nested-cards.tsx | nested-card-soup, drop-shadow-decoration | visual |
| fx-03 | fx-03-inter-default.tsx | inter-default, identical-three-card-grid | visual |
| fx-04 | fx-04-ai-palette.tsx | ai-palette, neon-without-context | visual |
| fx-05 | fx-05-marketing-verbs.tsx | marketing-verbs, self-descriptors | copy |
| fx-06 | fx-06-hedging-language.tsx | hedging-language, passive-voice-action-context | copy |
| fx-07 | fx-07-vague-headlines.tsx | vague-headlines, self-descriptors, filler-opener | copy |
| fx-08 | fx-08-empty-state-motivational.tsx | motivational-empty-state | interaction |
| fx-09 | fx-09-dishonest-cta.tsx | dishonest-cta, unnecessary-confirmation, generic-cta | interaction, copy |
| fx-10 | fx-10-toast-spam.tsx | toast-spam, loading-as-marketing | interaction |
| fx-11 | fx-11-pure-black-dark.tsx | pure-black-background, inverted-light-as-dark | visual |
| fx-12 | fx-12-combined-violations.tsx | gradient-slop, centered-glowing-hero, gradient-text, inter-default, marketing-verbs, hedging-language, vague-headlines, get-started-cta, motivational-empty-state | visual, copy, interaction |

## Adding fixtures

1. Create a TSX file in this directory with violations seeded as code comments at the top.
2. Add an entry to `manifest.json` with `expected_violations` and `min_expected_hits`.
3. Update the table above.

Never remove fixtures. The hit rate history depends on fixture ID stability.
