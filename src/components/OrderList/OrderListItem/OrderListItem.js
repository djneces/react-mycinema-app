import _ from 'lodash';
import React from 'react';
import moment from 'moment';

import { connect } from 'react-redux';

import './OrderListItem.scss';

const OrderListItem = ({
  selectedMovie,
  selectedMovieTime,
  selectedSeats,
  fetchedMovies,
  ticketId,
  createdAt,
  movieOnSelectHall,
}) => {
  const renderMultipleTickets = () => {
    return selectedSeats.map((ticket, i) => {
      return (
        <div className='OrderListItem' key={i}>
          <div className='OrderListItem__createdAt'>
            <span>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
            <span>{moment(createdAt).startOf().fromNow()}</span>
          </div>
          <div className='OrderListItem__leftSide'>
            <div className='OrderListItem__leftSide-title'>
              {fetchedMovies[selectedMovie].title}
            </div>
            <div className='OrderListItem__leftSide-time'>
              {selectedMovieTime}
            </div>
            <div className='OrderListItem__leftSide-footer'>
              <div className='OrderListItem__leftSide-footer-seat'>
                <div>
                  <span>HALL</span>
                  <span>{movieOnSelectHall}</span>
                </div>
                <div>
                  <span>ROW</span>
                  <span>{ticket.row}</span>
                </div>
                <div>
                  <span>SEAT</span>
                  <span>{ticket.seat}</span>
                </div>
              </div>
              <div className='OrderListItem__leftSide-footer-id'>
                {ticketId}
              </div>
            </div>
          </div>
          <div className='OrderListItem__rightSide'>
            <div className='OrderListItem__rightSide-title'>
              {fetchedMovies[selectedMovie].title}
            </div>
            <div className='OrderListItem__rightSide-time'>
              {selectedMovieTime}
            </div>
            <div className='OrderListItem__rightSide-footer'>
              <div className='OrderListItem__rightSide-footer-seat'>
                <div>
                  <span>HALL</span>
                  <span>{movieOnSelectHall}</span>
                </div>
                <div>
                  <span>ROW</span>
                  <span>{ticket.row}</span>
                </div>
                <div>
                  <span>SEAT</span>
                  <span>{ticket.seat}</span>
                </div>
              </div>
              <div className='OrderListItem__rightSide-footer-price'>
                <span>$</span> 15
              </div>
            </div>
          </div>
          <div className='OrderListItem__divider'></div>
        </div>
      );
    });
  };

  const renderListItem = () => {
    if (_.isEmpty(fetchedMovies)) {
      return <div>Loading</div>;
    } else {
      return renderMultipleTickets();
    }
  };

  return renderListItem();
};

const mapStateToProps = ({ movies }) => ({
  fetchedMovies: movies.fetchedMovies,
});

export default connect(mapStateToProps)(OrderListItem);
