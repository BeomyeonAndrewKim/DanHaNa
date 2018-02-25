import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import * as firebase from 'firebase';
import moment from 'moment';
import MainScreen from '../../components/Main/MainScreen';
import withLoadingIndicator from '../../hocs/withLoadingIndicator';
import { fetchBothInfo, fetchTodoInfo } from '../../ducks/main';
import MenuScreenContainer from '../Menu/MenuScreenContainer';

const THIS_WEEK = moment()
  .isoWeekday(1)
  .format('YYYY-[W]ww-D');

const MainScreenWithLoading = withLoadingIndicator(MainScreen);

class MainScreenContainer extends Component {
  static defaultProps = {
    loading: false,
    userInfo: {},
    todoInfo: {},
    onMount: () => {},
    onLoadTodo: () => {},
  };

  componentWillMount() {
    this.props.onMount();
  }

  checkTodo = async () => {
    if (this.props.todoInfo.complete)
      Modal.warning({
        title: '이미 목표를 달성했습니다.',
        content: 'some messages...some messages...',
      });
    else if (this.props.todoInfo.curstep + 1 === this.props.todoInfo.steps) {
      await firebase
        .database()
        .ref(`users/${this.props.userInfo.uid}/todos/${THIS_WEEK}`)
        .update(
          {
            complete: true,
            curstep: this.props.todoInfo.curstep + 1,
          },
          () => {
            this.props.onLoadTodo();
          },
        );
    } else {
      await firebase
        .database()
        .ref(`users/${this.props.userInfo.uid}/todos/${THIS_WEEK}`)
        .update(
          {
            curstep: this.props.todoInfo.curstep + 1,
          },
          () => {
            this.props.onLoadTodo();
          },
        );
    }
  };

  rollbackTodo = async () => {
    if (this.props.todoInfo.curstep === 0)
      Modal.error({
        title: '이미 스텝이 0입니다.',
        content: 'some messages...some messages...',
      });
    else if (this.props.todoInfo.complete) {
      await firebase
        .database()
        .ref(`users/${this.props.userInfo.uid}/todos/${THIS_WEEK}`)
        .update(
          {
            complete: false,
            curstep: this.props.todoInfo.curstep - 1,
          },
          () => {
            this.props.onLoadTodo();
          },
        );
    } else {
      await firebase
        .database()
        .ref(`users/${this.props.userInfo.uid}/todos/${THIS_WEEK}`)
        .update(
          {
            curstep: this.props.todoInfo.curstep - 1,
          },
          () => {
            this.props.onLoadTodo();
          },
        );
    }
  };

  render() {
    return (
      <div>
        <MainScreenWithLoading
          {...this.props}
          handleAddToDo={this.handleAddToDo}
          checkTodo={this.checkTodo}
          rollbackTodo={this.rollbackTodo}
          render={() => <MenuScreenContainer />}
        />
      </div>
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
)(MainScreenContainer);
