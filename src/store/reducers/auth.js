import * as actionTypes from '../actions/actionTypes';

const initialState = {
  accessToken: null,
  loading: true,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACCESS_TOKEN_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;
