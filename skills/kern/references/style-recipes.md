# Reusable Style Recipes

A style recipe is a compact, tool-agnostic set of decisions that can be reused across surfaces. It is an input to `/kern:design`, `/kern:compare`, and `/kern:differentiate`. It is not a new command and it does not override current user direction.

## Recipe identity

Use a stable, human-readable name with a semantic version and an explicit scope:

```yaml
name: editorial-workbench
version: 1.2.0
scope:
  product: contract-console
  surfaces: [dashboard, detail]
status: active
```

- `name` identifies the visual language, not a page or campaign.
- `version` changes when a token, rule, or exception changes. Patch versions clarify wording; minor versions add compatible decisions; major versions change the visual contract.
- `scope.product` and `scope.surfaces` limit where the recipe applies. An unscoped recipe is a candidate, not an instruction.
- Keep retired recipes readable for provenance. Never silently replace a version used by a prior brief.

## Recipe schema

```yaml
name: <stable recipe name>
version: <semver>
scope:
  product: <product or product family>
  surfaces: [<surface names>]
intent: <one sentence describing the job this language supports>

current_direction_precedence:
  - <user requirement that must win>

typography:
  display: <family and role>
  body: <family and role>
  mono: <family and role, or none>
  scale: <named sizes and line heights>
  weights: <allowed weights by role>

color_roles:
  canvas: <role and value or derivation>
  surface: <role and value or derivation>
  text: <role and value or derivation>
  muted_text: <role and value or derivation>
  accent: <role and value or derivation>
  action: <role and value or derivation>
  status: <success, warning, danger, info roles>

spacing:
  base: <unit>
  rhythm: <named steps and intended use>
  density: <compact | balanced | spacious and why>

radii:
  hierarchy: <control, surface, feature, overlay values>
borders_shadows:
  borders: <where separators and outlines are used>
  shadows: <where elevation is meaningful>

imagery:
  subject: <art direction>
  treatment: <crop, aspect, contrast, or none>
  sourcing: <owned, supplied, generated, or placeholder rule>

motion:
  transitions: <properties, duration, easing>
  feedback: <state changes that move>
  static_areas: <what must not animate>

component_composition:
  primitives: <preferred building blocks>
  hierarchy: <how surfaces, sections, and controls compose>
  variation: <where repetition must break>

copy_voice:
  register: <tone and level of formality>
  labels: <label and CTA rules>
  content_pattern: <headline, proof, metadata, and state pattern>

anti_pattern_exceptions:
  - pattern: <known anti-pattern or local exception>
    exception: <what is allowed>
    reason: <user or product reason>
    boundary: <where it stops applying>
```

All fields are required at the contract level. Use `none`, `unknown`, or `not applicable` when a field is intentionally absent. Values can be tokens, prose, or references to an existing system. The recipe must describe roles and constraints, not require a particular framework.

## Applying a recipe

1. Load the requested name and exact version. If it is missing or out of scope, report that limitation.
2. Create `style_recipe_context` with identity, scope, loaded fields, conflicts, and provenance.
3. Translate recipe decisions into the current surface's benchmark brief. Do not paste the recipe into code without checking content, persona, and interaction needs.
4. Let current user direction, existing system constraints, and task clarity outrank the recipe. Log every conflict in `adaptation_notes`.
5. Apply `anti_pattern_exceptions` only at the stated boundary. An exception is not permission to ignore the selected anti-pattern subset or accessibility audit.
6. Include recipe provenance and the adapted fields in the final design brief.

A recipe gives continuity. It does not freeze the product, force a component library, or excuse repeated structures that make the surface harder to use. If no recipe is supplied, Kern uses the no-reference fallback in `reference-led-design.md` and does not fabricate a recipe.
