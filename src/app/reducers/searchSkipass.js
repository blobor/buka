import { fromJS } from 'immutable'
import * as actionTypes from '../actions/actionTypes'

const initialState = fromJS({
  isValid: true,
  skipassNumber: '',
  skipass: null
})

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SEARCH_SKIPASS_NUMBER:
      return state.merge({
        skipassNumber: action.skipassNumber,
        isValid: action.isValid
      })
    case actionTypes.FETCH_SKIPASS_REQUEST:
      return state.merge({
        isFetching: true
      })
    case actionTypes.FETCH_SKIPASS_SUCCESS:
      return state.merge({
        isFetching: false,
        error: null,
        skipass: action.skipass
      })
    case actionTypes.FETCH_SKIPASS_FAILURE:
      return state.merge({
        isFetching: false,
        skipass: null,
        error: action.error
      })
    default:
      return state
  }
}
