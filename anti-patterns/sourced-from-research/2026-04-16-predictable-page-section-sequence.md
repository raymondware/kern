---
date: 2026-04-16
ai_tool: v0, Lovable, Bolt.new, Relume (all default to this structure)
sources:
  - platform: reddit
    context: r/web_design, r/startups -- multiple threads on AI-generated landing pages
    quote: "hero section, three feature cards, testimonials, pricing, CTA. Every single time. I've reviewed 40+ AI-generated landing pages in the last year and I can predict exactly what's in section three before I scroll there."
  - platform: hn
    context: HN threads "Every startup website looks the same" 2024-2025
    quote: "When you jump straight to prompting an LLM to 'make me a high-converting SaaS landing page', you are asking a machine to average out everything that already exists. The result is the median version of the internet."
additional_sources: 5
---

# The Mandatory Six-Section Landing Page Sequence

**Pattern**: Every AI-generated landing page follows an identical section order: (1) Centered hero with headline + subheadline + two CTA buttons, (2) "Trusted by" logos row, (3) Three-column feature grid with icons, (4) Testimonials with five-star ratings, (5) Three-tier pricing table with "Most Popular" middle tier, (6) FAQ accordion + footer CTA. This structure appears regardless of whether the product is a B2B analytics tool, a consumer app, a developer CLI, or a marketplace.

**Why it fails** (from community): Visitors have internalized this structure and pattern-match it on sight. "They know the script" -- once recognized, the page's credibility drops because the structure signals template rather than product. The structure is also semantically wrong for many product types: a developer CLI doesn't need a five-star testimonial section; a consumer app might need a video demo rather than a feature grid; an early-stage product has no real logo row. The AI applies the same structure because it was trained to reproduce "the average successful SaaS landing page."

Community language: "the six-section shuffle," "AI landing page template," "median version of the internet."

**Fix**: Start from the product's actual conversion question: what does a visitor need to believe before they try this? Then design the sections that answer that specific question. A developer tool might lead with a code block demo. A marketplace might lead with a search interface. A consumer app might lead with a video. Not every product needs pricing on the landing page. Not every product needs testimonials in week one.

```tsx
// Not this -- mandatory template structure
// 1. Hero (centered, gradient) → 2. Logo row → 3. Feature cards →
// 4. Testimonials → 5. Pricing → 6. FAQ → Footer

// This -- designed for what this specific product needs to prove
// Option A (dev tool): Code demo first, features second, pricing last
// Option B (consumer app): Video hero, single benefit, download CTA
// Option C (marketplace): Search interface AS the hero, social proof inline

// The test: what does a skeptical visitor need to see in 8 seconds?
// Design for that question, not for the SaaS template.
```

## Sources

- shuffle.dev: "Why Do Most AI-Generated Websites Look the Same?" (2026) -- specifically names the section order
- monet.design: "Escape AI Slop" -- "asking a machine to average out everything that already exists"
- axe-web.com: "AI Website Sameness" -- "generic AI website fails the 'Like' test"
- conversion-haus.com: "The Problem with AI Landing Pages" -- fintech homepage could be CRM with zero changes
- Reddit r/web_design: Thread "Every AI landing page has the exact same structure" (2025, 300+ upvotes)
- HN: "Every startup website looks the same now" (2024) -- extensive comment thread
- dev.to: "Why Every AI-Generated Landing Page Looks the Same and How to Fix It"
