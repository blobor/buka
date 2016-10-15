import { List } from 'immutable'
import { FETCH_STORED_SKIPASSES_SUCCESS } from '../actions/actionTypes'

const initialState = new List()

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORED_SKIPASSES_SUCCESS:
      return new List(action.skipasses)
    default:
      return state
  }
}
