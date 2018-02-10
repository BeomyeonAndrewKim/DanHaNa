import React, { Component } from 'react';
import MenuScreenContainer from '../../containers/Menu/MenuScreenContainer';
import MenuButtonContainer from '../../containers/Menu/MenuButtonContainer';

export default class MainScreen extends Component {
  render() {
    return (
      <div>
        <MenuButtonContainer />
        <MenuScreenContainer />
      </div>
    );
  }
}
