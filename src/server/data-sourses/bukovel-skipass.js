import moment from 'moment'
import cacheManager from 'cache-manager'

import { parse } from '../parsers/bukovel-skipass'
import { getSkipass as getSkipassData } from './bukovel'

const memoryCache = cacheManager.caching({
  store: 'memory',
  max: 100,
  // time to live
  ttl: moment.duration(10, 'm').asSeconds()
})

export const getSkipass = id => {
  return memoryCache.wrap(id, () => getSkipassData(id).then(parse))
}
