import React, { Component } from 'react';
import * as moment from 'moment';
import * as firebase from 'firebase';
import SNSMainScreen from '../../components/Main/SNSMainScreen';
import withLoadingIndicator from '../../hocs/withLoadingIndicator';

const SNSMainScreenWithLoading = withLoadingIndicator(SNSMainScreen);

const THIS_WEEK = moment()
  .isoWeekday(1)
  .format('YYYY-[W]ww');
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
    const todoInfo = userObj.todos[THIS_WEEK];
    this.setState({
      userInfo,
      todoInfo,
    });
  }
  render() {
    return (
      <div>
        <SNSMainScreenWithLoading
          loading={!this.state.userInfo.uid}
          userInfo={this.state.userInfo}
          todoInfo={this.state.todoInfo}
        />
      </div>
    );
  }
}
