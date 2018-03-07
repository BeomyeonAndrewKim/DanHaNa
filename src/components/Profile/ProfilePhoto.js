import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Avatar } from 'antd';

import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import './ProfilePhoto.css';

const ProfilePhotoWrap = styled.div`
  padding: 30px 0;
`;
const ProfilePhotoButton = styled(Button)`
  background-color: #3d4144;
  border: 1px solid #0b1229;
  &:hover {
    background: #e8945f;
    border: 1px solid #0b1229;
  }
`;

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
      <ProfilePhotoWrap>
        <div className="profilePhoto">
          {loading ? (
            <LoadingIndicator />
          ) : profileInfo ? (
            <div>
              <img
                className="profileImg"
                alt="프로필 사진"
                src={profileInfo.photoURL}
              />
            </div>
          ) : (
            <Avatar size="large" icon="user" />
          )}
        </div>
        <ProfilePhotoButton size="large" className="profile__upload__button">
          프로필 변경
          <input
            type="file"
            onChange={onUploadFile}
            accept=".jpg, .jpeg, .png"
            className="profile__upload__input"
          />
        </ProfilePhotoButton>
      </ProfilePhotoWrap>
    );
  }
}
