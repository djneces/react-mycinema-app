import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import LandingPage from './containers/LandingPage/LandingPage';
import SelectMoviePage from './containers/SelectMoviePage/SelectMoviePage';
import SelectShowTimePage from './containers/SelectShowTimePage/SelectShowTimePage';
import ShowMovieDetailsPage from './containers/ShowMovieDetailsPage/ShowMovieDetailsPage';
import './App.scss';

//Redux
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
          <Header />
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/movies' component={SelectMoviePage} />
            <Route exact path='/times' component={SelectShowTimePage} />
            <Route
              exact
              path='/movies/:movie'
              component={ShowMovieDetailsPage}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
