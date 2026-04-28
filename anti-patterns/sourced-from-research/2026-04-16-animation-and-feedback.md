---
date: 2026-04-16
sources:
  - url: https://www.superblocks.com/blog/lovable-dev-review
    platform: blog
    votes_or_engagement: "product review"
    quote: "Forms submit and nothing happens. No loading state, no confirmation, no error. It's a blank stare."
  - url: https://trickle.so/blog/bolt-new-review
    platform: blog
    votes_or_engagement: "product review"
    quote: "Most images are broken or showing completely wrong content. Bolt grabs from Unsplash but doesn't verify context."
additional_sources: 3
tools: ["lovable", "cursor", "bolt.new", "generic"]
---

# Animation, Feedback, and Detail Gaps

**Pattern cluster**: Five patterns around motion, feedback states, iconography, typography, and asset handling. These are the gaps that separate "looks designed" from "actually designed."

---

## Entrance Animations as Marketing

**Pattern**: Slow fade-in or slide-up animations (300ms or more) on page sections or content blocks that trigger as the user scrolls. The animations are decorative rather than functional. They delay access to content to create an impression of "polish."

**Why it fails** (from community): "Slow animations are used for effect, not purpose. I'm waiting for content to stop moving before I can read it." Entrance animations are an intervention in the user's reading experience. When they are fast (under 150ms) and subtle (opacity only, or a few pixels of translate), they do not register as animation. When they are slow and dramatic, they interrupt reading.

**Fix**: If you use entrance animations, the threshold is: the animation must complete before a user would notice it. That means under 150ms for opacity, under 200ms for combined opacity + translate. Use `easeOut` only. Never delay animation start with `delay`. If any section has content visible below the fold on load, do not animate it.

```tsx
// Entrance animation that works
<motion.div
  initial={{ opacity: 0, y: 6 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.12, ease: "easeOut" }}
  viewport={{ once: true }}
>

// Entrance animation that fails
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
  viewport={{ once: true }}
>
```

---

## Missing Async Feedback States

**Pattern**: Form submissions, API calls, and mutations with no loading indicator. The button remains active. The user has no signal that their action registered. Sometimes accompanied by a success message that appears after a variable delay with no transition state.

**Why it fails** (from community): "Forms submit and nothing happens. No loading state, no confirmation, no error. It's a blank stare." This pattern appears specifically in AI-generated code because LLMs generate the happy-path UI without the state management for intermediate states. It is not a design failure, it is a code generation failure, but the user experiences it as a design failure.

**Fix**: Every action with a network round-trip needs three states: pending, success, error. At minimum:

```tsx
const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle")

<Button
  onClick={handleSubmit}
  disabled={state === "loading"}
>
  {state === "loading" ? (
    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
  ) : (
    "Save changes"
  )}
</Button>
```

Do not use toast for success feedback on synchronous-feeling actions (saving a form field). Use toast for async background operations only.

---

## Recognizable Stock Icon Sets

**Pattern**: Lucide React or HeroIcons used at large sizes (32px or larger) as feature section icons, without customization. The same icons recur across hundreds of AI-generated sites: `<Zap>`, `<Star>`, `<Shield>`, `<Rocket>`, `<CheckCircle>`, `<BarChart>`.

**Why it fails** (from community): "I see the same HeroIcons on every AI website. Rocket for fast, shield for secure, bar chart for analytics. It's a visual cliche." At small sizes for UI purposes (16px in navigation, 14px in buttons), Lucide is excellent and invisible. At large sizes as content, recognizable stock icons signal that no icon decision was made.

**Fix**: For feature sections where icons appear at 32px or larger: either commission custom icons that reflect your product's specific capabilities, or use illustrations instead of icons, or remove icons entirely and let typography carry the visual weight. If you use Lucide at large sizes, choose icons that are specific to your product's actual functionality rather than the obvious metaphors.

---

## Flat Typographic Scale

**Pattern**: Multiple heading levels that are visually indistinct. H1 at 48px, H2 at 40px, H3 at 32px, body at 16px. The ratio between levels is too small. All headings use the same weight (usually `font-bold` or `font-semibold`). No contrast between display and body type.

**Why it fails** (from community): "No visual distinction between the main heading and support text. The text looks flat." A flat scale is the output of applying Tailwind type sizes sequentially without thinking about visual contrast. A good type scale has clear jumps between levels, uses weight contrast as well as size contrast, and treats the headline as a display element rather than a scaled-up paragraph.

**Fix**: Create real contrast between heading levels:

```tsx
// Flat scale -- what AI tools generate
// h1: text-5xl font-bold
// h2: text-4xl font-bold
// h3: text-3xl font-semibold
// body: text-base

// Contrast scale -- requires a decision
// h1: text-5xl font-bold tracking-tight (display treatment)
// h2: text-2xl font-semibold (substantial jump)
// h3: text-lg font-medium (readable section header)
// body: text-base font-normal leading-relaxed
```

The h1-to-h2 jump should be dramatic. The h2-to-h3 jump should be perceptible. Body should never feel like a shrunken heading.

---

## Broken or Context-Wrong Images

**Pattern**: Placeholder images from Unsplash or similar that are visually unrelated to the product context. A developer tool with lifestyle photography of people in coffee shops. A B2B product with hero photography of athletes. Or images that are correct in category but low quality, wrong aspect ratio, or visually competing with the copy.

**Why it fails** (from community): "Most images are broken or showing completely wrong content. Bolt grabs from Unsplash but doesn't verify context." Images that contradict the product's context actively undermine the copy. A CLI tool photographed with lifestyle imagery creates cognitive dissonance: the user's expectation (technical) conflicts with the visual register (aspirational consumer).

**Fix**: Match image register to product register.

| Product type | Right image register |
|---|---|
| Developer tool | Product UI screenshots, code samples, architecture diagrams |
| B2B SaaS | Real customer scenarios, dashboard views, data visualizations |
| Consumer app | Photography that reflects actual use contexts, not aspirational lifestyle |
| Technical infrastructure | Diagrams, not photography |
| API / SDK | Code examples > photography almost always |

When in doubt, use no image rather than a wrong image. Typography on a clean background beats stock photography from the wrong genre.

## Sources

- https://www.superblocks.com/blog/lovable-dev-review
- https://trickle.so/blog/bolt-new-review
- https://www.925studios.co/blog/ai-slop-web-design-guide
- https://dev.to/_46ea277e677b888e0cd13/why-every-ai-generated-landing-page-looks-the-same-and-how-to-fix-it-1kmo
- https://www.devclass.com/ai-ml/2025/12/16/cursor-ai-editor-gets-visual-designer-but-bugs-and-ever-changing-ui-irk-developers/1731163
