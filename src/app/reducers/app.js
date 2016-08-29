import { fromJS } from 'immutable'
import { appName, version } from '../../config.js'

const initialState = fromJS({
  name: appName,
  version: version
})

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
