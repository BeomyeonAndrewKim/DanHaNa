import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Carousel, Button } from 'antd';
import './IntroScreen.css';

export default class IntroScreen extends Component {
  state = {
    intropage: 0,
    redirectToLogin: false,
  };

  handleAfterChange = () => {
    this.setState({
      intropage: this.carousel.innerSlider.state.currentSlide,
    });
  };

  handleNextpage = () => {
    this.carousel.innerSlider.slickNext();
  };

  handleRedirectLogin = () => {
    this.setState({
      redirectToLogin: true,
    });
  };

  render() {
    const PAGE_NUM = 3;
    return (
      <div>
        <Carousel
          afterChange={this.handleAfterChange}
          ref={c => {
            this.carousel = c;
          }}
          draggable
        >
          <div>
            <h3>일주일 단 하나</h3>
          </div>
          <div>
            <h3>자신을 위해 무엇이든 시작해보세요</h3>
          </div>
          <div>
            <h3>일주일 단하나와 함께라면 할 수 있어요</h3>
          </div>
          <div>
            <h3>그럼 시작해볼까요?</h3>
          </div>
        </Carousel>
        <div>
          {this.state.redirectToLogin ||
          window.localStorage.getItem('introdone') ? (
            <Redirect to="/login" />
          ) : this.state.intropage < PAGE_NUM ? (
            <Button className="introBtn" onClick={this.handleNextpage}>
              Continue
            </Button>
          ) : this.state.intropage === PAGE_NUM ? (
            <Button className="introBtn" onClick={this.handleRedirectLogin}>
              Login
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
}
