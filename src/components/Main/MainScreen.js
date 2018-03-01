import React, { Component } from 'react';
import { Icon, Modal } from 'antd';
import { Link } from 'react-router-dom';
import './MainScreen.css';

export default class MainScreen extends Component {
  static defaultProps = {
    todoInfo: {},
    userinfo: {},
    loading: false,
    rollbackTodo: () => {},
    checkTodo: () => {},
  };

  componentDidMount() {
    const circle = document.querySelector('.MainScreen__circle');
    const size =
      `${this.props.todoInfo.curstep}` / `${this.props.todoInfo.steps}`;
    circle.style.transform = `scale(${size})`;
  }

  MissionSuccess = () => {
    Modal.success({
      title: '미션 달성을 축하드립니다!',
      content: (
        <div className="SuccessModal">
          <p className="SuccessModal__message">친구들에게 자랑해보세요.</p>
          <div className="SuccessModal__sns">
            <Icon className="SuccessModal__sns__facebook" type="facebook" />
            <Icon className="SuccessModal__sns__twitter" type="twitter" />
          </div>
          <p className="SUccessModal__message">
            다음주 미션을 미리 설정하세요.
          </p>
          <div className="SuccessModal__mission">
            <Icon type="edit" className="SuccessModal__mission__edit" />
          </div>
        </div>
      ),
    });
  };

  AddToDoScreen = () => (
    <div className="MainScreen__todo__noData">
      <div className="MainScreen__todo__wrapper">
        <Link to="/mission">
          <Icon className="MainScreen__todo__add" type="plus" />
        </Link>
        <p className="MainScreen__todo__req">새로운 미션을 시작해보세요</p>
      </div>
    </div>
  );

  showToDoScreen = () => (
    <div>
      <div className="MainScreen__showtodo">
        <div className="MainScreen__showtodo__wrapper">
          <div className="MainScreen__stepContainer">
            <span className="MainScreen__stepContainer--curstep animated bounceIn">
              {this.props.todoInfo.curstep}
            </span>
            <span className="MainScreen__stepContainer--steps">
              /{this.props.todoInfo.steps}
            </span>
          </div>
          <Icon
            className="MainScreen__rollback"
            type="rollback"
            onClick={this.props.rollbackTodo}
          />
          <div className="MainScreen__todo">
            <div className="MainScreen__todo__wrapper">
              <p className="MainScreen__todo__title">
                {this.props.todoInfo.todo}
              </p>
              {this.props.todoInfo.complete && (
                <div className="MainScreen__todo--stamp">미션 성공!</div>
              )}
            </div>
            <Icon
              className="MainScreen__todo__check"
              type={this.props.todoInfo.complete ? 'gift' : 'check'}
              onClick={
                this.props.todoInfo.complete
                  ? this.MissionSuccess
                  : this.props.checkTodo
              }
            />
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <div className="MainScreen">
        <div className="MainScreen__circle animated zoomIn" />
        {this.props.render()}
        {this.props.todoInfo.todo ? (
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
      </div>
    );
  }
}
