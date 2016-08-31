import cheerio from 'cheerio'
import moment from 'moment-timezone'
import flow from 'lodash.flow'
import isObject from 'lodash.isobject'

const originalTimeZone = 'Europe/Kiev'
const skiLiftDateFormat = 'DD.MM.YYYY HH:mm:ss'

const removeDuplicateWhitespaces = str => str.replace(/\s{2,}/g, ' ')
const removeWhitespacesBeforeParentheses = str => str.replace(/\s+(?=\))/g, '')

const normalizeCardName = flow(removeDuplicateWhitespaces, removeWhitespacesBeforeParentheses)

export const parse = data => {
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

  function * getLifts ($tableNode) {
    const rows = $tableNode.find('tr')
    const rowsCount = rows.length

    // skip first row,
    // because it is table header
    for (let i = 1; i < rowsCount; i++) {
      let columns = rows.eq(i).find('td')

      yield {
        id: getliftId(columns.eq(0).text()),
        date: getAdoptedDateString(columns.eq(1).text()),
        initialLift: Number.parseInt(columns.eq(2).text()),
        liftsLeft: Number.parseInt(columns.eq(3).text())
      }
    }

    function getliftId (text) {
      const whiteSpaceChar = ' '
      return text.slice(text.lastIndexOf(whiteSpaceChar) + whiteSpaceChar.length, text.length)
    }
  }

  function getAdoptedDateString (date) {
    return moment.tz(date, skiLiftDateFormat, originalTimeZone).utc()
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
