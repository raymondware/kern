---
date: 2026-04-16
ai_tool: v0, Lovable, Bolt.new, Relume (universal default pricing section)
sources:
  - platform: reddit
    context: r/startups, r/web_design -- multiple threads on AI-generated landing pages
    quote: "Every AI pricing section is exactly the same. Starter / Pro (Most Popular) / Enterprise (Contact Us). The 'Most Popular' badge is on every single one. Every startup's pricing page is identical."
  - platform: hn
    context: HN threads on SaaS pricing design and landing page templates
    quote: "The three-tier pricing table with the highlighted middle column is one of the most reliably AI-generated layouts. The AI is doing exactly what it was trained to do -- reproduce the average SaaS pricing page. The problem is it's the same average for every product."
additional_sources: 4
---

# Three-Tier Pricing Table with "Most Popular" Middle Column

**Pattern**: A pricing section with exactly three columns: "Starter" (cheapest, limited features), "Pro" or "Growth" (medium price, highlighted with a "Most Popular" or "Recommended" badge and a distinct background or border), and "Enterprise" (labeled "Contact Us" with unlimited or custom features). Each tier has a bulleted feature list of 5-8 items. The middle column is visually emphasized with a gradient border, slightly different background, or shadow. The layout collapses to a single column on mobile.

**Why it fails** (from community): The "Most Popular" badge is meaningless when it appears on every AI-generated pricing page -- visitors have learned to ignore it. The "Enterprise: Contact Us" tier appears even for products that have no enterprise customers and have never validated enterprise demand. The three-tier structure is applied regardless of whether it reflects the product's actual pricing logic (usage-based, per-seat, freemium, one-time purchase). A fintech startup's pricing page "could belong to a project management tool or a CRM with zero changes."

Community language: "the pricing template," "starter/pro/enterprise," "Most Popular badge of lies."

**Fix**: Design the pricing section from the actual business model outward. If you're usage-based, show a usage calculator. If you're per-seat with a free tier, show one paid plan and a free option. If you genuinely have three tiers, that's fine -- but don't add "Enterprise: Contact Us" until you have enterprise conversations happening. Remove the "Most Popular" badge unless you have data showing actual plan distribution.

```tsx
// Not this -- generic three-tier regardless of product
<PricingGrid>
  <Tier name="Starter" price={9} featured={false}>
    <Feature>5 projects</Feature>
    <Feature>Basic analytics</Feature>
  </Tier>
  <Tier name="Pro" price={29} featured badge="Most Popular">
    <Feature>Unlimited projects</Feature>
    <Feature>Advanced analytics</Feature>
  </Tier>
  <Tier name="Enterprise" price="Contact Us" featured={false}>
    <Feature>Everything in Pro</Feature>
    <Feature>Custom integrations</Feature>
  </Tier>
</PricingGrid>

// This -- matches actual business model (usage-based example)
<div className="max-w-xl mx-auto">
  <div className="text-4xl font-semibold tabular-nums">
    ${(units * 0.002).toFixed(2)}
    <span className="text-lg text-zinc-500 font-normal">/mo</span>
  </div>
  <p className="text-zinc-400 mt-2">
    {units.toLocaleString()} API calls at $0.002 each.
    Free up to 500 calls/mo.
  </p>
  <Slider value={units} onChange={setUnits} min={0} max={100000} />
</div>
```

## Sources

- shuffle.dev: "Why Do Most AI-Generated Websites Look the Same?" -- pricing table listed as core template element
- conversion-haus.com: "The Problem with AI Landing Pages" -- three-tier pricing as AI tell
- Reddit r/startups: "Why does every AI site have the same Starter/Pro/Enterprise structure?" (2025)
- HN: "Pricing page design" threads noting AI defaults
- dev.to: "Why Every AI-Generated Landing Page Looks the Same" -- pricing section structure named
- axe-web.com: "AI Website Sameness" -- "Most Popular" badge as visual template signal
