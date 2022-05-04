import { findPathUrl } from './utils/cid'

/**
 * Handle any url request
 *
 * @param {Request} request
 * @param {import('./env').Env} env
 */
export async function anyUrlGet (request, env) {
  const url = findPathUrl(request.url, env.IPFS_GATEWAY_HOSTNAME)
  return Response.redirect(url, 302)  
}
