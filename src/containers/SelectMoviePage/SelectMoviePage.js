import _ from 'lodash';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchAllMovies } from '../../store/actions/movies';
import MoviesList from '../../components/MoviesList/MoviesList';
import ScrollDownArrow from '../../components/ScrollDownArrow/ScrollDownArrow';
import { DB } from '../../assets/moviesSeed';
import './SelectMoviePage.scss';

class SelectMoviePage extends Component {
  componentDidMount() {
    const { movies } = DB;
    if (_.isEmpty(this.props.fetchedMovies)) {
      this.props.fetchAllMovies(movies);
    }
  }
  render() {
    const { selectedMovie, fetchedMovies } = this.props;
    return (
      <div className='SelectMoviePage'>
        <div className='SelectMoviePage__movieSelect'>
          {this.props.fetchedMovies && !_.isEmpty(fetchedMovies) ? (
            <MoviesList />
          ) : (
            <div>Loading</div>
          )}
          <div className='SelectMoviePage__movieSelect-summary'>
            {selectedMovie ? (
              <>
                <div className='SelectMoviePage__movieSelect-summary-details'>
                  <div>
                    <span>Movie:</span>
                    <br></br>
                    <span>
                      {selectedMovie
                        ? fetchedMovies[selectedMovie].title
                        : 'Please, select a movie'}
                    </span>
                  </div>
                  <div>Date:</div>
                  <div>Time:</div>
                </div>
                <div className='SelectMoviePage__movieSelect-summary-poster'>
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
        </div>
        <div className='SelectMoviePage__scrollIcon'>
          {/* scroll icon only when movies > 6 */}
          {Object.keys(fetchedMovies).length > 6 && <ScrollDownArrow />}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ movies }) => ({
  fetchedMovies: movies?.fetchedMovies,
  selectedMovie: movies?.selectedMovie,
});
export default connect(mapStateToProps, { fetchAllMovies })(SelectMoviePage);
