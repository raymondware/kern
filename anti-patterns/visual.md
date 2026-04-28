# Visual Anti-Patterns

Anti-patterns Kern flags in visual design. Each entry has: what it is, why it fails, and what to do instead.

---

## Gradient Slop

**What it is**: Multi-stop gradients on hero sections, cards, buttons, or backgrounds. Usually purple-to-pink or blue-to-teal. Often paired with a radial glow.

**Why it fails**: Gradients signal "AI made this" or "I found a Dribbble shot I couldn't quite pull off." They date a design faster than almost anything else. They fight readability. They look fine on a 14-inch MacBook and broken on everything else.

**Fix**: Use a single flat background color. If you need visual interest, use border, texture, or typography weight -- not color blending. If a gradient is genuinely right (data viz, a signal state), be deliberate: two stops maximum, same hue, vary lightness only.

```css
/* Not this */
background: linear-gradient(135deg, #6366f1, #ec4899);

/* This */
background: hsl(var(--background));
/* or */
background: hsl(240 5% 96%); /* zinc-100 equivalent */
```

---

## Nested Card Soup

**What it is**: Cards inside cards. An outer container with a border-radius and shadow, containing inner containers also with border-radius and shadow. Sometimes three levels deep.

**Why it fails**: Depth cues lose meaning when everything has depth. The user's eye has nowhere to land. Shadow-on-shadow reads as noise. This pattern often appears when developers use `<Card>` as a generic container rather than as a specific semantic element.

**Fix**: Pick one level of card depth per composition. If you need to group things inside a card, use spacing, dividers, or background color shifts (e.g., `bg-muted`) -- not another card. The Shadcn `Card` component is a layout primitive, not a wrapper you can nest freely.

---

## Pure Black and Pure White

**What it is**: `#000000` for dark mode backgrounds or `#ffffff` for light mode backgrounds.

**Why it fails**: Pure black backgrounds cause halation -- the text blooms against the extreme contrast and becomes harder to read. Pure white feels clinical and flat. Real surfaces have slight color temperature. Linear uses `#0f0f0f`. Vercel uses `#000` but pairs it with very specific typography weight choices most people don't replicate correctly.

**Fix**: Dark mode: use `zinc-950` (`#09090b`), `neutral-950` (`#0a0a0a`), or a custom near-black with slight warmth or cool. Light mode: `white` (`#fff`) is okay for content surfaces but `zinc-50` or `neutral-50` is better for page backgrounds.

```css
/* Dark mode base */
--background: 240 10% 3.9%;   /* zinc-950 equivalent */
--foreground: 0 0% 98%;

/* Light mode base */
--background: 0 0% 100%;       /* white -- fine for content */
--background: 240 4.8% 95.9%; /* zinc-100 -- better for page */
```

---

## Inter as the Default

**What it is**: Using Inter because it ships with Tailwind CSS typography or because it's "the developer font." Set it, forget it, never question it.

**Why it fails**: Inter is everywhere. It is a great font. It is also the signal that nobody made a font decision. In 2025, Inter is the Arial of the design era. Using it as a thoughtful choice is fine. Using it because it was already there is not.

**Fix**: See `references/fonts.md`. For a direct drop-in with similar metrics: Geist for a sharper, more technical feel. Figtree for a friendly sans. Space Grotesk for something with character. Any of these reads as a decision.

---

## The Centered Glowing Hero

**What it is**: A hero section with: centered text, a radial glow behind the headline (usually indigo or purple), and a "Get started" CTA. The headline is often in a larger-than-necessary gradient text. There are floating badge-style elements nearby.

**Why it fails**: This layout is the output of every AI design tool and most "SaaS landing page" templates from 2023-2025. It signals that no design decision was made. The glow specifically is a red flag -- it exists to add visual interest without requiring real typographic or layout skill.

**Fix**: Left-align. Remove the glow. Make the headline do the work with weight and size, not color effects. A strong headline over a flat background is harder to pull off and looks significantly better.

```tsx
// Not this
<section className="flex flex-col items-center text-center relative">
  <div className="absolute inset-0 bg-gradient-radial from-indigo-500/20 to-transparent" />
  <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
    Supercharge your workflow
  </h1>
</section>

// This
<section className="flex flex-col items-start">
  <h1 className="text-5xl font-semibold tracking-tight text-foreground">
    Build faster. Ship cleaner.
  </h1>
</section>
```

---

## Stock Icon Sets

**What it is**: Heroicons, Font Awesome, or especially any "flat icon" sets where all icons are the same visual weight and designed for many contexts. The icons look slightly off in every context.

**Why it fails**: Stock icons are designed to work everywhere, which means they're optimized for nowhere. They carry aesthetic baggage from their ecosystem. Lucide is the exception -- it's clean, consistent, and ships as individual tree-shakeable components. But even Lucide icons shouldn't be used at large sizes without adjustment.

**Fix**: Use Lucide for standard UI icons. For custom or brand icons, commission SVGs or use Radix Icons (sharp, minimal, designed for Radix UI contexts). Never use emoji as UI icons. At large display sizes (hero, feature sections), use SVG and adjust stroke-width.

---

## AI-Generated Palettes

**What it is**: Color palettes generated by AI tools or "palette generators" -- typically 5-6 colors that technically harmonize but feel like a random assortment. Often includes one accent color that is far too saturated.

**Why it fails**: AI palettes optimize for harmony across the full spectrum of the palette, not for the hierarchy your UI actually needs. You end up with colors that look good in a color grid and fight each other in a real layout. The saturated accent gets used everywhere because it's "the brand color" and reads as visual noise.

**Fix**: Pick one accent color and a neutral scale. Tailwind's gray scales (zinc, neutral, slate) are well-considered and battle-tested. For accent: one color, used sparingly for CTAs and key states only. Everything else is neutrals. If you need a secondary accent, make it a tint of the primary, not a different hue.

---

## Drop Shadows as Decoration

**What it is**: `box-shadow` applied to cards, images, buttons, or badges to make them feel "elevated" or "polished." The shadow is the same on every element regardless of whether elevation semantics apply.

**Why it fails**: Drop shadows communicate z-axis position. When every element has the same shadow, the shadow stops communicating and becomes noise. Heavy shadows on flat UI surfaces look outdated. A large card with `shadow-xl` on a white background reads as a 2015 Material Design attempt.

**Fix**: Use shadow only for genuinely elevated elements: dialogs, popovers, dropdown menus, floating action items. Cards on a page surface should use `border` instead. If you want visual separation, use `bg-muted` or a subtle border change -- not shadow.

```tsx
// Decorative shadow -- remove it
<div className="rounded-lg bg-card p-6 shadow-lg">

// Semantic shadow -- only on elevated/floating elements
<DropdownMenuContent className="shadow-md">
```

---

## Inverted Light Mode as Dark Mode

**What it is**: Taking a light mode design and setting `background: black` and `color: white` and calling it dark mode. No other adjustments. Sometimes the primary action button is still the same blue it was in light mode, now violently vibrating against the pure black.

**Why it fails**: Colors do not invert cleanly. Saturation that reads as subtle in light mode becomes aggressive in dark mode. Borders that were invisible on white backgrounds disappear on black. Typography spacing that felt generous on white feels cramped on dark. Real dark mode is a rethink, not a CSS variable swap.

**Fix**: Dark mode needs its own token values. At minimum: desaturate accents (a `blue-500` CTA in light mode should be `blue-400` in dark mode, not `blue-500`), reduce border contrast (dark mode borders at `border-zinc-800` instead of `border-zinc-200` equivalent), and reconsider elevation (shadows don't work in dark mode -- use glow or border instead).

---

## Neon Without Context

**What it is**: Using high-saturation neon colors (hot pink, electric blue, acid green) in a UI that is not explicitly a gaming, nightlife, or cyberpunk product.

**Why it fails**: Neon reads as a genre signal. On a SaaS dashboard or developer tool, it reads as a stylistic decision without commitment -- the designer wanted "personality" without doing the work of building a coherent visual system. Neon also fails accessibility at the WCAG contrast ratios most people assume it passes.

**Fix**: Muted, desaturated accents. If your brand is genuinely neon-coded (gaming, entertainment, a product that lives in dark contexts), commit fully: full dark background, considered neon palette, proper contrast testing. If it's not, use a muted teal or indigo and move on.
