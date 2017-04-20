// @flow
import { combineReducers } from 'redux';

const generic = (state = {}, action) => {
  switch (action.type) {
    default: return state;
  }
};

const rootReducer = combineReducers({
  generic
});
export default rootReducer;
