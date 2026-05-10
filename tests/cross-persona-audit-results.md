---
generated: 2026-05-09
iter: 48
---

## Cross-Persona Audit

### Signal Extraction Table

| Dimension     | DT                  | CS                  | CT                  | BE                  | EC                  |
|---------------|---------------------|---------------------|---------------------|---------------------|---------------------|
| Layout Anchor | `left-dense`        | `card-flow`         | `canvas-first`      | `table-workflow`    | `product-hero`      |
| Mode Default  | `dark`              | `light-with-dark`   | `neutral`           | `light`             | `light`             |
| Font Category | `mono-adjacent`     | `warm-rounded`      | `bespoke-brand`     | `corporate-neutral` | `display-brand`     |
| Density       | `high`              | `comfortable`       | `minimal-chrome`    | `high`              | `product-forward`   |
| CTA Register  | `specific-action`   | `personal-motivating` | `keyboard-shortcut` | `formal-action`   | `purchase-intent`   |
| Color Stance  | `muted-single-accent` | `warm-accent`     | `expressive`        | `blue-convention`   | `brand-derived`     |

**Extraction notes:**
- **DT Layout:** Left-aligned data tables and sidebar+main are explicit; `left-dense` is unambiguous.
- **DT Mode:** "Default to dark" — unambiguous.
- **CS Mode:** "Light mode default with a well-designed dark option" — maps to `light-with-dark`, not `light`.
- **CT Mode:** File explicitly warns against defaulting to dark ("do not default to dark just because 'creative tool'"), cites both light and dark exemplars (iA Writer, Craft = light; Figma = neutral). Assigned `neutral` — the canvas/output sets the tone.
- **CT Font:** Explicitly position-dependent and character-driven; file says "avoid Inter (too neutral for a category that values aesthetic signal)" and specifies Söhne, GT Walsheim, or bespoke choices. Mapped to `bespoke-brand`.
- **CT CTA:** "Keyboard-first. Creative professionals live on keyboard shortcuts." Empty-state signature uses `N · new illustration` keyboard label as the primary affordance. Mapped to `keyboard-shortcut`.
- **BE Density:** "Enterprise tools are information-dense by nature — fighting this with large type creates worse outcomes." 13-14px. Matches `high`.
- **DT Density:** "13-14px for data rows." Matches `high`. DT and BE share this signal; this is the one shared dimension.
- **EC Font:** "Display/headline: This is where brand identity lives." Serif display or distinctive sans; explicitly brand-owned, not generic. Mapped to `display-brand`.
- **BE vs EC Mode:** Both `light` — one shared dimension in that pair.

---

### Pairwise Divergence Matrix

| Pair     | Layout | Mode | Font | Density | CTA  | Color | Overlap | Rating   |
|----------|--------|------|------|---------|------|-------|---------|----------|
| DT vs CS | diff   | diff | diff | diff    | diff | diff  | 0/6     | Distinct |
| DT vs CT | diff   | diff | diff | diff    | diff | diff  | 0/6     | Distinct |
| DT vs BE | diff   | diff | diff | same    | diff | diff  | 1/6     | Distinct |
| DT vs EC | diff   | diff | diff | diff    | diff | diff  | 0/6     | Distinct |
| CS vs CT | diff   | diff | diff | diff    | diff | diff  | 0/6     | Distinct |
| CS vs BE | diff   | diff | diff | diff    | diff | diff  | 0/6     | Distinct |
| CS vs EC | diff   | diff | diff | diff    | diff | diff  | 0/6     | Distinct |
| CT vs BE | diff   | diff | diff | diff    | diff | diff  | 0/6     | Distinct |
| CT vs EC | diff   | diff | diff | diff    | diff | diff  | 0/6     | Distinct |
| BE vs EC | diff   | same | diff | diff    | diff | diff  | 1/6     | Distinct |

---

### At-Risk Pairs

No at-risk pairs. All personas are structurally distinct on 4+ of 6 dimensions.

The two pairs with a single shared dimension:

- **DT vs BE** — shared `high` density. Both use 13-14px data rows. Not a structural risk: DT defaults dark with mono type and muted cool accent; BE defaults light with Inter and institutional blue. The visual output will be distinctly different despite similar row density.
- **BE vs EC** — shared `light` mode default. Not a structural risk: layout, font, density, CTA, and color are all divergent. BE produces a data-table-driven office product; EC produces a brand-forward, photography-led storefront.

---

### Verdict

PASS — All pairs have overlap < 3/6. Personas are defined with sufficient structural divergence.

The matrix is notably clean: 8 of 10 pairs share zero dimensions. The two pairs with 1/6 overlap (DT/BE on density, BE/EC on mode) involve dimensions that are not the primary structural driver — the divergence on layout, font, CTA, and color stance is more than sufficient to produce visually distinct output in each case.
