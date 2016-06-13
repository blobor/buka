import bukovelAPI from '../data-access/bukovelAPI'

export const CHANGE_CARD_NUMBER = 'CHANGE_CARD_NUMBER'
export const REQUEST_SKIPASS_DATA = 'REQUEST_SKIPASS_DATA'
export const RECEIVE_SKIPASS_DATA = 'RECEIVE_SKIPASS_DATA'

const changeCardNumber = (cardNumber) => {
  return {
    type: CHANGE_CARD_NUMBER,
    cardNumber: cardNumber
  }
}

const requestSkipassData = () => {
  return {
    type: REQUEST_SKIPASS_DATA
  }
}

const receiveSkipassdata = (skipass) => {
  return {
    type: RECEIVE_SKIPASS_DATA,
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
