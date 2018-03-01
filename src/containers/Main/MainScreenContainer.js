import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import * as firebase from 'firebase';
import moment from 'moment';
import html2canvas from 'html2canvas';
import MainScreen from '../../components/Main/MainScreen';
import withLoadingIndicator from '../../hocs/withLoadingIndicator';
import { fetchBothInfo, fetchTodoInfo } from '../../ducks/main';
import MenuScreenContainer from '../Menu/MenuScreenContainer';

const THIS_WEEK = moment().format('YYYY-[W]ww');

const MainScreenWithLoading = withLoadingIndicator(MainScreen);

class MainScreenContainer extends Component {
  static defaultProps = {
    loading: false,
    userInfo: {},
    onMount: () => {},
    onLoadTodo: () => {},
  };

  state = {
    showModal: false,
    todo: '',
    memo: '',
    curstep: 0,
    steps: 0,
    fixcount: 0,
    complete: false,
  };

  componentWillMount() {
    this.props.onMount();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      todo: nextProps.todoInfo.todo,
      memo: nextProps.todoInfo.memo,
      curstep: nextProps.todoInfo.curstep,
      steps: nextProps.todoInfo.steps,
      fixcount: nextProps.todoInfo.fixcount,
      complete: nextProps.todoInfo.complete,
    });
  }

  checkTodo = async () => {
    if (this.state.curstep + 1 === this.state.steps) {
      await firebase
        .database()
        .ref(`users/${this.props.userInfo.uid}/todos/${THIS_WEEK}`)
        .update(
          {
            complete: true,
            curstep: this.state.curstep + 1,
          },
          () => {
            this.setState({
              complete: true,
              curstep: this.state.curstep + 1,
            });
          },
        );
    } else {
      await firebase
        .database()
        .ref(`users/${this.props.userInfo.uid}/todos/${THIS_WEEK}`)
        .update(
          {
            curstep: this.state.curstep + 1,
          },
          () => {
            this.setState({
              curstep: this.state.curstep + 1,
            });
          },
        );
    }
  };

  rollbackTodo = async () => {
    if (this.state.curstep === 0)
      Modal.error({
        title: '이미 스텝이 0입니다.',
        content: 'some messages...some messages...',
      });
    else if (this.state.complete) {
      await firebase
        .database()
        .ref(`users/${this.props.userInfo.uid}/todos/${THIS_WEEK}`)
        .update(
          {
            complete: false,
            curstep: this.state.curstep - 1,
          },
          () => {
            this.setState({
              complete: false,
              curstep: this.state.curstep - 1,
            });
          },
        );
    } else {
      await firebase
        .database()
        .ref(`users/${this.props.userInfo.uid}/todos/${THIS_WEEK}`)
        .update(
          {
            curstep: this.state.curstep - 1,
          },
          () => {
            this.setState({
              curstep: this.state.curstep - 1,
            });
          },
        );
    }
  };

  handleCameraIcon = async () => {
    this.setState({
      showModal: true,
    });
    await html2canvas(document.querySelector('.MainScreen__showtodo')).then(
      canvas => {
        document
          .querySelector('.ant-modal-body')
          .appendChild(canvas)
          .classList.add('screenshotCanvas');
        const ScreenshotUrl = document
          .querySelector('.screenshotCanvas')
          .toDataURL();
        const downloadA = document.createElement('a');
        downloadA.classList.add('downloadLink');
        downloadA.textContent = '저장';
        const downloadLink = document
          .querySelector('.ant-modal-body')
          .appendChild(downloadA);
        downloadLink.href = ScreenshotUrl;
        downloadLink.download = `${this.props.todoInfo.todo}.png`;
      },
    );
    document.querySelector('.ant-modal').classList.add('screenshot-modal');
    document
      .querySelector('.ant-modal-close')
      .classList.add('screenshot-modal-close');
    document
      .querySelector('.ant-modal-content')
      .classList.add('screenshot-modal-content');
    document
      .querySelector('.ant-modal-body')
      .classList.add('screenshot-modal-body');
    document
      .querySelector('.ant-modal-footer')
      .classList.add('screenshot-modal-footer');
  };

  handleCloseScreenShot = () => {
    this.setState({
      showModal: false,
    });
    document.querySelector('.screenshotCanvas').remove();
    document.querySelector('.downloadLink').remove();
    document.querySelector('.ant-modal').classList.remove('screenshot-modal');
    document
      .querySelector('.ant-modal-close')
      .classList.remove('screenshot-modal-close');
    document
      .querySelector('.ant-modal-content')
      .classList.remove('screenshot-modal-content');
    document
      .querySelector('.ant-modal-body')
      .classList.remove('screenshot-modal-body');
    document
      .querySelector('.ant-modal-footer')
      .classList.remove('screenshot-modal-footer');
  };

  render() {
    return (
      <div>
        <MainScreenWithLoading
          {...this.props}
          {...this.state}
          handleAddToDo={this.handleAddToDo}
          checkTodo={this.checkTodo}
          rollbackTodo={this.rollbackTodo}
          handleCameraIcon={this.handleCameraIcon}
          handleCloseScreenShot={this.handleCloseScreenShot}
          handleSaveScreenShot={this.handleSaveScreenShot}
          handleModalContiner={this.handleModalContiner}
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
