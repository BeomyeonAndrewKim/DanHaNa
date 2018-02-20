import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileProvider from '../../components/Profile/ProfileProvider';

import { fetchProfileInfo } from '../../ducks/profile';

class ProfileProviderContainer extends Component {
  componentDidMount() {
    // 파이어베이스에 닉네임이 있다면 받아오기
    this.props.onMount();
  }

  render() {
    const { onMount, ...rest } = this.props;

    return (
      <div>
        <ProfileProvider {...rest} />
      </div>
    );
  }
}

export default connect(
  // mapStateToProps
  state => ({
    loading: state.profile.loading,
    profileInfo: state.profile.profileInfo,
  }),
  // mapDispatchToprops
  dispatch => ({
    onMount: () => {
      dispatch(fetchProfileInfo());
    },
  }),
)(ProfileProviderContainer);
