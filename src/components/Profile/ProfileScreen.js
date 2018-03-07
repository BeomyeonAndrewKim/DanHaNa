import React, { Component } from 'react';
import styled from 'styled-components';

import ProfileHeader from './ProfileHeader';
import ProfilePhotoContainer from '../../containers/Profile/ProfilePhotoContainer';
import ProfileNickNameContainer from '../../containers/Profile/ProfileNickNameContainer';
import ProfileProviderContainer from '../../containers/Profile/ProfileProviderContainer';

import './ProfileScreen.css';

const ProfileWrap = styled.div`
  text-align: center;
  height: 100vh;
`;
const ProfileTextInfo = styled.div`
  margin: 0 15px;
  border: 3px solid #0b1229;
`;
export default class ProfileScreen extends Component {
  render() {
    return (
      <ProfileWrap>
        <ProfileHeader />
        <ProfilePhotoContainer />
        <ProfileTextInfo>
          <ProfileNickNameContainer />
          <ProfileProviderContainer />
        </ProfileTextInfo>
      </ProfileWrap>
    );
  }
}
