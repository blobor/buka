import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  // ToDo: add reducers
  test: function (state, action) {
    return {
      state,
      action
    };
  }
});

export default rootReducer;
