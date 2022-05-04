/* global Response caches */

import { normalizeCid } from './utils/cid.js'
import { InvalidUrlError } from './errors.js'

/**
 * Handle gateway request
 *
 * @param {Request} request
 * @param {import('./env').Env} env
 */
export async function ipfsGet(request, env) {
  const cid = request.params.cid
  const reqUrl = new URL(request.url)
  const reqQueryString = reqUrl.searchParams.toString()

  // Get pathname to query from URL pathname avoiding potential CID appear in the domain
  const redirectPath = reqUrl.pathname.split(cid).slice(1).join(cid)
  const redirectQueryString = reqQueryString ? `?${reqQueryString}` : ''

  // Parse and normalize CID
  let nCid
  try {
    nCid = normalizeCid(cid)
  } catch (err) {
    throw new InvalidUrlError(`invalid CID: ${cid}: ${err.message}`)
  }

  // Get status of nftstorage.link gateway
  const cache = caches.default
  let statusResponse = await cache.match(env.STATUS_CHECK_URL)
  if (!statusResponse) {
    // Get from origin and cache it if not cached
    statusResponse = await fetch(env.STATUS_CHECK_URL)
    const clone = statusResponse.clone()
    clone.headers.set('Cache-Control', `public, max-age=60}`)
    cache.put(request.url, clone)
  }
  const checker = await statusResponse.json()

  // Get URL to redirect
  const hostname = checker.status === 'ok' ? env.IPFS_GATEWAY_HOSTNAME : env.ipfsGateways[0]
  const url = new URL(
    `https://${nCid}.${hostname}${redirectPath}${redirectQueryString}`
  )

  return Response.redirect(url, 302)
}
