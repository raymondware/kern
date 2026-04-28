---
date: 2026-04-16
sources:
  - url: https://community.vercel.com/t/is-it-just-me-or-has-the-ui-quality-in-v0-gotten-worse/17893
    platform: community-forum
    votes_or_engagement: "multiple upvoted replies"
    quote: "purple gradient + Inter font + three feature boxes. screams AI-made"
  - url: https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p
    platform: blog
    votes_or_engagement: "widely shared"
    quote: "Indigo-500 buttons on every AI site. I recognize it instantly now"
additional_sources: 2
tools: ["v0", "lovable", "cursor", "bolt.new"]
---

# The v0 / Shadcn Default Aesthetic

**Pattern cluster**: Four specific defaults that ship with v0, Lovable, and Cursor because they mirror shadcn/ui and Tailwind out of the box. Individually minor. Together, they create a fingerprint that developers and designers recognize at a glance.

---

## Indigo-500 Everywhere

**Pattern**: Tailwind's `indigo-500` (`#6366f1`) used as primary accent for buttons, links, hover states, and focus rings. Not a deliberate brand choice. The default because it's the first color in Tailwind that "looks designed."

**Why it fails** (from community): "I can spot an AI-built site in two seconds. Indigo buttons. Every time." The pattern has become a genre marker. Using indigo-500 out of the box signals no color decision was made, the same way using Roboto in 2015 signaled no font decision.

**Fix**: Pick a primary color. Any color. Even a different shade in the blue-indigo family chosen deliberately reads differently. Override in `tailwind.config.ts`:

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
    },
  },
}
```

Then set `--primary` in your CSS to something that reflects the product. Anything but the default.

---

## Shadcn Button Defaults

**Pattern**: Primary buttons at exactly the shadcn default: solid background, `rounded-md` (6px radius), medium padding, `font-medium`. Secondary buttons as outlined variant with the same dimensions. Ghost buttons identical weight to text. No customization.

**Why it fails** (from community): "The button style immediately screams shadcn/ui. I've seen it on 50 different sites this month." Shadcn is a starting point, not a design system. The default button style was designed to be neutral enough to customize, not to ship as-is.

**Fix**: Override the `buttonVariants` in your component file. Minimum changes: adjust the radius to match your product's radius scale, define a primary color that reflects your brand, and consider whether medium font weight is right for your product's tone.

```tsx
// Before: default shadcn button
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium..."
)

// After: customized for product
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-sm text-sm font-semibold tracking-wide..."
  // sharper corners, heavier weight = more decisive, technical feel
  // or:
  // "...rounded-full text-sm font-medium..." = friendlier, consumer feel
)
```

---

## Excessive Border Radius

**Pattern**: `rounded-xl` (12px) or `rounded-2xl` (16px) applied uniformly to cards, buttons, input fields, images, and section backgrounds. Everything rounded to the same degree.

**Why it fails** (from community): "Everything is so rounded it looks like a children's app." Radius is a personality signal. Uniform high radius across all elements reads as a single default applied globally rather than a considered hierarchy. It also creates layout artifacts: highly rounded cards in a tight grid leave awkward gaps.

**Fix**: Define a radius scale and use it with intention.

| Element | Recommended radius |
|---|---|
| Page-level sections | 0 (no radius) |
| Cards on a surface | `rounded-lg` (8px) |
| Form inputs | `rounded-md` (6px) |
| Buttons | Match the product register: sharp (2-4px) for technical, round (6-8px) for friendly |
| Badges and pills | `rounded-full` is fine for these specifically |
| Dialogs/modals | `rounded-lg` or `rounded-xl` max |

The goal is hierarchy: some elements rounder, some sharper. Not everything at 16px.

---

## Shadcn Gray Defaults

**Pattern**: The default shadcn `slate` or `zinc` palette applied as-is: `slate-50` backgrounds, `slate-200` borders, `slate-700` secondary text, `slate-900` primary text. Technically correct. Distinctively generic.

**Why it fails** (from community): "Default gray cards with default gray text. No personality." The shadcn palette is calibrated for maximum neutrality so it works everywhere. That same calibration means it signals nothing about the product using it.

**Fix**: Either customize the gray scale using CSS variables, or introduce a slight tint to your neutrals (warm neutrals for consumer products, cool for technical products). Even `zinc` vs `slate` vs `stone` makes a visible difference at large text sizes.

```css
/* Slightly warm neutral -- reads less sterile than default zinc */
--background: 40 10% 97%;
--foreground: 25 10% 10%;
--border: 30 15% 88%;

/* Cool technical neutral */
--background: 220 14% 96%;
--foreground: 222 47% 11%;
--border: 214 32% 91%;
```

## Sources

- https://community.vercel.com/t/is-it-just-me-or-has-the-ui-quality-in-v0-gotten-worse/17893
- https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p
- https://www.925studios.co/blog/ai-slop-web-design-guide
- https://www.superblocks.com/blog/lovable-dev-review
