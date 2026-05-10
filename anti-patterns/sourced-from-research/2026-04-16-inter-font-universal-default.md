---
date: 2026-04-16
ai_tool: v0, Lovable, Bolt.new, shadcn/ui starter, Cursor
sources:
  - platform: reddit
    context: r/web_design, r/UI_Design -- multiple threads
    quote: "Inter is a fine typeface. It is also the default font in nearly every AI design tool. When your medical app, recipe blog, and fintech dashboard all use Inter with the same weights, the typeface is making a statement you didn't intend: 'I accepted the default.'"
  - platform: hn
    context: HN threads on AI design homogeneity, frontend tooling
    quote: "It's not that Inter is bad. It's that it signals 'this is a Next.js app that hasn't been designed yet.' The same way Times New Roman used to signal 'this document hasn't been formatted.' It's the default you forget to change."
additional_sources: 4
---

# Inter as Universal Default Font

**Pattern**: Every AI-generated interface uses Inter as the sole typeface, applied with no variation in weight strategy, no display/body distinction, and no typographic personality. The font declaration is simply `'Inter'` with a `system-ui` fallback. No consideration of whether Inter is appropriate for the product type, tone, or target audience. Often accompanied by Poppins as an alternative "AI-default" font.

**Why it fails** (from community): Inter is designed for dense UI text -- it excels at small sizes in data tables and control labels. It is not a display typeface, and it is not a personality typeface. When AI uses it for hero headlines, body copy, navigation, and microcopy without any variation, every product looks typographically identical. A fintech dashboard, a children's learning app, and an indie music tool all read as the same anonymous product. Designers specifically call out "Inter or Poppins -- safe, legible, and utterly forgettable."

Community language: "the Helvetica of AI design," "Next.js Inter default," "the font you forget to change."

**Fix**: Choose a typeface pair that reflects the product's character. Developer tools might use Geist Sans (distinct but technical) or system-ui with JetBrains Mono for code. Consumer apps might use Plus Jakarta Sans or Fraunces (display) with DM Sans (body). The point is not to use an unusual font -- it's to make a deliberate choice that reflects the product's voice.

```css
/* Not this -- default Inter everywhere */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
body { font-family: 'Inter', system-ui, sans-serif; }

/* This -- deliberate pairing with typographic purpose */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=DM+Sans:wght@400;500&display=swap');
:root {
  --font-display: 'Fraunces', Georgia, serif;  /* headlines — warm editorial authority */
  --font-body: 'DM Sans', system-ui, sans-serif; /* body — clean but friendlier than Inter */
}
```

## Sources

- 925studios.co: "AI Slop Web Design Guide" -- Inter listed as primary AI typography tell
- monet.design: "Escape AI Slop" -- "Icons: Lucide. Fonts: Inter or Poppins. Safe, legible, and utterly forgettable."
- dev.to/@Rythmuxdesigner: "Why Your AI-Generated UI Looks Like Everyone Else's"
- axe-web.com: "AI Website Sameness" -- Inter specifically named alongside purple as top two tells
- Reddit r/web_design: Multiple threads comparing AI outputs noting identical font usage
- HN: Front-end tooling discussions noting Inter as the "Times New Roman of vibe-coded apps"
