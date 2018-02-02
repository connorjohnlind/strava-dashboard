import axios from 'axios';

import * as actionTypes from './actionTypes';

// authentication is initialized with oAuth
export const authInit = (accessToken, athlete) => ({
  type: actionTypes.AUTH_INIT,
  accessToken,
  athlete,
});

// authentication is renewed on the Athletes API
// athlete data will formatted differently
export const authRenew = (accessToken, athlete) => ({
  type: actionTypes.AUTH_RENEW,
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

export const auth = codeQuery => ((dispatch) => {
  axios.post(`https://www.strava.com/oauth/token?client_id=23058&client_secret=7acf3779503a1e2f856a4574d3f7fbc2d22090f7&code=${codeQuery}`)
    .then((res) => {
      localStorage.setItem('accessToken', res.data.access_token);
      dispatch(authInit(res.data.access_token, res.data.athlete));
    })
    .catch((error) => {
      dispatch(authFail(error.response));
    });
  window.history.replaceState({}, document.title, '/');
});

export const authCheck = accessToken => ((dispatch) => {
  axios.get(`https://www.strava.com/api/v3/athlete?access_token=${accessToken}`)
    .then((res) => {
      dispatch(authRenew(accessToken, res.data));
    })
    .catch((error) => {
      dispatch(authFail(error.response));
    });
});
