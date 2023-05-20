import React, { Component } from 'react';
import './GroceryList.css';

export class GroceryList extends Component {
    static displayName = GroceryList.name;

    constructor(props) {
        super(props);
        this.state = {
            groceries: []
        };
    }

    componentDidMount() {
        this.fetchGroceryList();
    }

    fetchGroceryList() {
        fetch('api/ingredient/GetGrocery/6')
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
