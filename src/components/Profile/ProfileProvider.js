import React, { Component } from 'react';
import { Card } from 'antd';

export default class ProfileProvider extends Component {
  static defaultProp = {
    profileInfo: {},
  };
  render() {
    const { profileInfo } = this.props;
    return (
      <div className="profile__text__provider">
        <Card
          className="profile__text__provider__card"
          title="로그인 정보"
          type="inner"
          bordered={false}
        >
          {profileInfo.providerId}
        </Card>
      </div>
    );
  }
}
