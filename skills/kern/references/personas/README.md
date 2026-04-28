# Persona System

Every product has a register. A developer tool that looks like a consumer app loses credibility. A consumer app that looks like an enterprise dashboard loses users. The persona system gives Kern the context it needs to give product-specific advice rather than generic quality checks.

## How It Works

When you run `/kern:design` or `/kern:audit`, Kern detects or asks which persona applies. The persona shapes every recommendation: font choices, color approach, layout density, component style, and the specific anti-patterns most likely to affect that category.

**Detection**: Kern looks for signals in the product description -- "CLI", "dashboard", "API", "checkout", "marketplace" -- and infers the persona. If signals are ambiguous, Kern asks explicitly before generating anything.

**Persona files**: Each file defines the full design language for that category.

## The Five Personas

| Persona | File | Register | Exemplar |
|---|---|---|---|
| Developer tool | `developer-tool.md` | Restrained, dense, function-first | linear.app, railway.app |
| Consumer SaaS | `consumer-saas.md` | Warm, spacious, approachable | notion.so, cal.com |
| Creative tool | `creative-tool.md` | Bold, editorial, personality-forward | figma.com, framer.com |
| B2B enterprise | `b2b-enterprise.md` | Conservative, trust-building, data-forward | tailscale.com, 1password.com |
| E-commerce | `e-commerce.md` | Product-first, conversion-focused | apple.com/store, allbirds.com |

## Choosing the Right Persona

A product can blend personas, but it should have a primary one. Use these signals:

**Developer tool**: The primary user is a developer. The product integrates with code, CI/CD, APIs, or infrastructure. The technical quality of the product is itself a marketing claim.

**Consumer SaaS**: The primary user is a knowledge worker or general consumer. Onboarding is self-serve. The product has a freemium or trial model. Retention depends on habit formation.

**Creative tool**: The primary user creates artifacts -- designs, videos, code, writing, 3D. The product's own UI is a demonstration of taste. The community shares output publicly.

**B2B enterprise**: The primary buyer is a department head, IT lead, or executive. Procurement involves multiple stakeholders. Trust, compliance, and integration with existing systems are primary purchase drivers.

**E-commerce**: The primary goal is product discovery and purchase. Products are the content. Conversion rate is the primary metric.

## What Each Persona File Contains

- Font pairing: display, body, mono
- Color philosophy: background approach, accent strategy, palette notes
- Layout patterns: spacing scale, density, grid approach
- Component style: specific guidance on buttons, cards, forms
- Exemplar sites: specific things to study about each
- Persona-specific anti-patterns: the mistakes that are uniquely common for this category

## Using Personas in Audits

When running `/kern:audit` with a persona specified, Kern checks both the base anti-patterns (visual/copy/interaction) and the persona-specific anti-patterns. A developer tool that uses lifestyle photography gets flagged even if the photography is high quality. A consumer SaaS that hides behind jargon gets flagged even if the jargon is accurate.

Persona mismatch is a failure mode that base anti-pattern checks cannot catch. It requires category context.
