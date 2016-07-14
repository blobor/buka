import * as actionTypes from '../actions/actionTypes'

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
        isValid: action.isValid
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
