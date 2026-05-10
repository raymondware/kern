---
date: 2026-04-16
ai_tool: v0, Lovable, Bolt.new (all produce this by default)
sources:
  - platform: reddit
    context: r/web_design -- multiple threads titled "Why does every AI website look the same"
    quote: "It's always the same: big centered headline, purple/blue gradient glow behind it, subheadline, two buttons. I can spot a v0 site instantly now."
  - platform: hn
    context: HN thread "Every startup website looks the same now (2024)"
    quote: "The centered hero with the radial gradient is the new 'Lorem ipsum' placeholder. It means: we haven't designed anything yet."
additional_sources: 6 (multiple Reddit threads, X posts, design community blogs)
---

# Centered Hero with Radial Gradient Glow

**Pattern**: A full-width hero section with: text centered horizontally and vertically, a radial gradient (usually purple, indigo, or blue) emanating from behind the headline creating a "glow" effect, and one or two centered CTA buttons below. Often paired with gradient text on the headline.

**Why it fails** (from community): This layout requires zero design decisions. Centering is the absence of a layout choice. The radial glow is a way to make a flat background look "designed" without making any actual design decisions. The pattern has become so ubiquitous -- produced by every AI design tool as its default -- that it now actively signals "this was AI-generated and not reviewed." Designers and developers can identify a v0 or Lovable output within seconds by this pattern alone.

Community language: "AI glow," "the glow treatment," "purple gradient slop," "vibe-coded landing page."

**Fix**: Left-align. Remove the gradient background entirely -- use a flat near-black or near-white. Let the headline do the work with weight and specificity. Move the CTA to the left column. If visual interest is needed, use typography contrast (a large number, a strong pull quote, a monospaced label), not color blending behind the text.

```tsx
// Not this
<section className="flex flex-col items-center text-center relative">
  <div className="absolute inset-0 bg-gradient-radial from-indigo-500/20 to-transparent" />
  <h1 className="text-6xl bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
    Supercharge your workflow
  </h1>
  <p className="text-gray-400 mt-4">The modern platform for modern teams.</p>
  <div className="flex gap-4 mt-8">
    <Button>Get Started</Button>
    <Button variant="outline">Learn More</Button>
  </div>
</section>

// This
<section className="px-8 py-24 max-w-4xl">
  <p className="text-sm font-mono text-zinc-500 mb-4 uppercase tracking-wide">Developer infrastructure</p>
  <h1 className="text-5xl font-semibold tracking-tight">
    Deploy previews on every PR.
  </h1>
  <p className="mt-6 text-zinc-400 text-lg max-w-xl">
    Connect your repo. Every pull request gets its own preview URL.
    No config. Works with Next.js, Remix, Astro.
  </p>
  <div className="mt-10">
    <Button>Connect Your Repo</Button>
  </div>
</section>
```

## Sources

- r/web_design: multiple threads 2024-2026 with 100+ upvotes naming "centered hero glow" as an AI tell
- Hacker News: "Every startup website looks the same now" thread (2024), top comment names the radial glow
- X: numerous posts from developers and designers identifying this as a v0/Lovable default
- Design blogs: mentioned in articles about AI design tool outputs on CSS-Tricks, Smashing Magazine
