# Zero-Downtime Deployment Engine

This repository demonstrates a deployment system: CI tests and builds an immutable image, deploys a second version, waits for Kubernetes readiness, and only then changes traffic.

## Local verification

```bash
npm test --prefix app
docker build -f docker/Dockerfile -t zero-downtime:v2 .
docker run --rm -p 8080:8080 -e APP_VERSION=v2 zero-downtime:v2
curl http://localhost:8080/health
```

## Release strategies

Blue/green keeps blue serving through the green rollout. `preview` exposes green for smoke tests; `active` is the load-balancer switch. Run `scripts/deploy-blue-green.sh` to promote and `scripts/rollback.sh` to restore the other color.

Canary progresses 5%, 25%, and 100%. Each stage must pass readiness and an error-rate gate before continuing. Connect `canary.weight` to a weighted ingress/controller in production.

## Monitoring and security

`k8s/monitoring.yaml` deploys Prometheus and Grafana. Prometheus scrapes the application `/metrics` endpoint; Grafana is available through its Kubernetes service. The CI workflow scans every versioned image with Trivy and fails on HIGH or CRITICAL vulnerabilities. `scripts/deploy-canary.sh` updates NGINX canary weights and calls `scripts/canary-gate.sh`; a failed error-rate query invokes rollback automatically.
