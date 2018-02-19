import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from '../ducks/index';
import Login from '../containers/Login/Login';
import IntroScreen from '../components/Intro/IntroScreen';
import Profile from '../components/Profile/ProfileScreen';
import MainScreenContainer from '../containers/Main/MainScreenContainer';

const store = createStore(reducers, applyMiddleware(thunk));
export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={IntroScreen} />
            <Route path="/login" component={Login} />
            <Route path="/main" component={MainScreen} />
            <Route path="/profile" component={Profile} />
            <Route path="/main" component={MainScreenContainer} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
