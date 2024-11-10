---
title: Cloudflare
outline: deep
---

# Cloudflare

## Deploy to Cloudflare Workers with GitHub Actions

I use GitHub actions to deploy Cloudflare workers. You need to store `CLOUDFLARE_API_TOKEN` inside your GitHub repository. Go to `Settings` > `Secrets and variables` > `Actions` > Create `New repository secret`. To create a Cloudflare API TOKEN, please visit [Cloudflare Docs - API token](https://developers.cloudflare.com/workers/wrangler/ci-cd/#api-token).

```yml
# .github/workflows/deploy.yml

name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: latest
      - name: Deploy
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          packageManager: pnpm
```