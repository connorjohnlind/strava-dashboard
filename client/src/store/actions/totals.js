import { TOGGLE_FILTER } from './types';

/* eslint-disable import/prefer-default-export */
export const toggleFilter = filter => ({
  type: TOGGLE_FILTER,
  filter,
});
