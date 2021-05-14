import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomBtnFull from '../CustomBtnFull/CustomBtnFull';
import SpinnerDots from '../SpinnerDots/SpinnerDots';
import { v4 as uuidv4 } from 'uuid';
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
}) => {
  const { movies } = DB;

  //matching selected movie title with fetched movies {}
  const movieOnSelect = movies.find((movie) => {
    if (!selectedMovie) {
      return null;
    }
    return movie.title === fetchedMovies[selectedMovie].title;
  });
  //getting hall # of selected movie
  const movieOnSelectHall = movieOnSelect && movieOnSelect.hall;

  const onClick = () => {
    if (location.pathname === '/movies') history.push('/times');
    if (location.pathname === '/times') history.push('/seats');
    //after selecting seats on /seats page, btn send and order to the DB
    if (location.pathname === '/seats' && isAuthenticated) {
      const ticketId = uuidv4().toString().slice(0, 5);
      const createdAt = new Date();
      const ticketOrder = {
        selectedMovie,
        selectedMovieTime,
        selectedSeats,
        ticketId,
        createdAt,
        movieOnSelectHall,
      };
      createOrder(ticketOrder, userId, history);
    }
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
                      / Hall: {movieOnSelectHall}
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
  connect(mapStateToProps, { createOrder })(OrderSummary)
);
