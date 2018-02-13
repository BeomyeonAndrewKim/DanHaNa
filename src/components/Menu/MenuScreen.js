import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import styled from 'styled-components';
import './MenuScreen.css';

const MenuCloseEl = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export default class MenuScreen extends Component {
  static defaultProps = {
    collapsed: false,
    onToggle: () => {},
  };
  handleCloseMenuLayout = e => {
    if (e.target.className.includes('menu-close')) {
      this.props.onToggle();
    }
    return null;
  };
  handleCloseBtn = info => {
    if (info.key === '1') {
      this.props.onToggle();
    }
    return null;
  };
  makeCloseMenuLayout = () => {
    if (this.props.collapsed) {
      return (
        <MenuCloseEl
          className="menu-close"
          onClick={this.handleCloseMenuLayout}
        />
      );
    }
    return null;
  };
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.props.onToggle}>
          <Icon type={this.props.collapsed ? 'menu-fold' : 'menu-unfold'} />
        </Button>
        {this.makeCloseMenuLayout()}
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
              <figure>
                <img
                  className="profileImg"
                  alt="프로필 사진"
                  src={this.props.profileInfo.photoUrl}
                />
                <figcaption>{this.props.profileInfo.nickName}</figcaption>
              </figure>
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
      </div>
    );
  }
}
