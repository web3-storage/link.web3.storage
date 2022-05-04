export async function pickGatewayHost (cache, env) {
  let statusResponse = await cache.match(env.STATUS_CHECK_URL)
  if (!statusResponse) {
    // Get from origin and cache it if not cached
    statusResponse = await fetch(env.STATUS_CHECK_URL)
    const clone = statusResponse.clone()
    clone.headers.set('Cache-Control', `public, max-age=60`)
    cache.put(env.STATUS_CHECK_URL, clone)
  }
  const checker = await statusResponse.json()

  // Get URL to redirect
  return checker.status === 'ok' ? env.IPFS_GATEWAY_HOSTNAME : env.ipfsGateways[0]
}
