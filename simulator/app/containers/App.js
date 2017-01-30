// @flow
import React, { Component } from 'react';

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
      <div style={{height: "100%"}}>
        {this.props.children}
      </div>
    );
  }
}
