import React, { Component } from 'react';

export class GroceryList extends Component {
  static displayName = GroceryList.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementGroceryList = this.incrementGroceryList.bind(this);
  }

  incrementGroceryList() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        <h1>GroceryList</h1>

        <p>This is a simple example of a React component.</p>
      </div>
    );
  }
}
