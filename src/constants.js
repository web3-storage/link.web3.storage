export const CF_CACHE_MAX_OBJECT_SIZE = 512 * Math.pow(1024, 2) // 512MB to bytes
export const DNS_LABEL_MAX_LENGTH = 63 // Label's max length in DNS (https://tools.ietf.org/html/rfc1034#page-7)
export const METRICS_CACHE_MAX_AGE = 10 * 60 // in seconds (10 minutes)
export const HTTP_STATUS_RATE_LIMITED = 429
export const HTTP_STATUS_SUCCESS = 200
export const REQUEST_PREVENTED_RATE_LIMIT_CODE = 'RATE_LIMIT'
export const TIMEOUT_CODE = 'TIMEOUT'
