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

const dummyTodo = {
  todo: 'todo',
  complete: false,
};
storiesOf('MenuScreen', module)
  .addDecorator(StoryRouter())
  .add('default', () => (
    <MenuScreen nextWeek={dummyTodo} todoInfo={dummyTodo} />
  ))
  .add('opend', () => (
    <MenuScreen
      nextWeek={dummyTodo}
      todoInfo={dummyTodo}
      collapsed
      userInfo={dummyProfileInfo}
    />
  ));
