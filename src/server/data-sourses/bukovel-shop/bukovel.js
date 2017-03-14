import qs from 'qs'
import fetch, { Request } from 'isomorphic-fetch'

const BUKOVEL_SHOP_URL = 'http://shop.bukovel.info/index.php'
const DEFAULT_ROUTE = 'balance/balance/getBalance'

const parseResponse = response => {
  if (!response.ok) {
    return Promise.reject(new Error('Response is not ok'))
  }

  return response.json()
}

export const getSkipass = id => {
  const postRequest = new Request(`${BUKOVEL_SHOP_URL}?route=${DEFAULT_ROUTE}`, {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: `card_number=${encodeURIComponent(id)}`
  })

  return fetch(postRequest).then(parseResponse)
}

export const getSkipassV2 = id => {
  const params = {
    'route': DEFAULT_ROUTE,
    'card_number': id
  }

  return fetch(`${BUKOVEL_SHOP_URL}?${qs.stringify(params)}`).then(parseResponse)
}
