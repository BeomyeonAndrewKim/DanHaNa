import React, { Component } from 'react';
import { Button, Icon } from 'antd';

export default class LoginScreen extends Component {
  render() {
    return (
      <div>
        <Button type="primary" ghost>
          <Icon type="facebook" /> facebook
        </Button>
      </div>
    );
  }
}
