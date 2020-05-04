import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import { Modal } from 'antd';
import SNSMainScreen from '../../components/Main/SNSMainScreen';
import withLoadingIndicator from '../../hocs/withLoadingIndicator';

const SNSMainScreenWithLoading = withLoadingIndicator(SNSMainScreen);

export default class SNSMainScreenContainer extends Component {
  static defaultProps = {
    loading: false,
    userInfo: {},
    todoInfo: {},
    onMount: () => {},
  };

  state = {
    userInfo: {},
    todoInfo: {},
  };
  async componentWillMount() {
    const snapshot = await firebase
      .database()
      .ref(`users/${this.props.match.params.uid}`)
      .once('value');
    const userObj = snapshot.val();
    const userInfo = userObj.profileInfo;
    const todoInfo = userObj.todos[this.props.match.params.week];
    this.setState({
      userInfo,
      todoInfo,
    });
  }

  handleTodoTitle = () => {
    const that = this;
    Modal.info({
      title: '이번주 미션 메모사항입니다.',
      content: that.state.todoInfo.memo,
    });
  };
  render() {
    return (
      <div>
        <SNSMainScreenWithLoading
          week={this.props.match.params.week}
          loading={!this.state.userInfo.uid}
          userInfo={this.state.userInfo}
          todoInfo={this.state.todoInfo}
          handleTodoTitle={this.handleTodoTitle}
        />
      </div>
    );
  }
}
