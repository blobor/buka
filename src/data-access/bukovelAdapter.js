import cheerio from 'cheerio';
import moment from 'moment-timezone';

const originalTimeZone = 'Europe/Kiev';
const skiLiftDateFormat = 'DD.MM.YYYY HH:mm:ss';

export default function proceed(data) {

  if (data.error) {
    return {
      errors: Object.values(data.error),
      lifts: []
    };
  }

  const cardNumber = data.success;
  const $ = cheerio.load(data.html);
  const dataTables = $('table');
  const skipassInfoTable = dataTables.eq(0);
  const skipassLiftsInfoTable = dataTables.eq(1);
  const service = skipassInfoTable.find('#order_info_header:nth-child(1) > span').text();
  const orginalPurchaseDate = skipassInfoTable.find('#order_info_header_white:nth-child(1) > span').text();

  return {
    cardNumber: cardNumber,
    capacity: 0,
    purchaseDate: getAdoptedDateString(orginalPurchaseDate),
    lifts: getLifts(skipassLiftsInfoTable)
  };

  function getLifts($tableNode) {
    return $tableNode
      .find('tr')
      // skip first row,
      // because it is table header
      .slice(1)
      .map((index, element) => {
        var columns = $(element).find('td');

        return {
          id: getliftId(columns.eq(0).text()),
          date: getAdoptedDateString(columns.eq(1).text()),
          initialLift: Number.parseInt(columns.eq(2).text()),
          liftsLeft: Number.parseInt(columns.eq(3).text())
        }
      })
      .toArray();

      function getliftId(text) {
        const whiteSpaceChar = ' ';
        return text.slice(text.lastIndexOf(whiteSpaceChar) + whiteSpaceChar.length, text.length);
      }
  }

  function getAdoptedDateString(date) {
    return moment.tz(date, skiLiftDateFormat, originalTimeZone).local().format('L LTS');
  }
}