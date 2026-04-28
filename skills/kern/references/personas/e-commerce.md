# Persona: E-commerce

Products in this category: direct-to-consumer brands, digital product shops, marketplace sellers, subscription boxes, niche retailers, Shopify stores, digital downloads.

The product is the content. The UI exists to eliminate friction between discovery and purchase. Good e-commerce design is invisible: users should not notice the design, they should notice the products.

---

## Font Pairing

**Display**: Brand-defined. E-commerce fonts should reflect the product's market position:

- **Premium / minimal**: Sharp geometric sans (Geist, Neue Haas Grotesk, Aktiv Grotesk). Clean price display. Lets product photography breathe.
- **Friendly / accessible**: Rounded sans (Figtree, DM Sans). Warmer register. Works for lifestyle brands.
- **Editorial / fashion**: High-contrast serif or display sans (Canela, Freight Display). Signals luxury or editorial positioning.

**Body**: High readability is table stakes. Product descriptions are read before purchase decisions. Line length matters -- 65-75 characters per line. Figtree, system-ui, or Inter (acceptable in e-commerce because readability is the primary concern).

**Price display**: Large, clear, high-contrast. Price should be immediately visible. Never smaller than body text. Consider a slightly different weight or tracking than surrounding text to make it scannable.

**Avoid**: Fonts that add friction (anything decorative in body text). Script fonts that reduce readability for product names or prices.

---

## Color Philosophy

**Background approach**: White or near-white. Product photography needs a clean backdrop. The background should not compete with the product.

```css
/* Clean e-commerce base */
--background: 0 0% 100%;           /* white -- product photography needs this */
--surface: 0 0% 97%;               /* light gray for secondary surfaces */
--border: 0 0% 88%;                /* subtle structural borders */
--foreground: 0 0% 10%;            /* near-black text */
--muted-foreground: 0 0% 45%;      /* secondary info */

/* Accent: brand color or photography-derived */
--accent: [brand-specific];        /* cannot be generic here */
--accent-foreground: 0 0% 100%;
```

**Palette notes**: The product photography sets the palette more than any brand decision. A product line with warm photography looks wrong on a cool-gray background. A product line with bright, saturated images looks wrong on a warm off-white. Align background and surface colors with the color temperature of the product photography.

**Brand accent**: E-commerce brands need one strong brand accent for: Add to Cart button, sale badges, promotional callouts. This should be a deliberate brand color, not a Tailwind default.

**What to avoid**: Dark backgrounds (usually hurts product photography unless the product genuinely lives in dark contexts -- tech, gaming, alcohol), multiple accent colors competing for the CTA, gradients that compete with product imagery.

---

## Layout Patterns

**Product-first**: Product grid, product photography, and product detail page are the three primary design challenges. Marketing copy is secondary to product presentation.

**Grid approach**: Product grid with consistent card aspect ratios. Photography should be consistent: same background, same aspect ratio, same lighting direction within a category. Inconsistent photography kills grid coherence faster than any layout decision.

**Sticky elements**: Sticky header with cart count is standard and expected. On product detail pages, a sticky "Add to cart" button/section that follows scroll is a significant conversion pattern. Sticky navigation does not require justification on e-commerce sites.

**Reviews placement**: Reviews immediately below the product description, before additional details. Conversion data consistently shows reviews reduce purchase hesitation more than any copy element.

**Mobile-first**: E-commerce conversion happens on mobile. The product detail page must be excellent on mobile: large product image, swipeable gallery, price immediately visible, "Add to cart" above the fold on a 375px screen, simple quantity selection.

---

## Component Style

**Add to Cart button**: The most important button in the product. Full-width on mobile. Large, high-contrast, brand-colored. Clear label: "Add to cart" not "Purchase" or "Buy now" (unless "Buy now" initiates immediate checkout, in which case label it correctly).

```tsx
// E-commerce primary CTA
<Button className="w-full rounded-md bg-stone-900 hover:bg-stone-800 text-white font-semibold py-4 text-base tracking-wide">
  Add to cart
</Button>
// or, for brand-colored:
<Button className="w-full rounded-md bg-brand-600 hover:bg-brand-700 text-white font-semibold py-4 text-base">
  Add to cart
</Button>
```

**Product cards**: Clean, consistent. Price visible without hover. Clear product name. On hover: quick-add or secondary image swap (not required, but a positive signal of craft). No excessive card decoration -- the product is the card.

**Badges**: Sale, New, Out of stock, Low stock. Use sparingly. Every badge on a card that does not need one reduces badge effectiveness on cards that do.

**Cart**: Clear item count in nav. Drawer or dedicated page (not modal) for cart. Clear subtotal, clear shipping estimate, clear checkout CTA. No upsell dark patterns at checkout.

---

## Exemplar Sites

**apple.com/store**
- Products are the content; the UI is the frame
- Product photography is the design: white background, consistent, high quality
- Typography is large, readable, and secondary to the product images
- No visual noise between the user and the product

**allbirds.com**
- Photography that shows the product in use, not on a white background
- Color swatches that actually preview the product, not color names only
- Sustainability credentials integrated into product pages without being preachy
- Mobile checkout that is genuinely simple: minimal fields, clear progress

**glossier.com**
- Editorial photography that sells a lifestyle, not just a product
- Color palette derived from the product line's color range
- Reviews integrated seamlessly, not as an afterthought
- The visual register (soft, editorial, community-forward) is consistent from homepage to checkout

**patagonia.com**
- Explicit brand values as a real design element, not marketing decoration
- Environmental messaging that is specific and verifiable, not vague and aspirational
- Product photography that shows the product in the contexts where it is used

---

## Anti-Patterns Specific to E-commerce

**Badge proliferation**: More than two badges on a product card ("New!", "On Sale!", "Free shipping!", "Bestseller!") nullifies all of them. The user learns to ignore all badges. Use one badge when one is genuinely warranted.

**Popup fatigue sequence**: Welcome popup (email capture) + newsletter popup (delayed) + exit-intent popup + chat widget + cookie consent banner = four interruptions before the user sees the first product. E-commerce users have a high exit rate at the first sign of aggression. Remove all popups before launch; add back only those with clear conversion data justifying them.

**Dark-pattern urgency timers**: Countdown timers that reset on page reload. "Only 3 left!" for products with no actual inventory constraint. "Sale ends tonight!" for a sale that has no end date. These patterns generated short-term conversion lifts in 2015 and now generate distrust. Shoppers have seen them enough to recognize them.

**Checkout friction**: Form fields that do not autocomplete. Requiring account creation before checkout. Address verification that fails on valid addresses. Forcing re-entry of shipping address for billing. Each friction point is a dropout point. Default to guest checkout, autofill-compatible fields, and address validation that accepts what the user types.

**Product photography inconsistency**: Mixing white-background photos with lifestyle photos in the same product grid. Different aspect ratios forcing awkward crops. Photography from different lighting conditions in the same collection. Inconsistent photography breaks grid coherence and signals insufficient production investment.

**Cart abandonment dark patterns**: Auto-adding products the user did not select. Hidden fees that appear only at checkout. Default checkboxes for paid upgrades or subscriptions. These reduce trust and increase support burden. The short-term revenue gain does not cover the long-term brand damage.

**Mobile product detail page failures**: Price below the fold on mobile. Gallery that does not support swipe. "Add to cart" button that requires scrolling. Zoom feature that does not work. Product description in 11px text. Test the product detail page on a 375px screen before launch, on every release.
