import moment from 'moment'
import isNil from 'lodash.isnil'

const getAdoptedDateString = date => {
  if (isNil(date)) {
    return null
  }

  return moment(date).format('L LTS')
}

export {
  getAdoptedDateString
}
