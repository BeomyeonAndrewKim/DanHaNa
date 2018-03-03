import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Modal } from 'antd';
import NextWeekMissonScreen from '../../components/Mission/NextWeekMissionScreen';
import { fetchNextWeek } from '../../ducks/mission';

import withLoadingIndicator from '../../hocs/withLoadingIndicator';

const WithLoadingMissionScreen = withLoadingIndicator(NextWeekMissonScreen);

class ShowNextWeekMissionContainer extends Component {
  static defaultProps = {
    nextWeek: {},
    onLoadNextWeek: () => {},
    loading: false,
  };

  state = {
    editTodo: false,
    redirectToMain: false,
  };

  componentWillMount() {
    this.props.onLoadNextWeek();
  }
  componentDidMount() {
    if (!this.props.nextWeek.todo) this.askNewNextWeekMission();
  }

  handleEditTodo = () => {
    if (this.props.nextWeek.fixcount === 0)
      Modal.error({
        title: '더 이상 수정이 불가합니다.',
        content: '신중하게 목표설정을 해주세요.',
      });
    else
      this.setState({
        editTodo: true,
      });
  };

  askNewNextWeekMission = () => {
    const that = this;
    Modal.confirm({
      title: '다음주 미션을 설정하시겠습니까?',
      content:
        '이번주 미션을 완료하면 다음주 미션 설정이 가능합니다. 취소시 메인화면으로 돌아갑니다.',
      onOk() {
        that.setState({
          editTodo: true,
        });
      },
      onCancel() {
        that.setState({
          redirectToMain: true,
        });
      },
    });
  };

  render() {
    return (
      <div>
        {this.state.editTodo && <Redirect to="/editnextweekmission" />}
        {this.state.redirectToMain && <Redirect to="/main" />}
        <WithLoadingMissionScreen
          {...this.props}
          {...this.state}
          handleEditTodo={this.handleEditTodo}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    loading: state.mission.loading,
    nextWeek: state.mission.nextWeek,
  }),
  dispatch => ({
    onLoadNextWeek: () => {
      dispatch(fetchNextWeek());
    },
  }),
)(ShowNextWeekMissionContainer);
