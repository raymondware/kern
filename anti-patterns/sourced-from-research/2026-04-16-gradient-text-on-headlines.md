---
date: 2026-04-16
ai_tool: v0, Lovable, Bolt.new (all default to this for hero headlines)
sources:
  - platform: reddit
    context: r/web_design, r/UI_Design -- multiple threads 2024-2026
    quote: "bg-clip-text text-transparent with a gradient is on literally every AI-generated site I review. It looked cool in 2022. Now it screams 'I asked AI to design this.'"
  - platform: hn
    context: HN threads on AI-generated landing pages
    quote: "The gradient clip text on the headline is the single most reliable AI tell. Every v0 output has it. Even when the rest of the site is cleaned up, developers leave the gradient headline in because it 'looks designed.'"
additional_sources: 5
---

# Gradient Clip Text Headlines

**Pattern**: Applying `bg-gradient-to-r from-[color] to-[color] bg-clip-text text-transparent` to the primary headline or a keyword within it. The gradient usually runs from white or near-white to a muted purple, indigo, blue, or cyan. Sometimes applied to just one word "for emphasis."

**Why it fails** (from community): This technique peaked as a Dribbble trend around 2021-2022 and became the default AI output for "make the headline look premium." The community has identified it as the single most reliable AI design fingerprint -- more recognizable than any other individual pattern. It also creates accessibility problems: gradient text on dark backgrounds frequently fails WCAG contrast requirements because the contrast ratio is measured against the lowest-contrast portion of the gradient.

Community language: "rainbow headline," "gradient text tell," "bg-clip-text everywhere," "the AI headline treatment."

**Fix**: Use typographic weight and specificity instead. A well-chosen headline in a heavy weight at the right size doesn't need color treatment. If a word needs emphasis, use a slightly different weight (semibold vs bold), a small overline label, or simply better word choice.

```tsx
// Not this -- gradient clip text
<h1 className="text-6xl font-bold">
  Build{" "}
  <span className="bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
    faster
  </span>{" "}
  than ever before
</h1>

// This -- weight and specificity do the work
<h1 className="text-5xl font-semibold tracking-tight">
  Deploy previews on every pull request.
</h1>

// Or if visual contrast is genuinely needed -- use a solid accent, sparingly
<h1 className="text-5xl font-semibold tracking-tight">
  Deploy previews on every{" "}
  <span className="text-teal-400">pull request.</span>
</h1>
```

## Sources

- r/web_design: "How to spot an AI-designed site in 3 seconds" (2024, 500+ upvotes) -- gradient text listed as #1 tell
- r/UI_Design: Multiple threads on gradient headline accessibility failures
- HN: "Show HN" comments frequently naming gradient text as the AI tell
- X: Designers posting before/after fixes replacing gradient text with typographic solutions
- CSS-Tricks: Article on overused CSS techniques listing bg-clip-text as top offender
