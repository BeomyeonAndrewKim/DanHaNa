import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from '../ducks/index';
import Login from '../containers/Login/Login';
import MainScreen from '../components/Main/MainScreen';
import IntroScreen from '../components/Intro/IntroScreen';

const store = createStore(reducers);
export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={IntroScreen} />
            <Route path="/login" component={Login} />
            <Route path="/main" component={MainScreen} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
