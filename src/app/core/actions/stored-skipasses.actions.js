import isNil from 'lodash.isnil'
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
import { toggleSkipassCanBeAdded } from './action-creators/search-skipass.action-creators'

const storeSkipass = () => {
  return async (dispatch, getState) => {
    const skipass = getState().get('searchSkipass').get('skipass').toJS()

    dispatch(storeSkipassRequest())

    try {
      const savedSkipass = await saveSkipass(skipass)
      dispatch(storeSkipassSuccess(savedSkipass))
    } catch (e) {
      dispatch(storeSkipassFailure(e))
    }
  }
}

const fetchStoredSkipasses = () => {
  return async dispatch => {
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
  return async (dispatch, getState) => {
    const { skipass: searchSkipass } = getState().get('searchSkipass').toJS()

    dispatch(removeStoredSkipassRequest())

    try {
      await removeSkipass(skipass)
      dispatch(removeStoredSkipassSuccess(skipass))

      if (!isNil(searchSkipass) && searchSkipass.cardNumber === skipass.cardNumber) {
        dispatch(toggleSkipassCanBeAdded(true))
      }
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
