import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

const Header = styled.div`
  width: 100%;
  background-color: #1e2b55;
  position: relative;
  text-align: center;
`;
const CalendarText = styled.h2`
  padding: 20px 0;
  color: #fff;
`;
const LeftArrowIcon = styled(Icon)`
  padding: 10px;
  position: absolute;
  font-size: 1.5em;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
`;

export default class CalendarHeader extends Component {
  render() {
    return (
      <Header className="calendar__header">
        <Link to="/main">
          <LeftArrowIcon type="arrow-left" />
        </Link>
        <CalendarText>캘린더</CalendarText>
      </Header>
    );
  }
}
