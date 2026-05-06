#!/usr/bin/env python3
"""
Reference implementation of the anti-pattern-selector algorithm.

The actual selector is a Claude Code agent at agents/anti-pattern-selector.md.
This simulator mirrors that algorithm in pure Python so the rotation rule and
audit-log behavior can be verified deterministically without the agent runtime.

Usage:
    python tools/draw_simulator.py "<product description>" \\
        [--persona PERSONA] [--surface SURFACE] [--industry INDUSTRY] \\
        [--audience AUDIENCE] [--competitors C1,C2] [--brand-tokens TOKEN1,TOKEN2] \\
        [--command design] [--state-file PATH]

The simulator reads anti-patterns/manifest.json and the last 5 lines of the
state file (default: state/draws.jsonl). It computes a subset following the
same rules the agent follows, then appends one audit line to the state file
and prints the audit_header markdown to stdout.

Run it twice in a row with the same inputs and confirm the second subset
differs from the first. That is the rotation rule.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import os
import random
import secrets
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable

SELECTOR_VERSION = "1.0.0"
REPO_ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = REPO_ROOT / "anti-patterns" / "manifest.json"
DEFAULT_STATE_PATH = REPO_ROOT / "state" / "draws.jsonl"

TOOL_FINGERPRINT_IDS = {
    "inter-default",
    "indigo-500-everywhere",
    "shadcn-button-defaults",
    "excessive-border-radius",
    "shadcn-gray-defaults",
    "recognizable-stock-icons",
}

CATEGORY_DIVERSITY_MIN = (
    "color",
    "typography",
    "layout",
    "copy-voice",
    "microcopy",
    "feedback",
    "animation",
)


@dataclass
class Pattern:
    id: str
    title: str
    categories: list[str]
    tags: list[str]
    severity_default: str
    source_file: str
    anchor: str
    personas: list[str]
    site_signals: list[str]


@dataclass
class Inputs:
    command: str
    product: str
    persona: str
    surface: str | None
    industry: str | None
    audience: str | None
    competitors: list[str]
    brand_tokens: list[str]


@dataclass
class Draw:
    ts: str
    run_id: str
    command: str
    selector_version: str
    input_signal: dict
    pool_size: int
    subset_size: int
    subset: list[str]
    site_specific_inclusions: list[str]
    rotation_excluded: list[str]
    previous_subsets_consulted: int
    rationale: str


def load_manifest(path: Path = MANIFEST_PATH) -> list[Pattern]:
    data = json.loads(path.read_text())
    return [
        Pattern(
            id=p["id"],
            title=p["title"],
            categories=p["categories"],
            tags=p.get("tags", []),
            severity_default=p["severity_default"],
            source_file=p["source_file"],
            anchor=p["anchor"],
            personas=p["personas"],
            site_signals=p["site_signals"],
        )
        for p in data["patterns"]
    ]


def load_history(path: Path, n: int = 5) -> list[dict]:
    if not path.exists():
        return []
    lines = [ln for ln in path.read_text().splitlines() if ln.strip()]
    return [json.loads(ln) for ln in lines[-n:]]


def derive_run_id() -> str:
    now = dt.datetime.now(dt.timezone.utc).strftime("%Y%m%d-%H%M%S")
    return f"kern-{now}-{secrets.token_hex(2)}"


def detect_signals(inputs: Inputs) -> Inputs:
    """If persona or surface are missing, infer them from product text."""
    text = inputs.product.lower()
    persona = inputs.persona
    surface = inputs.surface

    if persona == "unknown":
        if any(k in text for k in ["postgres", "deploy", "ci/cd", "sdk", "api", "backend", "developer"]):
            persona = "developer-tool"
        elif any(k in text for k in ["enterprise", "compliance", "audit", "soc2"]):
            persona = "b2b-enterprise"
        elif any(k in text for k in ["shop", "store", "checkout", "cart", "product"]):
            persona = "e-commerce"
        elif any(k in text for k in ["draw", "canvas", "studio", "creative", "video", "audio"]):
            persona = "creative-tool"
        else:
            persona = "consumer-saas"

    if surface is None:
        if any(k in text for k in ["landing", "homepage", "marketing", "hero"]):
            surface = "landing-page"
        elif "pricing" in text:
            surface = "pricing-page"
        elif any(k in text for k in ["dashboard", "settings", "admin"]):
            surface = "dashboard"
        elif any(k in text for k in ["signup", "sign up", "register"]):
            surface = "signup"
        elif "checkout" in text:
            surface = "checkout"
        else:
            surface = "any"

    return Inputs(
        command=inputs.command,
        product=inputs.product,
        persona=persona,
        surface=surface,
        industry=inputs.industry,
        audience=inputs.audience,
        competitors=inputs.competitors,
        brand_tokens=inputs.brand_tokens,
    )


def must_include_set(patterns: list[Pattern], inputs: Inputs) -> list[str]:
    by_id = {p.id: p for p in patterns}

    def take(*ids: str) -> list[str]:
        return [pid for pid in ids if pid in by_id]

    forced: list[str] = []
    if inputs.surface in {"landing-page", "marketing"}:
        forced += take(
            "centered-glowing-hero",
            "hero-dashboard-screenshot",
            "centered-symmetry",
            "three-col-feature-grid",
            "generic-heroic-copy",
            "vague-headlines",
            "self-descriptors",
            "three-tier-pricing-table",
            "testimonial-grid-avatars",
            "entrance-animations-as-marketing",
        )
    if inputs.surface == "pricing-page":
        forced += take("three-tier-pricing-table", "dishonest-ctas")
    if inputs.surface in {"dashboard", "product-ui"}:
        forced += take(
            "nested-card-soup",
            "microcopy-defaults",
            "motivational-empty-states",
            "loading-as-marketing",
            "missing-async-feedback",
            "toast-spam",
            "unnecessary-confirmations",
        )
    if inputs.surface in {"signup", "checkout"}:
        forced += take("dishonest-ctas", "dark-patterns")

    if inputs.persona == "developer-tool":
        forced += take("inter-default", "marketing-verbs", "excessive-border-radius")
    elif inputs.persona == "consumer-saas":
        forced += take("motivational-empty-states", "bouncy-interactions")
    elif inputs.persona == "creative-tool":
        forced += take("motivational-empty-states", "bouncy-interactions", "flat-typographic-scale")
    elif inputs.persona == "b2b-enterprise":
        forced += take("ai-buzzword-inventory", "hedging-language", "vague-testimonials")
    elif inputs.persona == "e-commerce":
        forced += take("dishonest-ctas", "dark-patterns", "vague-testimonials")

    competitor_str = " ".join(inputs.competitors).lower()
    if any(c in competitor_str for c in ["linear", "stripe", "vercel", "neon", "planetscale"]):
        forced += take("hero-dashboard-screenshot")

    industry_str = (inputs.industry or "").lower()
    if any(c in industry_str for c in ["ai", "ml", "infra", "developer"]):
        forced += take("indigo-500-everywhere", "inter-default", "shadcn-button-defaults")

    brand_str = " ".join(inputs.brand_tokens).lower()
    if any(c in brand_str for c in ["purple", "indigo", "violet"]):
        forced += take("indigo-500-everywhere")

    seen: set[str] = set()
    deduped: list[str] = []
    for pid in forced:
        if pid not in seen:
            seen.add(pid)
            deduped.append(pid)
    return deduped


def select_subset(
    patterns: list[Pattern],
    inputs: Inputs,
    history: list[dict],
    run_id: str,
) -> Draw:
    by_id = {p.id: p for p in patterns}
    pool_ids = list(by_id.keys())

    previous_subset = set(history[-1]["subset"]) if history else set()
    runs_ago_2_subset = set(history[-2]["subset"]) if len(history) >= 2 else set()
    runs_ago_3_subset = set(history[-3]["subset"]) if len(history) >= 3 else set()

    seed_int = int(hashlib.sha256(run_id.encode()).hexdigest(), 16)
    target_size = 12 + (seed_int % 7)  # 12..18

    forced_full = must_include_set(patterns, inputs)
    forced_kept: list[str] = []
    rotation_excluded: list[str] = []

    fingerprint_recent_excluded = previous_subset.union(runs_ago_2_subset).intersection(TOOL_FINGERPRINT_IDS)

    for pid in forced_full:
        if pid in previous_subset:
            if pid in TOOL_FINGERPRINT_IDS and pid not in fingerprint_recent_excluded:
                forced_kept.append(pid)
                continue
            rotation_excluded.append(pid)
            continue
        forced_kept.append(pid)

    forced_kept = forced_kept[: max(1, target_size // 2)]

    rng = random.Random(seed_int)
    weights: dict[str, float] = {}
    for pid in pool_ids:
        w = 1.0
        if pid in TOOL_FINGERPRINT_IDS:
            w *= 1.30
        if pid in previous_subset and pid not in forced_kept:
            w *= 0.10
        if pid in runs_ago_2_subset and pid not in previous_subset:
            w *= 1.10
        if pid in runs_ago_3_subset and pid not in previous_subset and pid not in runs_ago_2_subset:
            w *= 1.05
        weights[pid] = w

    chosen: list[str] = list(forced_kept)
    chosen_set = set(chosen)

    def category_coverage_count(ids: Iterable[str]) -> int:
        cats = set()
        for pid in ids:
            cats.update(by_id[pid].categories)
        return sum(1 for c in CATEGORY_DIVERSITY_MIN if c in cats)

    candidates = [pid for pid in pool_ids if pid not in chosen_set]

    while len(chosen) < target_size and candidates:
        coverage = category_coverage_count(chosen)
        missing_cats = [c for c in CATEGORY_DIVERSITY_MIN if c not in {x for pid in chosen for x in by_id[pid].categories}]
        if missing_cats and coverage < len(CATEGORY_DIVERSITY_MIN):
            cat_pool = [pid for pid in candidates if any(c in by_id[pid].categories for c in missing_cats)]
            if cat_pool:
                chosen_pid = weighted_choice(cat_pool, weights, rng)
                chosen.append(chosen_pid)
                chosen_set.add(chosen_pid)
                candidates.remove(chosen_pid)
                continue

        chosen_pid = weighted_choice(candidates, weights, rng)
        chosen.append(chosen_pid)
        chosen_set.add(chosen_pid)
        candidates.remove(chosen_pid)

    if set(chosen) == previous_subset and previous_subset:
        non_forced = [pid for pid in chosen if pid not in forced_kept]
        if non_forced:
            swap_out = rng.choice(non_forced)
            replacements = [pid for pid in pool_ids if pid not in chosen_set]
            if replacements:
                swap_in = weighted_choice(replacements, weights, rng)
                chosen[chosen.index(swap_out)] = swap_in
                chosen_set = set(chosen)

    # Filter rotation_excluded to only IDs that actually ended up missing from
    # the final subset. A forced-then-deferred ID can still be resampled later;
    # logging it as excluded when it is in the subset is misleading.
    rotation_excluded = [pid for pid in rotation_excluded if pid not in chosen_set]

    rationale_parts = [
        f"Surface={inputs.surface}, persona={inputs.persona}.",
        f"{len(forced_kept)} patterns forced by site-specific signals.",
    ]
    if rotation_excluded:
        rationale_parts.append(f"{len(rotation_excluded)} forced patterns deferred by rotation.")
    if previous_subset:
        rationale_parts.append("Weighted previous subset down to enforce variation.")
    rationale = " ".join(rationale_parts)

    return Draw(
        ts=dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z"),
        run_id=run_id,
        command=inputs.command,
        selector_version=SELECTOR_VERSION,
        input_signal={
            "product": inputs.product[:200],
            "persona": inputs.persona,
            "industry": inputs.industry,
            "audience": inputs.audience,
            "competitors": inputs.competitors,
            "surface": inputs.surface,
            "brand_tokens": inputs.brand_tokens,
        },
        pool_size=len(patterns),
        subset_size=len(chosen),
        subset=chosen,
        site_specific_inclusions=forced_kept,
        rotation_excluded=rotation_excluded,
        previous_subsets_consulted=min(len(history), 5),
        rationale=rationale,
    )


def weighted_choice(items: list[str], weights: dict[str, float], rng: random.Random) -> str:
    if not items:
        raise ValueError("no items to choose from")
    ws = [max(weights.get(pid, 1.0), 1e-6) for pid in items]
    total = sum(ws)
    r = rng.uniform(0, total)
    upto = 0.0
    for pid, w in zip(items, ws):
        upto += w
        if upto >= r:
            return pid
    return items[-1]


def render_audit_header(draw: Draw, by_id: dict[str, Pattern]) -> str:
    rows = []
    for pid in draw.subset:
        p = by_id[pid]
        rows.append(f"| `{p.id}` | {p.title} | {p.categories[0]} | {p.source_file} |")
    table = "\n".join(rows)

    forced_lines = []
    for pid in draw.site_specific_inclusions:
        forced_lines.append(f"- `{pid}`: forced by surface or persona signal")
    forced_block = "\n".join(forced_lines) if forced_lines else "- (none)"

    excluded = ", ".join(draw.rotation_excluded) if draw.rotation_excluded else "(none)"

    return (
        f"# Kern Anti-Pattern Draw\n\n"
        f"**Run ID**: `{draw.run_id}`\n"
        f"**Command**: /{draw.command}\n"
        f"**Pool size**: {draw.pool_size}\n"
        f"**Subset size**: {draw.subset_size}\n"
        f"**Persona**: {draw.input_signal['persona']}\n"
        f"**Surface**: {draw.input_signal['surface']}\n\n"
        f"## Selected Anti-Patterns\n\n"
        f"| ID | Title | Category | Source |\n"
        f"|---|---|---|---|\n"
        f"{table}\n\n"
        f"## Site-Specific Inclusions\n\n"
        f"{forced_block}\n\n"
        f"## Rotation\n\n"
        f"Previous subsets consulted: {draw.previous_subsets_consulted}\n"
        f"Excluded this run (rotation rule): {excluded}\n\n"
        f"## Rationale\n\n"
        f"{draw.rationale}\n"
    )


def append_audit(draw: Draw, state_path: Path) -> str:
    line = json.dumps({
        "ts": draw.ts,
        "run_id": draw.run_id,
        "command": draw.command,
        "selector_version": draw.selector_version,
        "input_signal": draw.input_signal,
        "pool_size": draw.pool_size,
        "subset_size": draw.subset_size,
        "subset": draw.subset,
        "site_specific_inclusions": draw.site_specific_inclusions,
        "rotation_excluded": draw.rotation_excluded,
        "previous_subsets_consulted": draw.previous_subsets_consulted,
        "rationale": draw.rationale,
    }, separators=(",", ":"))
    state_path.parent.mkdir(parents=True, exist_ok=True)
    with state_path.open("a", encoding="utf-8") as f:
        f.write(line + "\n")
    return line


def parse_args() -> tuple[Inputs, Path, str | None]:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("product", help="Product description string")
    p.add_argument("--command", default="design")
    p.add_argument("--persona", default="unknown")
    p.add_argument("--surface", default=None)
    p.add_argument("--industry", default=None)
    p.add_argument("--audience", default=None)
    p.add_argument("--competitors", default="")
    p.add_argument("--brand-tokens", default="")
    p.add_argument("--state-file", default=str(DEFAULT_STATE_PATH))
    p.add_argument("--run-id", default=None, help="Override generated run_id (useful for tests)")
    args = p.parse_args()

    inputs = Inputs(
        command=args.command,
        product=args.product,
        persona=args.persona,
        surface=args.surface,
        industry=args.industry,
        audience=args.audience,
        competitors=[c.strip() for c in args.competitors.split(",") if c.strip()],
        brand_tokens=[c.strip() for c in args.brand_tokens.split(",") if c.strip()],
    )
    return inputs, Path(args.state_file), args.run_id


def main() -> int:
    inputs, state_path, run_id_override = parse_args()
    inputs = detect_signals(inputs)
    patterns = load_manifest()
    by_id = {p.id: p for p in patterns}
    history = load_history(state_path)
    run_id = run_id_override or derive_run_id()
    draw = select_subset(patterns, inputs, history, run_id)
    line = append_audit(draw, state_path)
    print(render_audit_header(draw, by_id))
    print()
    print(f"Audit line written to {state_path}:")
    print(line)
    if history:
        prev = set(history[-1]["subset"])
        cur = set(draw.subset)
        diff = cur.symmetric_difference(prev)
        print()
        print(f"Rotation check: |prev|={len(prev)} |cur|={len(cur)} |symmetric_diff|={len(diff)}")
        if cur == prev:
            print("ERROR: subset matches previous run. Rotation rule violated.")
            return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
