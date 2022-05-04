import { InvalidUrlError } from './errors.js'
import { findPathUrl } from './utils/cid'

/**
 * Handle gateway request
 *
 * @param {Request} request
 * @param {import('./env').Env} env
 */
export async function anyUrlGet (request, env) {
  const url = findPathUrl(new URL(request.url), env.IPFS_GATEWAY_HOSTNAME)
  return Response.redirect(url, 302)  
}
