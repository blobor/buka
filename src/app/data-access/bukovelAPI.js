import { utc } from 'moment'
import has from 'lodash.has'
import isNil from 'lodash.isnil'
import fetch from 'isomorphic-fetch'

const url = '/api'

const getSkipass = id => {
  if (isNil(id)) {
    return Promise.reject('Card Number is nill')
  }
  return fetch(`${url}/skipass/${id}`)
    .then(response => {
      if (!response.ok) {
        return response.text()
          .then(text => Promise.reject(text))
      }

      return response.json()
    })
    .then(skipass => {
      if (has(skipass, 'errors')) {
        const reason = skipass.errors.join(', ')
        return Promise.reject(reason)
      }

      return Object.assign(skipass, {
        syncDate: utc()
      })
    })
}

export {
  getSkipass
}
