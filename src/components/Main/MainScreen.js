import React, { Component } from 'react';
import { Icon, Modal } from 'antd';
import { Link } from 'react-router-dom';
import throttle from 'lodash.throttle';
import './MainScreen.css';

export default class MainScreen extends Component {
  static defaultProps = {
    userInfo: {},
    loading: false,
    rollbackTodo: () => {},
    checkTodo: () => {},
    showSuccessModal: false,
  };

  componentDidMount() {
    this.changeCircleSize();
  }

  componentDidUpdate() {
    this.changeCircleSize();
  }

  changeCircleSize = () => {
    const circle = document.querySelectorAll('.water');
    const size = `${this.props.curstep}` / `${this.props.steps}`;
    circle.forEach(el => {
      el.style.height = `calc(100vh * ${size})`;
      el.style.transition = 'height 0.3s';
    });
  };

  MissionSuccessStamp = () => (
    <div className="MainScreen__todo--stamp">미션 성공!</div>
  );

  AddToDoScreen = () => (
    <div className="MainScreen__todo__noData">
      <div className="MainScreen__todo__wrapper">
        <Link to="/editthisweekmission">
          <Icon className="MainScreen__todo__add" type="plus" />
        </Link>
        <p className="MainScreen__todo__req">새로운 미션을 시작해보세요</p>
      </div>
    </div>
  );

  showSuccessModal = () => {
    if (window.localStorage.getItem('successdone') === 'false')
      this.props.MissionSuccessModal();
  };

  handleClickCheck = throttle(() => this.props.checkTodo(), 500);
  handleClickRollBack = throttle(() => this.props.rollbackTodo(), 500);
  showToDoScreen = () => (
    <div>
      <div className="MainScreen__showtodo">
        <div className="MainScreen__showtodo__wrapper">
          <div className="MainScreen__stepContainer">
            <span className="MainScreen__stepContainer--curstep">
              {this.props.curstep}
            </span>
            <span className="MainScreen__stepContainer--steps">
              /{this.props.steps}
            </span>
          </div>
          {!this.props.complete && (
            <Icon
              className="MainScreen__rollback"
              type="rollback"
              onClick={this.handleClickRollBack}
            />
          )}
          <div className="MainScreen__todo">
            <div className="MainScreen__todo__wrapper">
              <p className="MainScreen__todo__title">{this.props.todo}</p>
              {this.props.complete && this.MissionSuccessStamp()}
            </div>
            <Icon
              className="MainScreen__todo__check"
              type={this.props.complete ? 'gift' : 'check'}
              onClick={this.handleClickCheck}
            />
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <div className="MainScreen">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 350 32"
            preserveAspectRatio="none"
          >
            <path
              className="water-glass"
              d="M39.92,45H25V43.21H38.15L43.14,4l2,.2ZM25,45H10.08L4.89,4.15l2-.2,5,39.26H25Z"
            />
            <path
              className="water-glass__water"
              d="M39.09,6.88s-3.13,2-5.48,0c-4.92,2.65-7.72,0-7.72,0s-4.59,2.76-7.94,0c-4.47,3.09-7,0-7,0l3.91,33.76H35Z"
            />
          </svg>
          <div className="waves">
            <div className="wave wave--back">
              <div className="water">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 350 32"
                  preserveAspectRatio="none"
                >
                  <title>wave2</title>
                  <path d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z" />
                </svg>
              </div>
              <div className="water">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 350 32"
                  preserveAspectRatio="none"
                >
                  <title>wave2</title>
                  <path d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z" />
                </svg>
              </div>
            </div>
            <div className="wave wave--front">
              <div className="water">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 350 32"
                  preserveAspectRatio="none"
                >
                  <title>wave2</title>
                  <path d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z" />
                </svg>
              </div>
              <div className="water">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 350 32"
                  preserveAspectRatio="none"
                >
                  <title>wave2</title>
                  <path d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="MainScreen__circle" />
        {this.props.render()}
        {this.props.todo ? (
          <div>
            {this.showToDoScreen()}
            <Icon
              type="camera-o"
              className="MainScreen__camera"
              onClick={this.props.handleCameraIcon}
            />
            <Modal
              visible={this.props.showModal}
              onCancel={this.props.handleCloseScreenShot}
            />
          </div>
        ) : (
          this.AddToDoScreen()
        )}
        <Modal
          title="미션 달성을 축하드립니다!"
          visible={this.props.showSuccessModal}
          onOk={this.props.handleSuccessModalOk}
          onCancel={this.props.handleSuccessModalcancel}
        >
          <div className="SuccessModal">
            <p className="SuccessModal__message">친구들에게 자랑해보세요.</p>
            <div className="SuccessModal__sns">
              <Icon
                onClick={this.props.handleFacebookIcon}
                className="SuccessModal__sns__facebook"
                type="facebook"
              />
              <Icon
                onClick={this.props.handleTwitterIcon}
                className="SuccessModal__sns__twitter"
                type="twitter"
              />
            </div>
            <p className="SUccessModal__message">
              다음주 미션을 미리 설정하세요.
            </p>
            <div className="SuccessModal__mission">
              <Icon type="edit" className="SuccessModal__mission__edit" />
            </div>
            <p className="SUccessModal__message">
              아래 선물 아이콘을 누르면 이 메세지를 다시 보실 수 있습니다.
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}
