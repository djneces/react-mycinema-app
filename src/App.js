import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import LandingPage from './containers/LandingPage/LandingPage';
import './App.scss';

//Redux
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
          <Header />
          <Switch>
            <Route exact path='/' component={LandingPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
