import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

export default class ProfileHeader extends Component {
  render() {
    return (
      <div className="profile__header__wrap">
        <Link to="/main">
          <Icon className="profile__header__arrow" type="arrow-left" />
        </Link>
        <h2 className="profile__header__title">프로필</h2>
      </div>
    );
  }
}
