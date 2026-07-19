---
date: 2026-04-16
ai_tool: v0, Lovable, Bolt.new, Cursor (universal default CTA text)
sources:
  - platform: reddit
    context: r/marketing, r/web_design, r/startups -- multiple threads
    quote: "'Get Started' means nothing. Started what? Every SaaS uses it. It tells me nothing about what I'm about to do or what value I'm getting."
  - platform: hn
    context: HN threads on CTA optimization and landing page conversion
    quote: "The research on this is pretty clear -- specific CTAs ('Start your first deploy', 'Connect your repo') outperform generic ones ('Get Started', 'Sign Up') by large margins. AI tools default to generic because they have no product context."
additional_sources: 6
---

# Vague "Get Started" CTA Epidemic

**Pattern**: Using "Get Started" (or "Sign Up", "Try It Free", "Learn More") as the primary call-to-action on a landing page or in any conversion moment. The button text describes an action (starting, signing up) with no reference to the specific value the user is about to receive.

**Why it fails** (from community): "Get Started" is the absence of a CTA decision. It requires zero product knowledge to write and communicates zero product value to the reader. The button tells users what they're doing (starting), not what they're getting. Community consensus is that specific CTAs tied to product outcomes convert better and signal that the product has real, describable value. When every product uses "Get Started," none of them are differentiated.

Community language: "the default button," "get started nowhere," "generic CTA soup," "AI wrote this CTA."

**Fix**: Write the CTA as the next specific action the user will take, tied to a concrete outcome. "Connect your repo" is better than "Get Started" because it tells the user exactly what happens next. "Send your first message" beats "Sign Up Free" because it anchors to product value.

```tsx
// Not this -- generic
<Button>Get Started</Button>
<Button variant="outline">Learn More</Button>

// This -- specific to the product action
<Button>Connect Your Repo</Button>
<Button variant="ghost">See how it works →</Button>

// Also good -- action + outcome
<Button>Start your free trial</Button>  // when trial is the actual offer

// For tools where the value is the output
<Button>Generate your first report</Button>
<Button>Deploy in 60 seconds</Button>
```

## Sources

- r/marketing: "Why 'Get Started' is killing your conversion rate" (2024, 200+ upvotes)
- r/startups: Multiple threads on CTA copywriting with specific vs generic comparison
- HN: Discussion threads on landing page conversion, CTA specificity named repeatedly
- X: Copywriters posting CTA critique threads naming AI-generated generic CTAs
- ConversionXL/CXL: Published research on CTA specificity and conversion rates
- r/web_design: "AI-generated CTAs all say the same thing" (2025)
