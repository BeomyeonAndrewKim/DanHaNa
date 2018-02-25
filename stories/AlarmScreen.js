import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import AlarmScreen from '../src/components/Alarm/AlarmScreen';

storiesOf('AlarmScreen', module)
  .addDecorator(StoryRouter())
  .add('default', () => <AlarmScreen />);
