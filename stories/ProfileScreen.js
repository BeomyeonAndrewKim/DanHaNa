import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import ProfileHeader from '../src/components/Profile/ProfileHeader';
import ProfileNickName from '../src/components/Profile/ProfileNickName';
import ProfilePhoto from '../src/components/Profile/ProfilePhoto';
import ProfileProvider from '../src/components/Profile/ProfileProvider';

const dummyProfileInfo = {
  nickName: 'test',
  providerId: 'test.com',
  photoURL:
    'https://localmarketingplus.ca/wp-content/uploads/2015/02/blue-head.jpg',
};

storiesOf('ProfileScreen', module)
  .addDecorator(StoryRouter())
  .add('default', () => (
    <div>
      <ProfileHeader />
      <ProfilePhoto profileInfo={dummyProfileInfo} />
      <ProfileNickName profileInfo={dummyProfileInfo} />
      <ProfileProvider profileInfo={dummyProfileInfo} />
    </div>
  ));
