import axios from '../../axios-orders';

import { setAlert } from './alert';
import { clearMovie } from './movies';
import { clearSeats } from './seats';
import { clearAllAddOns } from './addons';
import { fetchOrderHistory } from './orderHistory';

import {
  PURCHASE_START,
  PURCHASE_SUCCESS,
  PURCHASE_FAIL,
  CLEAR_ALL_PURCHASES,
} from './actionTypes';

//purchase start
export const purchaseStart = () => {
  return {
    type: PURCHASE_START,
  };
};

//purchase success
export const purchaseSuccess = (orderId, orderData) => {
  return {
    type: PURCHASE_SUCCESS,
    payload: { id: orderId, orderedTickets: orderData },
  };
};

//purchase fail
export const purchaseFail = (error) => {
  return {
    type: PURCHASE_FAIL,
    error: error,
  };
};

//clear all purchases
export const clearAllPurchases = () => {
  return {
    type: CLEAR_ALL_PURCHASES,
  };
};

//create order
export const createOrder = (orderDetails, userId, history) => (dispatch) => {
  dispatch(purchaseStart());
  axios
    .post(`/users/${userId}/orders/.json`, orderDetails)
    .then((response) => {
      if (response.status === 200) {
        //time needed for spinner animation to play
        setTimeout(() => {
          dispatch(purchaseSuccess(response.data.name, orderDetails));
          history.push('/');
          dispatch(clearMovie());
          dispatch(clearSeats());
          dispatch(clearAllAddOns());
        }, 2000);
        //delayed notification after successful purchase
        setTimeout(() => {
          dispatch(
            setAlert(
              `Ticket${
                orderDetails.selectedSeats.length > 1 ? 's' : ''
              } has been booked, enjoy!`,
              'purchased',
              5000
            )
          );
        }, 3000);
        dispatch(fetchOrderHistory(userId));
      } else {
        dispatch(purchaseFail(response.statusText));
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch(purchaseFail(err));
      dispatch(setAlert('Something went wrong, please try again', 'danger'));
    });
};
