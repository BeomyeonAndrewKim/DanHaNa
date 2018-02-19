import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
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
    profileInfo: {},
  };
  state = {
    collapsed: false,
  };
  handleToggleMenu = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleCloseMenuLayout = e => {
    if (e.target.className.includes('menu-close')) {
      this.handleToggleMenu();
    }
    return null;
  };
  handleCloseBtn = info => {
    if (info.key === '1') {
      this.handleToggleMenu();
    }
    return null;
  };
  makeCloseMenuLayout = () => {
    if (this.state.collapsed) {
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
        <Button type="primary" onClick={this.handleToggleMenu}>
          <Icon type={this.state.collapsed ? 'menu-fold' : 'menu-unfold'} />
        </Button>
        {this.makeCloseMenuLayout()}
        <div className="menu-screen">
          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={!this.state.collapsed}
            onClick={this.handleCloseBtn}
          >
            <Menu.Item className="close-btn" key="1">
              <Icon className="close-btn-icon" type="close" />
            </Menu.Item>
            <Menu.Item className="menu-avatar" key="2">
              <Link to="/profile" />
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
              <Link to="/profile" />
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
