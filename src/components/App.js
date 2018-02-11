import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Login from '../containers/Login/Login';
import MainScreen from '../components/Main/MainScreen';
import IntroScreen from '../components/Intro/IntroScreen';
import Profile from '../components/Profile/ProfileScreen';

export default class extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={IntroScreen} />
            <Route path="/login" component={Login} />
            <Route path="/main" component={MainScreen} />
            <Route path="/profile" component={Profile} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
