import cheerio from 'cheerio';
import moment from 'moment-timezone';

const originalTimeZone = 'Europe/Kiev';
const skiLiftDateFormat = 'DD.MM.YYYY HH:mm:ss';

export default function proceed(data) {

  if(data.error) {
    return {
      errors: Object.values(data.error),
      lifts: []
    };
  }

  const $ = cheerio.load(data.html);
  const orginalPurchaseDate = $('table #order_info_header_white:nth-child(1) > span').text();

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
          date: moment.tz($(columns[1]).text(), skiLiftDateFormat, originalTimeZone).local().format('L LTS'),
          initialLift: $(columns[2]).text(),
          liftsLeft: $(columns[3]).text()
        }
      })
      .toArray();
  }
}