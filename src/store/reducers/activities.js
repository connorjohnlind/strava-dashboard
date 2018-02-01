import * as actionTypes from '../actions/actionTypes';

const initialState = {
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACCESS_TOKEN_FAILED:
      return {
      };
    case actionTypes.SET_ACCESS_TOKEN:
      return {
      };
    default:
      return state;
  }
};

export default reducer;
