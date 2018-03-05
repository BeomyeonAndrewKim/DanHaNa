import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CalendarScreen from '../src/components/Calendar/CalendarScreen';

storiesOf('CalendarScreen', module).add('default', () => <CalendarScreen />);
