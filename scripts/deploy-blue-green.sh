#!/usr/bin/env bash
set -euo pipefail
kubectl apply -f k8s/namespace.yaml -f k8s/blue-green/rollout.yaml -f k8s/services/active-service.yaml -f k8s/services/preview-service.yaml
./scripts/health-check.sh green
./scripts/promote.sh green
