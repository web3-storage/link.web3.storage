export async function pickGatewayHost (cache, env) {
  let response = await cache.match(env.STATUS_CHECK_URL)
  if (!response) {
    // Get from origin and cache it if not cached
    response = await fetch(env.STATUS_CHECK_URL)
    response = new Response(response.body, response); 
    response.headers.set('Cache-Control', `public, max-age=60`)
    cache.put(env.STATUS_CHECK_URL, response.clone())
  }
  const checker = await response.json()

  // Get URL to redirect
  return checker.status === 'ok' ? env.IPFS_GATEWAY_HOSTNAME : env.ipfsGateways[0]
}
