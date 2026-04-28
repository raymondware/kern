# Persona: B2B Enterprise

Products in this category: security software, compliance tools, enterprise SaaS, workforce management, procurement, ERP, identity management, business intelligence.

The primary buyer is not the primary user. A CTO, CISO, or VP of Engineering evaluates and purchases. A team of 10-1000 uses daily. The design must satisfy both: build confidence with buyers, and be livable for daily users.

---

## Font Pairing

**Display**: Readable serif for headings signals maturity and care. Or a restrained geometric sans that does not lean technical.

- **Newsreader** (Production Type): Editorial authority, readable at display sizes, distinct from the sans-everything status quo
- **Source Serif 4**: Clean, wide, professional. Google Fonts, no cost.
- **IBM Plex Serif**: Technical gravitas, pairs naturally with IBM Plex Sans for body
- **Playfair Display**: Reserved for very trust-forward products (legal, financial)

**Alternative**: If serif does not fit the brand, use a conservative geometric: Geist Sans or a well-chosen Inter (acceptable in this context because Inter's neutrality reads as professional rather than default).

**Body**: Clean, readable sans. IBM Plex Sans, Geist, or Inter. Body text is read in volume in enterprise products. Readability at 14px over long sessions matters more than personality.

**Mono**: Required for any product that shows code, configs, or data. JetBrains Mono or IBM Plex Mono.

---

## Color Philosophy

**Background approach**: Light mode as default. Enterprise software runs in office environments under fluorescent light on large monitors. Dark mode is optional, not primary.

```css
/* Light mode base -- professional, not sterile */
--background: 210 40% 98%;         /* very slightly blue-tinted white */
--surface: 0 0% 100%;              /* pure white cards */
--border: 214 32% 91%;             /* subtle blue-grey borders */
--foreground: 222 47% 11%;         /* dark navy, not black */
--muted-foreground: 215 16% 47%;   /* readable secondary */

/* Accent: one color, trustworthy, not aggressive */
--accent: 221 83% 53%;             /* clear blue -- conveys reliability */
--accent-foreground: 0 0% 100%;
```

**Palette notes**: Navy, slate, and neutral-grey palettes. Accents in blue (reliability), teal (trust in security contexts), or a brand-specific color as long as it is not aggressive (no neon, no saturated warm colors).

**What to avoid**: Dark-first without justification, consumer-bright palettes that undermine the professional register, gradients that read as consumer SaaS rather than enterprise software.

---

## Layout Patterns

**Density**: Medium. Enterprise products display data -- dashboards, reports, tables. But buyers see the marketing page, which should be clear and spacious. The product UI can be denser; the marketing site should not be.

**Trust hierarchy**: The page order for enterprise products should surface trust signals early:
1. Clear statement of what the product does
2. Logo bar of recognizable enterprise customers (above the fold if possible)
3. Key differentiators (not feature count)
4. Case study references (specific company, specific outcome, specific number)
5. Compliance/security certifications (SOC 2, ISO 27001, GDPR, etc.)
6. Pricing or contact info

**Tables and comparison**: Enterprise buyers evaluate. They compare alternatives. A clear comparison table -- the product vs. the status quo, or vs. named alternatives -- is high-value on an enterprise marketing page.

**Data visualizations**: Appropriate and encouraged. Dashboard previews, ROI calculators, interactive data views. These demonstrate capability more directly than feature descriptions.

---

## Component Style

**Buttons**: Conservative and clear. Primary CTA should not feel aggressive. Enterprise buyers are skeptical of high-pressure design.

```tsx
// Enterprise primary CTA
<Button className="rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 text-sm">
  Request a demo
</Button>
// Secondary: outline, muted
<Button variant="outline" className="rounded-md border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-5 py-2.5 text-sm">
  View documentation
</Button>
```

**Navigation**: Structured and comprehensive. Enterprise products have multiple buyer personas, multiple use cases, multiple integrations. The navigation should accommodate this without becoming unusable. A mega-menu is appropriate here in a way it is not for consumer products.

**Forms**: Long forms are acceptable (and sometimes expected) in enterprise contexts. A 6-field "request a demo" form signals that the product is for serious buyers. Reducing to email-only can signal consumer-grade maturity.

**Tables**: A core primitive. Enterprise data is tabular. Tables should be sortable, filterable, and exportable when displaying real data. In marketing, tables work well for feature comparisons and pricing.

---

## Exemplar Sites

**tailscale.com**
- Technical product explained in plain language, not marketing language
- The hero explains the problem and the solution directly
- No lifestyle photography -- diagrams and network maps instead
- Pricing that is transparent without footnotes and asterisks
- Achieves enterprise credibility without looking like a government website

**1password.com/business**
- Security product that communicates trust through restraint, not decoration
- Compliance badges are present but not dominant; the product story leads
- Case studies are specific: company name, use case, outcome
- The design communicates "we take your data seriously" without saying it

**cloudflare.com**
- Technical complexity handled through clear information architecture
- Data and performance claims are specific and sourced
- The enterprise section clearly separates from the developer/consumer section
- Dark sections used sparingly and purposefully, not as aesthetic

**notion.so/enterprise**
- Shows how a consumer-register product can credibly extend to enterprise
- Security and compliance content is thorough but not buried
- Uses customer logos and quotes from recognizable enterprise organizations

---

## Anti-Patterns Specific to B2B Enterprise

**Government website syndrome**: Conservative taken too far. Navy and grey with no visual differentiation between sections, 11px body text, navigation with 40 items, no clear primary CTA. Enterprise does not mean unusable.

**Death by whitepaper**: Gating all content behind form fills. Enterprise buyers need to do due diligence before any sales engagement. Public documentation, technical guides, and case studies that are accessible without a form generate the pipeline that "request a demo" forms do not.

**Stock photo people pointing at screens**: The classic enterprise marketing image: diverse group of professionals looking satisfied at a monitor, or two colleagues having a productive meeting. This photography is in its own uncanny valley -- it looks professional but reads as inauthentic. Use real screenshots, diagrams, and data visualizations instead.

**Feature count maximalism**: "300+ features", "50+ integrations", "everything you need" as primary claims. Enterprise buyers buy solutions to specific problems, not feature collections. Name the specific problem you solve, the specific pain you remove.

**Compliance theater**: Displaying security badges and compliance certifications prominently without providing substance. Enterprise security teams will look for the actual SOC 2 report, the actual GDPR data processing agreement, the actual pen test documentation. The badge is fine; it should link to the substance.

**Pricing by request only**: "Contact sales for pricing" with no indication of scale is appropriate for genuinely custom enterprise deals. For products with a clear seat-based or usage-based model, hiding pricing signals that the price will not survive comparison. Show the pricing, including the enterprise tier starting point.

**Aggressive lead capture**: Chatbots that pop up within 3 seconds. Exit-intent modals on documentation pages. Mandatory email gates on case studies. Enterprise buyers have low tolerance for aggressive lead capture and will simply go elsewhere. The sales process should start when the buyer is ready, not when the site decides they should be.
