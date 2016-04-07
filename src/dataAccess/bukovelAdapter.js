import cheerio from 'cheerio';
import moment from 'moment-timezone';

const originaDateFormat = 'DD.MM.YYYY HH:mm';
const originalTimeZone = 'Europe/Kiev'

export default function proceed(data) {
  const $ = cheerio.load(data.html);
  const orginalPurchaseDate = $('table #order_info_header_white:nth-child(1) > span').text();
  const purchaseDate = moment(orginalPurchaseDate, originaDateFormat).tz(originalTimeZone);
  const purchaseDateCurrentTimeZone = purchaseDate.clone().tz(moment.tz.guess());

  return getLifts($($('table')[1]));

  function getLifts($tableNode) {
    return $tableNode
      .find('tr')
      // skip first row,
      // because it is table header
      .slice(1)
      .map((index, element) => {
        var columns = $(element).find('td');

        return {
          skiLiftId: $(columns[0]).text(),
          date: $(columns[1]).text(),
          initialLift: $(columns[2]).text(),
          liftsLeft: $(columns[3]).text()
        }
      })
      .toArray();
  }
}