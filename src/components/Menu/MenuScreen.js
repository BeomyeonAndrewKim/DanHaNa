import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import './MenuScreen.css';
import MenuProfileContainer from '../../containers/Menu/MenuProfileContainer';

export default class MenuScreen extends Component {
  static defaultProps = {
    collapsed: false,
    onToggle: () => {},
  };
  handleCloseBtn = info => {
    if (info.key === '1') {
      this.props.onToggle();
    }
    return null;
  };
  render() {
    return (
      <div className="menu-screen">
        <Menu
          mode="inline"
          theme="light"
          inlineCollapsed={!this.props.collapsed}
          onClick={this.handleCloseBtn}
        >
          <Menu.Item className="close-btn" key="1">
            <Icon className="close-btn-icon" type="close" />
          </Menu.Item>
          <Menu.Item className="menu-avatar" key="2">
            <MenuProfileContainer />
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="user" />
            <span>프로필</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="edit" />
            <span>미션</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="calendar" />
            <span>캘린더</span>
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="bell" />
            <span>알람</span>
          </Menu.Item>
          <Menu.Item key="7">
            <Icon type="mail" />
            <span>컨택트</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
