import React, { Component } from 'react';

export class Register extends Component {
  static displayName = Register.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementRegister = this.incrementRegister.bind(this);
  }

  incrementRegister() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        <h1>Register</h1>

        <p>This is a simple example of a React component.</p>
      </div>
    );
  }
}
