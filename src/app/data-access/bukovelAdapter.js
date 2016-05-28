import moment from 'moment';

export function proceed(data) {

  if (data.errors) {
    return data;
  }

  data.lifts.forEach(lift => {
    lift.date = getAdoptedDateString(lift.date);
  });

  return data;
}

function getAdoptedDateString(date) {
  return moment(date).format('L LTS');
}
