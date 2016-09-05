import cheerio from 'cheerio'
import has from 'lodash.has'
import isNil from 'lodash.isnil'
import { parse } from 'qs'

export const parseCardNumber = html => {
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
