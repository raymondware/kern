# What Kern Does NOT Cover

Kern is scoped to a specific problem: preventing AI-default-looking UI in developer-built components. It is not a general design system, accessibility checker, or performance tool.

This document exists so you don't assume coverage you don't have.

---

## Not Covered

### Accessibility (a11y)
Kern does not check WCAG compliance, color contrast ratios, focus order, ARIA attribute correctness, screen reader output, or keyboard navigation completeness. Kern will flag some anti-patterns that overlap with usability (e.g., dishonest CTAs, bounce animations), but these are aesthetic concerns, not a11y audits.

**Use instead:** axe-core, Lighthouse, Radix primitives (which bake in a11y), or `eslint-plugin-jsx-a11y`.

### Motion and Animation
Kern does not audit transitions, keyframe animations, reduced-motion handling, or animation timing. It doesn't produce animation specs, spring configs, or Framer Motion code (unless you explicitly include that in a `/kern design` brief).

**Use instead:** Design motion intent separately. The Radix primitive docs include reduced-motion guidance.

### Dark Mode Contrast
Kern will flag "inverted-light dark mode" as a visual anti-pattern (applying dark backgrounds with unmodified light-mode copy styles), but it does not compute contrast ratios or validate APCA scores in dark mode.

**Use instead:** Polypane or a contrast checker after generating.

### Design Systems and Token Governance
Kern has a reference tokens file (`references/tokens.md`) but does not enforce token usage, detect hardcoded colors, or validate that a component uses only in-system values. It does not read your `tailwind.config.ts` or your design token source.

**Use instead:** Token linting via Theo, Style Dictionary, or a custom ESLint rule.

### Responsive Layout
Kern generates components with mobile-first Tailwind classes as part of its TSX constraints, but it does not audit responsive breakpoints, test across viewports, or verify that your layout doesn't break at 375px. It treats responsive as your problem.

**Use instead:** Storybook viewport addon, Playwright visual tests, or Polypane.

### Performance
Kern does not audit bundle size, image optimization, lazy loading, render performance, or Core Web Vitals. It doesn't flag `useState` over-renders or suggest memoization.

**Use instead:** Lighthouse, Next.js Bundle Analyzer, or `why-did-you-render`.

### Icon and Illustration Choice
Kern flags stock-icon-as-decoration in `anti-patterns/visual.md` (when icons are used purely decoratively with no functional meaning), but it does not validate icon libraries, audit icon consistency, or produce illustration specs.

### Typography Hierarchy Depth
Kern provides font pairing guidance by persona, but it does not audit typographic hierarchy depth beyond flagging Inter-with-no-explicit-choice and AI-convergence fonts. Complex editorial hierarchies (6+ heading levels, prose rhythm) are not checked.

### Content Strategy
Kern audits microcopy anti-patterns (em-dashes, marketing verbs, generic CTAs), but it does not produce content strategy, information architecture, or navigation structure recommendations.

### Backend, APIs, and State
Kern is a UI layer concern. It generates TSX, audits components, and rewrites copy. It does not generate data fetching code, API routes, server actions, or state management outside of what's needed to make a component self-contained.

---

## Scope Clarification: What "/kern audit" Actually Checks

The audit command scans against three specific files:
- `anti-patterns/visual.md`: 10 named visual convergence patterns
- `anti-patterns/copy.md`: microcopy and marketing-register failures
- `anti-patterns/interaction.md`: dishonest CTAs, dark patterns, loading theater

It does NOT catch: everything that could be wrong with a UI. It catches things in those files specifically.

The release threshold for the fixture regression suite is 90% hit rate on seeded known violations. At 90%, ~10% of known patterns may be missed per run. That is the declared tolerance.

---

## Scope Clarification: Sameness Score

The Sameness Score (0-10) is a structural count of indicators from a fixed list of 10 AI-default signals. It is not:
- A design quality score
- A user satisfaction predictor
- A market differentiation score

A score of 0 means the design avoids those 10 specific indicators. It does not mean the design is good.

---

## In Scope (for completeness)

- Visual anti-pattern detection in TSX/HTML/CSS
- Microcopy and marketing-register audits
- Interaction pattern anti-pattern detection
- Sameness Score (0-10, 10 indicators)
- Persona-first design generation (5 personas)
- AI tool fingerprint identification and removal (v0, Lovable, Bolt.new, Cursor Composer)
- Cross-persona divergence measurement
- TSX compilability constraints (Tailwind v4 + Shadcn imports)
