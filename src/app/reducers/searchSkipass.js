import * as actionTypes from '../actions/actionTypes'
import { validate } from '../helpers/cardNumberValidator'

const initialState = {
  isValid: true,
  skipassNumber: '',
  skipass: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SEARCH_SKIPASS_NUMBER:
      return {
        ...state,
        skipassNumber: action.skipassNumber,
        isValid: validate(action.skipassNumber)
      }
    case actionTypes.REQUEST_SKIPASS_DATA:
      return {
        ...state,
        skipass: {
          isFetching: true
        }
      }
    case actionTypes.RECEIVE_SKIPASS_DATA:
      return {
        ...state,
        skipass: {
          ...action.skipass,
          isFetching: false
        }
      }
    default:
      return state
  }
}
