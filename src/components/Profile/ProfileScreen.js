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

export default class ProfileScreen extends Component {
  render() {
    return (
      <ProfileWrap>
        <ProfileHeader />
        <ProfilePhotoContainer />
        <ProfileNickNameContainer />
        <ProfileProviderContainer />
      </ProfileWrap>
    );
  }
}
