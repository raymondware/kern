---
date: 2026-04-16
ai_tool: Midjourney UI prompts, ChatGPT design, some Lovable outputs
sources:
  - platform: reddit
    context: r/web_design, r/UI_Design -- multiple threads
    quote: "Glassmorphism is the new skeuomorphism. When every card has backdrop-blur and a semi-transparent background, nothing is readable and everything looks like a Samsung wallpaper."
  - platform: hn
    context: HN design trend threads 2023-2025
    quote: "Frosted glass cards look impressive in a Dribbble shot. In production, they destroy contrast ratios, fail WCAG, and make text illegible on any background that isn't perfectly controlled."
additional_sources: 5
---

# Glassmorphism Overuse

**Pattern**: Using `backdrop-filter: blur()` with semi-transparent backgrounds on cards, modals, panels, and navbars across an interface. Often combined with: a colorful gradient background behind the glass elements, white or near-white text at low contrast, thin borders with low opacity, inner glow shadows.

**Why it fails** (from community): Glassmorphism requires a controlled, static background to work -- the frosted glass effect depends on having interesting content behind it to blur. In real UIs, backgrounds are unpredictable. The technique creates contrast failures (the blur changes depending on what's behind it, making text sometimes unreadable), performance issues on lower-end hardware, and a dated "2021 UI trend" aesthetic. The pattern peaked in AI-generated Dribbble shots and has been heavily criticized for its disconnect between visual impression and functional reality.

Community language: "frosted glass everywhere," "glassmorphism slop," "backdrop-blur abuse."

**Fix**: Use `backdrop-blur` for its semantic purpose only: a floating element that genuinely needs to show its position relative to underlying content (nav bar that scrolls over content, a sidebar drawer that partially overlaps the main area). Cards and modals on solid backgrounds do not need blur -- use borders and background color differentiation instead.

```css
/* Not this -- applied to static cards */
.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* This -- solid differentiation, no contrast risk */
.card {
  background: oklch(14% 0.008 220);
  border: 1px solid oklch(22% 0.01 220);
}

/* Appropriate use -- nav that overlaps scrolled content */
.navbar {
  background: rgba(9, 9, 11, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid oklch(22% 0.01 220);
}
```

## Sources

- r/web_design: "Stop using glassmorphism for everything" (2023, 600+ upvotes)
- r/UI_Design: Multiple threads about contrast failures in glassmorphism implementations
- HN: Design quality threads noting the pattern as a Dribbble-to-production disconnect
- Smashing Magazine: Article on glassmorphism accessibility failures
