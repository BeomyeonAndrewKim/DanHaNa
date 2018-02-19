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
    try {
      await firebase.auth().signInWithPopup(provider);
      await this.SubmitProfileInfo();
      this.setState({
        loading: false,
        redirectToMain: true,
      });
      window.localStorage.setItem('introdone', true);
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false,
      });
    }
  };
  handleFacebookLogin = async () => {
    this.handleLoginClick();
    const provider = new firebase.auth.FacebookAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      await this.SubmitProfileInfo();
      this.setState({
        loading: false,
        redirectToMain: true,
      });
      window.localStorage.setItem('introdone', true);
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false,
      });
    }
  };
  SubmitProfileInfo = async () => {
    const user = firebase.auth();
    const {
      displayName,
      photoURL,
      providerId,
      uid,
    } = user.currentUser.providerData[0];
    await firebase
      .database()
      .ref(`users/${uid}`)
      .set({
        profileInfo: {
          displayName,
          photoURL,
          providerId,
        },
      });
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
