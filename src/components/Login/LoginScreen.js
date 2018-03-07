import React, { Component } from 'react';
import { Icon } from 'antd';
import { Animated } from 'react-animated-css';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import './LoginScreen.css';
import logo from '../../assets/images/logo/login__logo.png';

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
      <div className="login">
        <h1 className="login__logo">
          <img src={logo} alt="logo" />
          <span>DANHANA.</span>
        </h1>
        <h2 className="login__title">
          <Animated
            className="login__title--fading"
            animationIn="fadeIn"
            isVisible
            style={{
              animationDuration: '2s',
              animationDelay: '0.5s',
            }}
          >
            <p>“One Week,</p>
          </Animated>
          <Animated
            className="login__title--fading"
            animationIn="fadeIn"
            isVisible
            style={{
              animationDuration: '2s',
              animationDelay: '1.5s',
            }}
          >
            <p>One Mission,</p>
          </Animated>
          <Animated
            className="login__title--fading"
            animationIn="fadeIn"
            isVisible
            style={{
              animationDuration: '2s',
              animationDelay: '2.5s',
            }}
          >
            <p>One Goal”</p>
          </Animated>
        </h2>
        {onLoading ? (
          <LoadingIndicator />
        ) : (
          <div className="login__wrap">
            <ul className="login__list">
              <h3 className="login__list__title">
                <span>SIGN IN</span>
              </h3>
              <li className="login__list__item">
                <button
                  className="login__list__item__button login__list__item__button__facebook"
                  onClick={onFacebookLogin}
                >
                  <span className="login__list__item__button__text">
                    <Icon
                      className="login__list__item__button__icon"
                      type="facebook"
                    />
                    SIGN IN WITH FACEBOOK
                  </span>
                </button>
              </li>
              <li className="login__list__item">
                <button
                  className="login__list__item__button login__list__item__button__google"
                  onClick={onGoogleLogin}
                >
                  <span className="login__list__item__button__text">
                    <Icon
                      className="login__list__item__button__icon"
                      type="google-plus"
                    />
                    SIGN IN WITH GOOGLE
                  </span>
                </button>
              </li>
              <li className="login__list__item">
                <button
                  className="login__list__item__button login__list__item__button__twitter"
                  onClick={onTwitterLogin}
                >
                  <span className="login__list__item__button__text">
                    <Icon
                      className="login__list__item__button__icon"
                      type="twitter"
                    />{' '}
                    SIGN IN WITH TWITTER
                  </span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}
