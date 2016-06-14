import isNil from 'lodash.isnil'
import fetch from 'isomorphic-fetch'

const url = 'https://buka-server.herokuapp.com'

class BukovelAPI {
  static async getSkipass (id) {
    if (isNil(id)) {
      throw new Error('Card Number is nill')
    }
    const response = await fetch(`${url}/skipass/${id}`)
    return await response.json()
  }
}

export default BukovelAPI
