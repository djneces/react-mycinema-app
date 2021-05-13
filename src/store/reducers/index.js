import { combineReducers } from 'redux';
import authReducer from './auth';
import moviesReducer from './movies';
import seatsReducer from './seats';
import purchaseReducer from './purchase';
import alertReducer from './alert';
import toggleMenuReducer from './accountDetailsMenu';

export default combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  seats: seatsReducer,
  orders: purchaseReducer,
  alerts: alertReducer,
  toggleMenu: toggleMenuReducer,
});
