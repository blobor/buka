import { hasSkipass, getLatest as getSkipass } from '../../data-access/skipassRepository'
import {
  fetchSkipassRequest,
  fetchSkipassSuccess,
  fetchSkipassFailure,
  toggleSkipassCanBeAdded
} from './action-creators/search-skipass.action-creator'

const fetchSkipassData = value => {
  return async (dispatch) => {
    let skipass = null

    dispatch(fetchSkipassRequest())
    try {
      skipass = await getSkipass(value)
      dispatch(fetchSkipassSuccess(skipass))
    } catch (e) {
      dispatch(fetchSkipassFailure(e))
    }

    if (skipass != null) {
      const skipassIsPresent = await hasSkipass(value)
      dispatch(toggleSkipassCanBeAdded(!skipassIsPresent))
    }
  }
}

export {
  fetchSkipassData
}
