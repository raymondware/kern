# /kern compare

Compares two designs for sameness -- either against each other or against the AI-default baseline. Useful when you suspect two outputs from the same tool look too similar, or when you want to verify that a redesign is actually different from the original.

---

## Trigger

```
/kern compare
```

Then paste Design A, then type `---`, then paste Design B.

Or:
```
/kern compare --vs-baseline
```

Compare a single design against the AI-default baseline only (no second design needed).

---

## What Gets Compared

### Option A: Two Designs Against Each Other

Produce a side-by-side analysis:

```markdown
## Comparison: Design A vs Design B

### Structural Similarities
- [list elements that are structurally identical: same layout pattern, same component types in same positions]

### Copy Similarities
- [list copy patterns that match: same headline type, same CTA style, same empty state approach]

### Visual Similarities
- [list visual decisions that match: same color approach, same font choice, same spacing rhythm]

### Sameness Score
- Design A: {n}/10
- Design B: {n}/10
- Overlap score: {n}/10 (how much the two designs resemble each other)

### Verdict
[One paragraph: are these two designs meaningfully different? If not, what specific changes would differentiate them?]
```

An **Overlap Score** above 6/10 means: these two designs will be perceived as variations of the same thing, not as two different products. Run `/kern differentiate` on at least one of them.

### Option B: Single Design vs AI Baseline

Compare the design against the known AI-default patterns:

```markdown
## AI Baseline Comparison: {design name}

### Matches AI Default
- [list every element that matches a known AI tool default, with the tool that produces it]

### Departures From Default
- [list elements where an intentional decision was made that deviates from AI defaults]

### Sameness Score: {n}/10
{Explanation}

### Assessment
{One paragraph: what's the biggest differentiator? What would a skilled designer notice first about this design that signals it was intentionally crafted?}
```

---

## The AI Tool Default Fingerprints

Known defaults to check against:

**v0 (Vercel AI):**
- Hero: centered, gradient background, large headline with `bg-clip-text`, "Get Started" CTA
- Features: 3 columns, Icon + bold heading + description, `rounded-xl` cards with `shadow-md`
- Font: Geist (fine, but default) or Inter
- Colors: indigo/purple primary, zinc neutrals

**Lovable:**
- More rounded corners (2xl-3xl everywhere)
- Warmer purple/pink palette
- More animated interactions (springy, bouncy)
- Landing page structure: hero > logos > features > testimonials > CTA
- CTA: "Start for free" or "Try [Product] free"

**Bolt.new:**
- Similar to v0 but more blue-heavy
- Code-on-screen marketing (showing code snippets in the hero as decoration)
- "Build anything" type headlines
- More developer-aesthetic but still generic

**Cursor Composer:**
- More varied layouts but still Inter-heavy
- Clean but neutral -- tends to underdesign rather than overdesign
- Missing font differentiation and color intentionality

**Generic AI (Midjourney UI prompts, ChatGPT design):**
- Glassmorphism: `backdrop-blur-md`, semi-transparent cards
- Gradient borders on cards
- Dark mode with neon green or cyan accents
- Animated counter sections ("10,000+ users")

---

## Comparison Rules

- Call the specific AI tool by name when you identify its fingerprint. Not "this looks generic" -- "this matches Lovable's default rounded-3xl + pink-purple palette."
- An Overlap Score is most useful for the person who commissioned two separate AI designs and wants to know if they're actually different.
- The Sameness Score measures AI-default-ness; the Overlap Score measures two-designs-sameness. Both can be high at the same time (both are generic AND similar to each other), or only one can be high (one is distinctive but happens to share structural choices with another distinctive design).

---

## Examples

One worked example per mode. Each shows realistic input context and the full comparison output.

---

### Example: Mode A — Two Designs Against Each Other

**Scenario:** Two kern-generated designs for different personas. Design A: consumer-saas pricing page (Tide, habit-tracking app). Design B: b2b-enterprise data table (Counterpart, contract lifecycle management).

**Output:**

```markdown
## Comparison: Design A vs Design B

### Sameness Scores
- Design A: 2/10 — indicators: none in rubric (warm palette, left-aligned layout, specific CTA)
- Design B: 1/10 — indicators: none (tabular, dense, domain language throughout)

### Overlap Score: 2/10
Layout 0/1 (pricing cards vs data table). Components 0/1 (tier card vs row + actions).
Copy 0/1 (warm/personal vs formal/functional). Color 0/1 (rose/warm-purple vs
institutional blue-gray). Font 1/1 (both Inter — different intent, not a shared default).
Spacing 0/1 (generous whitespace vs compact 13px rows). Score: 1/6 × 10 = 2.

### Structural Similarities
- Both use Inter as the UI font. Different intent: Tide uses it as a deliberate
  consumer-neutral register; Counterpart uses it as corporate-appropriate.
- Both include a primary action per unit (tier CTA button / row action menu).

### Structural Differences
- Layout: Tide uses a 3-column pricing card layout with the recommended tier elevated
  via a border accent and shadow; Counterpart uses a dense data table with frozen first
  column and compact 13px rows.
- Color: Tide uses warm rose tones with generous whitespace (bg-white, rose-600 accent);
  Counterpart uses `oklch(97% 0.003 240)` panel surface with muted blue accent.
- Type density: Tide card content at 16-18px; Counterpart table rows at 13px with
  `[font-variant-numeric:tabular-nums]` on all financial columns.
- Copy register: Tide's CTAs are personal ("Start meditating"); Counterpart's are
  functional ("Export selected", "New contract", "Archive").

### Verdict
These two designs are meaningfully different. Overlap Score 2/10 is well below the 6/10
concern threshold. The divergence is structural, not cosmetic: consumer-saas requires
warmth and forward progression; b2b-enterprise requires density and domain specificity.
No differentiation work needed on either design.
```

---

### Example: Mode B — Single Design vs AI Baseline

**Scenario:** A v0-generated pricing page for a developer observability tool. Key patterns in the input:
- `bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600` on the headline
- Three identical `rounded-2xl shadow-md` pricing cards; center card highlighted with a colored border
- CTA labels: "Get Started" (free), "Start Pro" (paid)
- Floating "Most Popular" badge on the recommended card
- Inter, no explicit import or declaration
- `bg-gradient-to-r from-purple-600 to-indigo-600` on the primary CTA button

**Output:**

```markdown
## AI Baseline Comparison: Pricing Page — developer-tool

### Matches AI Default
- Gradient headline (`bg-clip-text text-transparent`): matches v0 default — gradient text
  on hero/section headline
- Three identical `rounded-2xl shadow-md` cards: matches v0 default — uniform card grid
- "Get Started" CTA: matches v0/Lovable default — vague verb CTA, not action-specific
- Floating "Most Popular" badge on middle card: matches v0 default — badge near
  card header
- Gradient CTA button (purple → indigo): matches v0 default — gradient on primary action
- Inter with no explicit import or font decision: matches v0/generic default

### Departures From Default
- Pricing is annual-only with a monthly/annual toggle — intentional product constraint,
  not AI-default behavior
- Card copy names specific developer use cases ("up to 5 services", "unlimited pipelines")
  rather than generic feature labels — a design tool would not invent those terms

### Sameness Score: 7/10
Six rubric indicators hit: purple/blue gradient (headline + CTA button = +2), centered
hero with CTA (+1), identical 3-card feature grid (+1), floating badge (+1), Inter
default (+1), gradient text (+1). Score of 7 is the no-ship threshold.

### Assessment
The compound gradient stack (headline + CTA button + card border all purple/indigo
gradient) is the primary v0 fingerprint here. Removing gradients alone drops the score
to approximately 4/10. The developer-specific copy ("unlimited pipelines") is the
strongest existing differentiator and worth preserving. Run `/kern differentiate` to
target the gradient stack first; restructure the card grid second.
```

---

## Invocation from subagent

When a validation harness or automated system spawns a subagent to run the kern compare workflow, use the templates below. Two modes are supported, matching the interactive `--vs-baseline` flag.

### Mode A: Two Designs Against Each Other

Subagent prompt template:

```
You are running the kern /kern compare workflow for a validation run.

Design A path: {DESIGN_A_PATH}
Design B path: {DESIGN_B_PATH}
Output path: {OUTPUT_PATH}
Persona (optional, for context): {PERSONA or "unknown"}

Follow these steps in order.

Step 1 — Load designs:
  Read {DESIGN_A_PATH} and extract the TSX code block (under "Generated TSX").
  Read {DESIGN_B_PATH} and extract the TSX code block.
  Label them Design A and Design B internally.

Step 2 — Score each design independently:
  Read ${CLAUDE_PLUGIN_ROOT}/agents/design-critic.md.
  Apply the Sameness Score rubric to Design A. Record score + indicators hit.
  Apply the Sameness Score rubric to Design B. Record score + indicators hit.

Step 3 — Compute Overlap Score:
  Compare the two designs on these 6 dimensions. Score 0-1 per dimension (1 = identical):
    1. Layout pattern (same structural arrangement of elements?)
    2. Component types (same set of UI components in same positions?)
    3. Copy voice (same tone, same CTA style, same heading type?)
    4. Color approach (same palette family or same use of color?)
    5. Font choice (same typeface family or weight strategy?)
    6. Spacing rhythm (same density, same section spacing?)
  Overlap Score = sum / 6 * 10 (rounds to nearest integer, 0-10).

Step 4 — Save output to {OUTPUT_PATH}:
  Write a single markdown file with this structure:

  ## Comparison: Design A vs Design B

  ### Sameness Scores
  - Design A: {n}/10 — indicators: {list}
  - Design B: {n}/10 — indicators: {list}

  ### Overlap Score: {n}/10
  {One sentence: dimension-by-dimension breakdown}

  ### Structural Similarities
  - {element that is structurally identical in both}

  ### Structural Differences
  - {element where the two designs diverge}

  ### Verdict
  {One paragraph: are these meaningfully different? If Overlap Score > 6, name the specific changes needed.}
```

### Mode B: Single Design vs AI Baseline

Subagent prompt template:

```
You are running the kern /kern compare --vs-baseline workflow for a validation run.

Design path: {DESIGN_PATH}
Output path: {OUTPUT_PATH}
Persona: {PERSONA}

Follow these steps in order.

Step 1 — Load design:
  Read {DESIGN_PATH} and extract the TSX code block (under "Generated TSX").

Step 2 — Score against AI baseline:
  Read ${CLAUDE_PLUGIN_ROOT}/agents/design-critic.md.
  Apply the Sameness Score rubric. For each indicator hit, identify which AI tool it matches
  (v0, Lovable, Bolt.new, Cursor Composer, or Generic AI).
  Read ${CLAUDE_PLUGIN_ROOT}/references/ai-fingerprints.md for precise tool fingerprints.

Step 3 — Identify departures:
  For each design decision that does NOT match an AI default, note it explicitly.
  A "departure" is any choice a naive AI tool would not make for this component type and persona.

Step 4 — Save output to {OUTPUT_PATH}:
  Write a single markdown file with this structure:

  ## AI Baseline Comparison: {component name} — {persona}

  ### Matches AI Default
  - {element}: matches {tool name} default — {specific pattern}

  ### Departures From Default
  - {element}: {why this is a non-default choice}

  ### Sameness Score: {n}/10
  {One sentence explanation}

  ### Assessment
  {One paragraph: biggest differentiator, what a skilled designer would notice first.}
```

### What the validation harness does with the output

After the compare subagent completes:

1. The caller reads `{OUTPUT_PATH}` and extracts the `Overlap Score` (Mode A) or `Sameness Score` (Mode B).
2. An optional `external-judge` subagent can re-score Design A or B independently using `${CLAUDE_PLUGIN_ROOT}/agents/external-judge.md` if the sameness scores seem inconsistent.
3. Results are recorded in the harness's results file alongside the source design paths.

Regression threshold: an Overlap Score ≥ 7 between two designs that were supposed to be different personas means the differentiation workflow failed. Flag for human review.
