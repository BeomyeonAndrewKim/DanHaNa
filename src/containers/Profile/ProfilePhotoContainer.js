import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as firebase from 'firebase';
import ProfilePhoto from '../../components/Profile/ProfilePhoto';
import { fetchProfileInfo } from '../../ducks/profile';

class ProfilePhotoContainer extends Component {
  static defaultProps = {
    onMount: () => {},
    profileInfo: {},
    loading: '',
  };
  componentWillMount() {
    this.props.onMount();
  }

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
      alert(
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

    const { profileInfo } = this.props;
    const { uid } = profileInfo;

    // firebase storage에 이미지 정보 저장
    const snapshot = await firebase
      .storage()
      .ref(`users/${uid}/photoURL/`)
      .put(file);

    // firebase database에 다운로드 Url 저장
    await firebase
      .database()
      .ref(`users/${uid}/profileInfo`)
      .update({
        photoURL: snapshot.downloadURL,
      });
    this.props.onMount();
  };

  render() {
    return (
      <div>
        <ProfilePhoto {...this.props} onUploadFile={this.onUploadFile} />
      </div>
    );
  }
}
export default connect(
  // mapStateToProps
  state => ({
    loading: state.profile.loading,
    profileInfo: state.profile.profileInfo,
  }),
  // mapDispatchToprops
  dispatch => ({
    onMount: () => {
      dispatch(fetchProfileInfo());
    },
  }),
)(ProfilePhotoContainer);
