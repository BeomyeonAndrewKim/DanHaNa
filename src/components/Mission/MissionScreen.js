import React, { Component } from 'react';
import { Icon, Input, Button, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './MissionScreen.css';

const { TextArea } = Input;

export default class MissionScreen extends Component {
  static defaultProps = {
    todo: '',
    memo: '',
    steps: 0,
    editTodo: false,
    handleTodoChange: () => {},
    handleMemoChange: () => {},
    handleStepsChange: () => {},
    handleEditTodo: () => {},
    handleSetTodo: () => {},
    handleUpdateTodo: () => {},
  };

  handleTodoBody = () => {
    if (
      this.props.editTodo ||
      !this.props.todoInfo.todo ||
      this.props.todoInfo.complete
    )
      return (
        <div>
          <Input
            autoFocus
            className="MissionScreen__main__todo__body"
            placeholder="미션을 입력하세요"
            size="large"
            onChange={this.props.handleTodoChange}
            defaultValue={
              this.props.todoInfo.complete ? '' : this.props.todoInfo.todo
            }
            maxLength={20}
            minLength={1}
          />
          <p>20자까지 입력 가능합니다.</p>
        </div>
      );
    return (
      <p className="MissionScreen__main__todo__body">
        {this.props.todoInfo.todo}
      </p>
    );
  };

  handleMemoBody = () => {
    if (
      this.props.editTodo ||
      !this.props.todoInfo.memo ||
      this.props.todoInfo.complete
    )
      return (
        <div className="MissionScreen__main__memo__body">
          <TextArea
            placeholder="메모를 입력하세요."
            rows={2}
            onChange={this.props.handleMemoChange}
            defaultValue={
              this.props.todoInfo.complete ? '' : this.props.todoInfo.memo
            }
            maxLength={100}
            minLength={1}
          />
          <p>100자까지 입력 가능합니다.</p>
        </div>
      );
    return (
      <p className="MissionScreen__main__memo__body">
        {this.props.todoInfo.memo}
      </p>
    );
  };

  handleStepsBody = () => {
    if (
      this.props.editTodo ||
      !this.props.todoInfo.steps ||
      this.props.todoInfo.complete
    )
      return (
        <div className="MissionScreen__main__steps__body">
          <InputNumber
            max={20}
            min={1}
            defaultValue={
              this.props.todoInfo.complete ? '' : this.props.todoInfo.steps
            }
            onChange={this.props.handleStepsChange}
            formatter={value => value.replace(/[^0-9]/g, '')}
          />
          <p>최대 20회까지 설정 가능합니다.</p>
        </div>
      );
    return (
      <p className="MissionScreen__main__steps__body">
        {this.props.todoInfo.steps}
      </p>
    );
  };

  render() {
    const THIS_WEEK_DP = `${moment()
      .isoWeekday(1)
      .format('YYYY-MM-DD')}~${moment()
      .isoWeekday(7)
      .format('YYYY-MM-DD')}`;
    const NEXT_WEEK_DP = `${moment()
      .add(1, 'weeks')
      .isoWeekday(1)
      .format('YYYY-MM-DD')}~${moment()
      .add(1, 'weeks')
      .isoWeekday(7)
      .format('YYYY-MM-DD')}`;
    return (
      <div className="MissionScreen">
        <div className="MissionScreen__header">
          <Link to="/main">
            <Icon className="MissionScreen__header__icon" type="arrow-left" />
          </Link>
          미션
        </div>
        <div className="MissionScreen__main">
          <div className="MissionScreen__main__week">
            <p>{this.props.todoInfo.complete ? NEXT_WEEK_DP : THIS_WEEK_DP}</p>
          </div>
          <div className="MissionScreen__main__todo">
            <p className="MissionScreen__main__todo__title">미션</p>
            {this.handleTodoBody()}
          </div>
          <div className="MissionScreen__main__memo">
            <p className="MissionScreen__main__memo__title">메모</p>
            {this.handleMemoBody()}
          </div>
          <div className="MissionScreen__main__steps">
            <p className="MissionScreen__main__steps__title">횟수</p>
            {this.handleStepsBody()}
          </div>
          {this.props.editTodo ||
          !this.props.todoInfo.todo ||
          this.props.todoInfo.complete ? (
            <div>
              <Button
                type="primary"
                onClick={
                  this.props.todoInfo.todo
                    ? this.props.handleUpdateTodo
                    : this.props.handleSetTodo
                }
              >
                저장
              </Button>
              {this.props.todoInfo.todo && (
                <Button onClick={this.props.handleCancelEdit} type="primary">
                  취소
                </Button>
              )}
            </div>
          ) : (
            <div>
              <Button type="primary" onClick={this.props.handleEditTodo}>
                수정
              </Button>
              <p className="MissionScreen__main__fixcount">
                {this.props.todoInfo.fixcount}번 수정 가능합니다.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
