# Persona: Developer Tool

Products in this category: CI/CD dashboards, code review tools, API explorers, monitoring dashboards, deployment platforms, planning tools, incident management, documentation sites.

Users: Software engineers, DevOps, SREs. They are the primary user and the buyer. They evaluate on capability first, aesthetics second -- but they notice bad aesthetics immediately and distrust products that look amateur.

---

## Core Aesthetic

Dense. Precise. Respects the user's time and intelligence.

The interface should disappear. The data, status, and actions should be immediately readable. Visual hierarchy communicates priority, not personality.

Think: Linear, Vercel, Railway, Tailscale, Resend. Not Notion, not a consumer app.

---

## Font Pairing

**UI font:** Geist Sans, or system-ui as a deliberate choice (native feel).
Next option: Space Grotesk (more character, still sharp).

**Mono:** Geist Mono for code, logs, terminal output. JetBrains Mono if the product is deeply IDE-adjacent.

**Avoid:** Inter (fine but generic), Roboto (dated), any serif (wrong register for this context).

**Size discipline:** 13-14px for data rows, labels, nav. 15-16px for body. Large type only for state announcements (empty states, error pages). No hero typography inside the app.

---

## Color Philosophy

Default to dark. The audience works in dark environments and evaluates dark mode as a signal of quality.

- Base: `oklch(9% 0.008 220)` -- near-black, barely cool-tinted
- Surface: `oklch(13% 0.009 220)` -- one step up from base for cards
- Border: `oklch(22% 0.012 220)` -- subtle, enough to define edges
- Text primary: `oklch(93% 0.005 220)`
- Text secondary: `oklch(52% 0.018 220)`
- Accent: ONE color. Muted. Used for: active state, primary CTA, key status indicators.

Status colors: muted, never neon. Differentiate by shape and label first, color second.

---

## Layout Patterns

- **Data tables over card grids.** Scannable rows beat decorative cards when there is more than 5-6 items.
- **Tight row density.** 36-44px row height. Developers scan lists fast.
- **Left-aligned, not centered.** Center alignment is for marketing pages.
- **Information on hover, not always-visible.** Secondary actions in row hover states keep the baseline clean.
- **Sidebar + main content.** Standard two-column layout is fine here. Do not "innovate" navigation.
- **Status always above the fold.** The most important state (is everything healthy?) should be answerable without scrolling.

---

## Exemplars

- **Linear** -- keyboard-first, icon + label shortcuts visible in UI, 13px dense rows
- **Vercel** -- deployment status as the center, no chrome around the absence of activity
- **Railway** -- graph topology for infrastructure, reserved color for status only
- **Tailscale** -- ACL editor is just a code editor; trust your users
- **Resend** -- email API dashboard that treats the developer as the user; log viewer, delivery status, and API keys all first-class; no decorative chrome, no onboarding wizard

---

## Signature Moves

Concrete Tailwind decisions that signal "developer tool" identity. Use these when kern generates code for this persona.

**1. Dense row sizing — not card padding**
```
// Before (AI default — card-padded, too loose)
<tr className="py-4 px-6 text-sm">

// After (Developer Tool — tight rows, mono data)
<tr className="py-2 px-3 text-[13px] font-mono">
```

**2. Cool-dark borders, not generic gray**
```
// Before (AI default — bright gray border)
<div className="border border-gray-700 rounded-lg">

// After (Developer Tool — barely-there cool tint)
<div className="border border-white/[0.06] rounded">
```

**3. Muted accent, not electric blue**
```
// Before (AI default — saturated Tailwind blue)
<button className="bg-blue-500 hover:bg-blue-600 text-white">

// After (Developer Tool — muted, high-trust)
<button className="bg-[oklch(42%_0.06_220)] hover:bg-[oklch(50%_0.07_220)] text-white">
```

---

## Hero Section Patterns

The hero section for a developer tool is the highest-risk surface for AI defaults. It is a marketing page component, but it must signal "designed for engineers" — not "designed to appeal to a generic tech buyer." These prescriptions apply whenever the brief includes "hero", "landing", "marketing page", or "homepage" for a developer tool.

### The left-aligned status rule

Never center the headline and CTA. Centering is a consumer/marketing default. Developer tools are left-aligned because the audience left-aligns their terminals, editors, and dashboards.

The hero layout has two columns:
- Left: product claim (short, precise) + primary action + credibility signal
- Right: the actual interface — a real screenshot or a data surface. NOT a glowing terminal mock.

### What NOT to do (AI defaults that add to Sameness Score)

- **Centered headline + CTA** — the first AI default for any SaaS hero; wrong for a technical audience
- **"Ship faster" or "Move fast" headline copy** — developer tool marketing cliché; say what the product actually does
- **Floating terminal screenshot with glowing border** — see PSI-DT-1; real tools show real UI, not promotional mocks
- **Three-column icon grid below the hero** — feature list by icon count is the lowest-trust way to convey capability
- **Purple/blue/cyan gradient background** — see anti-patterns/visual.md; signals AI generation immediately
- **Radial glow behind the headline** — decorative, says nothing about the product
- **KPI cards showing zeros** — show demo data, not "Get started to see metrics"

### TSX signature: left-aligned status hero

```tsx
// Before (AI default — centered, gradient, glowing mock, "Ship faster")
<section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center text-center">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.3)_0%,_transparent_70%)]" />
  <div className="relative z-10 max-w-4xl mx-auto px-4">
    <h1 className="text-6xl font-bold text-white mb-6">Ship Faster with Confidence</h1>
    <p className="text-xl text-gray-300 mb-8">The CI/CD platform built for modern teams</p>
    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
      Get Started Free
    </Button>
    <div className="mt-16 rounded-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden">
      <img src="/dashboard-screenshot.png" alt="Dashboard" />
    </div>
  </div>
</section>

// After (developer-tool — left-aligned, dark, operational data in the right column)
<section className="bg-[oklch(9%_0.008_220)] min-h-screen flex items-center">
  <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 gap-16 items-center">

    {/* Left: claim + action + credibility */}
    <div>
      {/* Status badge — shows the product is already working */}
      <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded border border-[oklch(22%_0.012_220)] bg-[oklch(13%_0.009_220)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[oklch(65%_0.15_142)]" />
        <span className="text-[11px] font-mono text-[oklch(52%_0.018_220)]">3,241 pipelines observed today</span>
      </div>

      <h1 className="text-[oklch(93%_0.005_220)] text-4xl font-semibold leading-[1.15] tracking-tight">
        Pipeline visibility<br />
        <span className="text-[oklch(52%_0.018_220)]">for platform teams.</span>
      </h1>

      <p className="mt-4 text-[oklch(52%_0.018_220)] text-[15px] leading-relaxed max-w-sm">
        Drift correlates deploy events, log streams, and alert signals into a single timeline — no dashboards to configure.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <a
          href="#"
          className="px-4 py-2 text-[13px] font-medium rounded bg-[oklch(93%_0.005_220)] text-[oklch(9%_0.008_220)] hover:bg-white transition-colors"
        >
          Connect your first pipeline
        </a>
        <a href="#" className="text-[13px] text-[oklch(52%_0.018_220)] hover:text-[oklch(70%_0.01_220)] transition-colors">
          Read the docs →
        </a>
      </div>

      {/* Credibility: specific, not "Loved by 10,000 teams" */}
      <p className="mt-8 text-[11px] text-[oklch(35%_0.01_220)] font-mono">
        Used by platform teams at Vercel, Retool, and Fly.io
      </p>
    </div>

    {/* Right: actual data surface — not a glowing mock */}
    <div className="rounded border border-[oklch(22%_0.012_220)] bg-[oklch(13%_0.009_220)] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[oklch(22%_0.012_220)]">
        <span className="text-[12px] font-mono text-[oklch(52%_0.018_220)]">main · last 24h</span>
        <span className="text-[11px] font-mono text-[oklch(65%_0.15_142)]">● all systems nominal</span>
      </div>

      {/* Pipeline rows — data table, not cards */}
      {[
        { pipeline: "deploy/production", duration: "2m 14s", status: "pass", sha: "a3f9c1e", ts: "4m ago" },
        { pipeline: "test/integration",  duration: "4m 02s", status: "pass", sha: "a3f9c1e", ts: "4m ago" },
        { pipeline: "deploy/staging",    duration: "1m 55s", status: "pass", sha: "b7d2a0f", ts: "18m ago" },
        { pipeline: "test/unit",         duration: "38s",    status: "pass", sha: "b7d2a0f", ts: "18m ago" },
        { pipeline: "deploy/production", duration: "—",      status: "fail", sha: "c1e8b3d", ts: "2h ago" },
      ].map((row, i) => (
        <div
          key={i}
          className="flex items-center px-4 py-2 border-b border-[oklch(18%_0.01_220)] last:border-0 hover:bg-[oklch(16%_0.009_220)] transition-colors"
        >
          {/* Status: shape + color, not color alone */}
          <span className={`mr-3 w-1.5 h-1.5 rounded-full flex-shrink-0 ${row.status === 'pass' ? 'bg-[oklch(65%_0.15_142)]' : 'bg-[oklch(60%_0.15_25)]'}`} />
          <span className="flex-1 text-[13px] font-mono text-[oklch(70%_0.01_220)]">{row.pipeline}</span>
          <span className="text-[12px] font-mono text-[oklch(40%_0.01_220)] mr-6">{row.duration}</span>
          <span className="text-[11px] font-mono text-[oklch(35%_0.01_220)]">{row.sha}</span>
          <span className="ml-6 text-[11px] font-mono text-[oklch(35%_0.01_220)] w-14 text-right">{row.ts}</span>
        </div>
      ))}
    </div>

  </div>
</section>
```

**Why this works:** Left alignment signals "app, not marketing." The status badge shows live operational context before the user reads a word. The right column is a data table — the thing the product actually does — not a screenshot of a terminal inside a glowing card. Credibility is specific (named companies) not generic ("10,000 teams"). Font choices: Geist Sans for UI, mono for all data values.

---

## Persona-Specific Anti-Patterns

**AP-DT-1: Feature-count landing pages**
Listing every feature with an icon in a 3-column grid. Developers do not evaluate tools by feature count. They evaluate by signal of quality and fit. One concrete capability demonstrated > a list of 12 features.

**AP-DT-2: Marketing voice in the app**
Copy that says "You're all set!" after setup, or "Welcome back, [name]!" on every login. Developers do not need encouragement from their tools. State the status and move on.

**AP-DT-3: Onboarding wizard for technical setup**
Step 1: Connect GitHub. Step 2: Configure webhook. Step 3: Send a test event. Developers read docs. A single "quickstart" code snippet beats a 5-step modal wizard.

**AP-DT-4: Hiding the API**
Burying the API docs, SDK links, or raw endpoint access behind "Integrations" or "Advanced". Developer tools should surface the API as a primary affordance, not an escape hatch.

**AP-DT-5: Dashboard with no real data in the hero metric**
A KPI card that says "0 deployments" or "Get started to see your metrics" in the main dashboard view. Show something useful even before the user has data. Show the last 30 days of activity, or a demo state, not an empty card with "No data yet."

---

## Persona Sameness Indicators

These patterns are AI-default for developer tools specifically. They supplement the global Sameness Score rubric. Each indicator present in the design adds +1 to the score.

**PSI-DT-1: Floating terminal screenshot with gradient glow border**
A hero section that places a screenshot of a terminal, code editor, or log stream inside a rounded card with a colored glow effect around the border (e.g., `shadow-blue-500/20`). This is the canonical AI-generated "developer tool marketing" aesthetic. Real developer tool UIs don't glow. The hero should show the actual interface, not a promotional mock of it.

**PSI-DT-2: Circular gauge charts for operational metrics**
Using `<Progress>` rings or donut charts to display metrics like uptime percentage, build success rate, or deployment frequency. AI tools default to circular gauges because they look impressive in a screenshot. Real platform engineers read numbers and sparklines, not gauges. Prefer: number + trend arrow + 30-day sparkline.

**PSI-DT-3: Neon/saturated accent in a dark-mode shell**
Using `#00FF00`, `#00FFFF`, `#7C3AED`, or similarly saturated colors as the primary accent against a dark background, invoking "terminal aesthetic." Real developer tools (Linear, Vercel, Railway) use one muted accent at ≤50% chroma. Neon signals "designed to look like a developer tool" rather than "designed to be used by developers."
