import {
  FETCH_MOVIES,
  SELECT_MOVIE,
  DESELECT_MOVIE,
  YOUTUBE_SEARCH_MOVIE,
  SELECT_MOVIE_TIME,
  DESELECT_MOVIE_TIME,
  CLEAR_MOVIES,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  fetchedMovies: {},
  selectedMovie: null,
  selectedMovieTime: null,
  youtubeId: null,
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
    case SELECT_MOVIE_TIME:
      return {
        ...state,
        selectedMovieTime: payload,
      };
    case DESELECT_MOVIE_TIME:
      return {
        ...state,
        selectedMovieTime: null,
      };
    case YOUTUBE_SEARCH_MOVIE:
      return {
        ...state,
        youtubeId: payload,
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        selectedMovie: null,
        selectedMovieTime: null,
        youtubeId: null,
      };
    default:
      return state;
  }
};

export default moviesReducer;
