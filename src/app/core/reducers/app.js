import { fromJS } from 'immutable'
import { TOGGLE_DEVELOPER_MODE } from '../actions/action-types'
import { appName, version, development } from '../../../config.js'

const initialState = fromJS({
  name: appName,
  developerMode: development,
  version: version
})

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DEVELOPER_MODE:
      return state.set('developerMode', action.developerMode)
    default:
      return state
  }
}
