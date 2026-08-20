#!/usr/bin/env bash
set -euo pipefail
COLOR="$(kubectl -n deployment-engine get service active -o jsonpath='{.spec.selector.color}')"
PREVIOUS=blue
[[ "$COLOR" == blue ]] && PREVIOUS=green
bash ./scripts/promote.sh "$PREVIOUS"
