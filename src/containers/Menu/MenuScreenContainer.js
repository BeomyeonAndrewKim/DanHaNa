import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuScreen from '../../components/Menu/MenuScreen';

class MenuScreenContainer extends Component {
  static defaultProps = {
    userInfo: {},
    todoInfo: {},
  };

  state = {
    collapsed: false,
  };

  handleToggleMenu = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <MenuScreen
        {...this.state}
        {...this.props}
        handleToggleMenu={this.handleToggleMenu}
      />
    );
  }
}

export default connect(state => ({
  todoInfo: state.main.todoInfo,
  userInfo: state.main.userInfo,
}))(MenuScreenContainer);
