import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import LoginScreenContainer from '../containers/LoginScreenContainer';
import MainScreen from '../components/MainScreen';
import IntroScreen from '../components/IntroScreen';

export default class extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={IntroScreen} />
            <Route path="/login" component={LoginScreenContainer} />
            <Route path="/main" component={MainScreen} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
