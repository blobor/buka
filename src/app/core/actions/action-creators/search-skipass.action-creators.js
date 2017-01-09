import {
  FETCH_SKIPASS_REQUEST,
  FETCH_SKIPASS_SUCCESS,
  FETCH_SKIPASS_FAILURE,
  TOGGLE_SKIPASS_CAN_BE_ADDED,
  CHANGE_SEARCH_SKIPASS_NUMBER
} from '../action-types'
import { validate } from '../../../helpers/cardNumberValidator'

const changeSearchSkipassNumber = skipassNumber => {
  return {
    type: CHANGE_SEARCH_SKIPASS_NUMBER,
    skipassNumber: skipassNumber,
    isValid: validate(skipassNumber)
  }
}

const fetchSkipassRequest = () => {
  return {
    type: FETCH_SKIPASS_REQUEST
  }
}

const fetchSkipassSuccess = skipass => {
  return {
    type: FETCH_SKIPASS_SUCCESS,
    skipass: skipass
  }
}

const fetchSkipassFailure = error => {
  return {
    type: FETCH_SKIPASS_FAILURE,
    error: error
  }
}

const toggleSkipassCanBeAdded = canBeAdded => {
  return {
    type: TOGGLE_SKIPASS_CAN_BE_ADDED,
    canBeAdded: canBeAdded
  }
}

export {
  changeSearchSkipassNumber,
  fetchSkipassRequest,
  fetchSkipassSuccess,
  fetchSkipassFailure,
  toggleSkipassCanBeAdded
}
