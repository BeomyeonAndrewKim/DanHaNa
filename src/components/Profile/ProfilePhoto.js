import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Avatar } from 'antd';

import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import './ProfilePhoto.css';

const ProfilePhotoWrap = styled.div`
  padding: 30px 0;
`;

export default class ProfilePhoto extends Component {
  static defaultProps = {
    fileUrl: '',
    loading: '',
    onUploadFile: () => {},
  };
  render() {
    console.log(this.props);
    const { loading, fileUrl, onUploadFile } = this.props;
    return (
      <ProfilePhotoWrap>
        <div className="profilePhoto">
          {loading ? (
            <LoadingIndicator />
          ) : fileUrl ? (
            <div
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                backgroundImage: `url(${fileUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                resizeMode: 'cover',
              }}
            />
          ) : (
            <Avatar size="large" icon="user" />
          )}
        </div>
        <Button size="large" className="fileUploadBtn">
          프로필 변경
          <input
            type="file"
            onChange={onUploadFile}
            accept=".jpg, .jpeg, .png"
            className="fileUploadInput"
          />
        </Button>
      </ProfilePhotoWrap>
    );
  }
}
