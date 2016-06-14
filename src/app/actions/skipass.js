import bukovelAPI from '../data-access/bukovelAPI'
import * as actionTypes from './actionTypes'

const changeCardNumber = (cardNumber) => {
  return {
    type: actionTypes.CHANGE_CARD_NUMBER,
    cardNumber: cardNumber
  }
}

const requestSkipassData = () => {
  return {
    type: actionTypes.REQUEST_SKIPASS_DATA
  }
}

const receiveSkipassdata = (skipass) => {
  return {
    type: actionTypes.RECEIVE_SKIPASS_DATA,
    skipass: skipass
  }
}

const fetchSkipassData = value => {
  return dispatch => {
    dispatch(requestSkipassData())
    bukovelAPI
      .getCardBalance(value)
      .then(data => {
        dispatch(receiveSkipassdata(data))
      })
  }
}

export {
  changeCardNumber,
  requestSkipassData,
  receiveSkipassdata,
  fetchSkipassData
}
