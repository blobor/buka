import cheerio from 'cheerio'

import isObject from 'lodash.isobject'

import { getLifts, normalizeCardName, getAdoptedDateString } from './bukovel-utils.js'

export const parseSkipass = data => {
  if (data.error) {
    return {
      errors: getErrorObject(data.error),
      lifts: []
    }
  }

  const cardNumber = data.success

  const $ = cheerio.load(data.html)
  const dataTables = $('table')
  const skipassInfoTable = dataTables.eq(0)
  const skipassLiftsInfoTable = dataTables.eq(1)
  const skipassCardName = skipassInfoTable.find('#order_info_header:first-child > span').text()
  const orginalPurchaseDate = skipassInfoTable.find('#order_info_header_white:first-child > span').text()

  return {
    name: normalizeCardName(skipassCardName),
    cardNumber: cardNumber,
    purchaseDate: getAdoptedDateString(orginalPurchaseDate),
    lifts: Array.from(getLifts(skipassLiftsInfoTable))
  }

  function getErrorObject (error) {
    if (isObject(error)) {
      return Object.values(error)
    }
    if (Array.isArray(error)) {
      return error
    }

    return Array.of(error)
  }
}
