---
date: 2026-04-16
ai_tool: v0, Lovable, Bolt.new (all generate text-gray-400 for body copy as default)
sources:
  - platform: reddit
    context: r/web_design, r/accessibility, r/UI_Design -- multiple threads
    quote: "text-gray-400 on white is roughly 2.85:1 contrast. WCAG AA requires 4.5:1 for body text. Every AI-generated site I audit fails this. They all use the same muted gray because it 'looks clean.' Clean and illegible."
  - platform: hn
    context: HN accessibility and web design threads
    quote: "81% of homepages have low-contrast text. AI tools trained on the web reproduce this failure at scale. The AI learned that muted grays look 'premium' because that's what it saw on thousands of popular sites."
additional_sources: 4
---

# Insufficient Color Contrast: Muted Gray Text

**Pattern**: Body text, descriptions, and supporting copy styled with `text-gray-400` on white backgrounds (or `text-zinc-500`, `text-slate-400` -- all variants of the same problem). These colors produce a contrast ratio of approximately 2.85:1 against white, failing the WCAG AA minimum of 4.5:1 for normal text. Often compounded by: placeholder text in forms styled the same as input text, white text over gradient backgrounds that transitions through a low-contrast midpoint, and gradient headline text that passes at one end but fails at the other.

**Why it fails** (from community): The AI learned this pattern from the web: 81% of homepages have low-contrast text, and accessibility audits of AI-generated sites find it immediately. The Figma Sites demo pages were found to have 56-77 elements with insufficient contrast each. The psychological driver: muted gray text looks "premium" and "clean" in isolation (on a well-calibrated monitor in good lighting). It fails users with low vision, fails in high ambient light environments, and fails in low-power mode on mobile. Accessibility audits of AI-generated sites list contrast failures as the top WCAG violation.

Community language: "aesthetic over accessibility," "ghost text," "illegible light mode."

**Fix**: Use `text-gray-600` as the minimum for body copy on white (approximately 4.6:1). Use `text-gray-700` or `text-gray-800` for primary text. `text-gray-400` is appropriate only for placeholder text in inputs (where WCAG allows 3:1) or decorative content with no semantic meaning.

```tsx
// Not this -- fails WCAG AA (2.85:1 on white)
<p className="text-gray-400">Deploy your application in minutes.</p>

// Not this -- gradient text fails at the light end
<h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
  Deploy faster
</h1>

// This -- passes WCAG AA (4.6:1 on white)
<p className="text-gray-600">Deploy your application in minutes.</p>

// Use this scale for light mode:
// text-gray-900 (21:1) -- headings, primary content
// text-gray-700 (7.6:1) -- body text, secondary headings
// text-gray-600 (4.6:1) -- supporting text, captions (minimum for body)
// text-gray-500 (3.5:1) -- large text only (18px+ or 14px+ bold)
// text-gray-400 (2.85:1) -- decorative only, not readable content
```

## Sources

- adrianroselli.com: "Do Not Publish Your Designs on the Web with Figma Sites" -- 77 contrast violations on a single demo page
- Web Almanac 2025: "81% of homepages have low-contrast text" (HTTP Archive data)
- Reddit r/accessibility: Multiple threads on AI-generated sites failing basic contrast checks
- r/web_design: "AI-generated sites all use the same illegible gray" (2025)
- WCAG 2.1 Success Criterion 1.4.3: Contrast (Minimum) -- Level AA
- axe-web.com: "AI Website Sameness" -- contrast failures listed as top accessibility violation
