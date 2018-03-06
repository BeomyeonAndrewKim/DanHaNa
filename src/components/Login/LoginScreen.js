import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import styled from 'styled-components';
import './LoginScreen.css';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const LoginPageWrap = styled.div`
  height: 100vh;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#dc7036+50,c45b2d+50 */
  background: #dc7036; /* Old browsers */
  background: -moz-linear-gradient(
    -45deg,
    #dc7036 50%,
    #c45b2d 50%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    -45deg,
    #dc7036 50%,
    #c45b2d 50%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    135deg,
    #dc7036 50%,
    #c45b2d 50%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr='#dc7036',
      endColorstr='#c45b2d',
      GradientType=1
    ); /* IE6-9 fallback on horizontal gradient */
`;
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
    onTwitterLogin: () => {},
  };
  render() {
    const {
      onLoading,
      onGoogleLogin,
      onFacebookLogin,
      onTwitterLogin,
    } = this.props;
    return (
      <LoginPageWrap>
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
              <LoginListItem>
                <LoginButton onClick={onTwitterLogin}>
                  <Icon type="twitter" /> twitter
                </LoginButton>
              </LoginListItem>
            </LoginList>
          </LoginWrap>
        )}
      </LoginPageWrap>
    );
  }
}
