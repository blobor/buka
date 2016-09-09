import cheerio from 'cheerio'
import has from 'lodash.has'
import isNil from 'lodash.isnil'
import { parse } from 'qs'

import { getLifts, normalizeCardName } from './bukovel-utils.js'

const getElementText = $element => {
  return $element
    .clone()    // clone the element
    .children() // select all the children
    .remove()   // remove all the children
    .end()      // again go back to selected element
    .text()
}

const parseCardNumber = html => {
  if (isNil(html)) {
    throw new Error('Valid HTML string is exprected')
  }

  const $ = cheerio.load(html)

  const cardNumberHref = $('#result')
    .find('tr:nth-child(3) a').attr('href')

  if (isNil(cardNumberHref)) {
    throw new Error('Unable to find cardNumber link')
  }

  const parsedQueryString = parse(cardNumberHref)

  if (!has(parsedQueryString, 'Card')) {
    throw new Error('Unable to find card number in the link')
  }

  return parsedQueryString.Card
}

const parseSkipass = html => {
  if (isNil(html)) {
    throw new Error('Valid HTML string is exprected')
  }

  const $ = cheerio.load(html)

  const dataTables = $('#result')

  const skipassInfoTable = dataTables.eq(0)
  const skipassLiftsInfoTable = dataTables.eq(1)
  const skipassCardName = skipassInfoTable.find('tr:nth-child(2) strong').text()
  const cardNumber = getElementText(skipassInfoTable.find('tr:nth-child(3) strong')).trim()
  return {
    name: normalizeCardName(skipassCardName),
    cardNumber: cardNumber,
    purchaseDate: '',
    lifts: Array.from(getLifts(skipassLiftsInfoTable))
  }
}

export {
  parseCardNumber,
  parseSkipass
}
