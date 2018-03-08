import { TOGGLE_FILTER } from '../actions/types';
import updateObject from '../utility';

const initialState = {
  ride: true,
  run: true,
  swim: true,
  recent: true,
  ytd: true,
  all: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER:
      return updateObject(state, {
        [action.filter]: !state[action.filter],
      });
    default:
      return state;
  }
};

export default reducer;
