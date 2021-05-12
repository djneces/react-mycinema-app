import { SELECT_SEAT, DESELECT_SEAT } from '../actions/actionTypes';

const INITIAL_STATE = {
  selectedSeat: null,
};

const seatsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SELECT_SEAT:
      return {
        ...state,
        selectedSeat: payload,
      };
    case DESELECT_SEAT:
      return {
        ...state,
        selectedSeat: null,
      };
    default:
      return state;
  }
};

export default seatsReducer;
