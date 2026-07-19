---
description: "Compare two designs: layout, color, type, copy similarity. Reports similarity score."
allowed-tools: ["Read", "Glob", "Grep"]
---

# /kern:compare

Compares two designs and reports on their visual similarity, distinctiveness, and what makes each one unique (or does not).

## Usage

```
/kern:compare <file1> <file2>
```

Both inputs can be: React/TSX code, HTML, Tailwind class lists, screenshots, or descriptions. They do not need to be the same type.

## What Gets Compared

- **Layout**: structure, hero treatment, grid approach, section sequence
- **Color**: primary background, accent, surface treatments
- **Typography**: font family, scale, weight distribution
- **Components**: button style, card style, navigation
- **Copy**: register, patterns, CTA language
- **Similarity score**: 0-100% design-to-design (separate from sameness score)

## Output

Spawn the design-critic agent in comparison mode. Output includes:
- Similarity score with explanation
- Per-dimension comparison tables
- Distinctive elements of each design
- What would need to change (if similarity > 40%)
- Individual sameness scores (vs AI defaults)
