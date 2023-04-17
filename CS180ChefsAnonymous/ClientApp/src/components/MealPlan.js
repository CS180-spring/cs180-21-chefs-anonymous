import React, { Component } from 'react';

export class MealPlan extends Component {
  static displayName = MealPlan.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementMealPlan = this.incrementMealPlan.bind(this);
  }

  incrementMealPlan() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        <h1>MealPlan</h1>

        <p>This is a simple example of a React component.</p>
      </div>
    );
  }
}
