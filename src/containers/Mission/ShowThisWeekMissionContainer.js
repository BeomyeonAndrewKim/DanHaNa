import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Modal } from 'antd';
import ThisWeekMissonScreen from '../../components/Mission/ThisWeekMissionScreen';
import { fetchThisWeek } from '../../ducks/mission';

import withLoadingIndicator from '../../hocs/withLoadingIndicator';

const WithLoadingMissionScreen = withLoadingIndicator(ThisWeekMissonScreen);

class ShowThisWeekMissionContainer extends Component {
  static defaultProps = {
    thisWeek: {},
    onLoadThisWeek: () => {},
    loading: false,
  };

  state = {
    editTodo: false,
  };

  componentWillMount() {
    this.props.onLoadThisWeek();
  }

  handleEditTodo = () => {
    if (this.props.thisWeek.fixcount === 0)
      Modal.error({
        title: '더 이상 수정이 불가합니다.',
        content: '신중하게 목표설정을 해주세요.',
      });
    else
      this.setState({
        editTodo: true,
      });
  };

  render() {
    return (
      <div>
        {this.state.editTodo && <Redirect to="/editthisweekmission" />}
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
    thisWeek: state.mission.thisWeek,
  }),
  dispatch => ({
    onLoadThisWeek: () => {
      dispatch(fetchThisWeek());
    },
  }),
)(ShowThisWeekMissionContainer);
