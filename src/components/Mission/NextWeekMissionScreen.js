import React, { Component } from 'react';
import { Icon, Input, Button, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './MissionScreen.scss';

const { TextArea } = Input;

const FIRST_DAY_OF_WEEK = moment()
  .isoWeekday(1)
  .add(1, 'weeks');
const LAST_DAY_OF_WEEK = moment()
  .isoWeekday(7)
  .add(1, 'weeks');
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
    nextWeek: {},
  };

  showWeekMission = () => (
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
          <p className="MissionScreen__main__todo__title">미션</p>
          <p className="MissionScreen__main__todo__body">
            {this.props.nextWeek.todo}
          </p>
        </div>
        <div className="MissionScreen__main__memo">
          <p className="MissionScreen__main__memo__title">메모</p>
          <p className="MissionScreen__main__memo__body">
            {this.props.nextWeek.memo}
          </p>
        </div>
        <div className="MissionScreen__main__steps">
          <p className="MissionScreen__main__steps__title">횟수</p>
          <p className="MissionScreen__main__steps__body">
            {this.props.nextWeek.steps}
          </p>
        </div>
        <Button type="primary" onClick={this.props.handleEditTodo}>
          수정
        </Button>
        {this.props.nextWeek.fixcount && (
          <span className="MissionScreen__main__fixcount">
            <span style={{ fontWeight: 'bold' }}>
              {this.props.nextWeek.fixcount}
            </span>번 수정 가능합니다.
          </span>
        )}
      </div>
    </div>
  );

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
          <p className="MissionScreen__main__todo__title">미션</p>
          <div>
            <Input
              autoFocus
              className="MissionScreen__main__todo__body"
              placeholder="미션을 입력하세요"
              size="large"
              onChange={this.props.handleTodoChange}
              defaultValue={this.props.nextWeek.todo}
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
          <div className="MissionScreen__main__memo__body">
            <TextArea
              placeholder="메모를 입력하세요."
              rows={2}
              onChange={this.props.handleMemoChange}
              defaultValue={this.props.nextWeek.memo}
              maxLength={100}
              minLength={1}
            />
            <p className="MissionScreen__main__limit">
              100자까지 입력 가능합니다.
            </p>
          </div>
        </div>
        <div className="MissionScreen__main__steps">
          <p className="MissionScreen__main__steps__title">횟수</p>
          <div className="MissionScreen__main__steps__body">
            <InputNumber
              max={20}
              min={1}
              defaultValue={this.props.nextWeek.steps}
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
            type="primary"
            onClick={
              this.props.nextWeek.todo
                ? this.props.handleUpdateTodo
                : this.props.handleSetTodo
            }
          >
            저장
          </Button>
          {this.props.nextWeek.fixcount && (
            <span className="MissionScreen__main__fixcount">
              <span style={{ fontWeight: 'bold' }}>
                {this.props.nextWeek.fixcount}
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
        {this.props.editTodo
          ? this.showEditWeekMission()
          : this.showWeekMission()}
      </div>
    );
  }
}
