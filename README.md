# IPFS redirect edge gateway

> The IPFS edge gateway for nft.storage is not "another gateway", but a caching layer for NFTs that sits on top of existing IPFS public gateways.

## Getting started

One time set up of your cloudflare worker subdomain for dev:

- `pnpm install` - Install the project dependencies from the monorepo root directory.
- Sign up to Cloudflare and log in with your default browser.
- `npm i @cloudflare/wrangler -g` - Install the Cloudflare wrangler CLI
- `wrangler login` - Authenticate your wrangler cli; it'll open your browser.
- Copy your cloudflare account id from `wrangler whoami`
- Update `wrangler.toml` with a new `env`. Set your env name to be the value of `whoami` on your system you can use `pnpm start` to run the worker in dev mode for you.

  [**wrangler.toml**](./wrangler.toml)

  ```toml
  [env.bobbytables]
  workers_dev = true
  account_id = "<what does the `wrangler whoami` say>"
  ```

- Add secrets

  ```sh
    wrangler secret put SENTRY_DSN --env $(whoami) # Get from Sentry (not required for dev)
    wrangler secret put LOGTAIL_TOKEN --env $(whoami) # Get from Logtail
  ```

- Add KV namespaces

  ```sh
  wrangler kv:namespace create DENYLIST --preview --env USER
  # Outputs something like: `{ binding = "DENYLIST", preview_id = "7e441603d1bc4d5a87f6cecb959018e4" }`
  # but you need to put `{ binding = "DENYLIST", preview_id = "7e441603d1bc4d5a87f6cecb959018e4", id = "7e441603d1bc4d5a87f6cecb959018e4" }` inside the `kv_namespaces`.
  # for production: wrangler kv:namespace create DENYLIST --env production
  ```

- `pnpm run publish` - Publish the worker under your env. An alias for `wrangler publish --env $(whoami)`
- `pnpm start` - Run the worker in dev mode. An alias for `wrangler dev --env $(whoami)`

You only need to `pnpm start` for subsequent runs. PR your env config to the `wrangler.toml` to celebrate 🎉

