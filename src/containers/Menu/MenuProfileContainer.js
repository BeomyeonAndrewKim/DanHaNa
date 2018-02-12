import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuProfile from '../../components/Menu/MenuProfile';

class MenuProfileContainer extends Component {
  static defaultProps = {
    profileInfo: {},
  };

  render() {
    const { ...rest } = this.props;
    return <MenuProfile {...rest} />;
  }
}

export default connect(state => ({
  profileInfo: state.menu.profileInfo,
}))(MenuProfileContainer);
