import cheerio from 'cheerio'
import { parse } from 'qs'

export const parseCardNumber = html => {
  const $ = cheerio.load(html)

  const cardNumberHref = $('#result tr:nth-child(3) a').attr('href')

  return parse(cardNumberHref).Card
}
