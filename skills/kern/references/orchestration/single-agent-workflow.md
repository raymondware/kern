# /kern design

Full design workflow: persona detection, reference gathering, generation, critic check, copy edit, present.

This command solves the "everything looks the same" problem by forcing persona-specific decisions before any generation happens.

---

## Trigger

```
/kern design [description of what to build]
```

Example:
```
/kern design  hero section for a CI/CD dashboard targeting devops engineers
/kern design  pricing page for a consumer habit-tracking app
/kern design  empty state for a B2B contract management tool
```

---

## Edge Case Pre-flight

Run these checks before Step 1. They gate the rest of the workflow.

### Empty Input

If the brief is missing or fewer than 5 words, stop immediately:

> "I need a brief to generate from. What are you building? Example: `hero section for a CI/CD dashboard targeting devops engineers`"

Do not proceed until the user provides a description with at least a component/area name and a product context.

### Page-Level vs Component Detection

Scan the brief for page-level signals: "page", "landing page", "full page", "homepage", "sign up page", "settings page", "onboarding", "dashboard layout".

If a page-level signal is found, enter **page mode**:
- Generate a full-page layout skeleton with section placeholders rather than a single component
- Announce mode: "Generating page-level layout for {persona}. This produces a page skeleton with 3-5 sections. For individual components, re-run with a specific section name."
- Structure output as a `<main>` wrapper with multiple named sections (e.g., `<HeroSection />`, `<FeaturesSection />`, `<CTASection />`) rather than a single component
- Apply all anti-patterns and persona decisions to each section independently

If no page-level signal is found, stay in **component mode** (default).

### Mobile-Only Detection

Scan the brief for mobile signals: "mobile", "mobile-only", "mobile-first", "iOS", "Android", "phone", "native-feeling", "thumb reach".

If a mobile signal is found, activate **mobile-first constraints**:
- Announce: "Applying mobile-first constraints. Base classes target small screens; desktop styles use `md:` prefix."
- All Tailwind classes must use mobile-as-base pattern: start with the mobile class, add breakpoint overrides for larger screens (e.g., `flex-col md:flex-row`)
- Touch targets: minimum `h-12` (48px) for all interactive elements
- Typography: body copy `text-base` (never smaller on mobile), headings proportional
- No hover-only interactions — use tap/press patterns instead

If no mobile signal is found, use the default (desktop-first with responsive classes).

---

## Workflow

### Step 1: Detect or Confirm Persona

Score each persona on the brief's signals (0-3 strong matches per persona):
- `developer-tool`: developers, engineers, DevOps, APIs, dashboards, monitoring, CI/CD, deployment, platform, observability
- `consumer-saas`: productivity, personal, individual users, habits, notes, tasks, wellness, subscriptions
- `creative-tool`: designers, creatives, visual work, canvas, art, music, generative, illustration, animation
- `b2b-enterprise`: enterprise, B2B, procurement, contracts, compliance, HR, ops teams, mid-market, legal
- `e-commerce`: shop, store, products, cart, checkout, DTC, collection page, listing, pricing for goods

After scoring, output:
```
Persona detected: {persona}
Confidence: {0.0–1.0}
Runner-up: {persona or "none"}
```

Confidence guide:
- 1.0 — Brief uses explicit domain terms for exactly one persona, no overlap
- 0.7–0.9 — Strong signal for one persona, one or two signals for another
- 0.5–0.69 — Hybrid brief: meaningful signals across two personas
- < 0.5 — Genuinely ambiguous; two or more personas equally plausible

**If confidence < 0.7 (interactive / user mode):** Stop and ask:
> "This brief has mixed signals. Best match: {persona} ({confidence}). Runner-up: {runner_up}. Proceed with {persona}, or switch to {runner_up}?"
Only continue after the user responds.

**If confidence < 0.7 (subagent / automated mode):** Do not stop. Proceed with the detected persona and include a `Persona Confidence` line in the output. Log it so the caller can flag it.

#### Ambiguous Brief Examples

These briefs score below 0.7 confidence and would trigger the confirmation step in interactive mode:

1. **"pricing page for a developer-focused productivity tool"**
   - Signals: `productivity`, `individual users` → consumer-saas (0.5); `developers`, `platform` → developer-tool (0.5)
   - Detected: `consumer-saas` (0.5) | Runner-up: `developer-tool`
   - Why ambiguous: the word "developer" could mean end-users are developers (dev-tool aesthetic) or the tool was built by developers for general productivity (consumer-saas aesthetic). Ask which.

2. **"analytics dashboard for a small business owner tracking sales"**
   - Signals: `dashboard`, `monitoring` → developer-tool (0.4); `enterprise`, `ops teams` → b2b-enterprise (0.4); `individual users` → consumer-saas (0.2)
   - Detected: `b2b-enterprise` (0.4) | Runner-up: `developer-tool`
   - Why ambiguous: "small business owner" implies a non-technical single user (consumer-saas), but "analytics dashboard" pulls toward developer-tool density. Ask whether users are business owners or analysts.

3. **"card component for a creative asset marketplace"**
   - Signals: `shop`, `products`, `listing` → e-commerce (0.5); `designers`, `creatives`, `visual work` → creative-tool (0.5)
   - Detected: `e-commerce` (0.5) | Runner-up: `creative-tool`
   - Why ambiguous: a marketplace sells things (e-commerce) but the buyers are creatives (creative-tool aesthetic). Cards would look very different: e-commerce = price+CTA prominence, creative-tool = visual canvas feeling with minimal chrome.

4. **"empty state for a team habits and goals tracker"**
   - Signals: `habits`, `productivity`, `individual users` → consumer-saas (0.5); `team`, `enterprise`, `ops teams` → b2b-enterprise (0.45)
   - Detected: `consumer-saas` (0.5) | Runner-up: `b2b-enterprise`
   - Why ambiguous: "habits" is personal (consumer-saas), but "team" implies multi-user admin workflows (b2b-enterprise). Empty state copy and visual tone differ sharply: consumer-saas uses friendly encouragement, b2b-enterprise uses neutral status language.

5. **"hero section for a design tool used by engineering teams"**
   - Signals: `designers`, `visual work`, `canvas` → creative-tool (0.45); `developers`, `engineers`, `platform` → developer-tool (0.45)
   - Detected: `developer-tool` (0.45) | Runner-up: `creative-tool`
   - Why ambiguous: Figma-like tools serve both. Creative-tool hero would use lush imagery and generous whitespace; developer-tool hero would use dense technical proof points and monospace accents. Ask which end-user mindset to optimize for.

Once persona is confirmed, read `${CLAUDE_PLUGIN_ROOT}/skills/kern/references/personas/{persona}.md` fully before proceeding.

### Step 2: Load References

Call the `design-researcher` agent with the confirmed persona and design goal. Wait for references before generating.

Apply the references: identify 2-3 specific decisions from the references that will differentiate this output from the AI default.

State these decisions explicitly before generating:
> "Based on the [persona] persona and references, I'm making these differentiation decisions:
> 1. {specific decision, e.g., "left-aligned header with tabular-mono timestamp instead of centered headline"}
> 2. {specific decision}
> 3. {specific decision}"

### Step 3: Generate

Build the component/page with:
- All decisions from Step 2 applied
- Anti-patterns from `${CLAUDE_PLUGIN_ROOT}/anti-patterns/visual.md` actively avoided
- Copy that matches the persona voice from `${CLAUDE_PLUGIN_ROOT}/agents/copy-editor.md` voice guide
- Tailwind + Shadcn/Radix stack unless otherwise specified

**TSX output constraints (required for compilability — validate with `${CLAUDE_PLUGIN_ROOT}/tools/render-check.sh`):**
- Tailwind classes only — no inline `style={}` props, no CSS modules, no external stylesheets
- Shadcn imports use the exact path alias `@/components/ui/{name}` (e.g., `import { Button } from "@/components/ui/button"`)
- Self-contained: the component renders with no props — use hardcoded, realistic demo data for any lists or content
- Single default export (e.g., `export default function HeroSection() { ... }`)
- Minimal hooks: no `useEffect`, no external API calls, no custom hooks from unknown paths
- Any `cn()` utility imported from `"@/lib/utils"`
- **Root element must carry an explicit font-family class.** Omitting a font class causes the judge to score +1 for "default sans-serif with no explicit choice." Use the Tailwind arbitrary-value syntax on the outermost element's `className`. Persona map:
  - `developer-tool` → `[font-family:'Geist_Sans',system-ui,sans-serif]`
  - `consumer-saas` → `[font-family:'Figtree',system-ui,sans-serif]`
  - `creative-tool` → `[font-family:'Plus_Jakarta_Sans',system-ui,sans-serif]` (or `[font-family:'Canela',Georgia,serif]` for illustration-heavy products)
  - `b2b-enterprise` → `[font-family:'Inter',system-ui,sans-serif]`
  - `e-commerce` → `[font-family:'Geist',system-ui,sans-serif]` for body; add `[font-family:'Cormorant_Garamond',Georgia,serif]` on product name elements if the brand uses editorial type

### Step 4: Self-Check Before Presenting

Before showing output, mentally apply the Sameness Score from `${CLAUDE_PLUGIN_ROOT}/agents/design-critic.md`. Score your own output.

**Revision limit: 2 passes maximum.** If self-score is 7 or higher on the first pass: go back to Step 3 and change at least 3 elements. If still 7+ after a second revision, present the output anyway with a warning:
> "Score remains {n}/10 after 2 revision passes — proceeding with best attempt. Consider adjusting the persona reference or using `/kern differentiate` for further de-defaulting."

If self-score is 5-6: note this in the output and flag which elements could be further differentiated.

### Step 5: Copy Audit

Check all copy in the generated output against `${CLAUDE_PLUGIN_ROOT}/anti-patterns/copy.md`. Fix violations inline. Apply the persona voice.

### Step 6: Present

Output format:
```
## [Component/Page Name] -- [Persona]

### Persona Detected
{persona} — confidence {0.0–1.0}{, runner-up: {persona} if confidence < 1.0}

### Differentiation Decisions
- [decision 1 and why it was made]
- [decision 2]
- [decision 3]

### Sameness Score: [n]/10
[One sentence explanation]

[Generated code]
```

---

## What Not To Do

- Do not generate before confirming the persona. Generic output is the failure mode this command exists to prevent.
- Do not skip the differentiation decisions step. Making them explicit forces intentional choices.
- Do not present output with a sameness score above 6. Run more iterations.
- Do not use the same font/color/layout decisions across different personas. If the developer-tool hero and the consumer-saas hero look structurally similar, something went wrong.

---
