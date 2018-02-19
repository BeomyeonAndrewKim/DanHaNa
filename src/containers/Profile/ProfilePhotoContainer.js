import React, { Component } from 'react';

import * as firebase from 'firebase';
import ProfilePhoto from '../../components/Profile/ProfilePhoto';

export default class ProfilePhotoContainer extends Component {
  state = {
    fileUrl: '',
    loading: true,
  };
  componentWillMount() {
    this.onLoadProfileImgUrl();
  }

  onLoadProfileImgUrl = async () => {
    const snapshot = await firebase
      .database()
      .ref(`user/profileImg/`)
      .once('value');
    const repo = snapshot.val();
    if (repo) {
      const [repos] = Object.values(repo);
      this.setState({
        fileUrl: repos,
        loading: false,
      });
    } else {
      this.setState({
        fileUrl: repo,
        loading: false,
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
    this.setState({
      loading: true,
    });
    const snapshot = await firebase
      .storage()
      .ref(`/profileImg/`)
      .put(file);
    // firebase database에 다운로드 Url 저장
    await firebase
      .database()
      .ref(`user/profileImg/`)
      .set({
        downloadUrl: snapshot.downloadURL,
      });
    this.refreshProfileImg();
  };

  refreshProfileImg = async () => {
    const snapshot = await firebase
      .database()
      .ref(`user/profileImg`)
      .once('value');

    const repo = snapshot.val();
    const [repos] = Object.values(repo);
    console.log(repos);
    if (repos) {
      console.log(repos);
      this.setState({
        fileUrl: repos,
        loading: false,
      });
    }
  };
  render() {
    return (
      <div>
        <ProfilePhoto {...this.state} onUploadFile={this.onUploadFile} />
      </div>
    );
  }
}
