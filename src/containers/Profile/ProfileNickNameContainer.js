import React, { Component } from 'react';
import * as firebase from 'firebase';

import ProfileNickName from '../../components/Profile/ProfileNickName';

export default class ProfileNickNameContainer extends Component {
  state = {
    nickName: '',
    newNickName: '',
  };
  componentWillMount() {
    // 파이어베이스에 닉네임이 있다면 받아오기
    this.onLoadProfileNickName();
  }
  onLoadProfileNickName = async () => {
    const snapshot = await firebase
      .database()
      .ref(`user/nickName`)
      .once('value');
    const repo = snapshot.val();
    console.dir(repo);
    const [repos] = Object.values(repo);
    console.dir(repos);
    if (repos) {
      this.setState({
        nickName: repos,
      });
    }
  };
  handleNickNameChange = e => {
    /* 정규표현식
    const str = '가나다abc123';
    const pattern = /^[a-zA-Zㄱ-힣0-9]*$/;

    if (str.match(pattern).length > 0) {
      // 패턴이 일치함, 코드는 여기
    } else {
      // 패턴이 일치하지 않음
    }
    */
    const newNickName = e.target.value;

    this.setState({
      newNickName,
    });
  };

  handleNickNameEditSave = async () => {
    await firebase
      .database()
      .ref(`user/nickName`)
      .set({
        nickName: this.state.newNickName,
      });
    this.onLoadProfileNickName();
  };
  refreshNickName = () => {};
  render() {
    return (
      <div>
        <ProfileNickName
          {...this.state}
          handleNickNameChange={this.handleNickNameChange}
          handleNickNameEditSave={this.handleNickNameEditSave}
          refreshNickName={this.refreshNickName}
        />
      </div>
    );
  }
}
