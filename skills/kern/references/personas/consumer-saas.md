# Persona: Consumer SaaS

Products in this category: productivity apps, note-taking tools, scheduling tools, communication platforms, personal finance apps, writing tools, task managers, team collaboration (small team).

The primary user may or may not be technically sophisticated. Self-serve onboarding is expected. The product competes on how quickly it delivers a first value moment. Design must be approachable without being patronizing.

---

## Font Pairing

**Display**: Figtree, Satoshi, or Plus Jakarta Sans
- Geometric warmth without going precious
- Friendly at large sizes, readable at body sizes
- These read as "designed for humans" rather than "designed for screens"

**Alternative**: Space Grotesk for products with a stronger personality
- Adds character without going editorial
- Risk: becomes dated faster than more neutral choices

**Body**: Match the display font at lighter weight, or system-ui for performance
- Consumer SaaS body text should feel effortless, not typographically assertive

**Avoid**: Inter (signals "dev tool"), Roboto (signals "Android"), Fraunces (signals "editorial"), Söhne without commitment to the premium register it implies

---

## Color Philosophy

**Background approach**: Light mode as default, dark mode as secondary (or optional). Consumer products meet users in ambient contexts where light mode is standard.

```css
/* Light mode base */
--background: 0 0% 100%;           /* white -- fine for content surfaces */
--surface: 240 5% 97%;             /* off-white for page background */
--border: 220 13% 91%;             /* subtle, not heavy */
--foreground: 222 47% 11%;         /* dark but not black */
--muted-foreground: 215 16% 47%;   /* readable secondary text */

/* Accent: warm or bold, used for primary actions and key states */
--accent: 217 91% 60%;             /* example: accessible blue */
--accent-foreground: 0 0% 100%;
```

**Accent strategy**: The accent carries more weight in consumer SaaS than in developer tools. Primary CTAs should be recognizable and confident. Secondary actions can use a lighter tint of the accent rather than an outlined button.

**Palette width**: Consumer SaaS can sustain a slightly broader palette -- two colors, or one color with warm and cool variations -- as long as one is clearly primary.

**What to avoid**: Dark-first that was clearly designed for a developer product, cold gray palettes that feel sterile, overly bright or saturated palettes that feel aggressive.

---

## Layout Patterns

**Density**: Low to medium. Consumer SaaS earns attention by not demanding it. Whitespace is active: it gives content room to breathe and makes the first action obvious.

- Hero padding: generous, 80-120px top
- Section spacing: 64-96px between sections
- Card padding: 24px minimum, 32px preferred for primary cards
- Line height in marketing copy: 1.6-1.7

**Grid approach**: Content-driven, not sidebar-heavy. Navigation is typically top-nav or a minimal sidebar that collapses. The product UI should not feel like a developer dashboard.

**Social proof placement**: High on the page. Logo bar above the fold or immediately after the hero. Testimonials before the feature grid, not after. Consumer products earn trust through peer validation.

**Hero structure**: Large, clear headline + brief subheadline + one primary CTA. The hero does not need to explain everything. It needs to establish the product's identity and get the user to the next step.

---

## Component Style

**Buttons**: Rounded and confident. Consumer SaaS buttons can use `rounded-lg` to `rounded-xl`. Primary button should have enough padding to feel clickable on mobile.

```tsx
// Primary CTA for consumer SaaS
<Button className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 text-base shadow-sm">
  Get started free
</Button>
```

**Cards**: Softer shadows, moderate radius. Cards in consumer SaaS can use `shadow-sm` because the surfaces are lighter and shadows read as elevation rather than decoration.

**Inputs**: Rounded, full-border, clear placeholder. Consumer users expect friendly form fields, not tight developer-style inputs.

**Navigation**: Clear, simple, and accessible on mobile. A hamburger menu is acceptable in consumer contexts. Tab navigation at the bottom of mobile views is appropriate.

---

## Exemplar Sites

**notion.so**
- Generous whitespace that makes the product feel calm, not empty
- Typography that works across culture: clean, neutral, readable
- The product showcases templates that make the blank canvas less intimidating

**cal.com**
- Simple value proposition executed with discipline: scheduling, simplified
- Keeps the hero focused on the core workflow, not on feature enumeration
- Uses dark sections for differentiation without going full dark-mode-first

**resend.com**
- Developer-adjacent consumer SaaS: technical product, approachable design
- Social proof (big-name customers) placed prominently without being gimmicky
- Copy specific enough to be credible, brief enough to be read

**linear.app (marketing site, not dashboard)**
- The marketing site demonstrates the product's aesthetic rather than describing it
- Sophisticated without being cold
- Short copy that trusts the product visuals to do the heavy lifting

**clerk.com**
- Clear differentiation between "here is what Clerk does" and "here is how to start"
- Code samples that show integration simplicity rather than just listing features

---

## Anti-Patterns Specific to Consumer SaaS

**The Stripe clone**: Using Vercel/Stripe as the reference point and reproducing their exact layout: dark sections alternating with light, horizontal scrolling feature cards, large gradient text in the hero. This was distinctive in 2020. It is a template in 2025.

**Gradient section overuse**: One dark-to-brand-color gradient section signals differentiation. Three of them signals that gradient sections are the layout strategy. Consumer SaaS can use more visual variety than developer tools, but each section should have a reason.

**Feature grid before value proposition**: Listing eight features before establishing why the user should care. The hero establishes the problem or benefit. Features come after the user is oriented.

**Newsletter popup on first visit**: Asking for email before the user has used the product is a consumer dark pattern that all major UX research condemns. It reduces conversion. Remove it.

**"Most popular" on the highest-priced plan**: Consumer users recognize this as a dark pattern. If the expensive plan is genuinely most popular, show the number of users on it. If it is not, remove the label.

**Excessive animation on the marketing site**: Parallax scrolling, section transitions, animated SVGs that loop forever. These add perceived complexity without adding information. They also perform poorly on low-powered devices and on mobile data connections. The product you are marketing should be fast. The marketing site being slow undermines this.

**Social proof with no specifics**: Testimonials without names, roles, or companies. Logo bars without context ("as seen in" vs "trusted by"). Review count badges with no linked review source. Consumer users trust peer reviews; they discount anonymous or unverifiable claims.
