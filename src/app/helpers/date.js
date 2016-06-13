import moment from 'moment'

const getAdoptedDateString = date => {
  return moment(date).format('L LTS')
}

export {
  getAdoptedDateString
}
