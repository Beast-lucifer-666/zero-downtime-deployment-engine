#!/usr/bin/env bash
set -euo pipefail
kubectl -n deployment-engine apply -f k8s/canary/rollout.yaml
kubectl apply -f k8s/canary/ingress.yaml
for weight in 5 25 100; do
  kubectl -n deployment-engine annotate ingress deployment-engine-canary nginx.ingress.kubernetes.io/canary-weight=$weight --overwrite
  ./scripts/health-check.sh canary
  if ! ./scripts/canary-gate.sh; then
    echo "error-rate gate failed; rolling back"
    ./scripts/rollback.sh
    exit 1
  fi
  echo "canary weight ${weight}% passed"
done
