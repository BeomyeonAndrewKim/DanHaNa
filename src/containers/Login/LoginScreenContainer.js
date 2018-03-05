import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import LoginScreen from '../../components/Login/LoginScreen';

export default class LoginScreenContainer extends Component {
  state = {
    loading: false,
    redirectToMain: false,
  };
  componentWillMount() {
    console.log();
  }
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
      await this.submitProfileInfo();
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
      await this.submitProfileInfo();
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
  checkExistUser = async () => {
    firebase.database().ref(`users/`);
  };
  submitProfileInfo = async () => {
    const user = firebase.auth().currentUser;

    // currentUser에 있는 정보를 사용함
    const { displayName, photoURL, uid } = user;
    // 제공업체 정보는 providerDat에 있어서 따로 지정함
    const { providerId } = user.providerData[0];
    const snapshot = await firebase
      .database()
      .ref(`users/${uid}/profileInfo`)
      .once('value');
    const profileInfo = snapshot.val();
    if (!profileInfo) {
      await firebase
        .database()
        .ref(`users/${uid}`)
        .update({
          profileInfo: {
            nickName: displayName,
            photoURL,
            providerId,
            uid,
          },
        });
    }
  };
  render() {
    window.prerenderReady = true;
    if (window.localStorage.getItem('introdone') || this.state.redirectToMain) {
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
