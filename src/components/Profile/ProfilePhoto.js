import React, { Component } from 'react';
import { Button, Avatar } from 'antd';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

export default class ProfilePhoto extends Component {
  static defaultProps = {
    loading: '',
    onUploadFile: () => {},
    profileInfo: {},
  };
  render() {
    // console.log(this.props);
    const { loading, onUploadFile, profileInfo } = this.props;
    return (
      <div className="profile__photo__wrap">
        <div className="profile__photo__picture">
          {loading ? (
            <LoadingIndicator />
          ) : profileInfo ? (
            <div className="profile__photo__picture__wrap">
              <img
                className="profile__photo__picture__img"
                alt="프로필 사진"
                src={profileInfo.photoURL}
              />
            </div>
          ) : (
            <Avatar size="large" icon="user" />
          )}
        </div>
        <Button size="large" className="profile__photo__upload__button">
          프로필 변경
          <input
            type="file"
            onChange={onUploadFile}
            accept=".jpg, .jpeg, .png"
            className="profile__photo__upload__input"
          />
        </Button>
      </div>
    );
  }
}
