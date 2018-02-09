import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import LoginScreen from '../../components/Login/LoginScreen';

export default class LoginScreenContainer extends Component {
  state = {
    loading: false,
    redirectToMain: false,
  };
  handleLoginClick = () => {
    this.setState({
      loading: true,
    });
  };
  handleGoogleLogin = async () => {
    this.handleLoginClick();
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      loading: false,
      redirectToMain: true,
    });
    window.localStorage.setItem('introdone', true);
  };
  handleFacebookLogin = async () => {
    this.handleLoginClick();
    const provider = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.setState({
      loading: false,
      redirectToMain: true,
    });
    window.localStorage.setItem('introdone', true);
  };

  render() {
    if (this.state.redirectToMain) {
      return <Redirect to="/main" />;
    }
    return (
      <LoginScreen
        onLoading={this.state.loading}
        onGoogleLogin={this.handleGoogleLogin}
        onFacebookLogin={this.handleFacebookLogin}
      />
    );
  }
}
