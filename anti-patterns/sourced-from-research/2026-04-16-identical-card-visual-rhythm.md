---
date: 2026-04-16
ai_tool: v0, Cursor, Claude Code, Lovable (all apply template-same card structure to every list)
sources:
  - platform: reddit
    context: r/webdev, r/reactjs -- threads on dashboard and list UI quality
    quote: "Every card in my AI-generated dashboard was identical. Same size, same structure, same padding, same icon position. It looked like a component library demo. I had to go through and manually differentiate each one to make it feel like a real product."
  - platform: hn
    context: HN "Show HN" comment threads on vibe-coded apps
    quote: "Don't make them identical. Two with trend arrows, one with a progress bar, one with comparison text. Variation keeps it from feeling robotic. The AI treats every data point as interchangeable — real design doesn't."
additional_sources: 3
---

# Identical Card Repetition Without Visual Rhythm

**Pattern**: Dashboard and list views where every card receives the same template: same height, same internal structure, same content hierarchy. A metrics dashboard where all four stat cards are identical in layout: big number, small label, gray subtext in a 2x2 grid. A feature list where all six items have icon-left, heading, two lines of body text at the same height, with the same bottom border. The cards could be shuffled in any order and the page would look the same.

**Why it fails** (from community): The AI treats every card in a data set as semantically interchangeable, so it applies the same template to all of them. Real design recognizes that even within a card grid, not all data is equal: some metrics have trends, some are boolean, some have comparison points, some are just totals. The pattern "feels robotic" precisely because it ignores these semantic differences. "Variation keeps it from feeling robotic" -- mixing trend arrows, progress bars, comparison text, and sparklines in the same grid signals that a person made intentional choices about how to show different types of data.

The rhythm problem also appears in list layouts: "When same layout is used consecutively, hero, hero, hero, it stops working. Rhythm requires variation: Hero, then grid, then chart, then list."

Community language: "robotic cards," "template repetition," "component library dump."

**Fix**: Before generating a card grid, list the semantic types in the data and assign appropriate visualization to each. Metrics that have time trends get sparklines or delta arrows. Boolean states get toggle-style displays. Ranked lists get position indicators. Percentages get progress bars. The visual variety communicates the data variety.

```tsx
// Not this -- same template for every metric
{metrics.map(m => (
  <div key={m.id} className="rounded-xl border p-6">
    <p className="text-3xl font-bold tabular-nums">{m.value}</p>
    <p className="text-sm text-zinc-500 mt-1">{m.label}</p>
  </div>
))}

// This -- varied presentation matched to data semantics
<div className="grid grid-cols-2 gap-4">
  {/* Metric with trend */}
  <MetricCard
    value={activeUsers}
    label="Active users"
    trend={{ direction: "up", value: "+12%", period: "vs last week" }}
  />

  {/* Metric with progress toward goal */}
  <MetricCard
    value={mrr}
    label="MRR"
    goal={goalMrr}
    progress={(mrr / goalMrr) * 100}
  />

  {/* Boolean operational status */}
  <StatusCard
    label="API health"
    status="operational"
    uptime="99.97% (30d)"
  />

  {/* Sparkline for time-series */}
  <TrendCard
    value={deployments}
    label="Deployments"
    series={deploymentsTimeSeries}
  />
</div>
```

## Sources

- dev.to/kiwibreaksme: "Your Vibe-Coded App Looks Ugly" -- "don't make them identical... variation keeps it from feeling robotic"
- Reddit r/webdev: "My AI dashboard cards all look the same" (2025)
- HN: "Show HN" review threads consistently noting card uniformity as polish failure
- dev.to/a_shokn: "Break the AI-Generated UI Curse" -- "card-based layouts that feel like everyone else's"
