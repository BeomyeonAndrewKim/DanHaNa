import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import * as firebase from 'firebase';
import * as moment from 'moment';
import MissionScreen from '../../components/Mission/MissionScreen';
import { fetchBothInfo, fetchTodoInfo } from '../../ducks/main';
import withLoadingIndicator from '../../hocs/withLoadingIndicator';

const THIS_WEEK = moment().format('YYYY-[W]ww');

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
  };

  componentWillMount() {
    this.props.onMount();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      newTodo: nextProps.todoInfo.todo,
      newMemo: nextProps.todoInfo.memo,
      newSteps: nextProps.todoInfo.steps,
      loading: nextProps.loading,
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
      this.setState({
        newSteps: value,
      });
    }
  };

  handleSetTodo = async () => {
    await firebase
      .database()
      .ref(`users/${this.props.userInfo.uid}/${THIS_WEEK}`)
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
  };

  handleUpdateTodo = async () => {
    await firebase
      .database()
      .ref(`users/${this.props.userInfo.uid}/${THIS_WEEK}`)
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
