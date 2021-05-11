import axios from '../../axios-movies';
import { FETCH_MOVIES, SELECT_MOVIE, DESELECT_MOVIE } from './actionTypes';

//start authorization
export const fetchAllMovies = (movies) => async (dispatch) => {
  const urls = movies.map(
    ({ movieId }) => `movie/${movieId}?api_key=5afa2c6f5b404f95b7e3afd73ee8b168`
  );

  Promise.all(
    urls.map((url) => {
      return axios
        .get(url)
        .then((response) => {
          let movieCollection = {};
          const {
            id,
            title,
            original_language,
            runtime,
            release_date,
            genres,
            homepage,
            vote_average,
            overview,
            backdrop_path,
            poster_path,
          } = response.data;

          const movie = {
            id,
            title,
            overview,
            genres,
            runtime,
            release_date,
            original_language,
            homepage,
            vote_average,
            posterUrl: `https://image.tmdb.org/t/p/original${poster_path}`,
            backdropUrl: `https://image.tmdb.org/t/p/original${backdrop_path}`,
          };
          movieCollection = { ...movieCollection, [id]: movie };
          //Promise.all returns []
          return movieCollection;
        })
        .catch((err) => {
          console.error(err);
        });
    })
  ).then((movieCollection) => {
    let fetchedMovies = {};
    //transform array from Promise.all to object (keys are movieIds)
    movieCollection.map(
      (movie) => (fetchedMovies = Object.assign(fetchedMovies, movie))
    );
    dispatch({
      type: FETCH_MOVIES,
      payload: fetchedMovies,
    });
  });
};

//select movie
export const selectMovie = (movie) => ({
  type: SELECT_MOVIE,
  payload: movie,
});

//deselect movie
export const deselectMovie = () => ({
  type: DESELECT_MOVIE,
});
