---
date: 2026-04-16
ai_tool: v0, Lovable, Bolt.new (all apply the same generic SaaS aesthetic regardless of domain)
sources:
  - platform: reddit
    context: r/web_design, r/startups -- multiple threads on AI-generated vertical-specific products
    quote: "I asked an AI to build a children's learning app and a fintech dashboard. They both came back with the same dark navy, purple accent, Inter, shadcn cards design. One of them is for 8-year-olds."
  - platform: hn
    context: HN threads on AI tool limitations and design context
    quote: "A medical app gets generic teal gradients instead of trusted blue-green tones. A fintech dashboard receives purple instead of professional navy-gold palettes. The AI learned 'modern tech design' and applies it regardless of whether the product is for oncologists or kindergarteners."
additional_sources: 3
---

# Industry Context Blindness

**Pattern**: A medical appointment booking app, a children's educational game, and a B2B financial analytics dashboard all receive identical visual treatment from AI tools: dark navy or white background, purple or indigo accent, Inter font, shadcn/ui card components, hero with subtitle and two CTA buttons. The design system reflects "generic modern SaaS" rather than the actual domain, audience, or trust conventions of the product category.

**Why it fails** (from community): Industry-specific design conventions exist because they communicate trust and competence to the target user. A healthcare product in "startup purple" signals "not built for my domain." A fintech product without `tabular-nums` and high-density data tables looks like it doesn't understand the work. A children's app in dark navy with sharp corners is hostile to its users. Users in specialized domains have domain-specific visual literacy -- they recognize when a product's design speaks their language and when it doesn't.

Community language: "domain-agnostic design," "SaaS slop for every industry," "context blindness."

**Fix**: Before generating any UI, specify the domain context explicitly. Name the industry, the trust signals that domain requires, and a real-world exemplar product that gets it right. "Medical appointment app -- should feel like Epic MyChart meets Linear, NOT like a purple SaaS startup. Clinical trust through blue-green palette, high contrast, no dark mode as default." This forces the AI past its generic SaaS defaults.

**Domain-specific defaults the AI must override:**

| Domain | Wrong default | Correct direction |
|--------|---------------|-------------------|
| Healthcare | Purple accent, dark mode | Blue-green, light mode, high contrast |
| Fintech | Indigo gradient, card grid | Navy or white, `tabular-nums`, data-dense |
| Children's product | Dark navy, sharp cards | Warm colors, large text, rounded-3xl |
| Legal/compliance | Generic SaaS | Serif for trust, formal tone, blue convention |
| Creative tools | SaaS landing page | Canvas-first, minimal chrome, dark mode |

```tsx
// Not this -- generic SaaS defaults regardless of domain
// Healthcare app that looks like a developer tool
<section className="bg-zinc-950 text-white py-24">
  <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
    Modern Healthcare Platform
  </h1>
  <Button className="bg-indigo-600">Get Started</Button>
</section>

// This -- domain-appropriate for healthcare
<section className="bg-white border-b border-slate-200 py-20">
  <p className="text-sm font-medium text-teal-700 mb-3 uppercase tracking-wide">
    Patient scheduling
  </p>
  <h1 className="text-4xl font-semibold text-slate-900 max-w-xl">
    Book and manage appointments from any device.
  </h1>
  <Button className="bg-teal-700 hover:bg-teal-600 mt-8">
    Sign in to your portal
  </Button>
</section>
```

## Sources

- dev.to: "Why Every AI-Generated Landing Page Looks the Same" -- domain blindness as structural failure
- HN: Multiple threads on AI design context failure (medical, fintech, edtech examples)
- Reddit r/web_design: "AI built my healthcare app like it was Vercel's dashboard" (2025)
- hemispheredm.com: "Your restaurant website might use the exact same layout as your competitor's"
- 925studios.co: "Generic AI-generated visuals do not reflect actual products"
