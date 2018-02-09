import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import styled from 'styled-components';
import './LoginScreen.css';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const LoginWrap = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  margin: auto;
`;
const LoginList = styled.ul`
  width: 100%;
`;
const LoginListItem = styled.li`
  text-align: center;
`;
const LoginButton = styled(Button)`
  margin: auto;
  display: inline-block;
  width: 150px;
`;

export default class LoginScreen extends Component {
  static defaultProp = {
    onLoading: '',
    onFacebookLogin: () => {},
    onGoogleLogin: () => {},
  };
  render() {
    const { onLoading, onGoogleLogin, onFacebookLogin } = this.props;
    console.log(onLoading); // 여기서 왜 콘솔이 2번 호출이 될까요..ㅠㅠ
    return (
      <div style={{ height: '100vh' }}>
        {onLoading ? (
          <LoadingIndicator />
        ) : (
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
        )}
      </div>
    );
  }
}
