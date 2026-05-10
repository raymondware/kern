# /kern differentiate

Takes an existing AI-generated design and makes it not look AI-generated. The problem is specific: AI tools (v0, Lovable, Bolt.new, Cursor Composer) produce designs that pattern-match to a small set of defaults. This command identifies those defaults and replaces them with intentional decisions.

---

## Trigger

```
/kern differentiate
```

Then paste the code, screenshot description, or component you want to fix.

---

## What This Does

Differentiate does NOT restyle the design from scratch. It makes surgical replacements to the elements that signal AI-default output. The goal is to produce a design that keeps the structure but removes the tells.

---

## Workflow

### Step 1: Identify the AI Tells

Score the input against the Sameness Score rubric from `${CLAUDE_PLUGIN_ROOT}/agents/design-critic.md`. List every element that adds to the score.

For per-tool fingerprints (which tells belong to v0 vs Lovable vs Bolt.new vs Cursor), read `references/ai-fingerprints.md` first. Use the Quick Identification Heuristic table to identify which tool likely generated the design, then apply that tool's specific fixes.

Common v0/Lovable/Bolt defaults to look for:

**Visual tells:**
- `linear-gradient(135deg, #6366f1, #ec4899)` or any purple/pink gradient
- `radial-gradient` behind a centered hero headline
- `bg-clip-text text-transparent` gradient text on any heading
- `shadow-xl` on cards that don't represent floating elements
- `rounded-2xl` or `rounded-3xl` on every container
- Inter font with no explicit choice
- `text-primary` where primary is a purple or indigo hue
- `border-l-4 border-[color]` side-stripe accent on callout cards
- 3-column feature grid with `Icon + h3 + p` repeated identically
- Badge/pill elements floating near a hero headline

**Copy tells:**
- "Get Started" as a primary CTA
- "Everything you need to..." as a subheadline
- "Powerful [noun] for [audience]" as a headline
- "Streamline your workflow" anywhere
- "Transform how your team [verb]s" anywhere
- Feature names that use the word "Smart" ("Smart Search", "Smart Automation")
- Checkmark list of 6 identical-weight features

**Layout tells:**
- `flex flex-col items-center text-center` hero section
- Hero > Features grid > Testimonials > CTA section as the page structure
- Three identical cards in the features section
- A pricing section with 3 columns where the middle is highlighted

### Step 2: Prioritize the Changes

Rank the tells by Sameness Score impact. Start with the highest-impact changes:

1. Remove gradient backgrounds (score impact: -2 to -3)
2. Replace gradient/centered hero with left-aligned structure (score impact: -1 to -2)
3. Replace Inter with a deliberate font choice based on persona (score impact: -1)
4. Rewrite generic CTAs and headlines (score impact: -1 to -2)
5. Remove decorative shadows and over-rounded corners (score impact: -1)
6. Replace identical 3-card feature grid with varied layout (score impact: -1)

### Step 3: Confirm the Persona

Before making changes, confirm or detect the persona. Different personas require different replacements.

- Developer tool: left-align, increase density, remove marketing copy, add specificity
- Consumer SaaS: warm the palette, add progression to onboarding, improve empty states
- Creative tool: reduce chrome competition, add keyboard shortcut visibility
- B2B Enterprise: increase data density, remove consumer warmth, formalize copy
- E-commerce: focus the add-to-cart, reduce competing CTAs, add trust signals

### Step 4: Apply Changes

Make only the changes identified in Step 2. Do not redesign. Do not add features. Do not change the information architecture.

For each change, show:
```
CHANGE: [what element]
FROM: [original code/copy]
TO: [replacement code/copy]
REASON: [which AI tell this removes]
```

### Step 5: Report the New Score

After changes: calculate the new Sameness Score. Show the before/after.

Target: 4 or below. If you cannot get below 5 with targeted changes, say so and recommend `/kern design` to rebuild from scratch with persona-first generation.

---

## What This Does Not Do

- Does not rebuild from scratch (use `/kern design` for that)
- Does not change the information architecture or feature set
- Does not apply stylistic preferences beyond removing AI tells
- Does not add new UI elements

The test: does the design still look like the same thing, but no longer look like AI made it?

---

## Examples

One worked example per tool. Each shows: identified tells → surgical changes → new score.

---

### Example: v0 output (developer-tool persona)

**Input:** Standard v0-generated landing page with centered hero, purple gradient, "Get Started" CTA, 3 feature cards.

**Identified tells (Sameness Score: 9/10):**
- Centered hero + radial gradient background: +2
- Gradient text on headline: +1
- Inter font, no explicit choice: +1
- "Get Started" CTA: +1
- 3 identical rounded-2xl feature cards: +1
- Floating "Most Popular" badge: +1
- Gradient CTA button: +1
- Glow behind headline: +1

**Changes:**

```
CHANGE: Hero section layout
FROM: flex flex-col items-center text-center + radial gradient bg
TO: max-w-4xl px-8 py-24 (left-aligned, flat bg-zinc-950)
REASON: Centered + glow is the #1 AI tell. +2 sameness score removed.

CHANGE: Hero headline
FROM: "Transform Your Workflow Forever"
TO: "Deploy previews on every PR. No config."
REASON: Aspiration headline + marketing verb. Replaced with specific capability.

CHANGE: Primary CTA
FROM: "Get Started"
TO: "Connect Your Repo"
REASON: Vague CTA is default v0 output. Replaced with specific action.

CHANGE: Font
FROM: Inter (default, no explicit import)
TO: Geist Sans (explicit import, matches developer-tool persona)
REASON: Inter with no font decision = AI default.

CHANGE: Feature grid
FROM: 3 identical rounded-2xl cards with icon + h3 + p
TO: 3-item list with numbered anchors and varied content lengths
REASON: Identical card grid is the most common AI template pattern.
```

**Sameness Score: 9/10 → 2/10**

---

### Example: Lovable output (consumer-saas persona)

**Input:** Lovable-generated onboarding hero for a habit-tracking app. Warm emerald gradient section, Framer Motion on every element, "Elevate Your Daily Routine" headline, emoji feature icons.

**Identified tells (Sameness Score: 8/10):**
- Warm gradient background section (emerald/teal): +1
- Centered hero + CTA: +1
- Gradient text on headline: +1
- Framer Motion entrance on static content: visible but not a direct rubric indicator
- "Elevate Your [noun]" marketing verb headline (copy tell): +1
- Emoji-as-icon in feature grid: +1
- Glassmorphism card on colored background: +1
- Poppins font, no fallback (consumer-saas tell): +1
- "Get Started" CTA: +1

```tsx
// BEFORE (Lovable default)
<section className="bg-gradient-to-b from-white to-emerald-50 py-24">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center text-center gap-6"
  >
    <h1 className="text-5xl font-bold bg-clip-text text-transparent
                   bg-gradient-to-r from-emerald-600 to-teal-600">
      Elevate Your Daily Routine
    </h1>
    <p className="text-xl text-zinc-500 max-w-lg">
      Transform how you build habits. Supercharge your morning.
    </p>
    <Button className="bg-gradient-to-r from-emerald-500 to-teal-500
                       rounded-full px-10 py-4 text-white text-lg">
      Get Started Free
    </Button>
  </motion.div>
  <div className="grid grid-cols-3 gap-8 mt-20">
    {[
      { emoji: "🎯", title: "Track Goals", desc: "Set and monitor..." },
      { emoji: "⚡", title: "Build Streaks", desc: "Stay consistent..." },
      { emoji: "✨", title: "Celebrate Wins", desc: "Reward yourself..." },
    ].map((f) => (
      <div key={f.title}
           className="backdrop-blur-md bg-white/60 border border-white/40
                      rounded-2xl p-8 shadow-xl">
        <span className="text-4xl block mb-4">{f.emoji}</span>
        <h3 className="font-semibold text-lg">{f.title}</h3>
        <p className="text-zinc-500 text-sm">{f.desc}</p>
      </div>
    ))}
  </div>
</section>
```

**Changes:**

```
CHANGE: Section background
FROM: bg-gradient-to-b from-white to-emerald-50
TO: bg-white dark:bg-zinc-950 border-b border-zinc-100
REASON: Warm gradient background is a Lovable default. -1

CHANGE: Remove Framer Motion from static content
FROM: motion.div with initial/animate entrance on hero
TO: plain div — motion is for state transitions, not page load
REASON: Entrance animation on static content is a Lovable/consumer tell.

CHANGE: Hero layout
FROM: flex flex-col items-center text-center
TO: flex flex-col gap-4 (left-aligned, no centering)
REASON: Centered hero -1.

CHANGE: Headline
FROM: "Elevate Your Daily Routine" (gradient text, marketing verb)
TO: "Miss a day? Tide shows you why — and resets the streak gently."
REASON: Gradient text -1. Marketing verb -1. Replaced with specific product behavior.

CHANGE: CTA
FROM: "Get Started Free" (gradient rounded-full button)
TO: "Start your first habit" (bg-zinc-900 rounded-md)
REASON: "Get Started" -1. Gradient button -1. Pill shape removed.

CHANGE: Feature icons
FROM: emoji (🎯 ⚡ ✨) as feature card icons
TO: lucide-react icons at h-5 w-5 text-zinc-400
REASON: Emoji-as-icon is consumer-marketing default.

CHANGE: Feature cards
FROM: backdrop-blur glassmorphism on white gradient section
TO: plain div with border-b border-zinc-100, no backdrop-blur
REASON: Glassmorphism on gradient = compound Lovable tell. -1
```

```tsx
// AFTER (differentiated — consumer-saas persona)
<section className="bg-white dark:bg-zinc-950 border-b border-zinc-100
                    dark:border-zinc-900 py-20 px-8">
  <div className="max-w-2xl flex flex-col gap-4">
    <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
      Habit tracking
    </p>
    <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-100
                   leading-tight">
      Miss a day? Tide shows you why — and resets the streak gently.
    </h1>
    <p className="text-base text-zinc-500 max-w-md">
      Designed for one habit at a time. Not a dashboard for your ambitions.
    </p>
    <Button className="w-fit bg-zinc-900 text-white hover:bg-zinc-800
                       dark:bg-zinc-100 dark:text-zinc-900 rounded-md
                       px-5 py-2.5 text-sm font-medium">
      Start your first habit
    </Button>
  </div>
  <div className="mt-16 flex flex-col gap-0">
    {[
      { Icon: TargetIcon, title: "One habit at a time",
        desc: "Tide is not a goal tracker. Pick one thing." },
      { Icon: FlameIcon, title: "Streak recovery, not streak anxiety",
        desc: "Miss a day — Tide asks what got in the way." },
      { Icon: CheckIcon, title: "Private by default",
        desc: "No social feed. No badges. Just you and your habit." },
    ].map((f, i) => (
      <div key={f.title}
           className="flex gap-4 items-start py-5
                      border-b border-zinc-100 dark:border-zinc-900">
        <f.Icon className="h-5 w-5 text-zinc-400 mt-0.5 shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {f.title}
          </h3>
          <p className="text-sm text-zinc-500 mt-0.5">{f.desc}</p>
        </div>
      </div>
    ))}
  </div>
</section>
```

**Sameness Score: 8/10 → 2/10**

---

### Example: Bolt.new output (b2b-enterprise persona)

**Input:** Bolt.new-generated dashboard hero for a fintech analytics platform. Cyan-purple gradient CTA, animated blur orbs behind the headline, background dot-grid pattern, "Start Building Free" CTA.

**Identified tells (Sameness Score: 9/10):**
- Radial gradient orbs (animated): +2 (hero glow + radial gradient)
- Cyan-to-purple gradient button: +1
- Background grid pattern: +1
- Dark background with neon-adjacent accent: +1
- "Start Building Free" CTA: +1
- Centered hero + CTA: +1
- Rounded-full pill button: +1
- "AI-Powered" badge on features: +1

```tsx
// BEFORE (Bolt default)
<div className="relative min-h-screen bg-zinc-950 overflow-hidden"
     style={{ backgroundImage: `url("data:image/svg+xml,...")` }}>
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-[600px] h-[600px] bg-cyan-500/20 rounded-full
                  blur-3xl animate-pulse" />
  <div className="absolute top-1/3 left-2/3 w-[400px] h-[400px]
                  bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
  <div className="relative z-10 flex flex-col items-center text-center
                  gap-8 py-32">
    <Badge className="border-cyan-400/30 text-cyan-400">AI-Powered Analytics</Badge>
    <h1 className="text-6xl font-bold bg-clip-text text-transparent
                   bg-gradient-to-r from-cyan-400 to-purple-600">
      Build Smarter Dashboards
    </h1>
    <Button className="rounded-full bg-gradient-to-r from-cyan-500
                       to-purple-600 px-10 py-4 text-lg font-bold
                       shadow-lg shadow-cyan-500/30">
      Start Building Free
    </Button>
  </div>
</div>
```

**Changes:**

```
CHANGE: Background decoration (orbs + grid)
FROM: animated radial orbs + dot-grid background-image
TO: bg-zinc-950 (flat, no decoration)
REASON: Orbs = +2 (radial gradient + glow). Grid = decoration pattern. -3 total.

CHANGE: Hero layout
FROM: flex flex-col items-center text-center
TO: grid grid-cols-[1fr_1fr] gap-16 (split: headline left, stats right)
REASON: Centered hero -1. B2b-enterprise persona prefers data-forward layouts.

CHANGE: Headline
FROM: gradient text "Build Smarter Dashboards"
TO: plain text "Counterpart tracks 14 contract signals your team misses manually."
REASON: Gradient text -1. Generic claim replaced with specific domain capability.

CHANGE: CTA button
FROM: rounded-full gradient from-cyan-500 to-purple-600 "Start Building Free"
TO: rounded-md bg-white text-zinc-950 "Request access"
REASON: Gradient -1. Pill shape removed. "Start Building" → specific gate action.

CHANGE: AI badge on features
FROM: Badge with "AI-Powered Analytics" as the lede
TO: Remove badge entirely. Capability is stated in the headline.
REASON: AI-prefix badge is a Bolt.new tell. Enterprise buyers read it as vapor.
```

```tsx
// AFTER (differentiated — b2b-enterprise persona)
<div className="min-h-screen bg-zinc-950">
  <div className="max-w-6xl mx-auto px-8 py-20">
    <div className="grid grid-cols-2 gap-16 items-start">
      <div className="flex flex-col gap-6">
        <span className="text-xs font-mono uppercase tracking-widest
                         text-zinc-500">
          Contract lifecycle management
        </span>
        <h1 className="text-4xl font-semibold text-zinc-100 leading-tight">
          Counterpart tracks 14 contract signals
          your team misses manually.
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          Built for legal ops teams at Series B–D companies.
          Not a document store — a workflow system.
        </p>
        <div className="flex gap-3">
          <Button className="rounded-md bg-white text-zinc-950
                             hover:bg-zinc-100 px-5 py-2.5
                             text-sm font-medium">
            Request access
          </Button>
          <Button variant="ghost"
                  className="rounded-md text-zinc-400
                             hover:text-zinc-100 px-5 py-2.5 text-sm">
            See a demo →
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Avg. time to signature", value: "4.2d", delta: "−38%" },
          { label: "Contracts in review", value: "847", delta: "live" },
          { label: "Missed renewal windows", value: "0", delta: "this quarter" },
          { label: "Counterparty response rate", value: "91%", delta: "+12pp" },
        ].map((stat) => (
          <div key={stat.label}
               className="border border-zinc-800 rounded-lg p-5">
            <p className="text-xs text-zinc-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-semibold text-zinc-100 font-mono">
              {stat.value}
            </p>
            <p className="text-xs text-zinc-600 mt-1">{stat.delta}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
```

**Sameness Score: 9/10 → 1/10**

---

### Example: Cursor Composer output (developer-tool persona)

**Input:** Cursor Composer-generated marketing page for a developer monitoring tool. Split-pane layout on a marketing page, AI-prefixed feature list, uniform thin zinc borders throughout, text-primary defaulting to indigo.

**Identified tells (Sameness Score: 6/10):**
- Centered hero + CTA: +1
- Inter / default font (text-primary resolves to indigo): +1
- Split-pane layout on marketing page: structural tell
- AI-prefixed feature names: copy tell
- Uniform same-weight borders at every nesting level: visual tell
- "Get Started" CTA: +1
- Badge floating near headline: +1

```tsx
// BEFORE (Cursor default)
<div className="flex h-screen bg-zinc-950">
  <aside className="w-64 border-r border-zinc-800 p-4 flex flex-col gap-1">
    <div className="px-3 py-2 text-sm font-medium text-primary">Dashboard</div>
    {navItems.map((item) => (
      <a key={item.href} href={item.href}
         className="flex items-center gap-2 px-3 py-2 rounded-md text-sm
                    text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
        <item.Icon className="h-4 w-4" />
        {item.label}
      </a>
    ))}
  </aside>
  <main className="flex-1 flex flex-col items-center text-center p-16">
    <Badge className="border-zinc-700 text-primary mb-4">AI-Powered</Badge>
    <h1 className="text-5xl font-bold text-zinc-100 mb-4">
      Code at the speed of thought
    </h1>
    <ul className="text-left text-sm text-zinc-400 space-y-2 mt-8">
      <li>✓ AI Code Completion</li>
      <li>✓ AI Bug Detection</li>
      <li>✓ AI Refactoring</li>
      <li>✓ AI Documentation</li>
    </ul>
    <Button className="mt-8 bg-primary text-primary-foreground px-8 py-3
                       rounded-xl">
      Get Started
    </Button>
  </main>
</div>
```

**Changes:**

```
CHANGE: Page layout
FROM: h-screen flex with w-64 sidebar on a marketing page
TO: max-w-4xl mx-auto px-8 py-16 single-column
REASON: Split-pane on a marketing page is a structural Cursor tell. Reserve
        sidebar for actual app UIs where the nav is functional.

CHANGE: Hero alignment
FROM: flex flex-col items-center text-center
TO: flex flex-col gap-6 (left-aligned)
REASON: Centered hero -1.

CHANGE: Primary token override
FROM: text-primary / bg-primary (inherits indigo default)
TO: Explicit color classes; override --primary in globals.css to zinc-900
REASON: Inheriting default primary = AI default tell. -1.

CHANGE: Feature list copy
FROM: "AI Code Completion", "AI Bug Detection", "AI Refactoring", "AI Documentation"
TO: Concrete benefit statements (see after)
REASON: AI-prefix on every feature is the #1 Cursor Composer copy tell.

CHANGE: CTA
FROM: "Get Started" (bg-primary rounded-xl)
TO: "Connect your codebase" (bg-zinc-900 rounded-md explicit)
REASON: "Get Started" -1. rounded-xl removed. Explicit color replaces token.

CHANGE: Floating badge
FROM: Badge "AI-Powered" near headline
TO: Removed
REASON: Badge near headline -1. AI-prefix is redundant if the product shows capability.

CHANGE: Nav active state
FROM: All nav items rendered identically (no active state)
TO: Active item: bg-zinc-800 text-zinc-100 font-medium / inactive: text-zinc-500
REASON: No active-state distinction signals incomplete design.
```

```tsx
// AFTER (differentiated — developer-tool persona)
// globals.css: --primary: 24 24 27; (zinc-900)

<div className="max-w-4xl mx-auto px-8 py-16">
  <div className="flex flex-col gap-6">
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs text-zinc-500">→</span>
      <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
        Monitoring
      </span>
    </div>
    <h1 className="text-4xl font-semibold tracking-tight text-zinc-100">
      Code at the speed of thought
    </h1>
    <ul className="flex flex-col gap-0 text-sm">
      {[
        "Completes your thought before you finish the line",
        "Flags the bug before you run the test",
        "Restructures the function, not just the name",
        "Writes the JSDoc from what the function does",
      ].map((item, i) => (
        <li key={i}
            className="flex gap-4 items-start py-3
                       border-b border-zinc-800">
          <span className="font-mono text-xs text-zinc-600 w-5 mt-0.5">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-zinc-300">{item}</span>
        </li>
      ))}
    </ul>
    <div className="flex gap-3 mt-2">
      <Button className="rounded-md bg-zinc-100 text-zinc-900
                         hover:bg-white px-5 py-2.5 text-sm font-medium">
        Connect your codebase
      </Button>
      <Button variant="ghost"
              className="rounded-md text-zinc-500 hover:text-zinc-300
                         px-5 py-2.5 text-sm">
        Read the docs →
      </Button>
    </div>
  </div>
</div>
```

**Sameness Score: 6/10 → 1/10**
