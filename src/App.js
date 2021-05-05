import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
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
            {/* <Route exact path='/login' component={SignInPage} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
