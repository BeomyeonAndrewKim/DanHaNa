import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import './MenuScreen.scss';

export default class MenuScreen extends Component {
  static defaultProps = {
    userInfo: {},
    todoInfo: {},
    collapsed: false,
    handleLogOut: () => {},
    handleMissionModal: () => {},
    handlepageToEditMission: () => {},
    handleToggleMenu: () => {},
  };

  handleCloseMenuLayout = e => {
    if (e.target.className.includes('MenuScreen__close')) {
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
      case '7':
        this.props.handleLogOut();
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div>
        {this.props.collapsed && (
          <div
            className="MenuScreen__close"
            onClick={this.handleCloseMenuLayout}
            role="button"
            tabIndex="0"
          />
        )}
        <Button
          className="MenuScreen__btn"
          type="ghost"
          onClick={this.props.handleToggleMenu}
        >
          <Icon type={this.props.collapsed ? 'menu-fold' : 'menu-unfold'} />
        </Button>
        <div className="MenuScreen__main">
          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={!this.props.collapsed}
            onClick={this.handleMenuList}
          >
            <Menu.Item className="MenuScreen__main--closebtn" key="1">
              <Icon type="close" />
            </Menu.Item>
            <Menu.Item className="MenuScreen__main--profile" key="2">
              <Link to="/profile" />
              <figure>
                <img
                  className="MenuScreen__main--profile--img"
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
              <Icon type="logout" />
              <span>로그아웃</span>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}
