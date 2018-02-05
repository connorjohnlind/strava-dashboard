import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authSuccess = (accessToken, athlete, stats) => ({
  type: actionTypes.AUTH_SUCCESS,
  accessToken,
  athlete,
  stats,
});

export const authRevoke = () => ({
  type: actionTypes.AUTH_REVOKE,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

// extends the state with stats dataset after athelteGet
export const statsGet = (accessToken, athleteData) => ((dispatch) => {
  axios.get(`https://www.strava.com/api/v3/athletes/${athleteData.id}/stats?access_token=${accessToken}`)
    .then((res) => {
      dispatch(authSuccess(accessToken, athleteData, res.data));
    })
    .catch((error) => {
      dispatch(authFail(error.response));
    });
});

// extends the state with the stats dataset after oAuth
export const athleteGet = accessToken => ((dispatch) => {
  axios.get(`https://www.strava.com/api/v3/athlete?access_token=${accessToken}`)
    .then((res) => {
      dispatch(statsGet(accessToken, res.data));
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
