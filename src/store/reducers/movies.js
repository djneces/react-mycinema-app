import {
  FETCH_MOVIES,
  SELECT_MOVIE,
  DESELECT_MOVIE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  fetchedMovies: {},
  selectedMovie: null,
};

const moviesReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_MOVIES:
      return {
        ...state,
        fetchedMovies: { ...state.movies, ...payload },
      };
    case SELECT_MOVIE:
      return {
        ...state,
        selectedMovie: payload,
      };
    case DESELECT_MOVIE:
      return {
        ...state,
        selectedMovie: null,
      };
    default:
      return state;
  }
};

export default moviesReducer;
