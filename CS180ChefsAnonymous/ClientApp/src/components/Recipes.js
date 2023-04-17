import React, { Component } from 'react';

export class Recipes extends Component {
  static displayName = Recipes.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementRecipes = this.incrementRecipes.bind(this);
  }

  incrementRecipes() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        <h1>Recipes</h1>

        <p>This is a simple example of a React component.</p>
      </div>
    );
  }
}
