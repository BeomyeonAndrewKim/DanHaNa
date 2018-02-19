import React, { Component } from 'react';

export default class MainScreen extends Component {
  render() {
    return <div>{this.props.render()}</div>;
  }
}
