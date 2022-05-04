import { CID } from 'multiformats/cid'

import { InvalidUrlError } from '../errors.js'

/**
 * Parse subdomain URL and return cid
 *
 * @param {URL} url
 */
export function getCidFromSubdomainUrl(url) {
  // Replace "ipfs-staging" by "ipfs" if needed
  const host = url.hostname.replace('ipfs-staging', 'ipfs')
  const splitHost = host.split('.ipfs.')

  if (!splitHost.length) {
    throw new InvalidUrlError(url.hostname)
  }

  try {
    return normalizeCid(splitHost[0])
  } catch (err) {
    throw new InvalidUrlError(`invalid CID: ${splitHost[0]}: ${err.message}`)
  }
}

/**
 * Parse CID and return normalized b32 v1
 *
 * @param {string} cid
 */
export function normalizeCid(cid) {
  const c = CID.parse(cid)
  return c.toV1().toString()
}

export function cidToGatewayUrl({cid, path, search = ''}, gatewayHost) {
  // Parse and normalize CID
  let nCid
  try {
    nCid = normalizeCid(cid)
  } catch (err) {
    throw new InvalidUrlError(`invalid CID: ${cid}: ${err.message}`)
  }
  return new URL(
    `https://${nCid}.${gatewayHost}${path}${search}`
  )
}

// https://link.xyz/https://example.org => https://example.org
// https://link.xyz/https://gw.exz/ipfs/<cid>/<path> => https://<cid>.ipfs.nftstorage.link/path
// https://link.xyz/ipfs://<cid>/<path> => ipfs://<cid>/<path> => https://<cid>.ipfs.nftstorage.link/path

export function findPathUrl ({ pathname, search }, gatewayHost) {
  const urlStr = pathname.substring(1)
  if (urlStr.startsWith('ipfs://')) {
    const cidPath = urlStr.substring('ipfs://'.length)
    const [cid, ...rest] = cidPath.split('/')
    return cidToGatewayUrl({ cid, path: '/' + rest.join('/'), search }, gatewayHost)
  }
  let url
  try {
    url = new URL(urlStr + search)
  } catch (err) {
    throw new InvalidUrlError(`invalid url ${urlStr}`)
  }
  if (url.pathname.startsWith('/ipfs/')) {
    const [ _, cid, ...rest ] = url.pathname.substring(1).split('/')
    return cidToGatewayUrl({ cid, path: '/' + rest.join('/'), search }, gatewayHost)
  }
  // otherwise pass thru.
  return url
}
