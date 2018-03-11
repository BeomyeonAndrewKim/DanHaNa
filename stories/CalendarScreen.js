import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import CalendarScreen from '../src/components/Calendar/CalendarScreen';

storiesOf('CalendarScreen', module)
  .addDecorator(StoryRouter())
  .add('default', () => <CalendarScreen />);
