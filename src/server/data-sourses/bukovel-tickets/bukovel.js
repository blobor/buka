import { stringify } from 'qs'
import fetch from 'isomorphic-fetch'

import { parseCardNumber } from '../../parsers/bukovel-ticket'

const BUKOVEL_TICKETS_URL = 'http://tickets.bukovel.com/'
const getResponseText = response => {
  if (!response.ok) {
    return Promise.reject(`got not OK (${response.status}) response from ${response.url}`)
  }

  return response.text()
}

export const getSkipassCardNumber = id => {
  const params = {
    NumTicket: id
  }

  return fetch(`${BUKOVEL_TICKETS_URL}?${stringify(params)}`)
    .then(getResponseText)
    .then(parseCardNumber)
}

export const getSkipass = async id => {
  const cardNumber = await getSkipassCardNumber(id)

  const params = {
    NumTicket: id,
    Card: cardNumber
  }

  return fetch(`${BUKOVEL_TICKETS_URL}?${stringify(params)}`)
    .then(getResponseText)
}
