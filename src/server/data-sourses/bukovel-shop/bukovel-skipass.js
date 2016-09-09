import { duration } from 'moment'
import { caching } from 'cache-manager'

import { parseSkipass } from '../../parsers/bukovel-shop'
import { getSkipassV2 as getSkipassData } from './bukovel'

const memoryCache = caching({
  store: 'memory',
  max: 100,
  // time to live
  ttl: duration(10, 'm').asSeconds()
})

export const getSkipass = id => {
  return memoryCache.wrap(id, () => getSkipassData(id).then(parseSkipass))
}
