import fetch, { Request } from 'node-fetch'

const url = 'http://shop.bukovel.info/index.php?route=balance/balance/getBalance'

export const getSkipass = id => {
  const postRequest = new Request(url, {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: `card_number=${encodeURIComponent(id)}`
  })

  return fetch(postRequest)
    .then(response => {
      if (!response.ok) {
        return Promise.reject('Response is not ok')
      }

      return response.json()
    })
}
