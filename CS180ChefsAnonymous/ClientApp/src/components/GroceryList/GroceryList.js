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
        var groceries = JSON.parse(localStorage.getItem('groceries'));

        if (groceries) {
            this.setState({ groceries: groceries });
        } else {
            console.log("User logged in ");
            const { UserId } = this.user;
            console.log(UserId);
            if (this.user) {
                fetch(`api/ingredient/GetGrocery/${UserId}`)
                    .then(response => response.json())
                    .then(data => {
                        // Add 'completed' property to each grocery item
                        const groceriesWithCompletion = data.map(item => ({
                            ...item,
                            completed: false
                        }));
                        this.setState({ groceries: groceriesWithCompletion });
                        console.log("groceries");
                        console.log(this.state.groceries);
                        localStorage.setItem('groceries', JSON.stringify(groceriesWithCompletion));
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    }

    handleDelete = (itemName) => {
        this.setState(prevState => ({
            groceries: prevState.groceries.filter(item => item.itemName !== itemName)
        }));
    }

    handleCheckboxChange = (itemName) => {
        this.setState(prevState => ({
            groceries: prevState.groceries.map(item => {
                if (item.itemName === itemName) {
                    return {
                        ...item,
                        completed: !item.completed
                    };
                }
                return item;
            })
        }), () => {
            localStorage.setItem('groceries', JSON.stringify(this.state.groceries));
            console.log("groceries");
            console.log("User logged in ");

            // Retrieve the updated item from the state
            const updatedItem = this.state.groceries.find(item => item.itemName === itemName);

            // Determine whether to add or remove the item based on the completed state
            if (updatedItem.completed) {
                this.addGrocery(updatedItem);
            } else {
                this.removeGrocery(updatedItem);
            }
        });
    };

    addGrocery(item) {
        const { UserId } = this.user;
        const itemData = {
            inventoryId: 0,
            userId: UserId,
            itemName: item.itemName,
            qty: item.qty,
            unit: item.unit,
        };

        fetch("api/inventory/AddGrocery", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(itemData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Check if the item was added or updated successfully
                console.log("Item added or updated successfully:", data);
            })
            .catch((error) => console.error(error));
    }

    removeGrocery(item) {
        const { UserId } = this.user;
        const itemData = {
            inventoryId: 0,
            userId: UserId,
            itemName: item.itemName,
            qty: item.qty,
            unit: item.unit,
        };

        fetch("api/inventory/RemoveGrocery", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(itemData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Check if the item was removed successfully
                console.log("Item removed successfully:", data);
            })
            .catch((error) => console.error(error));
    }

    handleGenerateGroceryList = () => {
        const { UserId } = this.user;
        fetch(`api/ingredient/GetGrocery/${UserId}`)
            .then(response => response.json())
            .then(data => {
                const groceriesWithCompletion = data.map(item => ({
                    ...item,
                    completed: false
                }));
                this.setState({ groceries: groceriesWithCompletion });
                localStorage.setItem('groceries', JSON.stringify(groceriesWithCompletion));
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <div className='grocery-list-container'>
                <div className="grocery-list">
                    <div className='grocery-list-out'>
                        <div className='grocery-list-wrapper'>
                            {this.state.groceries.map(item => (
                                <div key={item.itemName} className="grocery-item">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={item.completed}
                                            onChange={() => this.handleCheckboxChange(item.itemName)}
                                        />
                                        {item.qty} {item.itemName}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <button onClick={this.handleGenerateGroceryList}>
                            Generate GroceryList
                        </button>
                    </div>
                    <div className='grocery-list-img' />
                </div>
            </div>
        );
    }
}

export default GroceryList;
