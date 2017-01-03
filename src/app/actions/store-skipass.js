import {
  save as saveSkipass,
  remove as removeSkipass,
  getAll as getStoredSkipasses
} from '../data-access/skipassRepository'
import {
  STORE_SKIPASS_REQUEST,
  STORE_SKIPASS_SUCCESS,
  STORE_SKIPASS_FAILURE,
  FETCH_STORED_SKIPASSES_REQUEST,
  FETCH_STORED_SKIPASSES_SUCCESS,
  FETCH_STORED_SKIPASSES_FAILURE,
  REMOVE_STORED_SKIPASS_REQUEST,
  REMOVE_STORED_SKIPASS_SUCCESS,
  REMOVE_STORED_SKIPASS_FAILURE
} from './actionTypes'

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

const fetchStoredSkipassesRequest = () => {
  return {
    type: FETCH_STORED_SKIPASSES_REQUEST
  }
}

const fetchStoredSkipassesSuccess = skipasses => {
  return {
    type: FETCH_STORED_SKIPASSES_SUCCESS,
    skipasses
  }
}

const fetchStoredSkipassesFailure = error => {
  return {
    type: FETCH_STORED_SKIPASSES_FAILURE,
    error
  }
}

const removeStoredSkipassRequest = skipass => {
  return {
    type: REMOVE_STORED_SKIPASS_REQUEST
  }
}

const removeStoredSkipassSuccess = skipass => {
  return {
    skipass,
    type: REMOVE_STORED_SKIPASS_SUCCESS
  }
}

const removeStoredSkipassFailure = error => {
  return {
    type: REMOVE_STORED_SKIPASS_FAILURE,
    error
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

const fetchStoredSkipasses = () => {
  return async (dispatch) => {
    dispatch(fetchStoredSkipassesRequest())

    try {
      const skipasses = await getStoredSkipasses()
      dispatch(fetchStoredSkipassesSuccess(skipasses))
    } catch (e) {
      dispatch(fetchStoredSkipassesFailure(e))
    }
  }
}

const removeStoredSkipass = skipass => {
  return async dispatch => {
    dispatch(removeStoredSkipassRequest())

    try {
      await removeSkipass(skipass)
      dispatch(removeStoredSkipassSuccess(skipass))
    } catch (e) {
      dispatch(removeStoredSkipassFailure(e))
    }
  }
}

export {
  storeSkipass,
  fetchStoredSkipasses,
  removeStoredSkipass
}
