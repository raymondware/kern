# Persona: Developer Tool

Products in this category: CLIs, SDKs, deployment platforms, databases, monitoring tools, API services, infrastructure, IDEs, code editors, developer dashboards.

The primary user is a developer. They are evaluating technical quality, not aesthetic beauty. The design should communicate competence and respect the user's time. Nothing should perform polish -- the product should be polished.

---

## Font Pairing

**Display**: Geist Sans (Vercel) or JetBrains Mono if code-heavy headings are appropriate
- Signals precision without coldness
- Excellent at display sizes, holds up in dense UI
- Alternative: Berkeley Mono (premium, strong personality) for CLI-adjacent products

**Body**: Geist (regular-medium) or system-ui where file size matters
- Body text should disappear into readability, not assert personality
- Inter is acceptable here if chosen deliberately for neutrality

**Mono**: Geist Mono or JetBrains Mono
- Code samples, terminal output, log lines, config snippets
- Never use a display font for monospace contexts

**Avoid**: Space Grotesk (too quirky), Fraunces (too editorial), rounded fonts (Nunito, Poppins)

---

## Color Philosophy

**Background approach**: Near-black for dark mode as default. Light mode as secondary.

Developer tools default to dark mode because that is where developers spend their time. A developer tool that defaults to light mode is making an unusual choice that should be intentional.

```css
/* Dark mode base */
--background: 240 10% 4%;    /* zinc-950 variant, slight cool */
--surface: 240 6% 8%;        /* cards, panels */
--border: 240 6% 14%;        /* subtle structure */
--foreground: 0 0% 95%;      /* primary text */
--muted-foreground: 240 5% 55%; /* secondary text */

/* Accent: one color, used sparingly */
--accent: 263 70% 58%;       /* muted purple -- or whatever fits your product */
--accent-foreground: 0 0% 100%;
```

**Accent strategy**: One color. Used for: primary CTA, active state in navigation, key data signals. Not used for: decorative elements, section dividers, hover states on non-interactive elements.

**What to avoid**: Multiple accent colors, saturated gradients on primary surfaces, bright backgrounds that read as "consumer app."

---

## Layout Patterns

**Density**: High. Developer tools display information. Whitespace is not a signal of quality -- dense, legible information display is.

- Base padding on content: 16px (not 24px or 32px)
- Table rows: 36px tall, not 52px
- Sidebar items: 32px, not 48px
- Line height in UI: 1.4, not 1.6

**Grid approach**: Sidebar-heavy layouts. The sidebar is the primary navigation structure. It is not decorative.

```tsx
// Standard developer tool layout
<div className="flex h-screen">
  <aside className="w-56 shrink-0 border-r border-border">
    {/* Navigation: just a list. No icons unless they add meaning. */}
  </aside>
  <main className="flex-1 overflow-auto">
    {/* Content area */}
  </main>
</div>
```

**Tables over cards**: When displaying multiple items of the same type (jobs, deployments, users, logs), use a table or list, not a card grid. Cards introduce vertical space that works against density. Tables allow scanning.

**Data display**: Dense tabular data, log outputs, status indicators. Not charts for the sake of charts -- only when the chart answers a question faster than a number.

---

## Component Style

**Buttons**: Muted primary. No rounded-full unless explicitly counter-cultural. The primary action should be clear, not exuberant.

```tsx
// Primary button for developer tool
<Button className="rounded-md bg-zinc-100 text-zinc-900 hover:bg-white font-medium text-sm px-3 py-1.5">
  Deploy
</Button>
// or
<Button className="rounded-sm bg-violet-600 text-white hover:bg-violet-500 font-medium text-sm">
  Deploy
</Button>
```

**Forms**: Left-aligned labels, not floating labels. Full-width inputs in forms, constrained width in settings. No unnecessary decoration on form fields.

**Status indicators**: Color-coded with semantic meaning. Green = healthy, amber = warning, red = error. Never use these colors for brand decoration.

**Navigation**: Active state via background color shift or left border, not icon changes or animations.

---

## Exemplar Sites

**linear.app** (product, not marketing)
- Sidebar is a list. No icon animations. Active state is a subtle background.
- Issue list: compact, scannable. Every pixel earns its place.
- The design communicates that the product is fast by being visually fast.

**railway.app**
- Near-black background with warm temperature, not pure cold black
- One accent (purple), used only for active states and primary CTAs
- Log output is real, readable monospace at the right size
- Deployment view: complex state made clear without visual noise

**vercel.com/dashboard**
- High information density in small space
- Deployment status via subtle color-coded dots, not verbose labels
- Typography is consistent and functional -- no display type in product UI

**neon.tech**
- Dark-first product with precise typographic hierarchy
- Technical complexity shown through clear information architecture, not simplification
- SQL interface styled for actual use, not for screenshots

**planetscale.com** (reference period: 2022-2024)
- Documentation-quality information design in a product context
- Branch visualization that communicates git concepts to a database context
- Copy that respects the reader's technical knowledge

---

## Anti-Patterns Specific to Developer Tools

**Over-marketing a technical product**: Using lifestyle photography, gradient heroes, and "transform your workflow" copy for a product that developers evaluate on technical merit. Developers read marketing copy as a signal about who built the product. Heavy marketing on a technical product implies the technical quality is insufficient to sell itself.

**Hiding the product behind a demo wall**: "Book a demo" as the primary CTA for a developer tool signals that the product requires hand-holding, which is the opposite of the developer expectation. Show the product. GitHub stars, working demos, and public documentation outperform "book a demo" for developer acquisition.

**Lifestyle photography for a CLI tool**: Photography of people looking at screens or working in coffee shops does not communicate anything useful about a CLI, API, or infrastructure product. Use screenshots of actual output, architecture diagrams, or code samples.

**Consumer-register copy on a technical product**: "Magical", "delightful", "beautiful" -- these words signal that the writer is thinking about aesthetics rather than function. Developer tool copy should describe specific capabilities, specific performance characteristics, specific integrations. Save "magical" for consumer products.

**Forced dark mode toggle prominence**: Every developer tool feels obligated to show a sun/moon theme toggle in the nav. If your product has real dark mode, the toggle is fine. If dark mode is an afterthought, the toggle reveals it immediately. Build real dark mode before advertising it.

**Feature count as a design element**: "200+ integrations", "10,000+ users", "99.99% uptime" as large display typography in the hero section. These numbers invite scrutiny. If you display them prominently, they must be current and sourced. If they're aspirational or rounded, remove them.
