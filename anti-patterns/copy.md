# Copy Anti-Patterns

Copy rules for developer-built UIs. The standard is: write like a peer, not a product marketer.

---

## The Em-Dash Problem

**What it is**: Using `--` or `&mdash;` as a punctuation crutch -- like this -- to add emphasis, introduce an aside, or avoid committing to sentence structure.

**Why it fails**: Em-dashes pad sentences. They signal the writer couldn't decide between a comma, a period, or restructuring the sentence. AI writing models overuse them because they statistically appear in confident-sounding prose. Readers notice.

**Fix**: Replace with a period. Or a comma. Or cut the aside entirely. If the aside is worth including, give it its own sentence.

```
Before: Build faster -- without the overhead of traditional CI systems.
After:  Build faster. No overhead.

Before: Ship when you're ready -- not when the pipeline decides.
After:  Ship when you're ready.
```

---

## En-Dash as Em-Dash

**What it is**: Using `&ndash;` (--) where writers mean an em-dash or a hyphen. Often appears in date ranges used as prose connectors.

**Why it fails**: Incorrect punctuation reads as carelessness or copy-paste from a system that doesn't handle Unicode correctly.

**Fix**: Date ranges get en-dashes with no spaces: `Jan 15--Feb 3`. Prose connectors: use a comma or period. Don't use dashes as sentence connectors in UI copy at all.

---

## Marketing Verbs

Never use these verbs in a developer-facing product:

| Verb | Why It Fails | Replace With |
|---|---|---|
| unleash | Implies the product was caged, which is not reassuring | "Use" or describe the action |
| revolutionize | Claims world-historical significance for a software feature | Describe what it actually does |
| supercharge | Borrowed from energy drinks | "Speed up" or "improve" |
| transform | Overpromises, underdelivers | "Change" or describe the specific change |
| level up | Gaming metaphor, condescending | Describe the improvement concretely |
| 10x | A multiplier requires a baseline -- you don't have one | Give actual data or drop the claim |
| skyrocket | Directional metaphor with no substance | Use a number or drop it |
| amplify | Marketing speak for "improve" | "Improve" |
| elevate | Same problem as amplify | Specific verb for what it does |

**Pattern**: If the verb could appear in an energy drink ad, don't use it in software.

---

## Hedging Language

**What it is**: Softening claims or instructions with qualifiers that make the product sound uncertain about itself.

Examples:
- "We believe this is the fastest way to..."
- "We think you'll love..."
- "We hope this helps..."
- "This might be useful for..."
- "You may want to consider..."

**Why it fails**: Hedging shifts responsibility from the product to the user. "We believe" means "we're not sure." "You may want to" means "we couldn't decide whether to recommend this." It reads as either false modesty or genuine uncertainty, neither of which builds confidence.

**Fix**: Assert. If the claim is true, state it. If you're not sure it's true, don't make it.

```
Before: We think you'll find our API easier to use.
After:  The API has one endpoint. No auth setup.

Before: You may want to enable two-factor authentication.
After:  Enable two-factor authentication.
```

---

## Filler Openers

Never open copy with these phrases:

- "In today's fast-paced world..."
- "In an increasingly connected world..."
- "In the ever-evolving landscape of..."
- "As [industry] continues to grow..."
- "Now more than ever..."
- "We're living in a world where..."
- "Whether you're a [user type] or [other user type]..."

**Why it fails**: These openers delay the point. They're throat-clearing. They also pattern-match to AI-generated content and to the kind of whitepapers no one reads. Your user landed on your page with a specific intent. Get to it.

**Fix**: Open with the actual point.

```
Before: In today's fast-paced development environment, teams need tools that keep up.
After:  Deploys in under 30 seconds.
```

---

## Self-Descriptors

**What it is**: Describing your product in terms of what it is rather than what it does.

Examples:
- "A powerful platform for..."
- "An all-in-one solution..."
- "A comprehensive suite of tools..."
- "A next-generation approach to..."
- "A best-in-class..."

**Why it fails**: "Powerful platform" is not a claim, it's a category description. It tells the user nothing. Every product in your category is described the same way.

**Fix**: Describe what the product specifically does for a specific person.

```
Before: A powerful platform for modern development teams.
After:  Deploy from git push. Rollback in one click.
```

---

## Passive Voice in Action Contexts

**What it is**: Using passive voice in button labels, instructions, or descriptions where an active subject is implied.

Examples:
- "Errors will be highlighted" (who highlights them?)
- "Your file will be processed" (by what?)
- "Changes are saved automatically" (acceptable -- subject is the system)

**Why it fails**: Passive voice in instructional copy removes the actor, which removes clarity about responsibility. In error states especially, "an error occurred" is less useful than "the request failed."

**Fix**: Name the actor.

```
Before: Your invite will be sent.
After:  We'll send the invite now.

Before: Errors will be displayed in the console.
After:  Kern displays errors in the console.

Before: An error occurred while processing your request.
After:  The request timed out. Try again, or check your network.
```

---

## Vague Headlines

**What it is**: Headlines that describe a category instead of a specific benefit.

Pattern: `[Positive adjective] + [generic noun]`

Examples:
- "Seamless Collaboration"
- "Powerful Integrations"
- "Smart Automation"
- "Better Workflows"
- "Complete Visibility"

**Why it fails**: These headlines are interchangeable across products. "Seamless Collaboration" appears on every B2B SaaS site since 2017. They're category descriptions, not differentiators.

**Fix**: Specific claim or imperative.

```
Before: Powerful Integrations
After:  Connect Slack, Linear, and GitHub in 3 minutes

Before: Smart Automation
After:  Auto-close resolved issues. No cron jobs.
```

---

## Microcopy Table

Common microcopy patterns and their fixes:

| Location | Pattern to Avoid | Better |
|---|---|---|
| Empty state | "No items yet! Get started by creating your first item." | Show a relevant sample, or: "Create your first [item]" as a CTA only |
| Empty state | "It looks like you haven't added anything yet." | Describe what would appear here, then offer the action |
| Error message | "Something went wrong." | Name what failed and what to do |
| Error message | "Please try again later." | Provide a specific next step or ETA |
| Success toast | "Success!" | State what succeeded: "Saved." or "Deploy started." |
| Loading | "Please wait while we process your request." | "Processing..." or just a spinner with no copy |
| Confirmation dialog | "Are you sure?" | "Delete [item name]? This removes it permanently." |
| Confirmation dialog | "This action cannot be undone." | Fine, but pair it with a description of the specific action |
| Tooltip | "Click to [repeat the button label]" | Describe the non-obvious behavior, or remove the tooltip |
| Placeholder text | "Enter your [field name]..." | Use the label only. Placeholders that repeat the label add noise. |
| Button label | "Submit" | Name the action: "Save changes", "Create account", "Send invite" |
| Button label | "Cancel" | Fine for dialog dismiss. Not fine as the only way to exit a destructive flow. |
| Onboarding | "Welcome to [Product]! Let's get you started." | Skip to the first action. |
