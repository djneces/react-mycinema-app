import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomBtnFull from '../CustomBtnFull/CustomBtnFull';
import './OrderSummary.scss';

const OrderSummary = ({
  selectedMovie,
  fetchedMovies,
  selectedMovieTime,
  history,
}) => {
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
              <div className='OrderSummary__review-details--date'>
                Date & Time:
                <br></br>
                {selectedMovieTime ? (
                  <span>{selectedMovieTime}</span>
                ) : (
                  <span style={{ color: 'grey' }}>Please, select time</span>
                )}
              </div>
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
        <CustomBtnFull onclick={() => history.push('/times')}>
          Continue
        </CustomBtnFull>
      </div>
    </div>
  );
};

const mapStateToProps = ({ movies }) => ({
  fetchedMovies: movies.fetchedMovies,
  selectedMovie: movies.selectedMovie,
  selectedMovieTime: movies.selectedMovieTime,
});

export default withRouter(connect(mapStateToProps)(OrderSummary));
