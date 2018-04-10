import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import * as moment from 'moment';
import './MainScreen.scss';
import logo from '../../assets/images/logo/login__logo.png';

export default class SNSMainScreen extends Component {
  static defaultProps = {
    userInfo: {},
    todoInfo: {},
    loading: false,
  };
  render() {
    return (
      <div className="MainScreen">
        <div className="MainScreen__showtodo__wrapper">
          <div className="SNSShareScreen__wrapper">
            <p className="SNSShareScreen__message">
              <span>{this.props.userInfo.nickName}</span>님이 &nbsp;{moment(
                this.props.week,
              ).format('YYYY년 WW번째 주')}{' '}
              미션을 완료했습니다.
            </p>
          </div>
          <div className="MainScreen__stepContainer">
            <span className="MainScreen__stepContainer--curstep">
              {this.props.todoInfo.curstep}
            </span>
            <span className="MainScreen__stepContainer--steps">
              /{this.props.todoInfo.steps}
            </span>
          </div>
          <div className="MainScreen__todo">
            <div className="MainScreen__todo__wrapper">
              <Icon
                className="MainScreen__todo__memo"
                onClick={this.props.handleTodoTitle}
                type="copy"
              />
              <p className="MainScreen__todo__title">
                {this.props.todoInfo.todo}
              </p>
              <div className="MainScreen__todo--stamp">미션 성공!</div>
            </div>
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="SNSShareScreen__tomain-img"
              />
              <span className="SNSShareScreen__tomain-text">
                DanHaNa 체험하기
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
