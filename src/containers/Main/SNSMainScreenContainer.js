import React, { Component } from 'react';
import { connect } from 'react-redux';
import SNSMainScreen from '../../components/Main/SNSMainScreen';
import withLoadingIndicator from '../../hocs/withLoadingIndicator';
import { fetchBothInfo, fetchTodoInfo } from '../../ducks/main';

const SNSMainScreenWithLoading = withLoadingIndicator(SNSMainScreen);

class SNSMainScreenContainer extends Component {
  static defaultProps = {
    loading: false,
    userInfo: {},
    todoInfo: {},
    onMount: () => {},
  };

  componentWillMount() {
    this.props.onMount();
  }
  render() {
    return (
      <div>
        <SNSMainScreenWithLoading {...this.props} />
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
)(SNSMainScreenContainer);
