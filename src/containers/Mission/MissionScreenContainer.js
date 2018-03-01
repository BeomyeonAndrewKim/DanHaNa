import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import * as firebase from 'firebase';
import moment from 'moment';
import MissionScreen from '../../components/Mission/MissionScreen';
import { fetchBothInfo, fetchTodoInfo } from '../../ducks/main';
import withLoadingIndicator from '../../hocs/withLoadingIndicator';

const THIS_WEEK = moment()
  .isoWeekday(1)
  .format('YYYY-[W]ww');

const WithLoadingMissionScreen = withLoadingIndicator(MissionScreen);

class MissionScreenContainer extends Component {
  static defaultProps = {
    todoInfo: {},
    userInfo: {},
    onMount: () => {},
    loading: false,
  };

  state = {
    newTodo: '',
    newMemo: '',
    newSteps: 1,
    editTodo: false,
  };

  componentWillMount() {
    this.props.onMount();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      newTodo: nextProps.todoInfo.todo,
      newMemo: nextProps.todoInfo.memo,
      newSteps: nextProps.todoInfo.steps,
    });
  }

  handleEditTodo = () => {
    if (this.props.todoInfo.fixcount === 0)
      Modal.error({
        title: '더 이상 수정이 불가합니다.',
        content: '신중하게 목표설정을 해주세요.',
      });
    else
      this.setState({
        editTodo: !this.state.editTodo,
      });
  };
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
    if (this.state.newSteps && this.state.newMemo && this.state.newTodo) {
      await firebase
        .database()
        .ref(`users/${this.props.userInfo.uid}/todos/${THIS_WEEK}`)
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
            this.props.onLoadTodo();
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
        .ref(`users/${this.props.userInfo.uid}/todos/${THIS_WEEK}`)
        .update(
          {
            todo: this.state.newTodo,
            memo: this.state.newMemo,
            steps: this.state.newSteps,
            complete: false,
            curstep: 0,
            fixcount: this.props.todoInfo.fixcount - 1,
          },
          () => {
            this.props.onLoadTodo();
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
      <WithLoadingMissionScreen
        {...this.props}
        {...this.state}
        handleTodoChange={this.handleTodoChange}
        handleMemoChange={this.handleMemoChange}
        handleStepsChange={this.handleStepsChange}
        handleEditTodo={this.handleEditTodo}
        handleSetTodo={this.handleSetTodo}
        handleUpdateTodo={this.handleUpdateTodo}
        handleCancelEdit={this.handleCancelEdit}
      />
    );
  }
}

export default connect(
  state => ({
    loading: state.main.loading,
    todoInfo: state.main.todoInfo,
    userInfo: state.main.userInfo,
  }),
  dispatch => ({
    onMount: () => {
      dispatch(fetchBothInfo());
    },
    onLoadTodo: () => {
      dispatch(fetchTodoInfo());
    },
  }),
)(MissionScreenContainer);
