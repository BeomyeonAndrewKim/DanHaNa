import React, { Component } from 'react';
import { Icon } from 'antd';
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
  padding: 0 40px;
  max-width: 500px;
  margin: auto;
`;
const LoginList = styled.ul`
  width: 100%;
  background-color: #fff;
  text-align: center;
  padding: 3rem 1rem;
`;
const LoginTitle = styled.h1`
  padding: 1rem;
`;
const LoginListItem = styled.li`
  margin-top: 0.45rem;
`;
const LoginButton = styled.button`
  border: none;
  border-radius: 30px;
  padding: 0.5rem 1rem;
  width: 100%;
  color: #fff;
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
              <LoginTitle className="login__title">
                <span>SIGN IN</span>
              </LoginTitle>
              <LoginListItem>
                <LoginButton
                  className="login__button__facebook"
                  onClick={onFacebookLogin}
                >
                  <Icon type="facebook" />
                  LOGIN IN WITH FACEBOOK
                </LoginButton>
              </LoginListItem>
              <LoginListItem>
                <LoginButton
                  className="login__button__google"
                  onClick={onGoogleLogin}
                >
                  <Icon type="google-plus" /> LOGIN IN WITH GOOGLE
                </LoginButton>
              </LoginListItem>
              <LoginListItem>
                <LoginButton
                  className="login__button__twitter"
                  onClick={onTwitterLogin}
                >
                  <Icon type="twitter" /> LOGIN IN WITH TWITTER
                </LoginButton>
              </LoginListItem>
            </LoginList>
          </LoginWrap>
        )}
      </LoginPageWrap>
    );
  }
}
