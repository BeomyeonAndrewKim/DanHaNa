import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import MenuScreen from '../src/components/Menu/MenuScreen';

storiesOf('MenuScreen', module)
  .addDecorator(StoryRouter())
  .add('default', () => <MenuScreen />)
  .add('opend', () => <MenuScreen collapsed />);
