import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import MainScreen from '../src/components/Main/MainScreen';

storiesOf('MainScreen', module)
  .addDecorator(StoryRouter())
  .add('default', () => <MainScreen render={() => {}} />)
  .add('Mission', () => (
    <MainScreen
      render={() => {}}
      todo="TEST"
      steps={10}
      curstep={5}
      fixcount={5}
    />
  ));
