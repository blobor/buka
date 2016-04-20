import isNil from 'lodash.isnil';
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

  const parser = new DOMParser();
  const cardNumber = data.success;

  const dom = parser.parseFromString(data.html, 'text/html');

  const dataTables = dom.getElementsByTagName('table');
  const skipassInfoTable = dataTables[0];
  const skipassLiftsInfoTable = dataTables[1];
  const skipassServiceInfo = skipassInfoTable.querySelector('#order_info_header:first-child > span').textContent;
  const orginalPurchaseDate = skipassInfoTable.querySelector('#order_info_header_white:first-child > span').textContent;

  return {
    cardNumber: cardNumber,
    capacity: 0,
    purchaseDate: getAdoptedDateString(orginalPurchaseDate),
    lifts: Array.from(getLifts(skipassLiftsInfoTable))
  };

  function* getLifts(table) {
    if (isNil(table)) {
      return;
    }

    const rows = table.getElementsByTagName('tr');
    const rowsCount = rows.length;

    // skip first row,
    // because it is table header
    for (let i = 1; i < rowsCount; i++) {

      let columns = rows[i].getElementsByTagName('td');

      yield {
        id: getliftId(columns[0].textContent),
        date: getAdoptedDateString(columns[1].textContent),
        initialLift: Number.parseInt(columns[2].textContent),
        liftsLeft: Number.parseInt(columns[3].textContent)
      }
    }

    function getliftId(text) {
      const whiteSpaceChar = ' ';
      return text.slice(text.lastIndexOf(whiteSpaceChar) + whiteSpaceChar.length, text.length);
    }
  }

  function getAdoptedDateString(date) {
    return moment.tz(date, skiLiftDateFormat, originalTimeZone).local().format('L LTS');
  }
}