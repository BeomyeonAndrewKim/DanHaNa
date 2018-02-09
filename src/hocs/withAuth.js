import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase';

export default function withAuth(WrappedComponent) {
  return class extends Component {
    state = {
      currentUser: false,
    };

    componentWillMount() {
      const { currentUser } = firebase.auth();
      if (currentUser) {
        this.setState({
          currentUser: true,
        });
      }

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({
            currentUser: true,
          });
        } else {
          this.setState({
            currentUser: false,
          });
        }
      });
    }

    render() {
      if (this.state.currentUser) {
        return <Redirect to="/main" />;
      }
      return <WrappedComponent />;
    }
  };
}
