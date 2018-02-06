import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Carousel, Button } from 'antd';
import './IntroScreen.css';

export default class IntroScreen extends Component {
  state = {
    intropage: 1,
    redirectToLogin: false,
  };
  handleNextpage = () => {
    this.carousel.innerSlider.slickNext();
    this.setState(prevState => ({
      intropage: prevState.intropage + 1,
    }));
  }; // Fixme

  handleRedirectLogin = () => {
    this.setState({
      redirectToLogin: true,
    });
  };
  render() {
    return (
      <div>
        <Carousel ref={c => (this.carousel = c)}>
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
          {this.state.redirectToLogin ? (
            <Redirect to="/login" />
          ) : this.state.intropage < 4 ? (
            <Button className="introBtn" onClick={this.handleNextpage}>
              Continue
            </Button>
          ) : this.state.intropage === 4 ? (
            <Button className="introBtn" onClick={this.handleRedirectLogin}>
              Login
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
}
