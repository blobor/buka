import isNil from 'lodash.isnil';
import fetch from 'isomorphic-fetch';

const url = 'https://buka-server.herokuapp.com';

class BukovelAPI {
  static getCardBalance(cardNumber) {
    if (isNil(cardNumber)) {
      return Promise.reject('Card Number is nill');
    }
    return fetch(`${url}/skipass/${cardNumber}`)
      .then(response => response.json());
  }
}

export default BukovelAPI;
