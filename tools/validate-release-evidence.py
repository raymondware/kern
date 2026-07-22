#!/usr/bin/env python3
"""Validate Kern release evidence files without requiring Claude Code."""

from __future__ import annotations

import json
import pathlib
import sys
from typing import Any

ROOT = pathlib.Path(__file__).resolve().parents[1]


def load_json(relative: str) -> Any:
    path = ROOT / relative
    try:
        return json.loads(path.read_text())
    except Exception as exc:  # noqa: BLE001
        raise SystemExit(f"JSON validation failed for {relative}: {exc}") from exc


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)


def main() -> int:
    plugin = load_json(".claude-plugin/plugin.json")
    marketplace = load_json(".claude-plugin/marketplace.json")
    anti_patterns = load_json("anti-patterns/manifest.json")
    manifest = load_json("tests/audit-fixtures/manifest.json")
    results = load_json("tests/audit-fixtures/results.json")

    require(plugin.get("name") == "kern", "plugin.json must describe the kern plugin")
    require("6-phase" in plugin.get("description", ""), "plugin description must state the 6-phase pipeline")

    plugins = marketplace.get("plugins") or []
    kern_entries = [entry for entry in plugins if entry.get("name") == "kern"]
    require(len(kern_entries) == 1, "marketplace.json must contain exactly one kern plugin entry")
    require("6-phase" in kern_entries[0].get("description", ""), "marketplace kern entry must state the 6-phase pipeline")

    require(isinstance(anti_patterns.get("patterns"), list), "anti-pattern manifest must expose a patterns list")

    fixtures = manifest.get("fixtures") or []
    require(manifest.get("total_fixtures") == len(fixtures), "fixture total must match fixture list length")
    require(manifest.get("release_threshold") == 0.90, "fixture release threshold must remain 90 percent")

    fixture_ids = [fixture.get("id") for fixture in fixtures]
    require(len(fixture_ids) == len(set(fixture_ids)), "fixture ids must be unique")

    missing_results = [fixture_id for fixture_id in fixture_ids if fixture_id not in results]
    require(not missing_results, f"results.json missing fixture result slots: {missing_results}")

    populated = 0
    for fixture in fixtures:
        fixture_id = fixture["id"]
        entry = results[fixture_id]
        require(isinstance(entry.get("hits"), list), f"{fixture_id}.hits must be a list")
        require("notes" in entry, f"{fixture_id}.notes must exist")
        require("run_date" in entry, f"{fixture_id}.run_date must exist")
        require(isinstance(fixture.get("expected_violations"), list), f"{fixture_id}.expected_violations must be a list")
        require(isinstance(fixture.get("min_expected_hits"), int), f"{fixture_id}.min_expected_hits must be an integer")
        require(fixture["min_expected_hits"] <= len(fixture["expected_violations"]), f"{fixture_id}.min_expected_hits exceeds expected violations")
        if entry.get("hits"):
            populated += 1

    print("Kern release evidence validation passed")
    print(f"fixtures={len(fixtures)} result_slots={len(results)} populated_results={populated}")
    if populated == 0:
        print("manual_fixture_hits_recorded=false")
        print("release_record_gate=not_satisfied_yet")
    return 0


if __name__ == "__main__":
    sys.exit(main())
