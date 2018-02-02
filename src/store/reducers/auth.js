import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  accessToken: null, // existing localstorage token is checked in componentWillMount
  athelte: null,
  error: null,
  loading: true, // since oAuth is a redirect, set initial loading state to true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INIT:
      return updateObject(state, {
        accessToken: action.accessToken,
        athlete: action.athlete,
        error: false,
        loading: false,
      });
    case actionTypes.AUTH_RENEW:
      return updateObject(state, {
        accessToken: action.accessToken,
        athlete: action.athlete,
        error: false,
        loading: false,
      });
    case actionTypes.AUTH_REVOKE:
      return updateObject(state, {
        accessToken: null,
        athlete: null,
        error: null,
        loading: false,
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
