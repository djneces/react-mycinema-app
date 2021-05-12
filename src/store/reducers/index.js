import { combineReducers } from 'redux';
import authReducer from './auth';
import moviesReducer from './movies';
import seatsReducer from './seats';

export default combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  seats: seatsReducer,
});
