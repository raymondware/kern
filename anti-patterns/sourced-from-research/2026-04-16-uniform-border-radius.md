---
date: 2026-04-16
ai_tool: v0, Lovable (rounded-xl on everything is the shadcn/Lovable default)
sources:
  - platform: reddit
    context: r/web_design, r/UI_Design -- multiple threads on AI-generated interface aesthetics
    quote: "rounded-xl on every single element. The button, the card, the badge, the input, the modal, the tooltip. Nothing is allowed to have a different radius. It looks like it was designed by committee that only agreed on one thing."
  - platform: hn
    context: HN threads on UI polish and component-level defaults
    quote: "When every element gets the same 16px border radius and 24px padding, the page feels flat and undifferentiated. There's no hierarchy of roundness. A button badge should be more round than a content card -- they're different kinds of objects."
additional_sources: 3
---

# Uniform Border Radius on Every Element

**Pattern**: Every element on the page receives the same `border-radius` value -- typically `rounded-xl` (12px) or `rounded-2xl` (16px) in Tailwind. Buttons, cards, modals, inputs, badges, tooltips, image containers, and code blocks all share the same radius. There is no hierarchy: a tiny notification badge gets the same radius as a full-page modal overlay. Nested elements also share the same radius, which creates optical mismatches (inner radius should equal outer radius minus padding).

**Why it fails** (from community): Border radius is a signal of element type and personality, not just an aesthetic preference. Pill-shaped (`rounded-full`) makes sense for status badges and tags. Tight radius (`rounded-md`, 6px) fits form controls and compact UI. Medium radius (`rounded-xl`) works for content cards. Large radius (`rounded-2xl`, `rounded-3xl`) is appropriate sparingly for featured elements or modals. When every element shares a single radius, the design hierarchy collapses -- there's no visual shorthand for "this is an action element" vs "this is a content container."

The optical nesting mismatch is also frequently cited: if a card has `rounded-xl` (12px) and `p-6` (24px padding), the inner content at the edge appears to have the same radius as the outer container -- when it should be 12px - 24px = visually zero (the inner corner "falls through" the outer).

Community language: "rounded-xl everywhere," "Lovable radius," "round everything syndrome."

**Fix**: Use a radius scale tied to element type and size: `rounded-full` for pills/badges/avatars, `rounded-md` for inputs and compact controls, `rounded-xl` for feature cards, `rounded-2xl` for large modal/sheet surfaces. Nested elements: `inner-radius = outer-radius - padding`. In practice: if the card is `rounded-2xl` (16px) with `p-4` (16px padding), the inner element touching the corner gets `rounded-lg` (8px) -- 16 - 16/2.

```css
/* Not this -- same radius everywhere */
.card { border-radius: 12px; padding: 24px; }
.card .badge { border-radius: 12px; } /* looks wrong -- too round for small pill */
.card .input { border-radius: 12px; } /* too round for form control */
.card .btn { border-radius: 12px; }   /* might be fine, but should be intentional */

/* This -- radius by element type */
.card { border-radius: 16px; padding: 24px; }  /* content container */
.badge { border-radius: 9999px; }               /* pill -- always full round */
.input { border-radius: 6px; }                  /* form control -- tight */
.btn { border-radius: 8px; }                    /* interactive -- medium */
/* nested in card: inner-radius = 16 - 8 = 8px */
.card .inner-image { border-radius: 8px; }
```

## Sources

- 925studios.co: "AI Slop Web Design Guide" -- "when every element gets the same 16px border radius"
- monet.design: "Escape AI Slop" -- "excessive rounded corners" as AI template tell
- Reddit r/web_design: "Why does everything look like a pillow in AI-generated designs?" (2025)
- HN: UI polish threads on radius hierarchy and nested element consistency
- dev.to/kiwibreaksme: "Your Vibe-Coded App Looks Ugly" -- radius uniformity named as fix target
