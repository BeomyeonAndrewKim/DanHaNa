import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import DashboardScreen from '../src/components/Dashboard/DashboardScreen';

storiesOf('Dashboard', module)
  .addDecorator(StoryRouter())
  .add('default', () => <DashboardScreen />);
