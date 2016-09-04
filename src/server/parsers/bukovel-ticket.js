import cheerio from 'cheerio'
import get from 'lodash.get'
import isNil from 'lodash.isnil'
import { parse } from 'qs'

export const parseCardNumber = html => {
  const $ = cheerio.load(html)

  const cardNumberHref = $('#result')
    .find('tr:nth-child(3) a').attr('href')

  if (isNil(cardNumberHref)) {
    return null
  }

  return get(parse(cardNumberHref), 'Card', null)
}
