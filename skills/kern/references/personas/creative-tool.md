# Persona: Creative Tool

Products in this category: design tools, video editors, audio production, writing environments, presentation builders, generative AI creation tools, photo editors, font tools.

Users: Designers, illustrators, writers, musicians, filmmakers -- people who evaluate aesthetics professionally. They will immediately notice if the tool itself doesn't meet the visual bar they hold for their own work. The tool's design is a trust signal.

---

## Core Aesthetic

The tool's interface should feel like it was made by someone who uses creative tools. It should have a point of view. Neutral is not a safe choice here -- neutral reads as lazy. Pick a direction and own it.

Restraint works (Figma's neutral chrome lets the canvas be the design). Expressiveness also works (Adobe's dark-and-saturated palette matches the output they're designed for). Bland does not work.

Think: Figma, Arc browser, Pitch, Craft, iA Writer, Framer (the actual tool, not the templates it produces).

---

## Font Pairing

**UI font:** Depends on the tool's character.

For minimal/neutral chrome (canvas-first tools): System-ui or Geist. The chrome disappears, the canvas is the thing.

For editorial/writing tools: Consider a serif body (Newsreader, iA Writer Quattro). The tool should feel like the medium.

For design/visual tools: Something with more character. Söhne, GT Walsheim, or a bespoke choice that signals craft.

**Mono:** For code-adjacent creative tools (Framer, animation tools with easing curves): JetBrains Mono or iA Writer Quattro.

**Avoid:** Inter (too neutral for a category that values aesthetic signal). Anything that reads as generic SaaS.

---

## Color Philosophy

This is the one category where a distinctive palette is actively expected. The audience has taste and will evaluate yours.

- Dark mode is common and appropriate -- creative work happens in focused, low-distraction environments
- But do not default to dark just because "creative tool" -- iA Writer is light, Craft is light
- Consider what the output looks like on the canvas: if the output is colorful (design tool), a neutral chrome is right. If the output is text (writing tool), the chrome can have more character.
- Accent: ONE primary. May be more saturated than a developer tool would accept. Still: restraint earns trust.

---

## Layout Patterns

- **Canvas-first.** The creative surface is the product. The toolbar and sidebar are secondary.
- **Minimal chrome.** Panels that auto-hide. Controls that appear when relevant.
- **Keyboard-first.** Creative professionals live on keyboard shortcuts. Expose them in the UI.
- **Real-time preview.** Changes should reflect immediately. Latency in a creative tool is an experience failure.
- **Undo is a first-class feature.** Full history, accessible from keyboard, not buried in a menu.

---

## Exemplars

- **Figma** -- neutral chrome that disappears, puts canvas forward, keyboard-first
- **iA Writer** -- the writing environment IS the design; every pixel serves reading and writing
- **Pitch** -- presentation tool that feels like a design tool, not a PowerPoint clone
- **Arc browser** -- expressive, opinionated, not afraid to be different from every other browser
- **Framer** -- the canvas IS the output; what you design is what gets published; exemplar for "interface matches the medium" and for restraining chrome so creative work stays in focus

---

## Signature Moves

Concrete Tailwind decisions that signal "creative tool" identity.

**1. Neutral chrome — not blue-tinted dark**
```
// Before (AI default — blue-gray dark, generic "dark mode")
<aside className="bg-gray-900 border-r border-gray-800">

// After (Creative Tool — pure neutral, canvas stays as hero)
<aside className="bg-[oklch(12%_0_0)] border-r border-[oklch(22%_0_0)]">
```

**2. Hairline borders — not chunky dividers**
```
// Before (AI default — 1px solid visible border)
<div className="border border-gray-700 rounded-md">

// After (Creative Tool — near-invisible, panel feels like infrastructure)
<div className="border border-[rgba(255,255,255,0.06)] rounded-[3px]">
```

**3. Compact tool labels — not default text-sm**
```
// Before (AI default — normal weight, full-size label)
<span className="text-sm text-gray-400">Opacity</span>

// After (Creative Tool — minimal, stepped back from the work)
<span className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/40">Opacity</span>
```

---

## Persona-Specific Anti-Patterns

**AP-CT-1: Template-first onboarding**
Showing a grid of templates before the user has created anything. For creative professionals, this signals "we didn't trust you to start from scratch." Offer blank canvas + templates as equal options.

**AP-CT-2: Tool panels that compete with the canvas**
Thick, colorful sidebars that draw the eye away from the work. The panel should feel like infrastructure, not a design statement.

**AP-CT-3: Animated UI in a creative environment**
Bouncing panels, sliding drawers, springy popovers. Animation in the chrome is noise during creative work. Reserve it for explicit moments (export completion, collaboration join).

**AP-CT-4: Consumer voice in a professional tool**
"Let's get creative!" "You're on fire today!" "Great job completing your first project!" Professional users do not want their tool to cheer for them. State the status and move on.

**AP-CT-5: Generic icon sets for a tool whose output involves icons**
If your product is used to create visual work, and your own UI uses Lucide default icons, that is a mismatch. The tool's aesthetics are a portfolio piece. Commission custom icons or at minimum use Lucide at non-default sizes with intentional weight.

---

## Empty State Patterns

An empty state in a creative tool is not an opportunity to explain the product. It is the first experience of the creative surface itself.

**The canvas-first rule:** Show the creative surface, not a description of it. The blank canvas is the invitation.

### What to do

- Fill the viewport with canvas surface (not a card or modal)
- One quiet center affordance: a `+` button or keyboard shortcut hint — nothing else
- If examples are shown, render them ghosted/faded behind the canvas as ambient context, not as a card grid above the fold
- Keyboard shortcut to start (`N` for new, `⌘N`) — professionals use keys, not buttons
- For AI/generative tools: the prompt input at full size IS the empty state — the blinking cursor is the call to action

### What NOT to do (all are AI defaults that add to Sameness Score)

- Dashed-border upload zone (see PSI-CT-1)
- Template gallery grid as default first screen (see PSI-CT-2)
- Motivational headline: "Let's get creative!", "Start your first project!", "You're one click away from something great"
- Feature checklist in the empty state: "Add shapes • Export SVG • Share with team"
- Three-card feature highlight grid (generic SaaS pattern, wrong for a creative tool)
- Centered card with icon + title + subtitle + button (the universal empty state pattern — too generic here)
- **Dot-grid `radial-gradient` as canvas texture** — this is the Figma/Excalidraw cliché and AI tools reach for it by default. Use a fine hairline crosshatch (`linear-gradient` grid lines at low opacity) or no texture. The dot-grid signals "I looked at Figma for inspiration," not "I made a considered decision."
- **Vignette `radial-gradient` as canvas overlay** — darkening-corner effects via `radial-gradient(ellipse at center, transparent ..., rgba(0,0,0,0.N) 100%)` layered over the canvas. AI tools reach for this to add "atmospheric depth." The hairline crosshatch texture and pure neutral dark background already provide sufficient depth cues. A vignette overlay triggers the structural sameness indicator for radial gradients without adding aesthetic value. Use box-shadow on the canvas border instead if edge definition is needed.

### TSX signature: canvas-first empty state

```tsx
// Before (AI default — centered card, motivational copy, dashed border)
<div className="flex flex-col items-center justify-center h-full p-12 text-center">
  <div className="border-2 border-dashed border-gray-300 rounded-xl p-16 mb-8">
    <Sparkles className="mx-auto mb-4 text-gray-400" size={48} />
    <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
    <p className="text-gray-500 mb-6">Create your first illustration to get started</p>
    <Button>New Project</Button>
  </div>
</div>

// After (canvas-first — the surface IS the invitation)
<div className="h-screen bg-[oklch(10%_0_0)] flex flex-col">
  <div className="flex-1 relative cursor-crosshair bg-[oklch(13%_0_0)]">
    {/* Hairline crosshatch — NOT dot-grid (dot-grid is the Figma/Excalidraw cliché) */}
    <div
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage: "linear-gradient(oklch(60% 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(60% 0 0) 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }}
    />
    {/* Single quiet start affordance */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <button className="w-10 h-10 rounded-full bg-white/8 hover:bg-white/14 flex items-center justify-center transition-colors">
          <Plus className="text-white/50" size={18} />
        </button>
        <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/25">N · new illustration</span>
      </div>
    </div>
  </div>
</div>
```

**Why this works:** The canvas occupies the viewport. The single affordance is subordinate to the surface. No explanation of features. Professionals know what to do — they just need the tool to get out of the way.

---

## Persona Sameness Indicators

These patterns are AI-default for creative tools specifically. They supplement the global Sameness Score rubric. Each indicator present in the design adds +1 to the score.

**PSI-CT-1: Dashed-border upload zone as empty state**
Using a dashed rectangle with a cloud-upload icon and "Drop files here" copy as the empty state for a creative tool. This is the generic file-input pattern — appropriate for a form, not for a canvas-based creative app. Real creative tools start with a blank canvas (Figma), a full-screen writing environment (iA Writer), or a contextual invitation to create (Pitch). The dashed box signals "this was designed by engineers who haven't used creative tools."

**PSI-CT-2: Inspiration gallery grid before the canvas**
An onboarding or empty state that shows a browsable grid of "example" or "template" thumbnails before the user has done anything. AI tools default to this because it fills whitespace with pixels. Real creative tools for professionals either go straight to blank canvas (power move) or offer templates as equal to blank — never as the default first screen. Templates before canvas signals "we don't trust you to start from scratch."

**PSI-CT-3: Pill-tab switcher for every tool panel category**
A top-bar row of pill-shaped tabs to switch between "Design / Prototype / Code" or "Layers / Assets / Plugins" — organizing the entire tool's panels through a single pill switcher. This is an AI-default structure that collapses the tool's capability model into a flat tab row. Real creative tools use icon-based collapsible panels (Figma), contextual panel appearance (Adobe XD), or keyboard-driven mode switching — never a marketing-style tab row inside the app chrome.
