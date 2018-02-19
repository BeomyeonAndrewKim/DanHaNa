import React, { Component } from 'react';

import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';

export default function withLoadingIndicator(WrappedComponent) {
  return class extends Component {
    static defaultProp = {
      loading: false,
    };
    render() {
      const { loading, ...rest } = this.props;
      if (loading) {
        return (
          <div>
            <LoadingIndicator />;
          </div>
        );
      }
      return <WrappedComponent {...rest} />;
    }
  };
}
