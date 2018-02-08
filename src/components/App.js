import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Login from '../containers/Login/Login';
import LoginScreenContainer from '../containers/Login/LoginScreenContainer';

import MainScreen from '../components/Main/MainScreen';
import IntroScreen from '../components/IntroScreen';
import withAuth from '../hocs/withAuth';

export default class extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={IntroScreen} />
            <Route path="/login" component={withAuth(LoginScreenContainer)} />
            <Route path="/main" component={MainScreen} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
// 질문 1. 고차컴포넌트를 render에서 사용할 수 없기때문에 LoginScreenContainer.js에서 바로 withAuth를 사용할 수 없었다?
// 질문 2. withAuth.js에서 unsubscribe를 사용한 이유를 한번 더 듣고싶다.
