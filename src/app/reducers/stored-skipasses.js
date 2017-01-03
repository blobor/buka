import { List } from 'immutable'
import { FETCH_STORED_SKIPASSES_SUCCESS, REMOVE_STORED_SKIPASS_SUCCESS } from '../actions/actionTypes'

const initialState = new List()

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORED_SKIPASSES_SUCCESS:
      return new List(action.skipasses)
    case REMOVE_STORED_SKIPASS_SUCCESS:
      return state.filterNot(skipass => skipass === action.skipass)
    default:
      return state
  }
}
