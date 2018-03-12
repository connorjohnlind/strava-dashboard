import { MOUSE_IN, MOUSE_OUT } from './types';

export const mouseIn = (value, units) => ({
  type: MOUSE_IN,
  value,
  units,
});

export const mouseOut = () => ({
  type: MOUSE_OUT,
});
