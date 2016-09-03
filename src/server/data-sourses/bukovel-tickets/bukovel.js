import { stringify } from 'qs'
import fetch from 'node-fetch'

import { parseCardNumber } from '../../parsers/bukovel-ticket'

const BUKOVEL_TICKETS_URL = 'http://tickets.bukovel.com/'

export const getSkipassCardNumber = id => {
  const params = {
    'NumTicket': id
  }

  return fetch(`${BUKOVEL_TICKETS_URL}?${stringify(params)}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject('Response is not ok')
      }

      return response.text()
    })
    .then(parseCardNumber)
}
