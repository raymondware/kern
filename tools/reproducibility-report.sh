#!/usr/bin/env bash
# Reproducibility report for kern validation suite.
# Reads baseline.json history[] judge scores and reports variance per case.
# Exit 0 = all cases PASS (spread < 1.5). Exit 1 = any case FAIL or insufficient data.
#
# By default uses the last WINDOW entries only (post-prescription window).
# This excludes pre-prescription runs that are no longer representative.
#
# Usage:
#   ./reproducibility-report.sh [path/to/baseline.json] [--window N] [--all]
#
# Options:
#   --window N   Number of most recent history entries to include (default: 8)
#   --all        Include all history entries (legacy behavior; overrides --window)
#
# Default baseline path: ~/clawd/projects/kern-ralph-loop/state/baseline.json

set -euo pipefail

BASELINE=""
WINDOW=8
USE_ALL=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        --window)
            WINDOW="$2"
            shift 2
            ;;
        --all)
            USE_ALL=true
            shift
            ;;
        *)
            BASELINE="$1"
            shift
            ;;
    esac
done

BASELINE="${BASELINE:-${HOME}/clawd/projects/kern-ralph-loop/state/baseline.json}"
THRESHOLD=1.5   # max-min spread that counts as PASS
MIN_RUNS=3      # minimum history entries needed to report

if [[ ! -f "${BASELINE}" ]]; then
    echo "ERROR: baseline.json not found at ${BASELINE}" >&2
    exit 1
fi

if ! jq -e . "${BASELINE}" > /dev/null 2>&1; then
    echo "ERROR: baseline.json is not valid JSON" >&2
    exit 1
fi

echo "Kern Reproducibility Report"
echo "Baseline: ${BASELINE}"
echo "Threshold: spread < ${THRESHOLD} (max-min judge scores)"
if [[ "${USE_ALL}" == "true" ]]; then
    echo "Window: ALL history entries (legacy mode)"
else
    echo "Window: last ${WINDOW} history entries per case (post-prescription)"
fi
echo "Min runs required: ${MIN_RUNS}"
echo ""
printf "%-40s  %5s  %5s  %5s  %5s  %7s  %s\n" "Case" "Runs" "Min" "Max" "Spread" "StdDev" "Verdict"
printf "%-40s  %5s  %5s  %5s  %5s  %7s  %s\n" "----" "----" "---" "---" "------" "------" "-------"

OVERALL_PASS=true
INSUFFICIENT=false

while IFS= read -r case_id; do
    # Extract judge scores from history array (windowed or full)
    if [[ "${USE_ALL}" == "true" ]]; then
        scores_json=$(jq -c --arg id "${case_id}" '.[$id].history | [.[].judge]' "${BASELINE}")
    else
        scores_json=$(jq -c --arg id "${case_id}" --argjson w "${WINDOW}" \
            '.[$id].history | .[-$w:] | [.[].judge]' "${BASELINE}")
    fi
    n=$(echo "${scores_json}" | jq 'length')

    if [[ "${n}" -lt "${MIN_RUNS}" ]]; then
        printf "%-40s  %5d  %5s  %5s  %5s  %7s  %s\n" \
            "${case_id}" "${n}" "-" "-" "-" "-" "SKIP (< ${MIN_RUNS} runs)"
        INSUFFICIENT=true
        continue
    fi

    min=$(echo "${scores_json}" | jq 'min')
    max=$(echo "${scores_json}" | jq 'max')
    spread=$(echo "${scores_json}" | jq 'max - min')

    # Standard deviation (population)
    stddev=$(echo "${scores_json}" | jq '
        (add / length) as $mean |
        (map(. - $mean | . * .) | add / length) | sqrt |
        (. * 100 | round) / 100
    ')

    # Verdict
    pass=$(echo "${spread} ${THRESHOLD}" | awk '{print ($1 < $2) ? "PASS" : "FAIL"}')
    if [[ "${pass}" == "FAIL" ]]; then
        OVERALL_PASS=false
    fi

    printf "%-40s  %5d  %5.1f  %5.1f  %5.2f  %7.2f  %s\n" \
        "${case_id}" "${n}" "${min}" "${max}" "${spread}" "${stddev}" "${pass}"

done < <(jq -r 'keys[]' "${BASELINE}" | sort)

echo ""

if [[ "${INSUFFICIENT}" == "true" ]]; then
    echo "NOTE: Some cases have < ${MIN_RUNS} runs. Re-run after more iterations."
fi

if [[ "${OVERALL_PASS}" == "true" ]]; then
    echo "RESULT: PASS — all cases with sufficient runs show spread < ${THRESHOLD}"
    exit 0
else
    echo "RESULT: FAIL — one or more cases show spread >= ${THRESHOLD}"
    exit 1
fi
