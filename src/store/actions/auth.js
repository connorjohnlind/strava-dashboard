import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authSet = token => ({
  type: actionTypes.AUTH_SET,
  accessToken: token,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const auth = code => ((dispatch) => {
  axios.post(`https://www.strava.com/oauth/token?client_id=23058&client_secret=7acf3779503a1e2f856a4574d3f7fbc2d22090f7&code=${code}`)
    .then((res) => {
      localStorage.setItem('accessToken', res.data.access_token);
      dispatch(authSet(res.data.access_token));
    })
    .catch(() => {
      dispatch(authFail());
    });
  window.history.replaceState({}, document.title, '/');
});
