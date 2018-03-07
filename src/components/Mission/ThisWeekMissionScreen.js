import React, { Component } from 'react';
import { Icon, Input, Button, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './MissionScreen.css';

const { TextArea } = Input;

const FIRST_DAY_OF_WEEK = moment().isoWeekday(1);
const LAST_DAY_OF_WEEK = moment().isoWeekday(7);

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
      <div className="MissionScreen__week">
        <div className="MissionScreen__week__wrapper">
          <div className="MissionScreen__week__first">
            <span>
              {FIRST_DAY_OF_WEEK.format('YYYY')}
              <br />
              {FIRST_DAY_OF_WEEK.format('MMM')}
              <br />
              {FIRST_DAY_OF_WEEK.format('DD')}
              <br />
              {FIRST_DAY_OF_WEEK.format('ddd')}
            </span>
          </div>
          <span className="MissionScreen__week__dash">-</span>
          <div className="MissionScreen__week__last">
            <span>
              {LAST_DAY_OF_WEEK.format('YYYY')}
              <br />
              {LAST_DAY_OF_WEEK.format('MMM')}
              <br />
              {LAST_DAY_OF_WEEK.format('DD')}
              <br />
              {LAST_DAY_OF_WEEK.format('ddd')}
            </span>
          </div>
        </div>
      </div>
      <div className="MissionScreen__main">
        <div className="MissionScreen__main__todo">
          <p className="MissionScreen__main__todo__title">미션 설정</p>
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
            <p className="MissionScreen__main__limit">
              20자까지 입력 가능합니다.
            </p>
          </div>
        </div>
        <div className="MissionScreen__main__memo">
          <p className="MissionScreen__main__memo__title">메모</p>
          <div>
            <TextArea
              className="MissionScreen__main__memo__body"
              placeholder="메모를 입력하세요."
              rows={2}
              onChange={this.props.handleMemoChange}
              defaultValue={this.props.thisWeek.memo}
              maxLength={50}
              minLength={1}
            />
            <p className="MissionScreen__main__limit">
              50자까지 입력 가능합니다.
            </p>
          </div>
        </div>
        <div className="MissionScreen__main__steps">
          <p className="MissionScreen__main__steps__title">횟수</p>
          <div>
            <InputNumber
              max={20}
              min={1}
              className="MissionScreen__main__steps__body"
              defaultValue={this.props.thisWeek.steps}
              onChange={this.props.handleStepsChange}
              formatter={value => value.replace(/[^0-9]/g, '')}
            />
            <p className="MissionScreen__main__limit">
              최대 20회까지 설정 가능합니다.
            </p>
          </div>
        </div>
        <div>
          <Button
            className="MissionScreen__main__btn"
            type="primary"
            onClick={
              this.props.thisWeek.todo
                ? this.props.handleUpdateTodo
                : this.props.handleSetTodo
            }
          >
            저장
          </Button>
          {this.props.thisWeek.fixcount && (
            <span className="MissionScreen__main__fixcount">
              <span style={{ fontWeight: 'bold' }}>
                {this.props.thisWeek.fixcount}
              </span>번 수정 가능합니다.
            </span>
          )}
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
        {this.showEditWeekMission()}
      </div>
    );
  }
}
