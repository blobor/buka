import bukovelAPI from '../data-access/bukovelAPI'
import * as actionTypes from './actionTypes'
import { validate } from '../helpers/cardNumberValidator'

const changeSearchSkipassNumber = skipassNumber => {
  return {
    type: actionTypes.CHANGE_SEARCH_SKIPASS_NUMBER,
    skipassNumber: skipassNumber,
    isValid: validate(skipassNumber)
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
  return async dispatch => {
    dispatch(requestSkipassData())
    const skipass = await bukovelAPI.getSkipass(value)
    dispatch(receiveSkipassdata(skipass))
  }
}

export {
  changeSearchSkipassNumber,
  requestSkipassData,
  receiveSkipassdata,
  fetchSkipassData
}
