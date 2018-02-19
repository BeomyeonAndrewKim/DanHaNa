import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuScreen from '../../components/Menu/MenuScreen';

class MenuScreenContainer extends Component {
  static defaultProps = {
    profileInfo: {},
  };

  render() {
    const { ...rest } = this.props;
    return <MenuScreen {...rest} />;
  }
}

export default connect(state => ({
  profileInfo: state.menu.profileInfo,
}))(MenuScreenContainer);
