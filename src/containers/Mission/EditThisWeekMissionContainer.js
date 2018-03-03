import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Modal } from 'antd';
import * as firebase from 'firebase';
import moment from 'moment';
import ThisWeekMissonScreen from '../../components/Mission/ThisWeekMissionScreen';
import { fetchThisWeek } from '../../ducks/mission';
import { fetchProfileInfo } from '../../ducks/profile';
import withLoadingIndicator from '../../hocs/withLoadingIndicator';

const THIS_WEEK = moment().format('YYYY-[W]ww');

const WithLoadingMissionScreen = withLoadingIndicator(ThisWeekMissonScreen);

class EditThisMissionContainer extends Component {
  static defaultProps = {
    thisWeek: {},
    profileInfo: {},
    onLoadThisWeek: () => {},
    loading: false,
  };

  state = {
    newTodo: '',
    newMemo: '',
    newSteps: 1,
    editTodo: true,
  };

  componentWillMount() {
    this.props.onLoadThisWeek();
    this.props.onLoadUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      newTodo: nextProps.thisWeek.todo,
      newMemo: nextProps.thisWeek.memo,
      newSteps: nextProps.thisWeek.steps,
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
        .ref(`users/${this.props.profileInfo.uid}/todos/${THIS_WEEK}`)
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
            this.props.onLoadThisWeek();
            this.setState({
              editTodo: false,
            });
            window.localStorage.setItem('successdone', false);
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
        .ref(`users/${this.props.profileInfo.uid}/todos/${THIS_WEEK}`)
        .update(
          {
            todo: this.state.newTodo,
            memo: this.state.newMemo,
            steps: this.state.newSteps,
            complete: false,
            curstep: 0,
            fixcount: this.props.thisWeek.fixcount - 1,
          },
          () => {
            this.props.onLoadThisWeek();
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
        {!this.state.editTodo && <Redirect to="/thisweekmission" />}
        <WithLoadingMissionScreen
          {...this.props}
          {...this.state}
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
    thisWeek: state.mission.thisWeek,
    profileInfo: state.profile.profileInfo,
  }),
  dispatch => ({
    onLoadThisWeek: () => {
      dispatch(fetchThisWeek());
    },
    onLoadUserInfo: () => {
      dispatch(fetchProfileInfo());
    },
  }),
)(EditThisMissionContainer);
