import React, { Component } from 'react';

export class Login extends Component {
  static displayName = Login.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementLogin = this.incrementLogin.bind(this);
  }

  incrementLogin() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>

        <p>This is a simple example of a React component.</p>
      </div>
    );
  }
}
