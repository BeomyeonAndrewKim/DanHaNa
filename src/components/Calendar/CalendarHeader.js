import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

export default class CalendarHeader extends Component {
  render() {
    return (
      <div className="calendar__header">
        <Link to="/main">
          <Icon className="calendar__header__icon" type="arrow-left" />
        </Link>
        <h2 className="calendar__header__text">캘린더</h2>
      </div>
    );
  }
}
