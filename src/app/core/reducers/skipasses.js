import { fromJS, Set } from 'immutable'
import {
  STORE_SKIPASS_SUCCESS,
  FETCH_STORED_SKIPASSES_SUCCESS,
  REMOVE_STORED_SKIPASS_SUCCESS
} from '../../core/actions/action-types'

const initialState = fromJS({
  list: new Set()
})

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_SKIPASS_SUCCESS:
      return state.update('list', setOfSkipasses => setOfSkipasses.add(action.savedSkipass))
    case FETCH_STORED_SKIPASSES_SUCCESS:
      return state.set('list', new Set(action.skipasses))
    case REMOVE_STORED_SKIPASS_SUCCESS:
      return state.update('list', setOfSkipasses => setOfSkipasses.remove(action.skipass))
    default:
      return state
  }
}
