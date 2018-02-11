import React, { Component } from 'react';
import * as firebase from 'firebase';
import MenuProfile from '../../components/Menu/MenuProfile';

export default class MenuProfileContainer extends Component {
  state = {
    nickName: '',
    photoUrl: '',
  };
  async componentWillMount() {
    const uid = 'user1';
    const snapshot = await firebase
      .database()
      .ref(`users/${uid}`)
      .once('value');
    const profileObj = snapshot.val();
    this.setState(profileObj);
  }
  render() {
    const { ...rest } = this.state;
    return <MenuProfile {...rest} />;
  }
}
