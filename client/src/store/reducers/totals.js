import { MOUSE_IN, MOUSE_OUT } from '../actions/types';
import updateObject from '../utility';

const initialState = {
  value: null,
  units: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MOUSE_IN:
      return updateObject(state, {
        value: action.value,
        units: action.units,
      });
    case MOUSE_OUT:
      return updateObject(state, {
        value: null,
        units: null,
      });
    default:
      return state;
  }
};

export default reducer;
