---
date: 2026-04-16
ai_tool: v0, Lovable, Bolt.new, Replit (all built on shadcn/ui with unchanged CSS variables)
sources:
  - platform: reddit
    context: r/reactjs, r/webdev, r/shadcn -- multiple threads
    quote: "If you see a generated app with the shadcn look, it just means the prompter didn't customise the styles. The default shadcn palette looks exactly like every other default shadcn palette. That's why all AI apps look identical."
  - platform: hn
    context: HN threads on UI component library homogeneity
    quote: "shadcn/ui is terrible for 99% of people using it. Not because it's a bad library, but because developers don't have design training. They get the component set but not the design system knowledge to use it without making everything look identical."
additional_sources: 4
---

# Unthemed shadcn/ui: Default Gray Palette Everywhere

**Pattern**: shadcn/ui components used with zero theme customization. The CSS variable file (`globals.css`) retains the exact defaults installed by `npx shadcn-ui init`: `--background: 0 0% 100%`, `--foreground: 222.2 84% 4.9%`, `--primary: 221.2 83.2% 53.3%` (the default blue), `--muted: 210 40% 96.1%`. Every AI-generated project using shadcn looks visually identical because none of them override these variables. Lovable announced shadcn as their default design system; Bolt and v0 both default to it.

**Why it fails** (from community): The visual sameness criticism of shadcn was significant enough that the shadcn team released "Shadcn Create" in late 2025 specifically to address it. Before that, the community commentary was consistent: accepting shadcn defaults signals that no design work was done. One analysis put it directly: "If you see a generated app with the shadcn look, it just means the prompter didn't customise the styles." The library is a component framework, not a design system -- using it without customization is the equivalent of using Times New Roman and calling it a typography choice.

Community language: "the shadcn look," "default gray blues," "out-of-the-box shadcn," "template pallette."

**Fix**: Customize the CSS variables in `globals.css` before generating any UI. At minimum: change `--primary` to the brand hue, adjust `--radius`, and decide on a warm vs cool neutral palette. These 5 variable changes cascade through every component and are the fastest way to make AI-generated shadcn look intentional.

```css
/* Not this -- unchanged shadcn init defaults */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;        /* the default blue */
  --primary-foreground: 210 40% 98%;
  --muted: 210 40% 96.1%;
  --radius: 0.5rem;
}

/* This -- customized to brand before any component work */
:root {
  --background: 0 0% 99%;               /* slightly warm white */
  --foreground: 20 14% 8%;              /* warm near-black */
  --primary: 25 95% 50%;                /* brand amber */
  --primary-foreground: 0 0% 98%;
  --muted: 30 20% 96%;                  /* warm muted -- matches brand temperature */
  --radius: 0.375rem;                   /* slightly tighter -- more precise feel */
}
```

## Sources

- redmonk.com: "shadcn/ui and the Revenge of Copypasta" (2025) -- "shadcn/ui is terrible for 99% of people using it"
- saasindie.com: "shadcn/ui Trends and Future" -- visual sameness as the primary community criticism
- Reddit r/reactjs: Multiple threads on "why does every app look the same" pointing to shadcn defaults
- HN: "Where's the AI Design Renaissance?" -- shadcn default palette named repeatedly
- Lovable announcement: "Shadcn is now the default design system for new projects" (cited as homogeneity root cause)
- dev.to: "Your Vibe-Coded App Looks Ugly" -- shadcn without customization as the starting problem
