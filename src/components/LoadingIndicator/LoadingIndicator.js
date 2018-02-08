import React, { Component } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
`;
const Spined = styled(Spin)`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;
export default class LoadingIndicator extends Component {
  render() {
    return (
      <Wrap>
        <Spined tip="Loading..." size="large" />
      </Wrap>
    );
  }
}
