import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuScreen from '../../components/Menu/MenuScreen';

class MenuButtonContainer extends Component {
  static defaultProps = {
    collapsed: false,
  };
  render() {
    const { ...rest } = this.props;
    return <MenuScreen {...rest} />;
  }
}

export default connect(state => ({
  collapsed: state.menu.collapsed,
}))(MenuButtonContainer);
