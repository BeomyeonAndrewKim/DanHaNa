import React, { Component } from 'react';
import { Card } from 'antd';

export default class ProfileProvider extends Component {
  static defaultProp = {
    profileInfo: {},
  };
  render() {
    const { profileInfo } = this.props;
    const str = profileInfo.providerId;
    console.log(str);
    return (
      <div>
        <Card
          title="로그인 정보"
          style={{ margin: '0 30px' }}
          type="inner"
          bordered={false}
        >
          {profileInfo.providerId}
        </Card>
      </div>
    );
  }
}
