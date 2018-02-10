import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MenuScreen from '../src/components/Menu/MenuScreen';
import MenuButton from '../src/components/Menu/MenuButton';

storiesOf('MenuScreen', module)
  .add('default', () => <MenuScreen collapsed />)
  .add('ToggleButton', () => <MenuButton onToggle={action('onToggle')} />);
