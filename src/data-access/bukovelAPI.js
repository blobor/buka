import cheerio from 'cheerio';
import moment from 'moment-timezone';
import fetch, { Request } from '../core/fetch';
import adapter from './bukovelAdapter';

const url = 'http://shop.bukovel.info/index.php?route=balance/balance/getBalance';

class BukovelAPI {
  static getCardBalance(cardNumber) {
    let postRequest = new Request(url, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: `card_number=${encodeURIComponent(cardNumber)}`
    });

    return fetch(postRequest)
      .then(response => response.json())
      .then(adapter);
  }
}

export default BukovelAPI;