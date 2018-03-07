import React, { Component } from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import './LoginScreen.css';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const LoginPageWrap = styled.div`
  height: 100vh;
`;
const LoginWrap = styled.div`
  position: relative;
  top: 70%;
  transform: translateY(-50%);
  padding: 0 40px;
  max-width: 500px;
  margin: auto;
`;
const LoginList = styled.ul`
  width: 100%;
  text-align: center;
  padding: 3rem 1rem;
`;
const LoginTitle = styled.h1`
  padding: 1rem;
`;
const LoginListItem = styled.li`
  margin-top: 0.6rem;
`;
const LoginButton = styled.button`
  border: none;
  border-radius: 30px;
  padding: 1rem 0;
  width: 100%;
  color: #fff;
  font-size: 0.8rem;
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
                  <span className="login__button__text">
                    <Icon className="login__button__icon" type="facebook" />
                    SIGN IN WITH FACEBOOK
                  </span>
                </LoginButton>
              </LoginListItem>
              <LoginListItem>
                <LoginButton
                  className="login__button__google"
                  onClick={onGoogleLogin}
                >
                  <span className="login__button__text">
                    <Icon className="login__button__icon" type="google-plus" />
                    SIGN IN WITH GOOGLE
                  </span>
                </LoginButton>
              </LoginListItem>
              <LoginListItem>
                <LoginButton
                  className="login__button__twitter"
                  onClick={onTwitterLogin}
                >
                  <span className="login__button__text">
                    <Icon className="login__button__icon" type="twitter" /> SIGN
                    IN WITH TWITTER
                  </span>
                </LoginButton>
              </LoginListItem>
            </LoginList>
          </LoginWrap>
        )}
      </LoginPageWrap>
    );
  }
}
