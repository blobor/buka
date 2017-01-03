import { fromJS } from 'immutable'
import {
  CHANGE_SEARCH_SKIPASS_NUMBER,
  TOGGLE_SKIPASS_CAN_BE_ADDED,
  FETCH_SKIPASS_REQUEST,
  FETCH_SKIPASS_SUCCESS,
  FETCH_SKIPASS_FAILURE,
  STORE_SKIPASS_SUCCESS
} from '../core/actions/action-types'

const initialState = fromJS({
  isValid: true,
  canBeAdded: false,
  skipassNumber: '',
  skipass: null
})

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_SKIPASS_NUMBER:
      return state.merge({
        skipassNumber: action.skipassNumber,
        isValid: action.isValid
      })
    case TOGGLE_SKIPASS_CAN_BE_ADDED:
      return state.set('canBeAdded', action.canBeAdded)
    case FETCH_SKIPASS_REQUEST:
      return state.merge({
        isFetching: true,
        canBeAdded: false
      })
    case FETCH_SKIPASS_SUCCESS:
      return state.merge({
        isFetching: false,
        error: null,
        skipass: action.skipass
      })
    case FETCH_SKIPASS_FAILURE:
      return state.merge({
        isFetching: false,
        canBeAdded: false,
        skipass: null,
        error: action.error
      })
    case STORE_SKIPASS_SUCCESS:
      return state.set('canBeAdded', false)
    default:
      return state
  }
}
