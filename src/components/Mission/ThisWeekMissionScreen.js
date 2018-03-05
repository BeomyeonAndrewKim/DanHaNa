import React, { Component } from 'react';
import { Icon, Input, Button, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './MissionScreen.css';

const { TextArea } = Input;

const THIS_WEEK_DP = `${moment()
  .isoWeekday(1)
  .format('YYYY-MM-DD')}~${moment()
  .isoWeekday(7)
  .format('YYYY-MM-DD')}`;

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
    thisWeek: {},
  };

  showEditWeekMission = () => (
    <div>
      <div className="MissionScreen__main">
        <div className="MissionScreen__main__todo">
          <p className="MissionScreen__main__todo__title">미션</p>
          <div>
            <Input
              autoFocus
              className="MissionScreen__main__todo__body"
              placeholder="미션을 입력하세요"
              size="large"
              onChange={this.props.handleTodoChange}
              defaultValue={this.props.thisWeek.todo}
              maxLength={20}
              minLength={1}
            />
            <p>20자까지 입력 가능합니다.</p>
          </div>
        </div>
        <div className="MissionScreen__main__memo">
          <p className="MissionScreen__main__memo__title">메모</p>
          <div className="MissionScreen__main__memo__body">
            <TextArea
              placeholder="메모를 입력하세요."
              rows={2}
              onChange={this.props.handleMemoChange}
              defaultValue={this.props.thisWeek.memo}
              maxLength={100}
              minLength={1}
            />
            <p>100자까지 입력 가능합니다.</p>
          </div>
        </div>
        <div className="MissionScreen__main__steps">
          <p className="MissionScreen__main__steps__title">횟수</p>
          <div className="MissionScreen__main__steps__body">
            <InputNumber
              max={20}
              min={1}
              defaultValue={this.props.thisWeek.steps}
              onChange={this.props.handleStepsChange}
              formatter={value => value.replace(/[^0-9]/g, '')}
            />
            <p>최대 20회까지 설정 가능합니다.</p>
          </div>
        </div>
        <div>
          <Button
            type="primary"
            onClick={
              this.props.thisWeek.todo
                ? this.props.handleUpdateTodo
                : this.props.handleSetTodo
            }
          >
            저장
          </Button>
          <Link to="/main">
            <Button type="primary">취소</Button>
          </Link>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <div className="MissionScreen">
        <div className="MissionScreen__header">
          <Link to="/main">
            <Icon className="MissionScreen__header__icon" type="arrow-left" />
          </Link>
          미션
        </div>
        <div className="MissionScreen__week">
          <p>{THIS_WEEK_DP}</p>
        </div>
        {this.showEditWeekMission()}
      </div>
    );
  }
}
