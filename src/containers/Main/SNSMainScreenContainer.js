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
  componentDidMount() {
    if (window.location.href.includes('facebookshare')) {
      window.open('http://www.facebook.com/sharer/sharer.php?u=facebookshare');
    } else if (window.location.href.includes('twittershare')) {
      window.open(
        'https://twitter.com/intent/tweet?text=TEXT&url=twittershare',
      );
    }
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
