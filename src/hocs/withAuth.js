import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase';

import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';

export default function withAuth(WrappedComponent) {
  return class extends Component {
    state = {
      currentUser: false,
      loading: false,
      displayName: '',
      photoURL: '',
      providerId: '',
    };

    componentWillMount() {
      const { currentUser } = firebase.auth();
      if (currentUser) {
        this.setState({
          currentUser: true,
        });
      } else {
        this.setState({
          loading: true,
        });
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe();
          if (user) {
            this.setState({
              currentUser: true,
              loading: false,
            });
          } else {
            this.setState({
              currentUser: false,
              loading: false,
            });
          }
        });
      }
    }
    render() {
      const { ...rest } = this.state;
      if (this.state.currentUser) {
        return <WrappedComponent {...rest} />;
      } else if (this.state.loading) {
        return <LoadingIndicator />;
      }
      return <Redirect to="/login" />;
    }
  };
}
