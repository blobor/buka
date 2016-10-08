import { save as saveSkipass } from '../data-access/skipassRepository'
import { STORE_SKIPASS_REQUEST, STORE_SKIPASS_SUCCESS, STORE_SKIPASS_FAILURE } from './actionTypes'

const storeSkipassRequest = () => {
  return {
    type: STORE_SKIPASS_REQUEST
  }
}

const storeSkipassSuccess = () => {
  return {
    type: STORE_SKIPASS_SUCCESS
  }
}

const storeSkipassFailure = error => {
  return {
    type: STORE_SKIPASS_FAILURE,
    error: error
  }
}

const storeSkipass = () => {
  return async (dispatch, getState) => {
    const skipass = getState().get('searchSkipass').get('skipass').toJS()

    dispatch(storeSkipassRequest())

    try {
      await saveSkipass(skipass)
      dispatch(storeSkipassSuccess())
    } catch (e) {
      dispatch(storeSkipassFailure(e))
    }
  }
}

export {
  storeSkipass
}
