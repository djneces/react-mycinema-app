import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomBtnFull from '../CustomBtnFull/CustomBtnFull';
import { DB } from '../../assets/moviesSeed';
import './OrderSummary.scss';

const OrderSummary = ({
  selectedMovie,
  selectedSeat,
  fetchedMovies,
  selectedMovieTime,
  history,
  location,
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
              {location.pathname === '/seats' && selectedSeat && (
                <div className='OrderSummary__review-details--seats'>
                  Seats:
                  <br></br>
                  <span>
                    Seat: {selectedSeat && selectedSeat.seat} Row:{' '}
                    {selectedSeat && selectedSeat.row} / Hall: {movieHall.hall}
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
        <CustomBtnFull onclick={onClick}>Continue</CustomBtnFull>
      </div>
    </div>
  );
};

const mapStateToProps = ({ movies, seats }) => ({
  fetchedMovies: movies.fetchedMovies,
  selectedMovie: movies.selectedMovie,
  selectedMovieTime: movies.selectedMovieTime,
  selectedSeat: seats.selectedSeat,
});

export default withRouter(connect(mapStateToProps)(OrderSummary));
