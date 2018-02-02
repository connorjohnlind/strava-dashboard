import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  data: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ATHLETE_SET:
      return updateObject(state, {
        data: action.data,
      });
    case actionTypes.ATHLETE_REMOVE:
      return updateObject(state, {
        data: null,
      });
    case actionTypes.ATHLETE_FAIL:
      return updateObject(state, {
        data: null,
        error: action.error,
      });
    default:
      return state;
  }
};

export default reducer;
