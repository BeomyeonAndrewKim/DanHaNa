import React, { Component } from 'react';
import styled from 'styled-components';

const ProfilePhotoWrap = styled.div`
  padding: 30px 0;
`;

export default class ProfilePhoto extends Component {
  render() {
    return (
      <ProfilePhotoWrap>
        <input type="file" />
      </ProfilePhotoWrap>
    );
  }
}
