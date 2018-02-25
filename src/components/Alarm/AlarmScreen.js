import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Switch, Icon, TimePicker, DatePicker } from 'antd';
import './AlarmScreen.css';

export default class AlarmScreen extends Component {
  render() {
    return (
      <div className="AlarmScreen">
        <div className="AlarmScreen__header">
          <Link to="/main">
            <Icon className="AlarmScreen__header__icon" type="arrow-left" />
          </Link>
          알람
        </div>
        <div className="AlarmScreen__main">
          <div className="AlarmScreen__main__switch">
            <span className="AlarmScreen__main__switch__title">알람 설정</span>
            <Switch
              className="AlarmScreen__main__switch__body"
              onChange={this.props.handleSwitch}
            />
          </div>
          <div className="underline" />
          <div className="AlarmScreen__main__datepick">
            <span className="AlarmScreen__main__datepick__title">
              요일 설정
            </span>
            <DatePicker className="AlarmScreen__main__datepick__body" />
          </div>
          <div className="underline" />
          <div className="AlarmScreen__main__timepick">
            <span className="AlarmScreen__main__timepick__title">
              시간 설정
            </span>
            <TimePicker
              className="AlarmScreen__main__timepick__body"
              use12Hours
              format="h:mm a"
            />
          </div>
          <div className="underline" />
        </div>
      </div>
    );
  }
}
