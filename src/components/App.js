import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from '../ducks/index';
import LoginScreenContainer from '../containers/Login/LoginScreenContainer';
import IntroScreen from '../components/Intro/IntroScreen';
import Profile from '../components/Profile/ProfileScreen';
import MainScreenContainer from '../containers/Main/MainScreenContainer';
import withAuth from '../hocs/withAuth';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={IntroScreen} />
            <Route path="/login" component={LoginScreenContainer} />
            <Route path="/profile" component={withAuth(Profile)} />
            <Route path="/main" component={withAuth(MainScreenContainer)} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
