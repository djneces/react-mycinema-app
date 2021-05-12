import { SELECT_SEAT, DESELECT_SEAT } from './actionTypes';

//select seat
export const selectSeat = (seat) => ({
  type: SELECT_SEAT,
  payload: seat,
});

//deselect seat
export const deselectSeat = () => ({
  type: DESELECT_SEAT,
});
