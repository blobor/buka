import { fromJS, Set } from 'immutable'
import { FETCH_STORED_SKIPASSES_SUCCESS, REMOVE_STORED_SKIPASS_SUCCESS } from '../core/actions/action-types'

const initialState = fromJS({
  list: new Set(),
  selected: null
})

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORED_SKIPASSES_SUCCESS:
      return state.set('list', new Set(action.skipasses))
    case REMOVE_STORED_SKIPASS_SUCCESS:
      return state.update('list', setOfSkipasses => {
        return setOfSkipasses.remove(action.skipass)
      })
    default:
      return state
  }
}
