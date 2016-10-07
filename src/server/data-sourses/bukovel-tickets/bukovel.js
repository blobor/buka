import { utc } from 'moment'
import { stringify } from 'qs'
import { caching } from 'cache-manager'
import isNil from 'lodash.isnil'
import fetch from 'isomorphic-fetch'

import { parseCardNumber, parseSkipass } from '../../parsers/bukovel-ticket'

const cardNumberMemoryCache = caching({
  store: 'memory',
  max: 100
})

const BUKOVEL_TICKETS_URL = 'http://tickets.bukovel.com/'
const getResponseText = response => {
  if (!response.ok) {
    return Promise.reject(`got not OK (${response.status}) response from ${response.url}`)
  }

  return response.text()
}

const getSkipassCardNumber = id => {
  if (isNil(id)) {
    return Promise.reject('id is required')
  }

  const params = {
    NumTicket: id
  }
  const url = `${BUKOVEL_TICKETS_URL}?${stringify(params)}`

  return fetch(url).then(getResponseText).then(parseCardNumber)
}

const getSkipassCardNumberCached = id => {
  return cardNumberMemoryCache.wrap(id, () => getSkipassCardNumber(id))
}

const getSkipass = async (id) => {
  const cardNumber = await getSkipassCardNumberCached(id)
  const params = {
    NumTicket: id,
    Card: cardNumber
  }
  const url = `${BUKOVEL_TICKETS_URL}?${stringify(params)}`

  return fetch(url)
    .then(getResponseText)
    .then(parseSkipass)
    .then(skipass => {
      return Object.assign(skipass, {
        syncDate: utc()
      })
    })
}

export {
  getSkipassCardNumberCached as getSkipassCardNumber,
  getSkipass
}
