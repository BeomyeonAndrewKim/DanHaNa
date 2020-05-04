import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';

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
    if (fileSize > 3145728) {
      Modal.error({
        title: '3MB를 초과하였습니다.',
        content: `현재 파일의 크기는 ${(fileSize / 1048576).toFixed(
          1,
        )}MB 입니다.`,
      });
      return false;
    }
    return this.fileInputFBStorage(file);
  };

  fileInputFBStorage = async file => {
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
