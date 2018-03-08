import axios from 'axios';

import { AUTH_SUCCESS, AUTH_REVOKE, AUTH_FAIL } from './types';

export const authSuccess = (accessToken, athlete, totals, activities) => ({
  type: AUTH_SUCCESS,
  accessToken,
  activities,
  athlete,
  totals,
});

export const authRevoke = () => ({
  type: AUTH_REVOKE,
});

export const authFail = error => ({
  type: AUTH_FAIL,
  error,
});

// handles the oAuth token exchange on the backend
export const authInit = codeQuery => (async (dispatch) => {
  try {
    const auth = await axios.get(`/auth/strava?code=${codeQuery}`);
    const athlete = await axios.get(`https://www.strava.com/api/v3/athlete?access_token=${auth.data.token}`);
    const totals = await axios.get(`https://www.strava.com/api/v3/athletes/${athlete.data.id}/stats?access_token=${auth.data.token}`);
    const activities = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${auth.data.token}&per_page=200`);
    dispatch(authSuccess(auth.data.token, athlete.data, totals.data, activities.data));
    localStorage.setItem('accessToken', auth.data.token);
  } catch (error) {
    dispatch(authFail(error.response));
  }
  window.history.replaceState({}, document.title, '/');
});

// for revists, where the token is stored in localStorage
export const authRenew = token => (async (dispatch) => {
  try {
    console.log('trying renew')
    const athlete = await axios.get(`https://www.strava.com/api/v3/athlete?access_token=${token}`);
    const totals = await axios.get(`https://www.strava.com/api/v3/athletes/${athlete.data.id}/stats?access_token=${token}`);
    dispatch(authSuccess(token, athlete.data, totals.data));
  } catch (error) {
    console.log('found error')
    dispatch(authFail(error.response));
  }
});
