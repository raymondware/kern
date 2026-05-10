---
date: 2026-04-16
ai_tool: v0, Lovable, Bolt.new, Cursor (all produce this by default)
sources:
  - platform: reddit
    context: r/web_design, r/UI_Design -- multiple threads 2024-2026
    quote: "Every AI-generated landing page has the exact same 'three icons above three feature descriptions in a row' section. It's like they all used the same template."
  - platform: hn
    context: Multiple HN comment threads on startup design quality
    quote: "The 3-up feature grid with rounded cards, stock icon, bold heading, and two sentences of copy is the Lorem Ipsum of AI-generated SaaS. Nobody reads it. It doesn't communicate any differentiation."
additional_sources: 8
---

# Identical 3-Column Feature Card Grid

**Pattern**: Three (or six) identical cards arranged in a grid, each containing: a Lucide/Heroicon at default 48px size in the brand accent color, a bold heading of 2-4 words, and 1-2 sentences of description. All cards are the same size with the same padding, same radius, same shadow. The icons are the only visual differentiation between cards.

**Why it fails** (from community): This layout communicates nothing about product differentiation. Every product can fill 3 cards with "Fast", "Reliable", "Scalable" and generic icons. The pattern reads as filler -- content that exists to give the page visual weight, not to inform a decision. The uniform grid also signals template use: real design work varies rhythm, emphasis, and hierarchy.

Community language: "the three-up," "feature grid soup," "icon grid template," "every SaaS feature section."

**Fix**: Replace with a format that forces real differentiation. Options:

1. **Numbered list with varied content length**: Hierarchy through numbers and different description lengths signals that someone made choices.
2. **Large screenshot/demo with annotation**: Show the feature working, not a generic icon representing it.
3. **Before/after comparison**: Works for workflow tools. Concrete over abstract.
4. **Single feature emphasized with supporting details**: Pick the most important feature, explain it fully, then list the others as secondary.

```tsx
// Not this
<div className="grid grid-cols-3 gap-6">
  {features.map(f => (
    <Card key={f.title} className="p-6 rounded-xl shadow-md">
      <f.icon className="w-12 h-12 text-indigo-500 mb-4" />
      <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
      <p className="text-gray-500 text-sm">{f.description}</p>
    </Card>
  ))}
</div>

// This
<ul className="space-y-16">
  <li className="grid grid-cols-[4rem_1fr] gap-8 items-start">
    <span className="text-5xl font-mono text-zinc-600 tabular-nums leading-none">01</span>
    <div>
      <h3 className="font-semibold text-xl mb-3">Preview on every PR</h3>
      <p className="text-zinc-400 leading-relaxed">
        Every pull request gets a unique URL. Share with your team before merging.
        Previews expire automatically when the branch is closed.
      </p>
    </div>
  </li>
</ul>
```

## Sources

- r/web_design: "Why do all AI-generated websites look identical?" (2024, 400+ upvotes)
- r/UI_Design: "The 3-feature-grid has to stop" (2025, 200+ upvotes)
- HN: Multiple "Show HN" threads where commenters note the identical card grid
- X: Designers posting side-by-side comparisons of AI-generated sites showing the same grid
