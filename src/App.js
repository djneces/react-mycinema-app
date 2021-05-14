import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/Header/Header';
import LandingPage from './containers/LandingPage/LandingPage';
import SelectMoviePage from './containers/SelectMoviePage/SelectMoviePage';
import SelectShowTimePage from './containers/SelectShowTimePage/SelectShowTimePage';
import ShowMovieDetailsPage from './containers/ShowMovieDetailsPage/ShowMovieDetailsPage';
import SelectSeatPage from './containers/SelectSeatPage/SelectSeatPage';
import OrderHistoryPage from './containers/OrderHistoryPage/OrderHistoryPage';
import Alert from './components/Alert/Alert';
import './App.scss';

const App = ({ selectedMovie }) => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Alert />
        <Header />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/movies' component={SelectMoviePage} />
          <Route exact path='/movies/:movie' component={ShowMovieDetailsPage} />
          {/* render times and seats only when a movie selected */}
          <Route
            exact
            path='/times'
            render={() =>
              selectedMovie ? <SelectShowTimePage /> : <Redirect to='/movies' />
            }
          />
          <Route
            exact
            path='/seats'
            render={() =>
              selectedMovie ? <SelectSeatPage /> : <Redirect to='/movies' />
            }
          />
          <Route exact path='/orders' component={OrderHistoryPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = ({ movies }) => ({
  selectedMovie: movies.selectedMovie,
});

export default connect(mapStateToProps)(App);
