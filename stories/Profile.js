import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Profile from '../src/components/Profile/Profile';

storiesOf('Profile', module).add('default', () => <Profile />);
