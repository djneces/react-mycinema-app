import { combineReducers } from 'redux';
import authReducer from './auth';
import moviesReducer from './movies';

export default combineReducers({
  auth: authReducer,
  movies: moviesReducer,
});
