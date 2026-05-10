# Persona: E-Commerce

Products in this category: direct-to-consumer stores, marketplaces, subscription boxes, digital product shops, service booking, ticketing.

Users: Shoppers. They are evaluating whether to trust a brand with their money. Visual quality directly correlates with purchase conversion. Poor aesthetics = no sale. They are on phones (60-70% of traffic for most stores).

---

## Core Aesthetic

The product is the hero, not the interface. The UI should get out of the way of the product photography, pricing, and purchase action.

Trust signals are paramount: clear pricing, obvious shipping info, visible return policy, professional typography, legitimate-feeling domain and checkout.

Think: Allbirds, Ridge, Cotopaxi, Alo Yoga. Well-executed Shopify stores. Not: template-default stores with the favicon still showing "Shopify" and the footer still reading "Powered by Shopify."

---

## Font Pairing

**Display/headline:** This is where brand identity lives. A DTC brand's typography is part of its visual identity. Serif for heritage/quality (Freight Display, Canela, Cormorant Garamond for luxury; Newsreader for accessible). Sans for modern/minimal (Söhne, Neue Haas Grotesk, Graphik).

**Body/price/description:** Clean, readable sans. Geist at 15px, or whatever pairs with the display font. Prices must be clear and scannable.

**DO NOT USE:** Generic template fonts that every Shopify store uses (Garamond + Helvetica is the default of a million stores). The font should belong to this brand, not the template it was built on.

**Mobile:** Font sizes are larger on mobile. Minimum 16px for body on mobile -- anything smaller causes browser zoom which breaks layouts.

---

## Color Philosophy

Derived entirely from brand, not from "what looks like e-commerce."

- Background: Most high-end DTC brands use white or off-white. Makes product photography pop.
- Accent: Brand color for CTAs (Add to Cart, Buy Now). High contrast required -- these are the most important buttons on the site.
- Status: In-stock = green. Out-of-stock = neutral, not red (red = danger, not scarcity). Sale pricing = red or orange.

**The add-to-cart button must be the highest contrast element on the product page.** Everything else should have lower contrast by comparison.

---

## Layout Patterns

- **Product photography is the primary content.** Large images, good whitespace, mobile-first gallery.
- **Price + CTA above the fold on mobile.** User should not scroll to find the price and buy button.
- **Simplified navigation.** Max 5-6 categories in the main nav. Mega-menus appropriate for large catalogs.
- **Cart is persistent.** Floating cart icon with count always visible.
- **Checkout friction = lost revenue.** Guest checkout. Minimal form fields. Apple Pay/Google Pay.

---

## Exemplars

- **Allbirds** -- product as hero, neutral chrome, sustainability story woven into product copy without being preachy
- **Ridge** -- clean, masculine, product specs as design elements
- **Arc (the product site)** -- browser sold like a luxury product, typography and whitespace as design
- **Gumroad** -- minimal, creator-focused, trust through simplicity
- **Alo Yoga** -- high-AOV DTC exemplar; photography at 80% of page real estate, minimal product copy that communicates brand register, add-to-cart button never competes with the product image for visual weight

---

## Signature Moves

Concrete Tailwind decisions that signal "e-commerce" identity.

**1. Portrait product images — not square**
```
// Before (AI default — square aspect ratio)
<img className="w-full aspect-square object-cover" />

// After (E-Commerce — portrait format, more product visible)
<img className="w-full aspect-[3/4] object-cover object-center" />
```

**2. Add-to-cart as the highest-contrast element**
```
// Before (AI default — standard blue or filled button)
<button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm">Add to Cart</button>

// After (E-Commerce — maximum contrast, tracked uppercase, full-width on mobile)
<button className="w-full bg-black text-white py-4 text-xs font-medium tracking-[0.15em] uppercase hover:bg-black/90">Add to Cart</button>
```

**3. Category/brand labels in small tracked caps — not plain text**
```
// Before (AI default — regular small text label)
<span className="text-sm text-gray-500">Running Shoes</span>

// After (E-Commerce — brand-register label, DTC aesthetic)
<span className="text-[10px] font-medium tracking-[0.12em] uppercase text-gray-400">Running Shoes</span>
```

---

## Persona-Specific Anti-Patterns

**AP-EC-1: Auto-playing video hero**
A hero section with a looping background video with text overlaid. On mobile it causes layout shift, slows load, and is ignored by users who have trained themselves to skip it. On desktop it's a battery drain that doesn't convert better than a strong static image.

**AP-EC-2: Trust badges as decoration**
Slapping "SSL Secured," "Money-Back Guarantee," and "Free Returns" badge images above the fold as visual noise. These exist to address purchase anxiety -- they should be near the add-to-cart button, not scattered around the page as decoration.

**AP-EC-3: Pop-up on first page view**
An email capture modal that fires before the user has seen a single product. The user has not yet decided whether to care. Let them browse first.

**AP-EC-4: Fake urgency**
"Only 3 left!" when there are 300 in stock. "Sale ends in 47:23:11" for a sale that resets every day. Shoppers can tell. It destroys trust and brand credibility faster than any design mistake.

**AP-EC-5: Product description as spec sheet**
A product page with only bullet-point specs and no story. High-converting product pages answer: What is this? Who is it for? Why does it matter? The spec sheet is supplementary, not primary.

**AP-EC-6: Generic template without customization**
A store that still has the placeholder logo, default Shopify Dawn color scheme, and "Your tagline here" still in the footer. These are common on AI-built storefronts. Shoppers notice and bounce.

---

## Product Card Patterns

The product card is the primary unit of e-commerce collection pages. It is also the most template-contaminated component in AI-generated output. This section prescribes the structural and aesthetic decisions that separate a real DTC product card from an AI-default one.

### What a DTC collection card must have

1. **Portrait aspect ratio** — 3:4 or 4:5, never square. Products, especially apparel and leather goods, are photographed in portrait. Square crops are a template signal.
2. **Outcome-focused CTA copy** — "Add to Bag" or "Add to Leather Goods Bag" for Forge, not "Add to Cart" or "Buy Now". The CTA should match brand voice, not the default WooCommerce label.
3. **No image overlay decorations** — no badge overlays (sale, bestseller, new) directly on the product image. If a badge exists, it renders as text below the image. Clean image area is non-negotiable for premium DTC.
4. **Tracked-caps category/brand label** — not a plain `text-sm text-gray-500` label. DTC brands use `text-[10px] tracking-[0.12em] uppercase` for category metadata.
5. **Price visibility** — price must be scannable on initial render, not hidden behind hover state.

### TSX signature

```tsx
// DTC collection-grid product card (Forge: men's leather goods)
// Key decisions: portrait 3:4, no badge overlay, tracked-caps category,
// outcome CTA, hover-reveal add action, serif name for heritage register

<article className="group cursor-pointer">
  {/* Image — portrait 3:4, absolutely no overlay badges or buttons */}
  <div className="relative overflow-hidden bg-stone-100">
    <img
      src={product.image}
      alt={product.name}
      className="w-full aspect-[3/4] object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
    />
    {/* Hover-reveal action — flush to bottom, never an overlay badge */}
    <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
      <button className="w-full bg-stone-900/90 backdrop-blur-sm text-white py-3 text-[11px] font-medium tracking-[0.1em] uppercase">
        Add to Bag
      </button>
    </div>
  </div>

  {/* Info — flush, no card border, vertical rhythm tight */}
  <div className="pt-3 space-y-0.5">
    {/* Category — tracked caps, not plain text */}
    <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-stone-400">
      {product.category}
    </p>

    {/* Product name — weight-400, let the typography do the work */}
    <h3 className="text-sm font-normal text-stone-900 leading-snug">
      {product.name}
    </h3>

    {/* Price — clear, no strikethrough unless genuinely on sale */}
    <p className="text-sm text-stone-700">
      ${product.price}
    </p>
  </div>
</article>
```

### What NOT to do

| Pattern | Why it fails |
|---|---|
| `aspect-square` on product image | Portrait is the DTC standard; square is the template default |
| Red "SALE" badge on image corner | PSI-EC-1: universal AI-generated product card signal |
| `🛒 Add to Cart` button label | PSI-EC-2: WooCommerce/Shopify default template pattern |
| Star rating row on every card | PSI-EC-3: looks decorative/fake unless ratings are real and loaded |
| `rounded-xl` card with border and drop shadow | Consumer-app card container; DTC cards are borderless, no shadow |
| Both `onClick` CTA and always-visible button | One action per card state; show-on-hover keeps the image primary |
| Strikethrough original price when not on sale | Creates false scarcity signal; only show if product is genuinely discounted |

---

## Persona Sameness Indicators

These patterns are AI-default for e-commerce specifically. They supplement the global Sameness Score rubric. Each indicator present in the design adds +1 to the score.

**PSI-EC-1: Red "SALE" badge with strikethrough price in the top corner**
A bright red circular or rectangular badge labeled "SALE" or a percentage discount ("20% OFF") in the top-left or top-right corner of the product card, with an original price shown as strikethrough next to the discounted price. This is the universal AI-generated e-commerce product card. High-end DTC brands (Allbirds, Alo Yoga, Ridge) either don't have sales, or show promotions inline with the product copy rather than as a badge overlay. Red badges signal mass-market retailer, not premium DTC.

**PSI-EC-2: Cart icon inside the "Add to Cart" button label**
A product card or product page CTA button that reads "🛒 Add to Cart" or uses a shopping cart icon inside the button alongside the text. This is the WooCommerce/Shopify default template pattern. Premium DTC brands use CTA copy that matches their voice and don't mix icons into button labels. The button text should be outcome-focused ("Add to Bag", "Reserve Your Pair") and the icon, if any, lives outside the button.

**PSI-EC-3: Yellow star rating row on the product card**
A row of 4 or 5 yellow stars (or 4.5 stars with a half-star) displayed on the product card in the collection grid. AI tools insert this as a decoration because product pages "should have" ratings. On a collection card, star ratings are only meaningful if the ratings are real, loaded, and consistently displayed. Decorative or placeholder star rows (fixed at 4.5 for all products) signal template output and erode trust with shoppers who recognize them as fake.
