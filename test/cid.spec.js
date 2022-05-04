import test from 'ava'
import { findPathUrl } from '../src/utils/cid.js'

const pathUrls = [
  ['https://link.xyz/https://example.org', 'https://example.org/'],
  ['https://link.xyz/https://example.org/foo', 'https://example.org/foo'],
  ['https://link.xyz/https://example.org/foo?bar=nards', 'https://example.org/foo?bar=nards'],
  ['https://link.xyz/ipfs://bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy', 'https://bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy.ipfs.nftstorage.link/'],
  ['https://link.xyz/ipfs://bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy/', 'https://bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy.ipfs.nftstorage.link/'],
  ['https://link.xyz/ipfs://bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy/foo', 'https://bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy.ipfs.nftstorage.link/foo'],
  ['https://link.xyz/https://gw.io/ipfs/bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy', 'https://bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy.ipfs.nftstorage.link/'],
  ['https://link.xyz/https://gw.io/ipfs/bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy/', 'https://bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy.ipfs.nftstorage.link/'],
  ['https://link.xyz/https://gw.io/ipfs/bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy/foo', 'https://bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy.ipfs.nftstorage.link/foo']
]

test('findPathUrl', (t) => {
  for (const [input, expected] of pathUrls) {
    const output = findPathUrl(new URL(input), 'ipfs.nftstorage.link').toString()
    t.is(output, expected, `${input}`)
  }
})
