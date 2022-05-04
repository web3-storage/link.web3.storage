import { pickGatewayHost } from './utils/status-check.js'
import { findPathUrl } from './utils/cid'

/**
 * Handle any url request
 *
 * @param {Request} request
 * @param {import('./env').Env} env
 */
export async function anyUrlGet (request, env) {
  const hostname = await pickGatewayHost(caches.default, env)
  const url = findPathUrl(new URL(request.url), hostname)
  return Response.redirect(url, 302)  
}
