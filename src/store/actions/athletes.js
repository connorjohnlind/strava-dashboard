import axios from 'axios';

import * as actionTypes from './actionTypes';

export const athleteSet = data => ({
  type: actionTypes.ATHLETE_SET,
  data,
});

export const athleteRemove = () => ({
  type: actionTypes.ATHLETE_REMOVE,
});

export const athleteFail = error => ({
  type: actionTypes.ATHLETE_FAIL,
  error,
});

export const athleteGet = accessToken => ((dispatch) => {
  axios.get(`https://www.strava.com/api/v3/athlete?access_token=${accessToken}`)
    .then((res) => {
      dispatch(athleteSet(res.data));
    })
    .catch((error) => {
      dispatch(athleteFail(error));
    });
});
