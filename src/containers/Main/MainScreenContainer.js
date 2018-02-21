import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainScreen from '../../components/Main/MainScreen';
import withLoadingIndicator from '../../hocs/withLoadingIndicator';
import { fetchBothInfo } from '../../ducks/main';
import MenuScreenContainer from '../Menu/MenuScreenContainer';

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
        <MainScreenWithLoading
          {...rest}
          render={() => <MenuScreenContainer />}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    loading: state.main.loading,
  }),
  dispatch => ({
    onMount: () => {
      dispatch(fetchBothInfo());
    },
  }),
)(MainScreenContainer);
