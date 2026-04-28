# Persona: Creative Tool

Products in this category: design tools, video editors, 3D apps, motion graphics tools, illustration software, music production, prototyping tools, generative art platforms.

The primary user creates artifacts for others to experience. The product's own design is part of the sales pitch. If the tool is supposed to help users make beautiful things, the tool itself must be beautiful, opinionated, and distinctive. Generic design is disqualifying.

---

## Font Pairing

**Display**: Distinctive over neutral. Choose a typeface that makes a statement.

- **Space Grotesk**: Geometric personality, slightly quirky. Good for products that want warmth with character.
- **Clash Display** (Indian Type Foundry): High contrast, editorial weight. For products with a bold visual identity.
- **Cabinet Grotesk** (Fontshare): Friendly and distinctive. Works across design and consumer creative contexts.
- **Custom or commissioned**: The highest signal of commitment. If the brand has a custom typeface, use it.

**Body**: Can be the same family as display, lighter weight. Or a clean complementary sans.
- Body should not compete with display for attention
- Geist, Figtree, or Inter are acceptable body choices when display font is strong enough to carry the identity

**Mono**: Less prominent than in developer tools, but required when showing code or technical output. JetBrains Mono or Geist Mono.

**Avoid**: Inter + Inter (no personality). Default system fonts. Any font that reads as chosen for neutrality.

---

## Color Philosophy

**Background approach**: Dark mode as primary default. Creative tools live in dark environments because: (1) designers work in dark environments, (2) dark backgrounds make color and content pop, (3) dark-first signals that the product takes visual design seriously.

```css
/* Dark mode base */
--background: 220 13% 9%;          /* dark, slightly blue-grey */
--surface: 220 10% 13%;            /* card surfaces */
--border: 220 8% 18%;              /* structural edges */
--foreground: 220 14% 96%;         /* near-white text */
--muted-foreground: 220 9% 58%;    /* secondary text */

/* Accent: bold and considered */
--accent: 255 85% 65%;             /* violet -- or product-specific */
--accent-foreground: 0 0% 100%;
```

**Accent strategy**: Creative tools can push the accent harder than other categories. The accent is part of the product's visual identity. It should appear in the logo, the primary CTA, and key interactive states. It should not appear in body text, borders, or decorative elements.

**Unexpected combinations**: Creative tools have license to use color combinations that other categories cannot. High-contrast pairs (black + acid yellow, deep navy + coral) are appropriate when they reflect a deliberate visual identity, not when they are applied randomly.

**What to avoid**: Safe corporate palettes (navy + grey), overly harmonious palettes that lack personality, muted accents on a dark background (creates low contrast), pure black backgrounds without surface differentiation.

---

## Layout Patterns

**Density**: Variable. The canvas or work area should be maximized. Navigation and toolbars should be compact. Marketing pages should be editorial: large type, generous spacing, strong visual hierarchy.

**Grid approach**: Asymmetric. Creative tools earn the right to break grid conventions. Not arbitrarily, but when the asymmetry communicates something -- a product that does unexpected things should look unexpected.

**Typography as layout**: At the editorial scale of a marketing site, type can carry layout weight. A 96px headline needs no supporting visuals if the headline is strong enough.

**Showcase-oriented**: The marketing page should show output, not describe process. User-created artifacts, rendered outputs, production shots of work made with the tool. Not abstract feature icons.

---

## Component Style

**Buttons**: Distinctive. This is the one context where unusual button styles are appropriate -- pill shapes, outlined with bright stroke, or heavy solid fills that contrast strongly with the dark background.

```tsx
// Example: creative tool primary CTA
<Button className="rounded-full bg-violet-500 hover:bg-violet-400 text-white font-semibold px-8 py-3 text-base">
  Start for free
</Button>
// or: high-contrast bordered
<Button className="rounded-full border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-3 transition-colors">
  Try it now
</Button>
```

**Cards**: If used, should feel designed -- not default shadcn Cards. Consider colored borders, gradient backgrounds in one surface level, or no cards at all (let the layout do the work).

**Navigation**: Minimal in product, editorial in marketing. In product: icon-based toolbar, compact and always accessible. In marketing: clean horizontal nav that does not compete with the showcase content.

---

## Exemplar Sites

**figma.com**
- Makes typography do the heavy lifting: large, bold, editorial
- Community showcases are the content; the design language frames them without competing
- Color discipline: one primary (blue), used sparingly
- The product's promise (collaborative design) is demonstrated by the site's collaborative community feel

**framer.com**
- Dark-first, bold, personality-forward
- Shows the product's capability through the marketing site's own animations
- Headline copy earns its size: specific, not generic
- The site is itself a Framer site -- highest form of dogfooding

**rive.app**
- Motion is the product; motion is the marketing
- Interactive embeds that let users play before signing up
- Restrained layout that makes the interactive elements the stars

**spline.design**
- 3D as background, not decoration
- Product demonstrations embedded directly in the marketing page
- Distinctive visual identity that communicates "this is for people who care about aesthetics"

**linear.app** (marketing, different use from developer tool context)
- Product page aesthetics demonstrate what a team with design values builds
- The brand identity (sharp, flat, fast) is consistent from marketing to product

---

## Anti-Patterns Specific to Creative Tools

**Generic creativity signaling**: Rainbow gradients, paint splashes, and "unleash your creativity" copy are the creative-tool equivalent of stock photos for technical products. They signal that the designer reached for visual metaphors of creativity rather than demonstrating creative confidence.

**Dribbble award-bait aesthetic**: Overly polished, glossy UI that looks beautiful in a static screenshot and fails in actual use. Glassmorphism, excessive blur, neon on dark that fails contrast. Creative tools need to look good in the screenshot AND in the browser.

**Style without substance**: A marketing page that is visually impressive but takes more than three seconds for a user to understand what the product does. Bold design must serve clarity, not substitute for it.

**Feature parity marketing**: Listing every feature the tool has instead of showcasing what users make with it. Creative tool users buy outcomes -- the things they will create -- not feature lists. Lead with output.

**Template gallery as the only proof**: Showing only pre-made templates rather than user-created work signals that the product requires templates to look good. The highest-value proof is diverse, distinctive user work.

**Dark mode that is actually inverted light mode**: Especially damaging for creative tools because users will immediately notice. If the dark mode has the same shadows, the same border brightness, the same contrast ratios as the light mode, it is not a real dark mode. Creative tool users use dark mode all day, every day. They know what a good dark mode feels like.
