# Persona: B2B Enterprise

Products in this category: CRM, ERP, HR platforms, compliance tools, financial reporting, procurement, contract management, security tools, data pipelines, analytics platforms.

Users: Business professionals who use the tool because their company bought it. They may not have chosen it. They value correctness, reliability, and learnability over aesthetics -- but they will distrust a product that looks unfinished, and they will cite visual quality concerns in procurement evaluations.

---

## Core Aesthetic

Professional. Trustworthy. Consistent. Not flashy.

The interface should communicate stability. It should look like it has been maintained and matured over time, not like it was built in a weekend. Whitespace is appropriate. Color restraint is critical.

Think: Salesforce (ignoring its specific problems), Workday (its core aesthetic, not its execution), Stripe, Brex, Ramp, Rippling.

Do not think: consumer apps, startup landing pages, anything with a radial gradient hero.

---

## Font Pairing

**UI font:** Inter is actually appropriate here as a deliberate choice. It reads as corporate-neutral, which is the right register. Alternatives: GT Walsheim (slightly more personality while staying professional), IBM Plex Sans (signals technical credibility).

**Data font:** `font-variant-numeric: tabular-nums` on all numeric data columns. This is non-negotiable for financial and data-heavy tables.

**Avoid:** Anything that reads as startup or consumer (Figtree, Space Grotesk). Serifs in the app shell (wrong register for action-focused interfaces).

**Size discipline:** 13-14px for data, consistent across the product. Enterprise tools are information-dense by nature -- fighting this with large type creates worse outcomes.

---

## Color Philosophy

Light mode default. Enterprise software runs in office environments, on dual monitors, all day.

- Base: `oklch(99% 0 0)` -- true white is fine here; clinical reads as precise
- Surface: `oklch(97% 0.003 240)` -- very slight blue-gray for panels, sidebars
- Border: `oklch(88% 0.006 240)` -- visible but not heavy
- Accent: Blue is conventional and expected. This is one category where the blue convention earns trust. Muted, not electric.
- Status: Red/yellow/green for status states. Expected, unambiguous.

**Do not try to be distinctive.** Enterprise buyers evaluate software in committees. "It looks different" is a procurement risk, not a benefit. Earned differentiation comes from data handling, not from a distinctive color palette.

---

## Layout Patterns

- **Navigation is critical.** Enterprise tools have many features. The nav must communicate hierarchy and current location at all times.
- **Data tables are the product.** Often: the entire value of the tool is in a table. Invest in the table design. Sort, filter, column resize, frozen columns, row actions.
- **Forms are workflows.** Long forms should be multi-step, showing progress. Every field should have clear labeling and inline validation.
- **Print/export is a real use case.** Design with print layout in mind for reports.
- **Role-based views.** What the admin sees is different from what the end user sees. Kern should ask about the primary user role before generating.

---

## Exemplars

- **Stripe** -- enterprise-grade data tables with exceptional density, well-considered filtering
- **Ramp** -- modern enterprise finance tool that achieved differentiation through clarity, not decoration
- **Rippling** -- complex HR/IT platform that maintains navigability despite feature breadth
- **Linear** (enterprise tier) -- showed that enterprise tools can be keyboard-first and still pass procurement
- **Brex** -- expense management that looks credible enough for a CFO and fast enough for a startup; navigation handles many modules without collapsing into a hamburger; tabular-nums on all financial data is enforced throughout

---

## Signature Moves

Concrete Tailwind decisions that signal "B2B enterprise" identity.

**1. Tabular numbers on ALL numeric data — non-negotiable**
```
// Before (AI default — proportional numbers, columns shift width)
<td className="text-sm text-gray-700">$1,234.56</td>

// After (B2B Enterprise — aligned decimals, no column jitter)
<td className="text-[13px] text-gray-700 [font-variant-numeric:tabular-nums]">$1,234.56</td>
```

**2. Blue-gray surface tint on panels — not white or slate**
```
// Before (AI default — white card or slate-100)
<aside className="bg-slate-100 border-r border-gray-200">

// After (B2B Enterprise — institutional blue-gray)
<aside className="bg-[oklch(97%_0.003_240)] border-r border-[oklch(88%_0.006_240)]">
```

**3. Compact data rows — not default table padding**
```
// Before (AI default — generous padding, consumer-feel)
<tr className="px-6 py-4 text-sm border-b">

// After (B2B Enterprise — dense, information-first)
<tr className="px-4 py-2 text-[13px] leading-5 border-b border-[oklch(88%_0.006_240)]">
```

---

## Persona-Specific Anti-Patterns

**AP-BE-1: Consumer-grade empty states in enterprise context**
"Looks like nothing's here yet! Get started by creating your first record." Enterprise users see this and think the product is not mature. Empty states should be functional: "No contracts found. Create contract or import from CSV."

**AP-BE-2: Hiding column configurability**
Data tables with fixed columns that can't be reordered, shown/hidden, or resized. Enterprise users have their own mental models of what they need to see. They will ask for custom columns within the first week.

**AP-BE-3: Decimal and number formatting inconsistency**
Currency without consistent decimal alignment, numbers that aren't `tabular-nums`, percentages and currency mixed in the same column without clear labeling. Enterprise financial contexts require precision in data rendering.

**AP-BE-4: No keyboard navigation on forms**
Tab order that jumps around unpredictably, or forms that can't be completed entirely by keyboard. Enterprise data entry users process high volumes of records. Mouse-required forms are a blocker.

**AP-BE-5: Bulk action as an afterthought**
No "select all" or multi-row actions in data tables. Enterprise users operate on many records at once. Bulk actions (export selected, archive selected, assign selected) should be first-class.

---

## Contracts Table Patterns

Domain-specific prescription for contract lifecycle management UIs. Applies to: contract management tools, procurement platforms, legal ops dashboards, vendor management.

### Column Layout — canonical order

| Column | Width | Type | Notes |
|--------|-------|------|-------|
| Checkbox | 40px | select | Multi-select for bulk ops |
| Contract name | 240px | text (link) | Bold, wraps to 2 lines max |
| Counterparty | 180px | text | Company name only |
| Parties | 140px | badge list | "2 parties" link → expand |
| Effective date | 120px | date | `tabular-nums`, `MMM D, YYYY` |
| Expiry date | 120px | date | Red when <30 days out |
| Status | 110px | badge | Shape + label + color (never color alone) |
| Actions | 48px | menu | Ellipsis → hover-reveal context menu |

### Status Badge TSX — shape + label + color (not color-only dots)

```tsx
// Before (AI default — color-only dot, inaccessible)
<span className="flex items-center gap-1">
  <span className="w-2 h-2 rounded-full bg-green-500" />
  Active
</span>

// After (B2B Enterprise — pill with semantic label, works for colorblind users)
type ContractStatus = 'active' | 'in-review' | 'expired' | 'draft' | 'terminated'

const STATUS_CONFIG: Record<ContractStatus, { label: string; classes: string }> = {
  active:      { label: 'Active',      classes: 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200' },
  'in-review': { label: 'In Review',   classes: 'bg-amber-50  text-amber-800  ring-1 ring-amber-200'  },
  expired:     { label: 'Expired',     classes: 'bg-red-50    text-red-700    ring-1 ring-red-200'    },
  draft:       { label: 'Draft',       classes: 'bg-gray-50   text-gray-600   ring-1 ring-gray-200'   },
  terminated:  { label: 'Terminated',  classes: 'bg-gray-100  text-gray-500   ring-1 ring-gray-200'   },
}

function StatusBadge({ status }: { status: ContractStatus }) {
  const { label, classes } = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${classes}`}>
      {label}
    </span>
  )
}
```

### Full Table TSX skeleton

```tsx
function ContractsTable({ contracts }: { contracts: Contract[] }) {
  return (
    <div className="font-['Inter',_sans-serif] rounded-md border border-[oklch(88%_0.006_240)] overflow-hidden">
      {/* Inter — deliberate corporate-neutral choice; avoids DM Sans/Figtree/Space Grotesk consumer signals */}

      {/* Toolbar: search + filter + bulk actions */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[oklch(88%_0.006_240)] bg-[oklch(97%_0.003_240)]">
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search contracts…"
            className="h-8 w-64 px-3 text-[13px] rounded border border-[oklch(88%_0.006_240)] bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="h-8 px-3 text-[13px] text-gray-600 rounded border border-[oklch(88%_0.006_240)] bg-white hover:bg-gray-50">
            Filter
          </button>
        </div>
        <button className="h-8 px-3 text-[13px] font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
          New contract
        </button>
      </div>

      {/* Table */}
      <table className="w-full text-[13px]">
        <thead>
          <tr className="bg-[oklch(97%_0.003_240)] border-b border-[oklch(88%_0.006_240)]">
            <th className="w-10 px-4 py-2.5 text-left">
              <input type="checkbox" className="rounded border-gray-300" />
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-gray-500 text-[11px] uppercase tracking-wide">
              Contract
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-gray-500 text-[11px] uppercase tracking-wide">
              Counterparty
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-gray-500 text-[11px] uppercase tracking-wide">
              Parties
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-gray-500 text-[11px] uppercase tracking-wide [font-variant-numeric:tabular-nums]">
              Effective
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-gray-500 text-[11px] uppercase tracking-wide [font-variant-numeric:tabular-nums]">
              Expiry
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-gray-500 text-[11px] uppercase tracking-wide">
              Status
            </th>
            <th className="w-12 px-4 py-2.5" />
          </tr>
        </thead>
        <tbody className="divide-y divide-[oklch(88%_0.006_240)]">
          {contracts.map((c) => (
            <tr key={c.id} className="group hover:bg-[oklch(98%_0.002_240)]">
              <td className="px-4 py-2.5">
                <input type="checkbox" className="rounded border-gray-300" />
              </td>
              <td className="px-4 py-2.5 font-medium text-gray-900 max-w-[240px]">
                <a href={`/contracts/${c.id}`} className="hover:text-blue-600 line-clamp-2">
                  {c.name}
                </a>
              </td>
              <td className="px-4 py-2.5 text-gray-700">{c.counterparty}</td>
              <td className="px-4 py-2.5 text-gray-500">
                <button className="hover:text-blue-600 underline underline-offset-2">
                  {c.partyCount} parties
                </button>
              </td>
              <td className="px-4 py-2.5 text-gray-700 [font-variant-numeric:tabular-nums] whitespace-nowrap">
                {formatDate(c.effectiveDate)}
              </td>
              <td className={`px-4 py-2.5 [font-variant-numeric:tabular-nums] whitespace-nowrap ${
                isExpiringSoon(c.expiryDate) ? 'text-red-600 font-medium' : 'text-gray-700'
              }`}>
                {formatDate(c.expiryDate)}
              </td>
              <td className="px-4 py-2.5">
                <StatusBadge status={c.status} />
              </td>
              <td className="px-4 py-2.5">
                {/* Row actions: hidden until row hover */}
                <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                  <EllipsisHorizontalIcon className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

### What NOT to do

| Anti-pattern | Why it fails | Replacement |
|---|---|---|
| Card grid for contracts | Tables are scannable; cards hide density | `<table>` with compact rows |
| Color-only status dot | Fails colorblind users, fails accessibility audit | Pill badge: text + ring color |
| Generic column "Name" | Ambiguous in legal context | "Contract" (document title) |
| Generic column "Date" | Which date? Ambiguous | "Effective" and "Expiry" as separate columns |
| Always-visible row action buttons | Consume column space, visually noisy | `opacity-0 group-hover:opacity-100` ellipsis |
| "Parties" as a plain text field | Collapses multi-party contracts | Party count + expand-on-click |
| Missing `tabular-nums` on dates | Columns shift width on different dates | `[font-variant-numeric:tabular-nums]` on every date `<td>` |

---

## Persona Sameness Indicators

These patterns are AI-default for B2B enterprise specifically. They supplement the global Sameness Score rubric. Each indicator present in the design adds +1 to the score.

**PSI-BE-1: KPI card grid with trend arrows at the top of every dashboard**
Four to six cards — each containing a large number, a label, and an upward green arrow with a percentage change — arranged in a uniform grid as the first row of the dashboard. AI tools generate this for every "enterprise dashboard" prompt. Real enterprise dashboards prioritize the data the specific role needs first, not a generic metrics row. The uniform-card KPI header is the enterprise equivalent of the consumer SaaS "How It Works" section.

**PSI-BE-2: Color-only status differentiation in tables**
Status badges that use only color (green dot = active, red dot = inactive, yellow dot = pending) without a text label, shape, or secondary indicator. AI tools default to color-coded dots because they're compact and visually organized. Enterprise tools must meet accessibility standards and work for colorblind users: every status must have a text label, and color is supplementary. A green dot alone is never sufficient.

**PSI-BE-3: Accordion-nested sidebar navigation**
A left sidebar where each top-level item expands into a sub-list on click (accordion pattern), with 3-4 levels of nesting possible. AI tools generate this for "enterprise navigation" because it appears to handle large feature sets. Real enterprise tools use flat nav with clear section headers (Stripe), tab-based sub-navigation within sections (Salesforce), or a module switcher rather than infinite accordion depth. Deep accordion nesting loses users and signals the IA was designed to fit features, not to support tasks.
