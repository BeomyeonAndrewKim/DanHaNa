import React, { Component } from 'react';

import ProfileHeader from './ProfileHeader';
import ProfilePhotoContainer from '../../containers/Profile/ProfilePhotoContainer';
import ProfileNickNameContainer from '../../containers/Profile/ProfileNickNameContainer';
import ProfileProviderContainer from '../../containers/Profile/ProfileProviderContainer';

import './ProfileScreen.css';

export default class ProfileScreen extends Component {
  render() {
    return (
      <div className="profile">
        <ProfileHeader className="profile__header" />
        <ProfilePhotoContainer className="profile__photo" />
        <div className="profile__text">
          <ProfileNickNameContainer />
          <ProfileProviderContainer />
        </div>
      </div>
    );
  }
}
