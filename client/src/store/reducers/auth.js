import { AUTH_SUCCESS, AUTH_REVOKE, AUTH_FAIL } from '../actions/types';
import updateObject from '../utility';

const initialState = {
  accessToken: null, // existing localStorage token is checked in componentWillMount
  activities: null,
  athlete: null,
  totals: null,
  error: null,
  loading: true, // since oAuth is a redirect, set initial loading state to true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return updateObject(state, {
        accessToken: action.accessToken,
        activities: action.activities,
        athlete: action.athlete,
        totals: action.totals,
        error: null,
        loading: false,
      });
    case AUTH_REVOKE:
      return updateObject(state, {
        accessToken: null,
        activities: null,
        athlete: null,
        totals: null,
        error: null,
        loading: false,
      });
    case AUTH_FAIL:
      return updateObject(state, {
        loading: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default reducer;
