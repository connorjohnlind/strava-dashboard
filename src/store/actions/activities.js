import axios from 'axios';

import * as actionTypes from './actionTypes';

export const activitiesSuccess = data => ({
  type: actionTypes.ACTIVITIES_SUCCESS,
  data,
});

export const activitiesRevoke = () => ({
  type: actionTypes.ACTIVITIES_REVOKE,
});

export const activitiesFail = error => ({
  type: actionTypes.ACTIVITIES_FAIL,
  error,
});

export const activitiesGet = accessToken => ((dispatch) => {
  // Strava API Limits to 200 activities per request, found through Postman
  axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&per_page=200`)
    .then((res) => {
      dispatch(activitiesSuccess(res.data));
    })
    .catch((error) => {
      dispatch(activitiesFail(error.response));
    });
});
