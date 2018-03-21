import axios from 'axios';

import { DEMO_SUCCESS, DEMO_FAIL } from './types';

export const demoSuccess = (accessToken, athlete, totals, activities) => ({
  type: DEMO_SUCCESS,
  accessToken,
  activities,
  athlete,
  totals,
});

export const demoFail = error => ({
  type: DEMO_FAIL,
  error,
});

// handles the oAuth token exchange on the backend
export const demoInit = () => (async (dispatch) => {
  try {
    let dummy = await axios.get('/api/demo/');
    dummy = dummy.data.data;
    dispatch(demoSuccess(dummy.accessToken, dummy.athlete, dummy.totals, dummy.activities));
  } catch (error) {
    dispatch(demoFail(error.response));
  }
});
