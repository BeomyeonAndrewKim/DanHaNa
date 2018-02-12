import React, { Component } from 'react';

export default class MenuProfile extends Component {
  static defaultProps = {
    profileInfo: {},
  };
  render() {
    return (
      <div>
        <figure>
          <img
            className="profileImg"
            alt="프로필 사진"
            src={this.props.profileInfo.photoUrl}
          />
          <figcaption>{this.props.profileInfo.nickName}</figcaption>
        </figure>
      </div>
    );
  }
}
