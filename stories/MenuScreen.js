import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import MenuScreen from '../src/components/Menu/MenuScreen';

const dummyProfileInfo = {
  nickName: 'test',
  providerId: 'test.com',
  photoURL:
    'https://localmarketingplus.ca/wp-content/uploads/2015/02/blue-head.jpg',
};
storiesOf('MenuScreen', module)
  .addDecorator(StoryRouter())
  .add('default', () => <MenuScreen />)
  .add('opend', () => <MenuScreen collapsed userInfo={dummyProfileInfo} />);
