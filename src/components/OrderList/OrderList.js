import React from 'react';
import { connect } from 'react-redux';

import OrderListItem from './OrderListItem/OrderListItem';
import './OrderList.scss';

const OrderList = ({ orderHistory }) => {
  const orders = orderHistory.map((item, i) => {
    const {
      selectedMovie,
      selectedMovieTime,
      selectedSeats,
      ticketId,
      createdAt,
      movieOnSelectHall,
      addOns,
    } = item;

    return (
      <OrderListItem
        key={i}
        selectedMovie={selectedMovie}
        selectedMovieTime={selectedMovieTime}
        selectedSeats={selectedSeats}
        ticketId={ticketId}
        createdAt={createdAt}
        movieOnSelectHall={movieOnSelectHall}
        addOns={addOns}
      />
    );
  });

  return <div className='OrderList'>{orders}</div>;
};
const mapStateToProps = ({ orderHistory }) => ({
  orderHistory: orderHistory.orderHistory,
});

export default connect(mapStateToProps)(OrderList);
