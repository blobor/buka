import {
  save as saveSkipass,
  remove as removeSkipass,
  getAll as getStoredSkipasses
} from '../../data-access/skipassRepository'
import {
  storeSkipassRequest,
  storeSkipassSuccess,
  storeSkipassFailure,
  fetchStoredSkipassesRequest,
  fetchStoredSkipassesSuccess,
  fetchStoredSkipassesFailure,
  removeStoredSkipassRequest,
  removeStoredSkipassSuccess,
  removeStoredSkipassFailure
} from './action-creators/stored-skipasses.action-creators'

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
