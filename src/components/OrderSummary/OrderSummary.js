import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomBtnFull from '../CustomBtnFull/CustomBtnFull';
import SpinnerDots from '../SpinnerDots/SpinnerDots';
import { DB } from '../../assets/moviesSeed';
import { createOrder } from '../../store/actions/purchase';
import './OrderSummary.scss';
import { setAlert } from '../../store/actions/alert';

const OrderSummary = ({
  selectedMovie,
  selectedSeats,
  fetchedMovies,
  selectedMovieTime,
  history,
  location,
  userId,
  createOrder,
  orderIsLoading,
  isAuthenticated,
  setAlert,
}) => {
  const { movies } = DB;

  const movieHall = movies.find((movie) => {
    if (!selectedMovie) {
      return null;
    }
    return movie.title === fetchedMovies[selectedMovie].title;
  });

  const onClick = () => {
    if (location.pathname === '/movies') history.push('/times');
    if (location.pathname === '/times') history.push('/seats');
    //after selecting seats on /seats page, btn send and order to the DB
    if (location.pathname === '/seats' && isAuthenticated) {
      const ticketOrder = { selectedMovie, selectedMovieTime, selectedSeats };
      createOrder(ticketOrder, userId, history);
    }
    // else {
    //   setAlert('Please, login first', 'danger');
    // }
  };

  const renderDisabledBtn = () => {
    let disabled;
    if (location.pathname === '/movies') {
      disabled = !selectedMovie;
    }
    if (location.pathname === '/times') {
      disabled = !selectedMovieTime;
    }
    if (location.pathname === '/seats') {
      if (isAuthenticated === false) {
        disabled = true;
      } else {
        disabled = selectedSeats && selectedSeats.length === 0;
      }
    }
    return disabled;
  };

  return (
    <div className='OrderSummary'>
      <div className='OrderSummary__review'>
        {selectedMovie ? (
          <>
            <div className='OrderSummary__review-details'>
              <div className='OrderSummary__review-details--title'>
                <span>Movie:</span>
                <br></br>
                <span>
                  {selectedMovie
                    ? fetchedMovies[selectedMovie].title
                    : 'Please, select a movie'}
                </span>
              </div>
              {/* shows date & time only on times and seats page */}
              {location.pathname === '/times' ||
              location.pathname === '/seats' ? (
                <div className='OrderSummary__review-details--date'>
                  Date & Time:
                  <br></br>
                  {selectedMovieTime ? (
                    <span>{selectedMovieTime}</span>
                  ) : (
                    <span style={{ color: 'grey' }}>Please, select time</span>
                  )}
                </div>
              ) : null}
              {location.pathname === '/seats' &&
                selectedSeats &&
                selectedSeats.length > 0 && (
                  <div className='OrderSummary__review-details--seats'>
                    Number of seats:
                    <br></br>
                    <span>
                      {selectedSeats &&
                        selectedSeats.length > 0 &&
                        selectedSeats.length}{' '}
                      / Hall: {movieHall.hall}
                    </span>
                  </div>
                )}
            </div>
            <div className='OrderSummary__review-poster'>
              {selectedMovie && (
                <img
                  src={fetchedMovies[selectedMovie].posterUrl}
                  alt={fetchedMovies[selectedMovie].title}
                />
              )}
            </div>
          </>
        ) : (
          <h2>Please, select a movie</h2>
        )}
      </div>
      <div className='OrderSummary__btn'>
        <CustomBtnFull onclick={onClick} disabled={renderDisabledBtn()}>
          <span>
            Continue
            {location.pathname === '/seats' && isAuthenticated === false ? (
              <span>Please, login first</span>
            ) : (
              ''
            )}
          </span>{' '}
          {orderIsLoading && <SpinnerDots />}
        </CustomBtnFull>
      </div>
    </div>
  );
};

const mapStateToProps = ({ movies, seats, auth, orders }) => ({
  fetchedMovies: movies.fetchedMovies,
  selectedMovie: movies.selectedMovie,
  selectedMovieTime: movies.selectedMovieTime,
  selectedSeats: seats.selectedSeats,
  userId: auth.currentUser?.id,
  isAuthenticated: auth.isAuthenticated,
  orderIsLoading: orders.loading,
});

export default withRouter(
  connect(mapStateToProps, { createOrder, setAlert })(OrderSummary)
);
