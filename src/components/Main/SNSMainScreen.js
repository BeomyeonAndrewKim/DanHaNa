import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import './MainScreen.css';

export default class SNSMainScreen extends Component {
  static defaultProps = {
    userInfo: {},
    todoInfo: {},
    loading: false,
  };

  render() {
    return (
      <div className="MainScreen">
        <Link to="/main">
          <Icon className="SNSShareScreen__tomain" type="arrow-left" />
        </Link>
        <div className="MainScreen__showtodo__wrapper">
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
              <p className="MainScreen__todo__title">
                {this.props.todoInfo.todo}
              </p>
              <div className="MainScreen__todo--stamp">미션 성공!</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
