#!/usr/bin/env bash
# kern audit fixture runner
# Usage: bash tests/run-audit-fixtures.sh [--fixture fx-01] [--record]
#
# Modes:
#   (no args)        Print the full test plan (fixture → expected violations). For manual review.
#   --fixture fx-NN  Show one fixture's content and expected violations.
#   --record         Read results.json (if exists) and compute hit rate.
#   --help           This message.
#
# How to run a fixture against kern audit:
#   1. Open a Claude Code session in any directory.
#   2. Run: /kern audit
#      Then paste the contents of the fixture file when prompted.
#   3. Record which violations kern flagged.
#   4. Update tests/audit-fixtures/results.json with the actual hits.
#   5. Run this script with --record to compute the hit rate.

SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
FIXTURE_DIR="${SKILL_DIR}/tests/audit-fixtures"
MANIFEST="${FIXTURE_DIR}/manifest.json"
RESULTS="${FIXTURE_DIR}/results.json"

usage() {
  grep '^#' "$0" | sed 's/^# \?//'
  exit 0
}

print_plan() {
  echo "=== kern audit fixture suite ==="
  echo ""
  total=$(jq '.total_fixtures' "$MANIFEST")
  threshold=$(jq '.release_threshold' "$MANIFEST")
  echo "Fixtures: ${total}  |  Release threshold: $(echo "$threshold * 100" | bc)%"
  echo ""

  jq -r '.fixtures[] | "[\(.id)] \(.file)\n  Expected: \(.expected_violations | join(", "))\n  Min hits: \(.min_expected_hits)/\(.expected_violations | length)\n  Categories: \(.categories | join(", "))\n"' "$MANIFEST"
}

show_fixture() {
  local id="$1"
  local file
  file=$(jq -r --arg id "$id" '.fixtures[] | select(.id == $id) | .file' "$MANIFEST")

  if [[ -z "$file" ]]; then
    echo "ERROR: fixture '${id}' not found in manifest." >&2
    exit 1
  fi

  echo "=== ${id}: ${file} ==="
  echo ""
  echo "--- Expected violations ---"
  jq -r --arg id "$id" '.fixtures[] | select(.id == $id) | "Violations: \(.expected_violations | join(", "))\nMin hits required: \(.min_expected_hits)"' "$MANIFEST"
  echo ""
  echo "--- Fixture content ---"
  cat "${FIXTURE_DIR}/${file}"
}

compute_hit_rate() {
  if [[ ! -f "$RESULTS" ]]; then
    echo "ERROR: ${RESULTS} not found." >&2
    echo "Create it with the format shown in tests/audit-fixtures/README.md" >&2
    exit 1
  fi

  echo "=== kern audit hit rate report ==="
  echo ""

  local pass=0
  local fail=0
  local total
  total=$(jq '.total_fixtures' "$MANIFEST")

  while IFS= read -r fixture_id; do
    local expected_min
    local actual_hits_count
    local expected_violations

    expected_min=$(jq -r --arg id "$fixture_id" '.fixtures[] | select(.id == $id) | .min_expected_hits' "$MANIFEST")
    expected_violations=$(jq -r --arg id "$fixture_id" '.fixtures[] | select(.id == $id) | .expected_violations[]' "$MANIFEST")
    actual_hits=$(jq -r --arg id "$fixture_id" '.[$id].hits // [] | .[]' "$RESULTS" 2>/dev/null)

    # Count how many expected violations appear in actual hits
    local matched=0
    for violation in $expected_violations; do
      if echo "$actual_hits" | grep -qF "$violation"; then
        matched=$((matched + 1))
      fi
    done

    local status="PASS"
    if [[ "$matched" -lt "$expected_min" ]]; then
      status="FAIL"
      fail=$((fail + 1))
    else
      pass=$((pass + 1))
    fi

    printf "[%s] %s  matched=%d/%d  %s\n" \
      "$status" \
      "$fixture_id" \
      "$matched" \
      "$(echo "$expected_violations" | wc -w | tr -d ' ')" \
      "$(if [[ "$status" == "FAIL" ]]; then echo "(need ${expected_min})"; fi)"

  done < <(jq -r '.fixtures[].id' "$MANIFEST")

  echo ""
  local rate
  rate=$(echo "scale=1; $pass * 100 / $total" | bc)
  echo "Hit rate: ${pass}/${total} = ${rate}%"

  local threshold_pct
  threshold_pct=$(jq '.release_threshold * 100 | floor' "$MANIFEST")
  if [[ "${rate%.*}" -ge "$threshold_pct" ]]; then
    echo "STATUS: PASS (>= ${threshold_pct}% threshold)"
  else
    echo "STATUS: FAIL (< ${threshold_pct}% threshold — kern audit needs improvement)"
  fi
}

# --- main ---

case "${1:-}" in
  --help|-h) usage ;;
  --fixture)  show_fixture "${2:-}" ;;
  --record)   compute_hit_rate ;;
  "")         print_plan ;;
  *)          echo "Unknown option: $1" >&2; exit 1 ;;
esac
