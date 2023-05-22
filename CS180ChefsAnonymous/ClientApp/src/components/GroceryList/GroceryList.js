import React, { Component } from 'react';
import './GroceryList.css';

export class GroceryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceries: []
    };
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  componentDidMount() {
    this.fetchGroceryList();
  }

  fetchGroceryList() {
    // Use the user variable here as needed
    console.log(this.user)
    const { UserId } = this.user;

    fetch(`api/ingredient/GetGrocery/${UserId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ groceries: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleDelete = (itemName) => {
    this.setState(prevState => ({
      groceries: prevState.groceries.filter(item => item.itemName !== itemName)
    }));
  }

  render() {
    const { groceries } = this.state;

    return (
      <div>
        <h1>GroceryList</h1>
        <ul className="grocery-list">
          {groceries.map(item => (
            <li key={item.itemName}>
              <label>
                <input type="checkbox" />
                {item.itemName} - {item.qty} {item.unit}
              </label>
              <span className="delete-button" onClick={() => this.handleDelete(item.itemName)}>Delete</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
