import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import './MenuScreen.css';
import MenuProfileContainer from '../../containers/Menu/MenuProfileContainer';

export default class MenuScreen extends Component {
  static defaultProps = {
    collapsed: false,
  };
  render() {
    return (
      <div className="menu-screen">
        <Menu
          mode="inline"
          theme="light"
          inlineCollapsed={!this.props.collapsed}
        >
          <Menu.Item className="menu-avatar" key="1">
            <MenuProfileContainer />
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="user" />
            <span>프로필</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="edit" />
            <span>미션</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="calendar" />
            <span>캘린더</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="bell" />
            <span>알람</span>
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="mail" />
            <span>컨택트</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
