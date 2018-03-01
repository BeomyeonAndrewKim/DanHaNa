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
    circle.style.width = `calc(1000px * ${size})`;
    circle.style.height = `calc(1000px * ${size})`;
  }

  AddToDoScreen = () => (
    <div className="MainScreen__todo__noData">
      <div className="MainScreen__todo">
        <Link to="/mission">
          <Icon className="MainScreen__todo__add" type="plus" />
        </Link>
        <p className="MainScreen__todo__req">새로운 미션을 시작해보세요</p>
      </div>
    </div>
  );

  showToDoScreen = () => (
    <div className="MainScreen__showtodo">
      <div className="MainScreen__showtodo__wrapper">
        <div className="MainScreen__stepContainer">
          <span className="MainScreen__stepContainer--curstep animated bounceIn">
            {this.props.todoInfo.curstep}
          </span>
          <span className="MainScreen__todo__stepContainer--steps">
            /{this.props.todoInfo.steps}
          </span>
        </div>
        <div className="MainScreen__todo">
          <p className="MainScreen__todo__title">{this.props.todoInfo.todo}</p>
          <Icon
            className="MainScreen__todo__check"
            type="check"
            onClick={this.props.checkTodo}
          />
          {this.props.todoInfo.complete && (
            <div className="MainScreen--stamp">미션 성공!</div>
          )}
        </div>
        <Icon
          className="MainScreen__rollback"
          type="rollback"
          onClick={this.props.rollbackTodo}
        />
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
