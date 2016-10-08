import { hasSkipass, getLatest as getSkipass } from '../data-access/skipassRepository'
import * as actionTypes from './actionTypes'
import { validate } from '../helpers/cardNumberValidator'

const changeSearchSkipassNumber = skipassNumber => {
  return {
    type: actionTypes.CHANGE_SEARCH_SKIPASS_NUMBER,
    skipassNumber: skipassNumber,
    isValid: validate(skipassNumber)
  }
}

const fetchSkipassRequest = () => {
  return {
    type: actionTypes.FETCH_SKIPASS_REQUEST
  }
}

const fetchSkipassSuccess = skipass => {
  return {
    type: actionTypes.FETCH_SKIPASS_SUCCESS,
    skipass: skipass
  }
}

const fetchSkipassFailure = error => {
  return {
    type: actionTypes.FETCH_SKIPASS_FAILURE,
    error: error
  }
}

const toggleSkipassCanBeAdded = canBeAdded => {
  return {
    type: actionTypes.TOGGLE_SKIPASS_CAN_BE_ADDED,
    canBeAdded: canBeAdded
  }
}

const fetchSkipassData = value => {
  return async (dispatch) => {
    let skipass = null

    dispatch(fetchSkipassRequest())
    try {
      skipass = await getSkipass(value)
      dispatch(fetchSkipassSuccess(skipass))
    } catch (e) {
      dispatch(fetchSkipassFailure(e))
    }

    if (skipass != null) {
      const skipassIsPresent = await hasSkipass(value)
      dispatch(toggleSkipassCanBeAdded(!skipassIsPresent))
    }
  }
}

export {
  fetchSkipassData,
  changeSearchSkipassNumber
}
