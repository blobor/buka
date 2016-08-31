import has from 'lodash.has'
import isNil from 'lodash.isnil'
import fetch from 'isomorphic-fetch'

const url = '/api'
const mapResponse = response => {
  return response.json().then(json => ({ skipass: json, response }))
}

class BukovelAPI {
  static async getSkipass (id) {
    if (isNil(id)) {
      throw new Error('Card Number is nill')
    }
    return await fetch(`${url}/skipass/${id}`)
      .then(mapResponse)
      .then(({ skipass, response }) => {
        if (!response.ok) {
          return Promise.reject('Response is not ok')
        }

        if (has(skipass, 'errors')) {
          const reason = skipass.errors.join(', ')
          return Promise.reject(reason)
        }

        return skipass
      })
  }
}

export default BukovelAPI
