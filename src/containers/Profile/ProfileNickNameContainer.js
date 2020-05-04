import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase/app';
import ProfileNickName from '../../components/Profile/ProfileNickName';
import { fetchProfileInfo } from '../../ducks/profile';

class ProfileNickNameContainer extends Component {
  state = {
    nickName: '',
  };
  componentDidMount() {
    // 파이어베이스에 닉네임이 있다면 받아오기
    this.props.onMount();
  }
  handleNickNameChange = e => {
    this.setState({
      nickName: e.target.value,
    });
  };
  handleCancelClicked = () => {
    this.props.onMount();
  };
  handleNickNameEditSave = async () => {
    const { profileInfo } = this.props;
    const { uid } = profileInfo;
    await firebase
      .database()
      .ref(`users/${uid}/profileInfo/`)
      .update({
        nickName: this.state.nickName,
      });
    this.props.onMount();
  };
  render() {
    const { onMount, ...rest } = this.props;
    return (
      <div>
        <ProfileNickName
          {...rest}
          handleNickNameChange={this.handleNickNameChange}
          handleNickNameEditSave={this.handleNickNameEditSave}
          refreshNickName={this.refreshNickName}
          handleCancelClicked={this.handleCancelClicked}
        />
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
)(ProfileNickNameContainer);
