import axios from 'axios';

import * as actionTypes from './actionTypes';

export const setAccessToken = token => ({
  type: actionTypes.SET_ACCESS_TOKEN,
  accessToken: token,
});

export const fetchAccessTokenFailed = () => ({
  type: actionTypes.FETCH_ACCESS_TOKEN_FAILED,
});

export const fetchAccessToken = code => ((dispatch) => {
  axios.post(`https://www.strava.com/oauth/token?client_id=23058&client_secret=7acf3779503a1e2f856a4574d3f7fbc2d22090f7&code=${code}`)
    .then((res) => {
      localStorage.setItem('accessToken', res.data.access_token);
      dispatch(setAccessToken(res.data.access_token));
      window.history.replaceState({}, document.title, '/');
    })
    .catch(() => {
      dispatch(fetchAccessTokenFailed());
    });
});
