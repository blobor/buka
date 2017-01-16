import {
  TOGGLE_DEVELOPER_MODE
} from '../action-types'

const toggleDeveloperMode = developerMode => {
  return {
    type: TOGGLE_DEVELOPER_MODE,
    developerMode
  }
}

export {
  toggleDeveloperMode
}