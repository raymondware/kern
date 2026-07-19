# Persona: Consumer SaaS

Products in this category: productivity tools, note-taking, task management, scheduling, habit tracking, personal finance, journaling, calendar tools.

Users: Individuals or small teams. Non-technical. Evaluate on feel and ease of use. They will not read docs. They will bounce if the first 30 seconds are confusing.

---

## Core Aesthetic

Approachable. Clear. Slightly warm. Not medical, not corporate, not startup-cool.

The interface should feel like something a real person built for real people. Not a template, not a corporate product, not an AI output. Intentional whitespace, readable type, one clear next action at any moment.

Think: Notion, Cron (before Notion acquired it), Things 3, Readwise, Superhuman.

---

## Font Pairing

**UI font:** Figtree (rounded, approachable without being childlike) or Plus Jakarta Sans (slightly more character than Inter).

Actually: think about what the product handles. A finance tool wants something more composed (Söhne, Graphik). A journaling tool could use a serif body (Newsreader). A task manager wants clean neutrality (Geist, or honestly system-ui).

**Avoid:** Space Grotesk (too geometric, not warm enough for consumer). Heavy display fonts in the app shell.

**Size discipline:** 15-16px body is comfortable. Use fluid type only on marketing pages, fixed scales in the app.

---

## Color Philosophy

Light mode default with a well-designed dark option.

The audience uses this during the day, on phones, in various lighting conditions. Light mode is the safer default.

- Use a warm white (`oklch(98% 0.004 80)`) not clinical white (`#fff`)
- Pick one accent color that matches the product's emotional register: finance = composed blue, productivity = clear green or orange, journaling = warm amber or mauve
- Avoid: cyber blue, purple, anything that reads as "tech startup"

---

## Layout Patterns

- **One primary action visible at all times.** What is the user here to do? That action should be the most obvious thing on screen.
- **Card layouts work here (one level only).** Consumer tools can use cards for items. Still not nested.
- **Mobile-first.** Many consumer SaaS users are on phones. Design for 375px, then expand.
- **Onboarding is the product's first impression.** It must be short, value-delivering, and not a feature tour.
- **Empty states are critical.** Consumer users do not have patience for empty screens. Fill them with sample data or a single clear action.

---

## Exemplars

- **Things 3** -- radical simplicity, every pixel intentional, no explanatory text because the interface explains itself
- **Cron** (original) -- showed that calendar software can be genuinely designed, not just functional
- **Readwise** -- reading-focused but dashboard is dense without feeling overwhelming
- **Buttondown** -- personal, copy-driven, earned polish from consistency not animation
- **Superhuman** -- email client that shows consumer SaaS can be fast, keyboard-driven, and still warm; the onboarding is short, opinionated, and gets you to value in under 2 minutes

---

## Signature Moves

Concrete Tailwind decisions that signal "consumer SaaS" identity.

**1. Warm white background — not clinical white**
```
// Before (AI default — pure white or cool gray)
<main className="bg-white min-h-screen">

// After (Consumer SaaS — slightly warm, human-feeling)
<main className="bg-[oklch(98%_0.004_80)] min-h-screen">
```

**2. Approachable card radius and padding**
```
// Before (AI default — sharp or generic)
<div className="rounded-lg p-4 border border-gray-200 shadow-sm">

// After (Consumer SaaS — rounded, inviting, softer shadow)
<div className="rounded-2xl p-5 border border-[oklch(90%_0.005_80)] shadow-[0_1px_4px_oklch(0%_0_0/0.06)]">
```

**3. Readable body type — not default small**
```
// Before (AI default — 14px, tight leading)
<p className="text-sm text-gray-600">

// After (Consumer SaaS — 15px, comfortable reading)
<p className="text-[15px] leading-relaxed text-[oklch(40%_0.01_80)]">
```

---

## Persona-Specific Anti-Patterns

**AP-CS-1: Tooltip-dependent UI**
Icons without labels that only reveal their meaning on hover. Consumer users do not hover -- they tap. Every action should be labeled or self-evident.

**AP-CS-2: Feature-first onboarding**
Walking the user through every feature before they do anything meaningful. Get the user to first value in under 3 steps. Everything else is discoverable.

**AP-CS-3: Overly transactional success states**
"Item created." "Task saved." "Event added." Consumer users want acknowledgment, not a database confirmation. "Done. You can find it in Today." is better.

**AP-CS-4: Dense information architecture from day one**
Showing the full sidebar, all settings, all features immediately. Progressive disclosure: start with the minimum needed to accomplish the first task. Add complexity as the user demonstrates readiness.

**AP-CS-5: Premium gate before value**
Hitting the user with upgrade prompts before they have experienced the product's value. Let them get something done. Then upsell.

---

## Pricing Page Patterns

Pricing pages are the highest-risk surface for consumer SaaS — AI tools converge on one template. These prescriptions apply whenever the brief includes "pricing", "plans", or "tiers".

### Structural differentiation (required)

Never generate three cards with identical inner structure. The recommended tier must differ structurally — not just by color highlight or a "Popular" badge, but by layout, information density, or visual weight.

**What NOT to do (AI default):**
```tsx
// Three identical cards — same layout, same CTA, just a highlighted middle
<div className="grid grid-cols-3 gap-6">
  {tiers.map(tier => (
    <div className={`rounded-xl p-6 border ${tier.featured ? 'border-purple-500' : 'border-gray-200'}`}>
      <h3>{tier.name}</h3>
      <p className="text-4xl font-bold">${tier.price}/mo</p>
      <ul>{tier.features.map(f => <li key={f}>✓ {f}</li>)}</ul>
      <Button>Get Started</Button>
    </div>
  ))}
</div>
```

**What to do instead — recommended tier elevated structurally:**
```tsx
// Free tier: minimal, text-forward, no chrome
<div className="py-8 px-6 border-b border-[oklch(90%_0.005_80)]">
  <span className="text-sm text-[oklch(50%_0.01_80)]">Free</span>
  <p className="mt-1 text-[oklch(20%_0.01_80)]">Everything you need to start a routine.</p>
  <p className="mt-3 text-2xl font-semibold tabular-nums">$0</p>
  <ul className="mt-4 space-y-1 text-sm text-[oklch(40%_0.01_80)]">
    <li>14-day streaks</li>
    <li>3 active habits</li>
    <li>Weekly summary</li>
  </ul>
  <a href="#" className="mt-6 inline-block text-sm font-medium text-[oklch(40%_0.01_80)] underline underline-offset-2">
    Start free
  </a>
</div>

// Recommended tier: visually elevated, different layout, different CTA style
<div className="rounded-2xl bg-[oklch(20%_0.01_80)] px-8 py-10 text-[oklch(96%_0.004_80)]">
  <div className="flex items-start justify-between">
    <div>
      <span className="text-xs font-medium tracking-widest uppercase text-[oklch(70%_0.01_80)]">Most chosen</span>
      <p className="mt-1 text-lg font-semibold">Plus</p>
    </div>
    <div className="text-right">
      <p className="text-3xl font-semibold tabular-nums">$8</p>
      <p className="text-xs text-[oklch(60%_0.01_80)]">/ month</p>
    </div>
  </div>
  <ul className="mt-6 space-y-2 text-sm text-[oklch(80%_0.005_80)]">
    <li>Unlimited habits</li>
    <li>Guided session library</li>
    <li>Streak protection (2×/month)</li>
    <li>Progress exports</li>
  </ul>
  <button className="mt-8 w-full rounded-xl bg-[oklch(96%_0.004_80)] py-3 text-sm font-semibold text-[oklch(15%_0.01_80)]">
    Begin your practice
  </button>
  <p className="mt-3 text-center text-xs text-[oklch(55%_0.01_80)]">Cancel any time. No renewal reminder spam.</p>
</div>
```

### Forbidden CTA labels

These exact strings (and their close synonyms) signal AI-default copy. Never use them:

| Forbidden | Use instead |
|-----------|-------------|
| "Get Started" | Product-specific action: "Begin your practice", "Start meditating", "Open Tide" |
| "Start Free Trial" | "Try free for 14 days", "Start free" |
| "Sign Up" (as a CTA on a pricing page) | "Create your account", "Join {product}" |
| "Choose Plan" | Remove — the tier card is already a choice UI |
| "Most Popular" badge | Use copy that explains *why*: "Most chosen by solo meditators" |

### Trust signals — specific, not decorative

Avoid avatar grids and generic star ratings (PSI-CS-3). Use product-specific trust signals:

```tsx
// Instead of: "★★★★★ Loved by 40,000+ users"
<p className="text-sm text-[oklch(45%_0.01_80)]">
  "I've kept a streak going for 4 months. Tide actually makes me want to open it."
  <span className="mt-1 block text-xs text-[oklch(60%_0.01_80)]">— Maya K., meditating since January</span>
</p>

// Policy copy — plain, specific, not marketing
<p className="text-xs text-[oklch(55%_0.01_80)]">30-day refund if it's not working for you. No questions.</p>
```

---

## Persona Sameness Indicators

These patterns are AI-default for consumer SaaS specifically. They supplement the global Sameness Score rubric. Each indicator present in the design adds +1 to the score.

**PSI-CS-1: Three-tier pricing with identical card structure**
A pricing page with exactly three cards — "Starter / Pro / Business" (or synonyms) — each containing the same layout: name, price, tagline, bullet-point feature list, CTA button. AI tools generate this for every pricing request. Real consumer SaaS pricing pages differentiate tiers structurally: one tier might emphasize social proof, one might show a feature comparison, one might be visually elevated. Identical structure signals template-thinking.

**PSI-CS-2: How-it-works section with 3 numbered steps and icons**
A section titled "How It Works" (or "Get Started in 3 Steps") containing three numbered items with an icon each: Step 1 = sign up, Step 2 = configure/add data, Step 3 = achieve goal. This is the most generated section in AI-built consumer SaaS landing pages. It communicates nothing a user couldn't infer from signing up. If present in the app shell (not a marketing page), it's almost always AI-generated.

**PSI-CS-3: Avatar grid "social proof" block**
A section with 3-6 circular avatar images, a star rating, and "Loved by 10,000+ users" (or similar) copy, placed near the CTA. AI tools insert this into every consumer SaaS layout as a trust signal. In practice, fake-looking avatar grids erode trust. Real trust signals are product-specific: named testimonials with context, publication logos, specific outcome data ("Saved 3 hours a week").
