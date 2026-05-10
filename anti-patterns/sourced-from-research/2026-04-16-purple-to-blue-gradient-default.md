---
date: 2026-04-16
ai_tool: v0, Lovable, Bolt.new, Cursor, Claude Code (any tool using Tailwind defaults)
sources:
  - platform: reddit
    context: r/web_design, r/reactjs, r/webdev -- multiple threads
    quote: "Purple gradients everywhere. Blue-to-purple backgrounds. Lavender buttons. Purple gradient text. Once fresh, now the official color scheme of 'we used AI.'"
  - platform: hn
    context: HN threads on AI-generated landing pages, startup design
    quote: "AI tools trained on thousands of SaaS landing pages have learned that purple-to-blue gradients are the most 'safe' choice. It's not aesthetics — it's probability mass in training data."
additional_sources: 8
---

# Purple-to-Blue Gradient Syndrome

**Pattern**: Hero sections, CTA buttons, background accents, and gradient text headings that default to indigo-violet-purple color transitions. The specific Tailwind classes: `bg-indigo-500`, `violet-600`, `purple-700`, and gradient text via `text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500`. Sometimes extends to decorative mesh gradients and "aurora" effects in the same hue range.

**Why it fails** (from community): The root cause is traceable: Tailwind CSS chose `bg-indigo-500` as its default component demo color, which then saturated thousands of tutorials and GitHub repos between 2019-2024. LLMs trained on this data encoded the rule "modern web design = purple buttons." The result: every product that prompts "make me a SaaS landing page" gets the same purple-indigo palette regardless of whether the product is a dev tool, a recipe app, or a healthcare platform. The community recognition is now immediate -- "I can spot a v0 site instantly" is usually followed by a description of the purple gradient.

The Anthropic Cookbook explicitly prohibits it: "No purple gradients on white backgrounds."

Community language: "purple AI slop," "the official color scheme of 'we used AI'," "blue-to-purple safety blanket."

**Fix**: Use a color derived from actual product context: what industry conventions apply? What does the product's subject matter suggest? If genuinely uncertain, a flat near-black or near-white with a single warm neutral accent is more distinctive than any gradient. Avoid prompting with "modern," "futuristic," or "landing page" -- these terms are soaked in purple training data.

```css
/* Not this -- the default */
.hero { background: linear-gradient(135deg, #6366f1, #8b5cf6, #3b82f6); }
.btn { background: linear-gradient(to right, #7c3aed, #2563eb); }
h1 span { background: linear-gradient(to right, #fff, #818cf8); -webkit-background-clip: text; }

/* This -- flat, brand-derived, intentional */
.hero { background: oklch(12% 0.005 220); } /* Near-black with minimal chroma */
.btn { background: oklch(52% 0.18 25); }   /* Warm amber -- from the actual brand */
h1 { color: oklch(97% 0 0); }              /* Near-white, no gradient */
```

## Sources

- Medium/@ai.in.motion.blog: "The Purple Problem: Why AI Can't Stop Generating Purple Websites" (2025)
- prg.sh: "Why Your AI Keeps Building the Same Purple Gradient Website"
- 925studios.co: "AI Slop Web Design Guide" -- names purple as primary AI tell
- easy-peasy.ai: "Best AI Website Builders: Custom Websites That Don't Look Like Purple AI Slop" (headline)
- monet.design: "5 Strategies to Escape AI Slop Landing Page Design"
- Reddit r/web_design: multiple threads naming purple as the instant AI identifier
- HN: "Where's the AI Design Renaissance?" discussion thread
- Anthropic Cookbook: Explicitly lists "no purple gradients on white" in landing page anti-patterns
