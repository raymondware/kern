# AI Tool Fingerprints

Per-tool pattern database for `/kern differentiate`. Use this to identify *which* tool generated a design, then apply tool-specific fixes. Generic AI tells appear in `anti-patterns/visual.md`; this file catalogs the tells unique or heavily weighted toward each specific tool.

Each pattern includes: what to look for, a before (tool default) snippet, an after (differentiated) snippet, and the Sameness Score impact when removed.

---

## How to Use

1. Scan the submitted code against each tool's section.
2. Count pattern hits per tool — the tool with the most matches is the likely generator.
3. Apply the "After" replacements for that tool's hits first.
4. Cross-check remaining tells against `anti-patterns/visual.md`.

---

## v0 (Vercel)

v0 defaults to a violet/indigo palette, centered hero with radial glow, Inter font, and Shadcn components in their factory configurations. It produces structurally consistent output that feels "polished but not designed."

### v0-1: Violet/indigo gradient text headline

**Signal:** `bg-clip-text text-transparent bg-gradient-to-r` with violet, indigo, or purple stops.

```tsx
// BEFORE (v0 default)
<h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
  Build faster. Ship confidently.
</h1>

// AFTER (differentiated)
<h1 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
  Build faster. Ship confidently.
</h1>
```

**Sameness Score impact:** −2 (gradient text + implied glow).

---

### v0-2: Radial gradient hero background

**Signal:** `radial-gradient` in a hero section wrapper, often with violet/purple color stops and transparency.

```tsx
// BEFORE (v0 default)
<section className="relative overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.3),transparent_70%)]" />
  <div className="relative flex flex-col items-center text-center gap-6 py-24">
    ...
  </div>
</section>

// AFTER (differentiated)
<section className="py-24 px-8 max-w-5xl">
  <div className="flex flex-col gap-6">
    ...
  </div>
</section>
```

**Sameness Score impact:** −2 (radial gradient + centering combo).

---

### v0-3: Identical 3-column feature grid

**Signal:** `grid grid-cols-1 md:grid-cols-3 gap-8` with three children that have identical structure (`rounded-xl border p-6` + icon + h3 + p).

```tsx
// BEFORE (v0 default)
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {features.map((f) => (
    <div key={f.title} className="rounded-2xl border bg-card p-6 shadow-lg">
      <f.Icon className="h-10 w-10 text-primary mb-4" />
      <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
      <p className="text-muted-foreground text-sm">{f.description}</p>
    </div>
  ))}
</div>

// AFTER (differentiated)
<div className="space-y-4">
  {features.map((f, i) => (
    <div key={f.title} className="flex gap-4 items-start border-b border-zinc-100 dark:border-zinc-800 pb-4">
      <span className="text-xs font-mono text-zinc-400 w-6 pt-1">{String(i + 1).padStart(2, "0")}</span>
      <div>
        <h3 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{f.title}</h3>
        <p className="text-xs text-zinc-500 mt-0.5">{f.description}</p>
      </div>
    </div>
  ))}
</div>
```

**Sameness Score impact:** −1 (identical grid pattern).

---

### v0-4: Floating "Popular" badge on pricing middle card

**Signal:** `Badge` or `span` with position absolute, transform translate-x/y, placed above the center pricing card. Often text: "Most Popular" or "Best Value."

```tsx
// BEFORE (v0 default)
<div className="relative rounded-2xl border-2 border-primary p-8 shadow-xl">
  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
    Most Popular
  </Badge>
  ...
</div>

// AFTER (differentiated)
<div className="rounded-lg border border-zinc-900 dark:border-zinc-100 p-8">
  <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-6">
    Recommended
  </span>
  ...
</div>
```

**Sameness Score impact:** −1 (floating badge element).

---

### v0-5: Gradient CTA button

**Signal:** Primary button with `bg-gradient-to-r from-[color] to-[color]` applied directly. Often paired with `hover:opacity-90` instead of a real hover state.

```tsx
// BEFORE (v0 default)
<Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 px-8 py-3 rounded-xl text-lg">
  Get Started
</Button>

// AFTER (differentiated)
<Button className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 px-6 py-2.5 rounded-md text-sm font-medium">
  Connect your repo
</Button>
```

**Sameness Score impact:** −1 (gradient + generic CTA copy). Also fixes −1 from "Get Started" copy.

---

### v0-6: `rounded-2xl` on every container

**Signal:** `rounded-2xl` or `rounded-3xl` applied uniformly to cards, modals, inputs, and wrappers regardless of element type.

```tsx
// BEFORE (v0 default)
<div className="rounded-2xl border bg-card/50 backdrop-blur-sm shadow-xl p-8">
  <Input className="rounded-2xl ..." />
  <Button className="rounded-2xl ..." />
</div>

// AFTER (differentiated)
<div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
  <Input className="rounded-md ..." />
  <Button className="rounded-md ..." />
</div>
```

**Sameness Score impact:** −0.5 (no direct Sameness Score indicator but reduces "polished AI card" feel).

---

### v0-7: Inter font (implicit, no decision)

**Signal:** No explicit font import in the component or root layout. The default Next.js `next/font/google` import is `Inter`.

```tsx
// BEFORE (v0 default — no font decision, Inter is just there)
// In layout.tsx: const inter = Inter({ subsets: ['latin'] })

// AFTER (differentiated — explicit font decision tied to persona)
// developer-tool: Geist Sans + Geist Mono
// consumer-saas: Plus Jakarta Sans
// b2b-enterprise: IBM Plex Sans
// creative-tool: Satoshi or Cabinet Grotesk
// e-commerce: Neue Montreal or DM Sans
```

**Sameness Score impact:** −1 (Inter with no explicit choice).

---

## Lovable

Lovable (formerly GPT Engineer) favors warmer, rounder, more consumer-friendly aesthetics. It reaches for rounded fonts (Poppins, Nunito, Plus Jakarta Sans), softer gradients in pinks/greens/teals, and Framer Motion animations on most visible elements. The copy is aspirational and marketing-heavy.

### lovable-1: Rounded display font with no fallback

**Signal:** Import of `Poppins`, `Nunito`, or `Plus Jakarta Sans` from Google Fonts with no explicit fallback font stack.

```tsx
// BEFORE (Lovable default)
import { Poppins } from 'next/font/google'
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700', '800'] })

// AFTER (differentiated — match persona)
// Replace with persona-appropriate font choice. See references/fonts.md.
// The issue is not the font itself — it's using a rounded display font as the default
// without a reason tied to product character.
```

**Sameness Score impact:** −0.5 (font choice itself not in rubric, but it signals AI consumer-saas default).

---

### lovable-2: Warm gradient background section

**Signal:** Section backgrounds using gradient stops in warm ranges: lime/emerald, teal/cyan, or pink/rose, often as a bottom-of-hero accent.

```tsx
// BEFORE (Lovable default)
<section className="bg-gradient-to-b from-white to-emerald-50 dark:from-zinc-950 dark:to-emerald-950/20">
  ...
</section>

// AFTER (differentiated)
<section className="bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900">
  ...
</section>
```

**Sameness Score impact:** −1 (gradient background on non-primary surface).

---

### lovable-3: Framer Motion entrance on every visible element

**Signal:** `motion.div` or `motion.section` with `initial={{ opacity: 0, y: 20 }}` and `animate={{ opacity: 1, y: 0 }}` applied to nearly every component, including static content like nav items.

```tsx
// BEFORE (Lovable default)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h1>Your headline here</h1>
</motion.div>

// AFTER (differentiated)
// Remove entrance animations from static content. Reserve motion for:
// - State transitions (modal open/close, drawer, toast)
// - Progress indicators (loading bar, progress ring)
// - Data changes (number increments, chart updates)
<div>
  <h1>Your headline here</h1>
</div>
```

**Sameness Score impact:** −0.5 (no direct rubric indicator, but bounce/entrance animation is a known tell).

---

### lovable-4: "Transform your [X]" / "Elevate your [Y]" headline

**Signal:** Marketing verbs transform, elevate, revolutionize, supercharge in H1 or H2 combined with a possessive "your [noun]."

```tsx
// BEFORE (Lovable default)
<h1>Transform Your Workflow Forever</h1>
<h2>Elevate Your Team's Productivity</h2>

// AFTER (differentiated)
// Replace with a specific, concrete claim. What does the product actually do?
<h1>Ship features your users asked for — in days, not quarters.</h1>
```

**Sameness Score impact:** −1 (marketing verb + generic value prop).

---

### lovable-5: Emoji in feature cards or section headings

**Signal:** Emoji (🚀 ⚡ ✨ 🎯 💡) used as the feature "icon" in a grid of feature cards, or embedded in section headings.

```tsx
// BEFORE (Lovable default)
<div className="feature-card">
  <span className="text-3xl">🚀</span>
  <h3>Blazing Fast</h3>
  <p>10x faster than alternatives</p>
</div>

// AFTER (differentiated)
<div className="feature-card">
  <RocketIcon className="h-5 w-5 text-zinc-500" />
  <h3>Fast builds</h3>
  <p>P95 build time: 45s</p>
</div>
```

**Sameness Score impact:** −0.5 (emoji-as-icon is a consumer/marketing-site pattern, not a product UI pattern).

---

### lovable-6: Glassmorphism card on colored background

**Signal:** `backdrop-blur-md bg-white/10 border border-white/20` card placed on a gradient or colored section background.

```tsx
// BEFORE (Lovable default)
<section className="bg-gradient-to-br from-violet-600 to-indigo-700 py-24">
  <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">
    ...
  </div>
</section>

// AFTER (differentiated)
<section className="bg-zinc-950 py-24 border-t border-zinc-900">
  <div className="border border-zinc-800 rounded-lg p-8">
    ...
  </div>
</section>
```

**Sameness Score impact:** −1 (gradient background + frosted card is a compound tell).

---

## Bolt.new (StackBlitz)

Bolt.new produces a "tech startup circa 2024" aesthetic: cyan-purple neon palette, background grid patterns, glassmorphism, and glow effects. It is visually aggressive — high contrast, high saturation, high decoration.

### bolt-1: Cyan-to-purple gradient as primary action color

**Signal:** `from-cyan-500 to-purple-600` or `from-blue-400 to-violet-600` gradients on buttons, headings, or section accents.

```tsx
// BEFORE (Bolt default)
<Button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-full">
  Start Building
</Button>

// AFTER (differentiated)
<Button className="bg-zinc-900 text-white border border-zinc-700 hover:border-zinc-500 px-6 py-2.5 rounded-md text-sm">
  Start building
</Button>
```

**Sameness Score impact:** −2 (gradient + rounded-full pill button is a compound tell).

---

### bolt-2: CSS background grid pattern

**Signal:** `bg-[url('/grid.svg')]` or inline CSS `background-image: linear-gradient(...)` to produce a dot or line grid on the page background.

```tsx
// BEFORE (Bolt default)
<div
  className="min-h-screen"
  style={{
    backgroundImage: `radial-gradient(circle at center, rgba(6,182,212,0.05) 0%, transparent 70%),
                      url("data:image/svg+xml,%3Csvg width='60' height='60' ...%3E")`,
  }}
>

// AFTER (differentiated)
<div className="min-h-screen bg-zinc-950">
```

**Sameness Score impact:** −1 (background decoration pattern).

---

### bolt-3: Neon border glow on feature cards

**Signal:** `shadow-[0_0_20px_rgba(6,182,212,0.3)]` or similar box-shadow glow on card borders, combined with `border-cyan-500/30`.

```tsx
// BEFORE (Bolt default)
<div className="rounded-xl border border-cyan-500/30 bg-zinc-900/80 p-6 
                shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-sm">
  ...
</div>

// AFTER (differentiated)
<div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
  ...
</div>
```

**Sameness Score impact:** −1 (neon-adjacent glow outside gaming context).

---

### bolt-4: "Powered by AI" / "AI-native" badge on features

**Signal:** Every feature or section flagged as AI-related with a badge, icon, or copy that leads with "AI-powered," "AI-native," or "Built with AI."

```tsx
// BEFORE (Bolt default)
<div className="feature-card">
  <Badge variant="outline" className="text-cyan-400 border-cyan-400/30 mb-3">
    AI-Powered
  </Badge>
  <h3>Smart Automation</h3>
</div>

// AFTER (differentiated)
<div className="feature-card">
  <h3>Automation</h3>
  <p>Learns from your team's past decisions to suggest next steps.</p>
</div>
```

**Sameness Score impact:** −0.5 (AI prefix on features is copy tell, not visual rubric item directly).

---

### bolt-5: Full-width hero with animated gradient orb

**Signal:** Absolutely positioned `div` in the hero with `animate-pulse` or `animate-spin` slow, emitting a large radial glow. Often multiple overlapping orbs.

```tsx
// BEFORE (Bolt default)
<div className="relative">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] 
                  bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
  <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] 
                  bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
  <div className="relative z-10 flex flex-col items-center text-center py-32">
    ...
  </div>
</div>

// AFTER (differentiated)
<div className="py-24 px-8 max-w-4xl">
  <div className="flex flex-col gap-6">
    ...
  </div>
</div>
```

**Sameness Score impact:** −3 (multiple tells: radial gradient, centered hero, animated decoration).

---

### bolt-6: Rounded-full pill CTA buttons

**Signal:** Primary CTA buttons using `rounded-full` with large horizontal padding (`px-8` or `px-10`), producing an oversized pill shape.

```tsx
// BEFORE (Bolt default)
<button className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-10 py-4 
                   text-lg font-bold text-white shadow-lg shadow-cyan-500/30">
  Get Started Free
</button>

// AFTER (differentiated)
<button className="rounded-md bg-white text-zinc-900 px-5 py-2 text-sm font-medium 
                   hover:bg-zinc-100 transition-colors">
  Try it free
</button>
```

**Sameness Score impact:** −1 (pill shape + gradient is compound tell; "Get Started" copy is +1 additionally).

---

## Cursor Composer

Cursor Composer produces more developer-oriented designs than the others — closer to correct but with recognizable tells. It defaults to dark mode zinc palettes, dense layouts, and occasionally includes IDE-like split-pane structures. The biggest tells are AI-prefixed feature names, heavy use of Markdown-rendered code blocks in hero sections, and thin borders used uniformly throughout.

### cursor-1: AI-prefixed feature names everywhere

**Signal:** Feature names that start with "AI" as a modifier: "AI Autocomplete," "AI Search," "AI Review," "AI Assistant." This is a labeling pattern, not a design one.

```tsx
// BEFORE (Cursor default)
<ul>
  <li>AI Code Completion</li>
  <li>AI Bug Detection</li>
  <li>AI Refactoring</li>
  <li>AI Documentation</li>
</ul>

// AFTER (differentiated)
<ul>
  <li>Code completion that finishes your thought</li>
  <li>Flags the bug before you run the test</li>
  <li>Restructures the function, not just the name</li>
  <li>Writes the JSDoc from what the function does</li>
</ul>
```

**Sameness Score impact:** −0.5 (copy tell; not a visual rubric item but strongly signals AI-generation).

---

### cursor-2: Hero section with inline code block

**Signal:** A code block (`pre`/`code` or a styled div) in the hero section showing the product's key interaction, centered under the headline.

```tsx
// BEFORE (Cursor default)
<section className="flex flex-col items-center text-center gap-8 py-24">
  <h1 className="text-5xl font-bold">Code at the speed of thought</h1>
  <div className="rounded-lg bg-zinc-900 border border-zinc-700 p-6 text-left w-full max-w-2xl">
    <pre className="text-sm text-green-400 font-mono">
      {`// AI suggestion\nconst optimizedQuery = db.users\n  .where({ active: true })\n  .select(['id', 'email'])`}
    </pre>
  </div>
  <Button>Try Cursor</Button>
</section>

// AFTER (differentiated — developer-tool persona)
<section className="py-16 px-8 max-w-4xl">
  <div className="flex gap-4 items-start mb-6">
    <span className="font-mono text-xs text-zinc-500 mt-1.5">→</span>
    <h1 className="text-4xl font-semibold tracking-tight text-zinc-100">
      Code at the speed of thought
    </h1>
  </div>
  <div className="grid grid-cols-2 gap-0 rounded-lg overflow-hidden border border-zinc-800">
    <div className="bg-zinc-900 p-4 border-r border-zinc-800">
      <span className="text-xs font-mono text-zinc-500 block mb-3">before</span>
      <pre className="text-sm text-zinc-400 font-mono">{`users.where(active: true)\n.select(:id, :email)`}</pre>
    </div>
    <div className="bg-zinc-950 p-4">
      <span className="text-xs font-mono text-zinc-500 block mb-3">after</span>
      <pre className="text-sm text-zinc-100 font-mono">{`users.where(active: true)\n.select(:id, :email)\n.explain`}</pre>
    </div>
  </div>
</section>
```

**Sameness Score impact:** −1 (centered hero layout; the before/after approach retains the code element while removing centering).

---

### cursor-3: Uniform thin zinc borders

**Signal:** `border border-zinc-700/50` or `border-zinc-800` applied to every container at the same weight — cards, inputs, code blocks, feature sections — with no visual hierarchy through border variation.

```tsx
// BEFORE (Cursor default — all same weight)
<div className="border border-zinc-800 rounded-lg p-6">
  <div className="border border-zinc-800 rounded p-3 mb-4">  {/* nested same weight */}
    <input className="border border-zinc-800 rounded px-3 py-2 bg-zinc-900" />
  </div>
</div>

// AFTER (differentiated — border hierarchy)
<div className="border border-zinc-800 rounded-lg p-6">        {/* container */}
  <div className="rounded bg-zinc-900/50 p-3 mb-4">           {/* inner — no border, use bg */}
    <input className="border border-zinc-700 rounded px-3 py-2 bg-zinc-950 
                      focus:border-zinc-500 focus:outline-none" />
  </div>
</div>
```

**Sameness Score impact:** −0.5 (no direct rubric item, but same-weight borders is a recognizable tell).

---

### cursor-4: Split-pane layout (sidebar + main) as default

**Signal:** Page layout immediately reaches for a 2-column split with a narrow sidebar (`w-64` or `w-72`) even for marketing pages or onboarding flows where density isn't needed.

```tsx
// BEFORE (Cursor default — over-applied split-pane)
<div className="flex h-screen">
  <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-4">
    {/* nav items */}
  </aside>
  <main className="flex-1 p-8">
    {/* content that doesn't need a sidebar */}
  </main>
</div>

// AFTER (differentiated — use split-pane only for actual app UIs)
// For marketing/landing: single column, max-w-4xl centered
// For app UIs: split-pane is fine, but sidebar width should match content needs
<div className="max-w-4xl mx-auto px-8 py-16">
  {/* content */}
</div>
```

**Sameness Score impact:** −0.5 (structural pattern, no direct rubric item).

---

### cursor-5: `text-primary` where primary defaults to indigo/violet

**Signal:** Using semantic color tokens (`text-primary`, `bg-primary`, `border-primary`) without overriding the default Shadcn `primary` which maps to a blue/indigo hue. The actual hex rarely appears in Cursor output — it uses the token and inherits the default.

```tsx
// BEFORE (Cursor default — inherited indigo primary)
<Button variant="default">  {/* renders with bg-primary = indigo */}
<span className="text-primary font-medium">New feature</span>

// AFTER (differentiated — explicit color decision)
// In globals.css: override --primary to match persona
// developer-tool: --primary: zinc-900 (near-black)
// b2b-enterprise: --primary: slate-700
// consumer-saas: --primary: warm custom color (not indigo)
// Then your components inherit the right palette automatically.
```

**Sameness Score impact:** −1 (implicit Inter font pattern analog — using default tokens without a decision).

---

### cursor-6: Dense icon + label sidebar nav with no active-state logic

**Signal:** Navigation items with `flex items-center gap-2 text-sm` structure where all items are rendered identically regardless of active state — no visual differentiation for the current route.

```tsx
// BEFORE (Cursor default — all nav items look identical)
{navItems.map((item) => (
  <a key={item.href} href={item.href}
     className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
    <item.Icon className="h-4 w-4" />
    {item.label}
  </a>
))}

// AFTER (differentiated — active state has semantic distinction)
{navItems.map((item) => (
  <a key={item.href} href={item.href}
     className={cn(
       "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
       isActive(item.href)
         ? "bg-zinc-800 text-zinc-100 font-medium"
         : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
     )}>
    <item.Icon className={cn("h-4 w-4", isActive(item.href) ? "text-zinc-100" : "text-zinc-600")} />
    {item.label}
  </a>
))}
```

**Sameness Score impact:** −0.5 (interaction quality tell, not in visual rubric but signals incomplete design).

---

## Quick Identification Heuristic

When you receive an AI-generated design and need to identify the source quickly:

| Dominant color | Most likely tool | Confidence |
|----------------|-----------------|------------|
| Violet/indigo gradient | v0 | High |
| Warm gradient (emerald/teal, pink) | Lovable | High |
| Cyan + purple neon | Bolt.new | High |
| Zinc mono palette, dark default | Cursor Composer | Medium |

| Structural tell | Most likely tool |
|----------------|-----------------|
| 3-column feature grid + floating badge | v0 |
| Framer Motion on static content | Lovable |
| Animated blur orbs behind hero | Bolt.new |
| Split-pane layout on marketing page | Cursor Composer |

| Copy tell | Most likely tool |
|-----------|-----------------|
| "Get Started" CTA | v0 |
| "Transform/Elevate your [noun]" | Lovable |
| "Start Building Free" | Bolt.new |
| "AI [Feature Name]" | Cursor Composer |

If the design hits patterns from multiple tools: it was likely iterated across tools, or the generator blended defaults. Apply the highest-impact fixes from each tool's section.
