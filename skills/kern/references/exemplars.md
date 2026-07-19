# Design Exemplars

Sites that Kern uses as a reference point. Not aspirational mood-boarding -- these are specific, studied examples with concrete reasons for inclusion.

---

## linear.app

**Why**: Linear is the closest thing to a standard for "what developer tooling should look like." It is dense without being overwhelming. The typography is flat and sharp. The interactions are fast. Nothing bounces. There are no gradients on primary surfaces. The dark mode is actually a dark mode design, not inverted light mode.

**Specific things to study**:
- The sidebar navigation: it is just a list with correct spacing. No gradients, no active state animations.
- The issue list: tight, high-density, legible. Prioritizes data over whitespace theater.
- The command menu (cmd-K): the right amount of information at the right time.
- Status labels: muted, color-coded by semantic meaning, not by brand palette.

**What it avoids**: Everything in `${CLAUDE_PLUGIN_ROOT}/anti-patterns/visual.md`. Linear feels like it was built by engineers who also care about design, not by designers trying to impress other designers.

---

## vercel.com/design

**Why**: Vercel's design language treats dark backgrounds and sharp type as first principles. The website is a demonstration of what their platform enables. It is occasionally overwrought (they use gradients more than Kern would recommend) but the fundamentals -- spacing, typography, layout -- are consistently excellent.

**Specific things to study**:
- Font hierarchy: large/medium/small, heavy/light, with consistent vertical rhythm
- The spacing between the nav and the hero: generous without being wasteful
- How they use color: primarily for state and brand moments, not decoration
- Blog post typography: the article width is controlled, line length is right, type is legible

**What it does that others don't**: Makes bold typographic choices and commits to them.

---

## railway.app

**Why**: Railway does dark mode exceptionally. Their surfaces have temperature -- the near-black background is warm, not cold. Their accent colors (purple) are used sparingly and always with clear semantic meaning. The UI is developer-facing and reads as such without being hostile or cluttered.

**Specific things to study**:
- Dark mode color temperature: not zinc-950 by default, slightly warmer
- Accent color discipline: one purple, used for active states and primary CTAs only
- The deployment view: a technically complex state represented clearly
- Log output: monospace, correct contrast, readable at small sizes

**What it avoids**: The "just invert the colors" approach to dark mode.

---

## 37signals.com

**Why**: 37signals writes about design and builds products that embody what they write. Their products (Basecamp, HEY, Once) use whitespace deliberately, plain copy with strong opinions, and interaction patterns that respect the user's time.

**Specific things to study**:
- Copy: short sentences, direct, no hedging. Standard against which all product copy should be measured.
- The HEY email product: ruthlessly opinionated UI that knows what it is
- The marketing site: minimal, text-heavy, does not show feature grids with 47 items

**What it avoids**: Marketing-speak in product copy. Every call-to-action says exactly what it does.

---

## tailscale.com

**Why**: Technical product with a clear voice. The marketing site explains a genuinely complex product (VPN mesh networking) in plain language. The copy is direct, developer-facing, and confident. The visual design is minimal -- it does not try to make network architecture look exciting.

**Specific things to study**:
- The hero copy: explains what the product does, immediately
- Feature descriptions: specific, not category-level
- Illustrations: custom, minimal, technical. Not generic SaaS stock illustration.
- The pricing page: tables with real information, no asterisks obscuring limitations

**What it avoids**: Trying to make infrastructure feel "exciting" through visual noise.

---

## anthropic.com

**Why**: Strong typographic hierarchy on a neutral palette. The dark sections use deep navy rather than pure black. The copy is precise (writing about AI safety requires precision). The logo and branding system is restrained.

**Specific things to study**:
- The neutral-with-one-accent approach: off-white background, rust/orange accent used sparingly
- Research paper presentation: clear heading hierarchy, good reading width
- Section transitions: subtle, not gimmicky
- The Claude product pages: show capability through examples, not marketing language

**What it avoids**: The saturated, gradient-heavy visual language other AI companies use to signal "futurism."

---

## buttondown.email

**Why**: Buttondown is a developer-facing email newsletter tool with excellent product copy and a deliberately minimal UI. It is useful to study because it is small, indie, and has extremely high copy quality -- every label, tooltip, and empty state is well-considered.

**Specific things to study**:
- Empty states: show sample data where possible, clear action where not
- Error messages: specific, actionable. The error tells you what failed, not just that something did.
- The pricing page: plain tables, specific features, no "most popular" gimmicks
- The marketing site copy: first-person, specific, not corporate

**What it avoids**: The "big company speaking" register. Buttondown reads like a developer talking to another developer.
