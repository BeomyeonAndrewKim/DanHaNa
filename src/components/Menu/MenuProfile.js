import React, { Component } from 'react';

export default class MenuProfile extends Component {
  static defaultProps = {
    nickName: '',
    photoUrl: '',
  };
  render() {
    return (
      <div>
        <figure>
          <img
            className="profileImg"
            alt="profilimg"
            src={this.props.photoUrl}
          />
          <figcaption>{this.props.nickName}</figcaption>
        </figure>
      </div>
    );
  }
}
