import cheerio from 'cheerio'
import isNil from 'lodash.isnil'
import isEmpty from 'lodash.isempty'

import { getLifts, getSkipassProps, normalizeCardName, getAdoptedDateString } from './bukovel-utils.js'

const dashChar = '-'
const whiteSpaceRegex = /\s+/g
const getTableKeyValues = function * ($tableNode) {
  if (isEmpty($tableNode)) {
    return
  }

  const rows = $tableNode.find('tr')
  const rowsCount = rows.length

  for (let i = 0; i < rowsCount; i++) {
    const columns = rows.eq(i).find('td')

    yield {
      key: columns.eq(0).text().trim(),
      value: columns.eq(1).find('strong').text().trim()
    }
  }
}

const bukovelTicketMapping = {
  '№ картки': {
    propName: 'ticketNumber'
  },
  'Квиток': {
    propName: 'name',
    adaptor: normalizeCardName
  },
  'Дата продажу': {
    propName: 'purchaseDate',
    adaptor: getAdoptedDateString
  },
  '№ квитка': {
    propName: 'cardNumber',
    adaptor: value => {
      return value.slice(0, value.indexOf(' '))
    }
  }
}

const parseCardNumber = html => {
  if (isNil(html)) {
    return Promise.reject('Valid HTML string is expected')
  }

  const $ = cheerio.load(html)
  const ticketNumberText = $('#result')
    .find('tr:first-child strong').text()

  if (isEmpty(ticketNumberText)) {
    return Promise.reject('Unable to find ticket number')
  }

  // ticket number format
  // XX-XXXX XXXX XXXX XXXX XXXX-X
  const ticketStartIndex = ticketNumberText.indexOf(dashChar) + 1
  const ticketEndIndex = ticketNumberText.lastIndexOf(dashChar)
  const ticketNumber = ticketNumberText
    .slice(ticketStartIndex, ticketEndIndex)
    .replace(whiteSpaceRegex, '')

  return Promise.resolve(ticketNumber)
}

const parseSkipass = html => {
  if (isNil(html)) {
    return Promise.reject('Valid HTML string is expected')
  }

  const $ = cheerio.load(html)

  const dataTables = $('#result')

  const keyValues = getTableKeyValues(dataTables.eq(0))
  const skipassProps = getSkipassProps(keyValues, bukovelTicketMapping)
  const skipassLiftsInfoTable = dataTables.eq(1)

  const result = Object.assign({}, skipassProps, {
    lifts: Array.from(getLifts(skipassLiftsInfoTable))
  })

  return Promise.resolve(result)
}

const parseSkipassLifts = html => {
  if (isNil(html)) {
    return Promise.reject('Valid HTML string is expected')
  }

  const $ = cheerio.load(html)
  const skipassLiftsInfoTable = $('#result').eq(1)

  return Promise.resolve(Array.from(getLifts(skipassLiftsInfoTable)))
}

export {
  parseCardNumber,
  parseSkipass,
  parseSkipassLifts
}
