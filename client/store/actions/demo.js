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

export const demoInit = () => (async (dispatch) => {
  try {
    let demo = await axios.get('/api/demo/');
    demo = demo.data.data;
    dispatch(demoSuccess(demo.accessToken, demo.athlete, demo.totals, demo.activities));
  } catch (error) {
    dispatch(demoFail(error.response));
  }
});
