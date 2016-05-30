import moment from 'moment';

export function getAdoptedDateString(date) {
  return moment(date).format('L LTS');
}
