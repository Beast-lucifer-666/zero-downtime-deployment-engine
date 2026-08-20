#!/usr/bin/env bash
set -euo pipefail
COLOR="${1:?usage: promote.sh <blue|green>}"
kubectl -n deployment-engine patch service active --type merge -p "{\"spec\":{\"selector\":{\"app\":\"deployment-engine\",\"color\":\"$COLOR\"}}}"
if systemctl is-enabled --quiet deployment-active 2>/dev/null; then
  sudo systemctl restart deployment-active
fi
echo "active traffic is now $COLOR"
