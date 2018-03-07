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
    userInfo: {},
    todoInfo: {},
    pageToMission: false,
    collapsed: false,
  };

  handleCloseMenuLayout = e => {
    if (e.target.className.includes('menu-close')) {
      this.props.handleToggleMenu();
    }
  };

  handleMenuList = info => {
    switch (info.key) {
      case '1':
        this.props.handleToggleMenu();
        break;
      case '4':
        if (!this.props.nextWeek.todo && this.props.todoInfo.complete) {
          this.props.handleMissionModal();
        }
        break;
      default:
    }
  };
  render() {
    return (
      <div>
        {this.props.collapsed && (
          <MenuCloseEl
            className="menu-close"
            onClick={this.handleCloseMenuLayout}
          />
        )}
        <Button
          className="MenuScreen__btn"
          type="ghost"
          onClick={this.props.handleToggleMenu}
        >
          <Icon type={this.props.collapsed ? 'menu-fold' : 'menu-unfold'} />
        </Button>
        <div className="menu-screen">
          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={!this.props.collapsed}
            onClick={this.handleMenuList}
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
                  src={this.props.userInfo.photoURL}
                />
                <figcaption>{this.props.userInfo.nickName}</figcaption>
              </figure>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/profile" />
              <Icon type="user" />
              <span>프로필</span>
            </Menu.Item>
            <Menu.Item key="4">
              {!this.props.nextWeek.todo &&
              this.props.todoInfo.complete ? null : (
                <Link
                  to={
                    this.props.todoInfo.complete
                      ? '/nextweekmission'
                      : '/editthisweekmission'
                  }
                />
              )}
              <Icon type="edit" />
              <span>미션 설정</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/calendar" />
              <Icon type="calendar" />
              <span>캘린더</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/dashboard" />
              <Icon type="line-chart" />
              <span>통계</span>
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
