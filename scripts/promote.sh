#!/usr/bin/env bash
set -euo pipefail
COLOR="${1:?usage: promote.sh <blue|green>}"
kubectl -n deployment-engine patch service active --type merge -p "{\"spec\":{\"selector\":{\"app\":\"deployment-engine\",\"color\":\"$COLOR\"}}}"
