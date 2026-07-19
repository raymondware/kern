# Design Tokens

## Spacing scale

Tailwind-compatible 4px base unit. Use these values; do not invent arbitrary spacing.

| Token   | px  | Tailwind |
|---------|-----|----------|
| space-1 | 4   | p-1      |
| space-2 | 8   | p-2      |
| space-3 | 12  | p-3      |
| space-4 | 16  | p-4      |
| space-6 | 24  | p-6      |
| space-8 | 32  | p-8      |
| space-12 | 48 | p-12     |
| space-16 | 64 | p-16     |
| space-24 | 96 | p-24     |
| space-32 | 128 | p-32    |

Adjacent elements in a list: space-2 (8px).
Sections within a component: space-4 to space-6 (16-24px).
Between major page sections: space-12 to space-24 (48-96px).

Do not use space-5, space-7, space-9, space-10, space-11, etc. They break the rhythm.

## Border radius scale

| Token   | px  | Tailwind    | Use for                          |
|---------|-----|-------------|----------------------------------|
| radius-sm | 4 | rounded     | Tags, chips, badges              |
| radius-md | 8 | rounded-md  | Inputs, buttons                  |
| radius-lg | 12 | rounded-lg  | Cards, panels                    |
| radius-xl | 16 | rounded-xl  | Modals, sheets                   |
| radius-2xl | 24 | rounded-2xl | Feature sections (use sparingly) |
| radius-full | 9999 | rounded-full | Pills, avatars, toggles      |

Pick one radius size for cards and stick to it. Mixing radius-lg on some cards and radius-xl on others within the same product creates noise.

## Typography scale

| Token | Size  | Line height | Tailwind       | Use for                                  |
|-------|-------|-------------|----------------|------------------------------------------|
| text-xs | 12px | 16px (1.33) | text-xs        | Timestamps, metadata, legal              |
| text-sm | 13px | 20px (1.54) | text-sm        | Labels, secondary content, table cells   |
| text-base | 14px | 22px (1.57) | text-base    | Body, form fields, descriptions          |
| text-lg | 16px | 24px (1.5) | text-lg         | Subheadings, emphasized body             |
| text-xl | 20px | 28px (1.4) | text-xl         | Section titles                           |
| text-2xl | 24px | 32px (1.33) | text-2xl      | Page titles, major headings              |
| text-3xl | 30px | 36px (1.2) | text-3xl       | Feature headings                         |
| text-4xl | 36px | 40px (1.11) | text-4xl      | Hero headings (with restraint)           |
| text-5xl | 48px | 48px (1.0) | text-5xl       | Display — hero only, one per page max    |

Body text lives at text-base (14px) for dense developer UIs, text-lg (16px) for consumer-facing products.

Weight discipline:
- `font-normal` (400): body text, descriptions
- `font-medium` (500): labels, navigation, UI chrome
- `font-semibold` (600): headings, emphasized items, active states
- `font-bold` (700): reserved for numbers/metrics that need to pop, not for headings

## Color philosophy

**Start from context, not from trends.**

Pick the primary hue from the product's content domain or brand. If the product is about code, the palette can borrow from terminal conventions. If it's finance, lean cool. If it's creative tools, you have more latitude.

**oklch is your friend.** Use oklch for all color definitions. It maintains perceptual consistency across lightness levels that hex values do not.

**One accent. Tint the neutrals.**

```css
/* Bad: accent + neutrals with no relationship */
:root {
  --accent: oklch(62% 0.14 185);  /* teal */
  --surface: oklch(14% 0.00 0);   /* pure gray, disconnected */
}

/* Good: neutrals tinted toward the brand hue */
:root {
  --accent: oklch(62% 0.14 185);  /* teal */
  --surface: oklch(14% 0.008 185); /* near-black, slightly teal-tinted */
  --border: oklch(22% 0.01 185);  /* consistent tint, low chroma */
}
```

**Dark mode is its own palette, not an inversion.** See `${CLAUDE_PLUGIN_ROOT}/anti-patterns/visual.md`.

**Semantic color roles:**

```css
:root {
  /* Backgrounds */
  --bg-base: oklch(9% 0.008 220);     /* page background */
  --bg-surface: oklch(13% 0.008 220); /* card, panel backgrounds */
  --bg-elevated: oklch(17% 0.008 220); /* hover states, active rows */

  /* Borders */
  --border-subtle: oklch(20% 0.01 220);  /* dividers, outlines */
  --border-default: oklch(26% 0.01 220); /* card borders */
  --border-strong: oklch(35% 0.01 220);  /* focused inputs */

  /* Text */
  --text-primary: oklch(93% 0.005 220);  /* headings, primary content */
  --text-secondary: oklch(62% 0.015 220); /* secondary content, labels */
  --text-tertiary: oklch(45% 0.012 220);  /* placeholders, disabled */

  /* Accent */
  --accent: oklch(62% 0.14 185);         /* interactive elements, links */
  --accent-hover: oklch(67% 0.14 185);   /* hover state */
  --accent-muted: oklch(62% 0.04 185);   /* tinted backgrounds */

  /* Semantic status */
  --status-error: oklch(55% 0.18 25);    /* errors */
  --status-warning: oklch(70% 0.15 60);  /* warnings */
  --status-success: oklch(65% 0.16 150); /* success */
  --status-info: oklch(62% 0.14 220);    /* informational */
}
```

## Shadow tokens

One scale. Use the smallest shadow that communicates the elevation correctly.

```css
:root {
  /* For: tooltips, dropdowns, popovers — floating above page */
  --shadow-float: 0 4px 16px rgba(0, 0, 0, 0.32);

  /* For: modals, dialogs — significantly elevated */
  --shadow-modal: 0 8px 32px rgba(0, 0, 0, 0.48);

  /* For: dragged items — explicitly elevated by user action */
  --shadow-drag: 0 12px 48px rgba(0, 0, 0, 0.56);
}
```

Cards and panels use borders, not shadows. See `${CLAUDE_PLUGIN_ROOT}/anti-patterns/visual.md`.

## Token override examples

These are starting points, not rules. Every product should override these to match its context.

```css
/* ScrumDeck: planning poker / agile tooling */
:root {
  --hue: 185;       /* teal */
  --chroma-low: 0.008;
  --chroma-accent: 0.14;
  /* ... fill out from semantic roles above */
}

/* Editorial product: documentation or publishing */
:root {
  --hue: 230;       /* cooler blue-gray */
  --chroma-low: 0.006;
  --chroma-accent: 0.12;
  /* wider text column, serif for body, more generous spacing */
}
```
