# Font Strategy

## Why not Inter

Inter is technically excellent. That's why you should think twice before reaching for it.

Inter became the default "good font" for developer tools and SaaS products around 2020. By 2023 it was everywhere: dashboards, marketing sites, admin panels, landing pages. When every product uses the same typeface, the typeface signals nothing. Inter now reads as "I didn't choose a font; I picked the default."

If you're consciously choosing Inter because your product needs its extreme neutrality — high information density, complex tables, data-heavy UIs where the font should disappear — that's a defensible choice. But "it looked clean" is not a reason.

## Display fonts

**Geist Sans** (Vercel)
- Best for: developer tools, technical products, SaaS dashboards
- Tone: precise, modern, slightly technical
- Pairs with: Geist Mono (obvious choice), JetBrains Mono

**Space Grotesk** (Florian Karsten)
- Best for: early-stage products that need personality without being quirky
- Tone: distinctive without being loud, geometric with warmth
- Pairs with: Geist, system-ui for body, Inconsolata for mono
- Caution: spacing at small sizes needs tightening

**Söhne** (Klim Type Foundry, paid)
- Best for: products with a strong editorial point of view, premium tier signaling
- Tone: confident, opinionated, clearly chosen
- Pairs with: Söhne Mono (also from Klim), or any clean sans for body

**Fraunces** (Undercase Type)
- Best for: brand moments, editorial headers, consumer-facing products
- Tone: warm, optically-sensitive, ranges from authoritative to friendly
- Use case: display only, not body text

## Body fonts

**Geist** (Vercel)
- Good default for developer-tool body text when Geist Sans is display
- Reads cleanly at 14px-16px in dense UI

**Pretendard** (Kil Hyung-jin)
- Best for: products that need to work in Korean/CJK contexts
- Tone: clean, neutral, designed for multi-script
- Free

**Figtree** (Erik Kennedy)
- Good for: consumer-facing products that need warmth without going editorial
- Tone: approachable, round, not precious
- Free

## Monospace

**Geist Mono** (Vercel)
- First choice for developer tools already using Geist Sans
- Compact, clear at small sizes, well-hinted

**JetBrains Mono** (JetBrains)
- First choice for code editors, IDE-like UIs, terminal output
- Ligatures available if you want them; skip them if you don't
- Very readable at 13px

**iA Writer Quattro** (iA)
- Best for: writing-focused apps, document editors, anything prose-centric
- Pairs writing-focused proportions with monospace regularity

**Berkeley Mono** (Neil Panchal, paid)
- Best for: premium developer tools, CLI-adjacent UIs, products where the font itself is part of the identity
- Tone: sharp, elegant, clearly chosen

## Serifs (when called for)

**Newsreader** (Production Type)
- Best for: editorial content, documentation with long-form text, news or publishing products
- Readable at small sizes, distinct personality at display sizes

**IBM Plex Serif** (Bold from IBM)
- Best for: developer tools that want to mix a serif into headings without going precious
- Tone: technical but warm, pairs cleanly with IBM Plex Sans/Mono

## The avoid list

- **Inter** as a default (see above)
- **Roboto** — the Android system font, carries consumer mobile associations
- **Open Sans** — pleasant but signals nothing; the "safe" choice circa 2015
- **system-ui / -apple-system** as the only choice for marketing sites — fine for app UI, reads as undesigned for product pages
- **Nunito, Poppins, Raleway** — rounded/geometric fonts that peaked in their moment and now signal a specific era
- **Any Google Font picked by visual similarity to Helvetica** — if you want Helvetica, use Helvetica (or Neue Haas Grotesk)

## Pairing guidance

One display. One body. One mono. That's the complete type system.

```
Example: Developer tool
  Display: Geist Sans (600-700)
  Body: Geist (400-500)
  Mono: Geist Mono (400)
  Scale: xs 12/16 — sm 13/20 — base 14/22 — lg 16/24 — xl 20/28 — 2xl 24/32 — 3xl 30/36 — 4xl 36/40 — 5xl 48/48

Example: Editorial/marketing
  Display: Söhne (500-700)
  Body: Söhne Buch (400) or system-ui
  Mono: Berkeley Mono (400) for code samples
  Scale: same as above, looser tracking on display sizes

Example: Consumer product
  Display: Space Grotesk (500-700)
  Body: Figtree (400)
  Mono: JetBrains Mono
```

Weight discipline: pick two weights for body (regular + medium). Three weights max across the entire scale. Adding semibold, bold, and extrabold to everything flattens hierarchy.

Tracking: tighten display sizes (-0.02em to -0.04em for 2xl+). Leave body at 0. Never add positive tracking to lowercase body text — it reads as stretched, not airy.
