#!/usr/bin/env bash
set -euo pipefail
NAME="${1:?usage: health-check.sh <deployment>}"
kubectl -n deployment-engine rollout status deployment/$NAME --timeout=180s
kubectl -n deployment-engine wait --for=condition=available deployment/$NAME --timeout=60s
