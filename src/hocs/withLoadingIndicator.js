import React, { Component } from 'react';
import { Spin, Alert } from 'antd';

export default function withLoadingIndicator(WrappedComponent) {
  return class extends Component {
    static defaultProp = {
      loading: '',
    };
    render() {
      const { loading } = this.props;
      if (loading) {
        return (
          <div>
            <Spin />;
          </div>
        );
      }
      return <WrappedComponent />;
    }
  };
}
