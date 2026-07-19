---
date: 2026-04-16
ai_tool: v0, Lovable (default landing page template includes this section)
sources:
  - platform: reddit
    context: r/web_design, r/marketing -- multiple threads
    quote: "The 'trusted by 10,000+ developers' with a row of grayscale company logos under the hero is so automatic at this point. I've seen startups with 3 users using logos of companies that have never heard of them."
  - platform: hn
    context: HN threads on startup landing page credibility
    quote: "Those logo bars under the hero are almost always fake or misleading. Either the logos are enterprise companies whose one employee used a free tier, or they're completely fabricated. Nobody believes them anymore."
additional_sources: 4
---

# Fake/Premature Social Proof Logo Bar

**Pattern**: A section immediately below the hero containing: text like "Trusted by 10,000+ teams" or "Used by engineers at [companies]", followed by a row of 6-8 grayscale company logos. This section is placed before the user has seen any product value.

**Why it fails** (from community): Two distinct failure modes. First, premature: placing social proof before demonstrating value puts the cart before the horse -- users have no context for why these logos matter. Second, fabricated: AI-generated landing pages frequently include this section as a template element, with company logos that have no real relationship to the product. Users have become skeptical of logo bars, especially on new/small products.

Community language: "logo bar of lies," "grayscale company graveyard," "the trust theater section."

**Fix**: 

If you have genuine enterprise users: move the logo bar to after the features section, where it validates value you've already demonstrated. Include specific quotes from named individuals, not just logos.

If you don't have enterprise users yet: remove the section entirely. Replace with a specific, verifiable claim. "Built by a developer who runs [X product] and needed this" is more credible than 8 logos of companies that don't know your product exists.

If you have community users but not enterprises: "Used in 47 countries" or "Starred by 2,000 developers on GitHub" with a link is verifiable and more credible than a logo bar.

```tsx
// Not this -- fake/premature
<section className="py-12 text-center">
  <p className="text-sm text-gray-500">Trusted by 10,000+ teams worldwide</p>
  <div className="flex justify-center gap-8 mt-6 opacity-60">
    <GoogleLogo />
    <MetaLogo />
    <SlackLogo />
    {/* etc */}
  </div>
</section>

// This -- specific and verifiable
<section className="py-12 border-t border-zinc-800">
  <blockquote className="max-w-2xl mx-auto text-center">
    <p className="text-lg text-zinc-300">
      "Replaced our manual deploy checklist. Saved 20 minutes per deployment."
    </p>
    <footer className="mt-4 text-sm text-zinc-500">
      Alex Chen, Staff Engineer at Attio
    </footer>
  </blockquote>
</section>
```

## Sources

- r/web_design: "Are landing page logo bars ever real?" (2024, 300+ upvotes)
- r/startups: Thread about credibility signals that backfire
- HN: "The Logo Bar of Lies" discussion thread
- X: Multiple designers posting about AI-generated sites with invalid logo bars
