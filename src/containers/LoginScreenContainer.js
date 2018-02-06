import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase';

import LoginScreen from '../components/LoginScreen';

export default class LoginScreenContainer extends Component {
  state = {
    redirectToList: false,
  };
  handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      redirectToList: true,
    });
  };
  handleFacebookLogin = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      redirectToList: true,
    });
  };

  render() {
    if (this.state.redirectToList) {
      return <Redirect to="/main" />;
    }
    return (
      <LoginScreen
        onGoogleLogin={this.handleGoogleLogin}
        onFacebookLogin={this.handleFacebookLogin}
      />
    );
  }
}
