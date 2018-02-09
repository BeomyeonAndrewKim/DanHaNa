import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

const Header = styled.div`
  width: 100%;
  background-color: pink;
  position: relative;
`;
const ProfileText = styled.h2`
  padding: 20px 0;
`;
const LeftArrowIcon = styled(Icon)`
  padding: 10px;
  position: absolute;
  font-size: 1.5em;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export default class ProfileHeader extends Component {
  render() {
    return (
      <Header>
        <Link to="/main">
          <LeftArrowIcon type="arrow-left" />
        </Link>
        <ProfileText>프로필</ProfileText>
      </Header>
    );
  }
}
