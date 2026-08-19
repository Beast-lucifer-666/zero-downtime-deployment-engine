# Deployment control panel

Run this on the EC2 host, where `kubectl` has access to the Minikube context:

```bash
node control-panel/server.js
```

Forward it as the third local port:

```bash
ssh -L 18081:localhost:8081 ubuntu@<EC2_PUBLIC_IP>
```

Open `http://localhost:18081`. The Update button promotes green (`v2`); Rollback switches active traffic back to blue (`v1`).
