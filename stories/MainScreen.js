import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MainScreen from '../src/components/Main/MainScreen';

storiesOf('MainScreen', module).add('default', () => <MainScreen />);
