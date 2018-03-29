import React, { Component } from 'react';
import { Spin } from 'antd';
import './LoadingIndicator.scss';

export default class LoadingIndicator extends Component {
  render() {
    return (
      <div className="LoadingIndicator__wrapper">
        <Spin
          className="LoadingIndicator__spin"
          tip="Loading..."
          size="large"
        />
      </div>
    );
  }
}
