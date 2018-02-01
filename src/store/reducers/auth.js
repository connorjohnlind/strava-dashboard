import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  accessToken: null, // existing localstorage token is checked in componentWillMount
  loading: true, // since auth is always a redirect, set initial loading state to true
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SET:
      return updateObject(state, {
        accessToken: action.accessToken,
        loading: false,
        error: null,
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, {
        loading: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default reducer;
