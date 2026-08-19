# Deployment guide

1. Build and tag the image with the commit SHA.
2. Deploy green while blue serves traffic.
3. Wait for rollout and `/ready` probes.
4. Smoke-test `preview`.
5. Promote by patching the `active` Service selector.
6. Monitor 5xx/error rate and run rollback when the release threshold is breached.

For canary release, route 5%, then 25%, then 100% to the new version. The error-rate threshold is an operational setting and should be supplied by the environment rather than guessed in this demo.
