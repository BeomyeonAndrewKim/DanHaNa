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

  AddToDoScreen = () => (
    <div className="MainScreen__todo">
      <Link to="/mission">
        <Icon className="MainScreen__todo__add" type="plus" />
      </Link>
      <p className="MainScreen__todo__req">새로운 미션을 시작해보세요</p>
    </div>
  );

  showToDoScreen = () => (
    <div className="MainScreen__showtodo">
      <span className="MainScreen__curstep">{this.props.todoInfo.curstep}</span>
      <span className="MainScreen__steps">/{this.props.todoInfo.steps}</span>
      <div className="MainScreen__todo">
        <p className="MainScreen__todo__title">{this.props.todoInfo.todo}</p>
        <Icon
          className="MainScreen__todo__rollback"
          type="rollback"
          onClick={this.props.rollbackTodo}
        />
        <Icon
          className="MainScreen__todo__check"
          type="check"
          onClick={this.props.checkTodo}
        />
        <Link to={this.props.todoInfo.fixcount ? '/mission' : '/main'}>
          <Icon
            className="MainScreen__todo__edit"
            type="edit"
            onClick={() =>
              this.props.todoInfo.fixcount === 0 &&
              Modal.error({
                title: '더 이상 수정이 불가합니다.',
                content: '신중하게 목표를 설정해주세요.',
              })
            }
          />
        </Link>
        <span className="MainScreen__fixcount">
          {this.props.todoInfo.fixcount}
        </span>
        {this.props.todoInfo.complete && (
          <div className="MainScreen--stamp">미션 성공!</div>
        )}
      </div>
    </div>
  );

  render() {
    return (
      <div className="MainScreen">
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
