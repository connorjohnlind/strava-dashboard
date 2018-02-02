import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  accessToken: null, // existing localstorage token is checked in componentWillMount
  error: null,
  loading: true, // since oAuth is a redirect, set initial loading state to true
  firstname: null,
  lastname: null,
  city: null,
  state: null,
  profile: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INIT:
      return updateObject(state, {
        accessToken: action.accessToken,
        error: null,
        loading: false,
        firstname: action.firstname,
        lastname: action.lastname,
        city: action.city,
        state: action.state,
        profile: action.profile,
      });
    case actionTypes.AUTH_RENEW:
      return updateObject(state, {
        accessToken: action.accessToken,
        error: null,
        loading: false,
        firstname: action.firstname,
        lastname: action.lastname,
        city: action.city,
        state: action.state,
        profile: action.profile,
      });
    case actionTypes.AUTH_REVOKE:
      return updateObject(state, {
        accessToken: null,
        error: null,
        loading: false,
        firstname: null,
        lastname: null,
        city: null,
        state: null,
        profile: null,
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
