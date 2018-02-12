import React, { Component } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(50, 50, 50, 0.9);
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
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
