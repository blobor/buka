import get from 'lodash.get'
import flow from 'lodash.flow'
import moment from 'moment-timezone'

const whiteSpaceChar = ' '

const originalTimeZone = 'Europe/Kiev'
const skiLiftDateFormat = 'DD.MM.YYYY HH:mm:ss'

const removeDuplicateWhitespaces = str => str.replace(/\s{2,}/g, ' ')
const removeWhitespacesBeforeParentheses = str => str.replace(/\s+(?=\))/g, '')

const normalizeCardName = flow(removeDuplicateWhitespaces, removeWhitespacesBeforeParentheses)

const getLiftId = text => {
  return text.slice(text.lastIndexOf(whiteSpaceChar) + whiteSpaceChar.length, text.length)
}

const getAdoptedDateString = date => {
  return moment.tz(date, skiLiftDateFormat, originalTimeZone).utc()
}

const getLifts = function * ($tableNode) {
  const rows = $tableNode.find('tr')
  const rowsCount = rows.length

  // skip first row,
  // because it is table header
  for (let i = 1; i < rowsCount; i++) {
    const columns = rows.eq(i).find('td')

    yield {
      id: getLiftId(columns.eq(0).text()),
      date: getAdoptedDateString(columns.eq(1).text()),
      initialLift: Number.parseInt(columns.eq(2).text()),
      liftsLeft: Number.parseInt(columns.eq(3).text())
    }
  }
}

const getSkipassProps = (keyValues, mappedData) => {
  const result = {}
  const emptyAdaptor = value => value

  for (const {key, value} of keyValues) {
    const mappedKey = get(mappedData, [key, 'propName'], key)
    const getValue = get(mappedData, [key, 'adaptor'], emptyAdaptor)

    if (mappedKey in result) {
      continue
    }

    result[mappedKey] = getValue(value)
  }

  return result
}

export {
  getLifts,
  getSkipassProps,
  normalizeCardName,
  getAdoptedDateString
}
