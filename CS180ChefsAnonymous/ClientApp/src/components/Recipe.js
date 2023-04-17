import React, { Component } from 'react';

export class Recipe extends Component {
  static displayName = Recipe.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementRecipe = this.incrementRecipe.bind(this);
  }

  incrementRecipe() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        <h1>Recipe</h1>

        <p>This is a simple example of a React component.</p>
      </div>
    );
  }
}
