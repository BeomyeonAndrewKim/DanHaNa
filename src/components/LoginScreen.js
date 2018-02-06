import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import styled from 'styled-components';

const LoginWrap = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  margin: auto;
`;
const LoginList = styled.ul`
  width: 100%;
  list-style: none;
`;
const LoginListItem = styled.li``;
const LoginButton = styled(Button)`
  margin: auto;
  display: inline-block;
  width: 150px;
`;

export default class LoginScreen extends Component {
  static defaultProp = {
    onFacebookLogin: () => {},
    onGoogleLogin: () => {},
  };
  render() {
    const { onGoogleLogin, onFacebookLogin } = this.props;
    return (
      <div style={{ height: '100vh' }}>
        <LoginWrap>
          <LoginList>
            <LoginListItem>
              <LoginButton onClick={onFacebookLogin}>
                <Icon type="facebook" />
                Facebook
              </LoginButton>
            </LoginListItem>
            <LoginListItem>
              <LoginButton onClick={onGoogleLogin}>
                <Icon type="google" /> Google
              </LoginButton>
            </LoginListItem>
          </LoginList>
        </LoginWrap>
      </div>
    );
  }
}
