import _ from 'lodash';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchAllMovies } from '../../store/actions/movies';
import MoviesList from '../../components/MoviesList/MoviesList';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
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
    const { fetchedMovies } = this.props;
    return (
      <div className='SelectMoviePage'>
        <div className='SelectMoviePage__movieSelect'>
          {this.props.fetchedMovies && !_.isEmpty(fetchedMovies) ? (
            <MoviesList />
          ) : (
            <div>Loading</div>
          )}
          <OrderSummary />
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
});
export default connect(mapStateToProps, { fetchAllMovies })(SelectMoviePage);
