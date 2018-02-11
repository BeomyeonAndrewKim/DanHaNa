import React, { Component } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import * as firebase from 'firebase';

import './ProfilePhoto.css';

const ProfilePhotoWrap = styled.div`
  padding: 30px 0;
`;

export default class ProfilePhoto extends Component {
  state = {
    fileURL: '',
  };
  componentWillMount() {
    this.onLoadProfileIMGURL();
  }

  onLoadProfileIMGURL = async () => {
    const snapshot = await firebase
      .database()
      .ref(`user/profileIMG/`)
      .once('value');
    const repo = snapshot.val();
    if (repo) {
      this.setState({
        fileURL: Object.values(snapshot.val()),
      });
    }
  };
  onUploadFile = e => {
    const file = e.target.files[0];
    this.returnFileSize(file, file.size);
  };
  // 파일 사이즈 측정하기
  returnFileSize = (file, fileSize) => {
    if (fileSize < 1024) {
      console.log(`${fileSize}bytes`);
    } else if (fileSize > 1024 && fileSize < 1048576) {
      console.log(`${(fileSize / 1024).toFixed(1)}KB`);
    } else if (fileSize > 1048576 && fileSize < 3145728) {
      console.log(`${(fileSize / 1048576).toFixed(1)}MB`);
    } else if (fileSize > 3145728) {
      console.log(
        `3MB를 초과하였습니다. 현재 파일의 크기는 ${(
          fileSize / 1048576
        ).toFixed(1)}MB 입니다.`,
      );
      return false;
    }
    return this.fileInputFBStorage(file);
  };

  fileInputFBStorage = async file => {
    console.log('이 콘솔이 보이면 파이어베이스 저장소에 파일 업로드가 됩니다!');
    // firebase storage에 이미지 정보 저장
    const snapshot = await firebase
      .storage()
      .ref(`/profileIMG/IMG`)
      .put(file);
    // firebase database에 다운로드 URL 저장
    await firebase
      .database()
      .ref(`user/profileIMG/`)
      .set({
        downloadURL: snapshot.downloadURL,
      });

    this.refreshProfileIMG();
  };

  refreshProfileIMG = async () => {
    const snapshot = await firebase
      .database()
      .ref(`user/profileIMG`)
      .once('value');
    this.setState({
      fileURL: Object.values(snapshot.val()),
    });
  };

  render() {
    return (
      <ProfilePhotoWrap>
        <figure>
          <div className="profilePhoto">
            {this.state.fileURL ? (
              <img
                style={{ width: '200px' }}
                src={this.state.fileURL}
                alt="profile"
              />
            ) : (
              <Avatar size="large" icon="user" />
            )}
            <input
              type="file"
              onChange={this.onUploadFile}
              accept=".jpg, .jpeg, .png"
              className="fileUploadBTN"
            />
          </div>
          <figcaption>별명</figcaption>
        </figure>
      </ProfilePhotoWrap>
    );
  }
}
