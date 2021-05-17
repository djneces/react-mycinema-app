import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//use local storage (session storage is another folder)
import storage from 'redux-persist/lib/storage';

import authReducer from './auth';
import moviesReducer from './movies';
import seatsReducer from './seats';
import purchaseReducer from './purchase';
import alertReducer from './alert';
import toggleMenuReducer from './accountDetailsMenu';
import orderHistoryReducer from './orderHistory';
import addonsReducer from './addons';

const persistConfig = {
  key: 'root',
  storage,
  //reducers we need to persist
  whitelist: ['auth', 'movies', 'seats', 'addOns'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  seats: seatsReducer,
  orders: purchaseReducer,
  alerts: alertReducer,
  toggleMenu: toggleMenuReducer,
  orderHistory: orderHistoryReducer,
  addOns: addonsReducer,
});

export default persistReducer(persistConfig, rootReducer);
