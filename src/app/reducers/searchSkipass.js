import { fromJS } from 'immutable'
import * as actionTypes from '../actions/actionTypes'

const initialState = fromJS({
  isValid: true,
  canBeAdded: false,
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
    case actionTypes.TOGGLE_SKIPASS_CAN_BE_ADDED:
      return state.set('canBeAdded', action.canBeAdded)
    case actionTypes.FETCH_SKIPASS_REQUEST:
      return state.merge({
        isFetching: true,
        canBeAdded: false
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
        canBeAdded: false,
        skipass: null,
        error: action.error
      })
    case actionTypes.STORE_SKIPASS_SUCCESS:
      return state.set('canBeAdded', false)
    default:
      return state
  }
}
