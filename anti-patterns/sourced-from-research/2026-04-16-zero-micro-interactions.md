---
date: 2026-04-16
ai_tool: v0, Lovable, Bolt.new, Cursor (all generate static hover states at best)
sources:
  - platform: reddit
    context: r/UI_Design, r/webdev -- multiple threads on vibe-coded app polish
    quote: "You can always tell an AI-built app by the buttons. They snap. There's no physics, no feedback, no active state. They just instantly change background color and that's it. It feels like a mockup, not a real product."
  - platform: hn
    context: HN threads on frontend quality and AI-generated UI
    quote: "AI builders rarely generate purposeful motion because motion design requires understanding intent. Static buttons that snap instead of easing. Zero micro-interactions or personality. Generic hover states if any."
additional_sources: 3
---

# Zero Micro-Interactions and Static Hover States

**Pattern**: Interactive elements receive only color-change hover states -- no transition timing, no transform feedback, no shadow change, no active/pressed states. A button: `bg-indigo-600 hover:bg-indigo-700` -- it snaps between colors with no easing. A card: `hover:bg-gray-50` -- the background changes instantly. Navigation links: a simple color change. No focus rings visible (or focus rings removed with `outline-none`). No loading state on submit buttons. No animation on state changes (tab switching, accordion open/close, toast appearance).

**Why it fails** (from community): Micro-interactions provide the "physics" that distinguish a real product from a prototype. The community specifically describes AI output as feeling like "a mockup, not a real product" because of missing interaction feedback. "Static buttons that snap instead of easing" is the precise complaint -- even a 150ms `transition-all` with a `scale-[0.98]` on active changes the psychological experience of the button. Removing `outline: none` on focus elements also creates an accessibility failure that compound with the lack of visible interaction states.

Community language: "snap buttons," "zero personality," "prototype feel," "it doesn't move right."

**Fix**: Add minimum interaction polish to every interactive element before shipping. The minimum viable interaction set: buttons get `transition-all duration-150` + `active:scale-[0.98]`, cards get `transition-shadow duration-200 hover:shadow-md`, focus elements get visible `focus-visible:ring-2` rings. This takes 10 minutes and produces a qualitatively different feel.

```tsx
// Not this -- snap state change only
<button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
  Submit
</button>

// This -- tactile response, transition easing, accessible focus
<button className="
  bg-indigo-600
  hover:bg-indigo-500
  active:scale-[0.98]
  active:bg-indigo-700
  text-white px-4 py-2 rounded-lg
  transition-all duration-150
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-indigo-400
  focus-visible:ring-offset-2
">
  Submit
</button>

// Card with lift on hover
<div className="
  border border-zinc-800
  rounded-xl p-6
  transition-all duration-200
  hover:border-zinc-700
  hover:shadow-lg hover:shadow-black/20
  hover:-translate-y-0.5
  cursor-pointer
">
```

## Sources

- 925studios.co: "AI Slop Web Design Guide" -- "static buttons that snap instead of easing"
- dev.to/a_shokn: "Break the AI-Generated UI Curse" -- "zero micro-interactions or personality"
- dev.to/kiwibreaksme: "Your Vibe-Coded App Looks Ugly" -- interaction quality as key differentiator
- Reddit r/UI_Design: "Why do AI-built apps feel like mockups?" -- interaction feedback named as primary reason
- HN: Frontend quality discussions naming micro-interaction absence as AI tell
