import cheerio from 'cheerio'
import isNil from 'lodash.isnil'
import isEmpty from 'lodash.isempty'

import { getLifts, normalizeCardName } from './bukovel-utils.js'

const getElementText = $element => {
  return $element
    .clone()    // clone the element
    .children() // select all the children
    .remove()   // remove all the children
    .end()      // again go back to selected element
    .text()
}
const dashChar = '-'
const whiteSpaceRegex = /\s+/g

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

  const skipassInfoTable = dataTables.eq(0)
  const skipassLiftsInfoTable = dataTables.eq(1)
  const skipassTicketName = skipassInfoTable.find('tr:nth-child(1) strong').text()
  const skipassCardName = skipassInfoTable.find('tr:nth-child(2) strong').text()
  const cardNumber = getElementText(skipassInfoTable.find('tr:nth-child(3) strong')).trim()
  return Promise.resolve({
    name: normalizeCardName(skipassCardName),
    cardNumber: cardNumber,
    ticketNumber: skipassTicketName,
    lifts: Array.from(getLifts(skipassLiftsInfoTable))
  })
}

export {
  parseCardNumber,
  parseSkipass
}
