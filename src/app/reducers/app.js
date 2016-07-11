import { version } from '../../../package.json'

const initialState = {
  name: 'Buka',
  version: version
}

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
