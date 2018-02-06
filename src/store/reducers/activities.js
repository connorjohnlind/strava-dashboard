import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  data: null, // existing localStorage token is checked in componentWillMount
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTIVITIES_SUCCESS:
      return updateObject(state, {
        data: action.data,
        error: null,
      });
    case actionTypes.ACTIVITIES_REVOKE:
      return updateObject(state, {
        data: null,
      });
    case actionTypes.ACTIVITIES_FAIL:
      return updateObject(state, {
        error: action.error,
      });
    default:
      return state;
  }
};

export default reducer;
