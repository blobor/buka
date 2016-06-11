import { REQUEST_SKIPASS_DATA, RECEIVE_SKIPASS_DATA } from '../actions/skipass';

const initialState = {
  cardNumber: '',
  isFetching: false,
  lifts: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_SKIPASS_DATA:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_SKIPASS_DATA:
      return {
        ...state,
        ...action.skipass,
        isFetching: false
      };
    default:
      return state;
  }
}
