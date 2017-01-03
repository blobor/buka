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
} from '../action-types'

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

export {
  storeSkipassRequest,
  storeSkipassSuccess,
  storeSkipassFailure,
  fetchStoredSkipassesRequest,
  fetchStoredSkipassesSuccess,
  fetchStoredSkipassesFailure,
  removeStoredSkipassRequest,
  removeStoredSkipassSuccess,
  removeStoredSkipassFailure
}
