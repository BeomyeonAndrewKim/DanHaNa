import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, DatePicker, Button } from 'antd';
import moment from 'moment';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './DashboardScreen.css';

const { WeekPicker } = DatePicker;
moment.locale('ko', {
  week: {
    dow: 1,
  },
});
export default class DashboardScreen extends Component {
  static defaultProps = {
    startValue: null,
    endValue: null,
    endOpen: false,
    disabledStartDate: () => {},
    onStartChange: () => {},
    handleStartOpenChange: () => {},
    disabledEndDate: () => {},
    onEndChange: () => {},
    handleEndOpenChange: () => {},
    handleCompleteData: () => {},
    handleCompleteStepsData: () => {},
  };

  state = {};

  render() {
    return (
      <div className="DashboardScreen">
        <div className="DashboardScreen__header">
          <Link to="/main">
            <Icon className="DashboardScreen__header__icon" type="arrow-left" />
          </Link>
          통계
        </div>
        <div className="DashboardScreen__main" />
        <WeekPicker
          disabledDate={this.props.disabledStartDate}
          format="YYYY ww번째 주"
          value={this.props.startValue}
          placeholder="Start"
          onChange={this.props.onStartChange}
          onOpenChange={this.props.handleStartOpenChange}
        />
        ~
        <WeekPicker
          disabledDate={this.props.disabledEndDate}
          format="YYYY ww번째 주"
          value={this.props.endValue}
          placeholder="End"
          onChange={this.props.onEndChange}
          open={this.props.endOpen}
          onOpenChange={this.props.handleEndOpenChange}
        />
        <Button onClick={this.props.handleCompleteData}>
          기간내 목표 달성률
        </Button>
        <Button onClick={this.props.handleCompleteStepsData}>
          기간내 목표 단계별 달성률
        </Button>
        <span className="DashboardScreen__main--completeData" />
        <span>%</span>
      </div>
    );
  }
}
