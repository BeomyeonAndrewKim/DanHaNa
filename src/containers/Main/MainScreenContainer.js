import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainScreen from '../../components/Main/MainScreen';
import withLoadingIndicator from '../../hocs/withLoadingIndicator';
import { fetchMenuList } from '../../ducks/menu';

const MainScreenWithLoading = withLoadingIndicator(MainScreen);

class MainScreenContainer extends Component {
  static defaultProps = {
    loading: false,
    onMount: () => {},
  };

  componentWillMount() {
    this.props.onMount();
  }
  render() {
    const { onMount, ...rest } = this.props;
    return (
      <div>
        <MainScreenWithLoading {...rest} />
      </div>
    );
  }
}

export default connect(
  state => ({
    loading: state.menu.loading,
  }),
  dispatch => ({
    onMount: () => {
      dispatch(fetchMenuList());
    },
  }),
)(MainScreenContainer);
