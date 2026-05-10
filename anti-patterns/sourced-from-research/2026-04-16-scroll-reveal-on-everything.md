---
date: 2026-04-16
ai_tool: Lovable, Bolt.new, v0 with Framer Motion defaults
sources:
  - platform: reddit
    context: r/web_design, r/UI_Design, r/webdev -- multiple threads
    quote: "When every element has a fade-in on scroll, none of them do. The animation has to be selective or it becomes visual noise. AI just wraps everything in the same motion.div and calls it 'polished.' It's the opposite of polished."
  - platform: hn
    context: HN threads on web performance and animation overuse
    quote: "Too much motion -- animations playing simultaneously across the entire viewport create cognitive overload. Your eye doesn't know where to focus. AI builders rarely generate purposeful motion because motion design requires understanding intent."
additional_sources: 3
---

# Scroll-Reveal Animation on Every Element

**Pattern**: Every section, card, heading, and image on the page has a scroll-triggered fade-in and slide-up animation applied via `IntersectionObserver` or a library like Framer Motion or AOS. The animation is identical for all elements (`opacity: 0 → 1`, `translateY: 20px → 0`, `duration: 0.3s ease`), triggering in a mechanical stagger pattern as the user scrolls. There is no element that simply appears -- everything has entrance animation.

**Why it fails** (from community): Animation communicates hierarchy and draws attention. When every element animates equally, animation communicates nothing -- there is no hierarchy because everything equally competes for attention. The community frames it as "cognitive overload" and notes that it also causes motion sickness for users with vestibular disorders. The pattern violates `prefers-reduced-motion` in most implementations. "AI builders rarely generate purposeful motion because motion design requires understanding intent" -- what should the user notice first?

Community language: "motion spray," "everything fades in," "scroll animation overload," "Framer Motion default."

**Fix**: Apply entrance animation to at most two or three elements per page: the hero headline (which introduces the page) and potentially one section break where a significant topic transition occurs. Leave all cards, body text, icons, and supporting content static. Always implement `prefers-reduced-motion` support.

```tsx
// Not this -- motion.div on every card
{features.map(f => (
  <motion.div
    key={f.title}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <FeatureCard feature={f} />
  </motion.div>
))}

// This -- animation used selectively, respects prefers-reduced-motion
<motion.h1
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
>
  {headline}
</motion.h1>

{/* Feature cards: static. The content is the content, not the animation. */}
{features.map(f => <FeatureCard key={f.title} feature={f} />)}

// CSS: always include this
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Sources

- digitalsilk.com: "Scrolling Effects: Benefits and Risks" -- cognitive overload and motion sickness named
- 925studios.co: "AI Slop Web Design Guide" -- "AI builders rarely generate purposeful motion"
- Reddit r/web_design: "Stop wrapping everything in motion.div" (2025, 200+ upvotes)
- HN: Performance and accessibility threads on animation overuse
- WCAG 2.1 Success Criterion 2.3.3 (Animation from Interactions) -- Level AAA, but 2.3.1 applies at AA
- dev.to: Multiple posts on over-animating vibe-coded apps
