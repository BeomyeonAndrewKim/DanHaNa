import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuButton from '../../components/Menu/MenuButton';
import { toggleMenu } from '../../ducks/menu';

class MenuButtonContainer extends Component {
  render() {
    const { ...rest } = this.props;
    return <MenuButton {...rest} />;
  }
}

export default connect(
  state => ({
    collapsed: state.menu.collapsed,
  }),
  dispatch => ({
    onToggle: () => {
      dispatch(toggleMenu());
    },
  }),
)(MenuButtonContainer);
