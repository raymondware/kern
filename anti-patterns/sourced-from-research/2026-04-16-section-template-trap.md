---
date: 2026-04-16
sources:
  - url: https://www.conversion-haus.com/post/the-problem-with-ai-landing-pages-and-why-most-saas-sites-look-the-same
    platform: blog
    votes_or_engagement: "industry analysis"
    quote: "The AI landing page playbook: hero, three features, testimonials, three-tier pricing, FAQ accordion. Every AI tool generates this exact sequence."
  - url: https://www.925studios.co/blog/ai-slop-web-design-guide
    platform: blog
    votes_or_engagement: "widely shared"
    quote: "Numbered steps section is everywhere. Generic numbered circles are the third most common AI pattern after gradient hero and feature boxes."
additional_sources: 2
tools: ["v0", "lovable", "bolt.new", "generic"]
---

# Section Template Trap

**Pattern cluster**: Four section types that appear in sequence on the majority of AI-generated landing pages. The sequence itself is the tell: hero, features, pricing, FAQ. Recognizing and breaking this sequence is the single highest-leverage differentiation move.

---

## Three-Tier Pricing Table

**Pattern**: Three pricing columns named Starter / Pro / Business (or Free / Pro / Enterprise). Middle tier highlighted as "most popular" or "recommended" with a visual distinction (border, background, scale). Feature checklist using icons (check = included, X or blank = excluded). Annual/monthly toggle at the top.

**Why it fails** (from community): "Every AI pricing page has the same three columns. Even the tier names are identical." The three-tier structure was popularized by SaaS growth playbooks because it anchors toward the middle tier. AI models reproduce it because it appears on thousands of successful SaaS sites. The result: pricing pages are indistinguishable across competitors.

**Fix**: Design pricing around your actual business model, not the three-tier template.

- If you have one target segment: one clear price, one clear feature set
- If you have two segments: two tiers, honestly named for the customer type (not "Starter / Pro")
- If you have a genuinely complex matrix: a table is appropriate, but make it scannable by job, not by tier
- "Most popular" labels are fine if accurate; remove them if aspirational

---

## FAQ Accordion Default

**Pattern**: A FAQ section using the default accordion component: question as the trigger, answer in the collapsible panel. All questions visible but collapsed by default. Usually 6-8 questions. Usually placed at the bottom of the page above the footer.

**Why it fails** (from community): "Same accordion component as every other site. The questions are generic, the answers are long, and nobody reads them." The FAQ accordion exists to handle objections the page copy failed to address. When copy is specific, the FAQ gets shorter. When copy is generic (as on AI-generated pages), the FAQ grows to fill the gap.

**Fix**: Write copy specific enough that the FAQ is unnecessary for most readers. If FAQs are genuinely needed, consider: a search-indexed help section, inline contextual answers near the relevant feature, or a compact Q&A list without accordion interaction (show all answers). Reserve accordions for long answers where progressive disclosure adds genuine value.

---

## Testimonial Grid with Circular Avatars

**Pattern**: A grid (usually 3 columns) of testimonial cards. Each card: circular avatar image (40-48px), full name, title/company, quote text. All cards the same height. Sometimes cards are arranged in a masonry or staggered grid but the content format is identical.

**Why it fails** (from community): "The circular avatar testimonial grid is on every single SaaS site. I scroll past it automatically now." This pattern was standardized by early SaaS templates and has propagated through every landing page tool and AI builder. The circular avatar in particular is a strong visual signal because it was the standard avatar treatment in Material Design-era interfaces.

**Fix**: Vary the format based on testimony strength:
- Strong, specific quotes: large card with generous spacing, quote prominently sized, minimal avatar
- Video testimonials: embed or link to video, no avatar needed
- Named logos with a quote snippet: company credibility leads, person secondary
- Case study references: "See how [Company] reduced X by Y%" links to a full page

The goal is to make testimonials feel earned and specific, not assembled from a template.

---

## Features with Step Numbers

**Pattern**: A "how it works" or features section using numbered circles (1, 2, 3) with step descriptions. All steps the same visual weight, same icon size, same spacing. Horizontal or vertical arrangement.

**Why it fails** (from community): "Numbered steps with circles are everywhere. They're so generic they communicate nothing." The numbered steps format implies a linear process. Most products are not linear. Forcing product features into a three-step numbered sequence oversimplifies and reads as a content fill pattern.

**Fix**: If the product genuinely has a linear workflow, numbered steps are fine. Make them worth reading: name the specific benefit of each step, not just the category ("Integrate" is not a step; "Connect GitHub in 30 seconds, no config needed" is a step). If the product is not a linear workflow, use a different format: feature showcase with detail, interactive demo, or a before/after comparison.

```tsx
// Generic numbered step -- this is the pattern to avoid
<div className="flex items-start gap-4">
  <div className="rounded-full bg-primary h-8 w-8 flex items-center justify-center">1</div>
  <div>
    <h3 className="font-semibold">Connect</h3>
    <p>Connect your tools and services seamlessly.</p>
  </div>
</div>

// Specific step -- this is what makes numbered steps worth having
<div className="flex items-start gap-4">
  <div className="rounded-full bg-primary h-8 w-8 flex items-center justify-center">1</div>
  <div>
    <h3 className="font-semibold">Connect GitHub in 30 seconds</h3>
    <p>OAuth. No webhooks to configure. No SSH keys.</p>
  </div>
</div>
```

## Sources

- https://www.conversion-haus.com/post/the-problem-with-ai-landing-pages-and-why-most-saas-sites-look-the-same
- https://www.925studios.co/blog/ai-slop-web-design-guide
- https://www.monet.design/blog/posts/escape-ai-slop-landing-page-design
- https://dev.to/_46ea277e677b888e0cd13/why-every-ai-generated-landing-page-looks-the-same-and-how-to-fix-it-1kmo
