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
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#dc7036+50,c45b2d+50 */
  background: #dc7036; /* Old browsers */
  background: -moz-linear-gradient(
    -45deg,
    #dc7036 50%,
    #c45b2d 50%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    -45deg,
    #dc7036 50%,
    #c45b2d 50%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    135deg,
    #dc7036 50%,
    #c45b2d 50%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr='#dc7036',
      endColorstr='#c45b2d',
      GradientType=1
    ); /* IE6-9 fallback on horizontal gradient */
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
