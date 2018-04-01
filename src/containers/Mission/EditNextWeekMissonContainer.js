import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Modal } from 'antd';
import * as firebase from 'firebase';
import moment from 'moment';
import NextWeekMissonScreen from '../../components/Mission/NextWeekMissionScreen';
import { fetchNextWeek } from '../../ducks/mission';
import { fetchProfileInfo } from '../../ducks/profile';
import withLoadingIndicator from '../../hocs/withLoadingIndicator';

const NEXT_WEEK = moment()
  .isoWeekday(1)
  .add(1, 'weeks')
  .format('YYYY-[W]ww');

const WithLoadingMissionScreen = withLoadingIndicator(NextWeekMissonScreen);

class EditNextWeekMissionContainer extends Component {
  static defaultProps = {
    nextWeek: {},
    profileInfo: {},
    onLoadNextWeek: () => {},
    loading: false,
  };

  state = {
    newTodo: '',
    newMemo: '',
    newSteps: 1,
    editTodo: true,
  };

  componentWillMount() {
    this.props.onLoadNextWeek();
    this.props.onLoadUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      newTodo: nextProps.nextWeek.todo,
      newMemo: nextProps.nextWeek.memo,
      newSteps: nextProps.nextWeek.steps,
    });
  }

  handleCancelEdit = () => {
    this.setState({
      editTodo: false,
    });
  };

  handleTodoChange = e => {
    this.setState({
      newTodo: e.target.value,
    });
  };
  handleMemoChange = e => {
    this.setState({
      newMemo: e.target.value,
    });
  };
  handleStepsChange = value => {
    const regNumber = /^[0-9]*$/;
    if (regNumber.test(value)) {
      if (value > 20) {
        Modal.warning({
          title: '20회 이상 설정 할 수 없습니다.',
          content: '횟수를 다시 입력해주세요.',
        });
      }
      this.setState({
        newSteps: value,
      });
    }
  };

  handleSetTodo = async () => {
    if (this.state.newSteps && this.state.newTodo) {
      await firebase
        .database()
        .ref(`users/${this.props.profileInfo.uid}/todos/${NEXT_WEEK}`)
        .set(
          {
            todo: this.state.newTodo,
            memo: this.state.newMemo,
            steps: this.state.newSteps,
            curstep: 0,
            complete: false,
            fixcount: 5,
          },
          () => {
            this.props.onLoadNextWeek();
            this.setState({
              editTodo: false,
            });
          },
        );
    } else {
      Modal.error({
        title: '빈 칸을 모두 채워주세요.',
        content: '다시 입력해주세요.',
      });
    }
  };

  handleUpdateTodo = async () => {
    if (this.state.newSteps && this.state.newTodo) {
      await firebase
        .database()
        .ref(`users/${this.props.profileInfo.uid}/todos/${NEXT_WEEK}`)
        .update(
          {
            todo: this.state.newTodo,
            memo: this.state.newMemo,
            steps: this.state.newSteps,
            complete: false,
            curstep: 0,
            fixcount: this.props.nextWeek.fixcount - 1,
          },
          () => {
            this.props.onLoadNextWeek();
            this.setState({
              editTodo: false,
            });
          },
        );
    } else {
      Modal.error({
        title: '빈 칸을 모두 채워주세요.',
        content: '다시 입력해주세요.',
      });
    }
  };

  render() {
    return (
      <div>
        {!this.state.editTodo && <Redirect to="/nextweekmission" />}
        <WithLoadingMissionScreen
          {...this.state}
          nextWeek={this.props.nextWeek}
          loading={this.props.loading}
          handleTodoChange={this.handleTodoChange}
          handleMemoChange={this.handleMemoChange}
          handleStepsChange={this.handleStepsChange}
          handleSetTodo={this.handleSetTodo}
          handleUpdateTodo={this.handleUpdateTodo}
          handleCancelEdit={this.handleCancelEdit}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    loading: state.mission.loading,
    nextWeek: state.mission.nextWeek,
    profileInfo: state.profile.profileInfo,
  }),
  dispatch => ({
    onLoadNextWeek: () => {
      dispatch(fetchNextWeek());
    },
    onLoadUserInfo: () => {
      dispatch(fetchProfileInfo());
    },
  }),
)(EditNextWeekMissionContainer);
