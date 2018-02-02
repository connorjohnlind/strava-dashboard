import axios from 'axios';

import * as actionTypes from './actionTypes';

// authentication is initialized with oAuth
export const authSuccess = (accessToken, athlete) => ({
  type: actionTypes.AUTH_SUCCESS,
  accessToken,
  athlete,
});

export const authRevoke = () => ({
  type: actionTypes.AUTH_REVOKE,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

// extends the athlete dataset after oAuth, and renews existing tokens
// receives an access token, returns the access token and the athlete profile
export const athleteGet = accessToken => ((dispatch) => {
  axios.get(`https://www.strava.com/api/v3/athlete?access_token=${accessToken}`)
    .then((res) => {
      dispatch(authSuccess(accessToken, res.data));
    })
    .catch((error) => {
      dispatch(authFail(error.response));
    });
});

// handles the oAuth token exchange
// receives a query parameter and outputs an accessToken from the Strava Auth API
export const auth = codeQuery => ((dispatch) => {
  axios.post(`https://www.strava.com/oauth/token?client_id=23058&client_secret=7acf3779503a1e2f856a4574d3f7fbc2d22090f7&code=${codeQuery}`)
    .then((res) => {
      localStorage.setItem('accessToken', res.data.access_token);
      dispatch(athleteGet(res.data.access_token));
    })
    .catch((error) => {
      dispatch(authFail(error.response));
    });
  window.history.replaceState({}, document.title, '/');
});
