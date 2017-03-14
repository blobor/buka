import isNil from 'lodash.isnil'
import { hasSkipass, getLatest as getSkipass } from '../../data-access/skipassRepository'
import {
  fetchSkipassRequest,
  fetchSkipassSuccess,
  fetchSkipassFailure,
  toggleSkipassCanBeAdded
} from './action-creators/search-skipass.action-creators'

const fetchSkipassData = value => {
  return async (dispatch) => {
    let skipass = null

    dispatch(fetchSkipassRequest())
    try {
      skipass = await getSkipass(value)
      dispatch(fetchSkipassSuccess(skipass))
    } catch (error) {
      dispatch(fetchSkipassFailure(error.message))
    }

    if (!isNil(skipass)) {
      const skipassIsPresent = await hasSkipass(value)
      dispatch(toggleSkipassCanBeAdded(!skipassIsPresent))
    }
  }
}

export {
  fetchSkipassData
}
