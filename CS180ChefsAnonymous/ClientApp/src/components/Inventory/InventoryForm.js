import React, {useState } from "react";
//import Card from "../UI/Card";
import Modal from "../UI/Card";
import Button from "../UI/Button";
import styles from "./InventoryForm.module.css";
import { v4 as uuid } from 'uuid';

const InventoryForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");


  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler1 = (event) => {
    setExpiryDate(event.target.value);
  };

  const dateChangeHandler2 = (event) => {
    setCurrentDate(event.target.value);
  };

  const cancelHandler = () => {
    props.onCancel();
  };

  const formSubmitHandler = async (event) => {   

    event.preventDefault();
    const newGUID = uuid();
    const inventoryData = {                                
      inventoryId: 34,
      itemName: enteredTitle,
      qty: enteredAmount,
      unit: "haruki",
      // expiryDate: expiryDate,
      // currentDate: currentDate,
      userId: 3,
  };
  
    try {
        const response = await fetch("api/inventory/AddInventory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
          },
            body: JSON.stringify(inventoryData)
        }).then(response => {response.json(); console.log(response.json())})
        .then(data => console.log(data))
        .catch(error => console.log(error));

        if (!response.ok) {
            throw new Error("Failed to add ingredient");
        }


        const responseData = await response.json();
        console.log("response:", responseData);
        const inventoryId = responseData.inventoryId;

        /*for (const ingredient of enteredIngredient) {
            const newGUID = uuid();
            const ingredientData = {
                ingredientId: newGUID,
                recipeId: recipeId,
                itemName: ingredient.name,
                qty: enteredHoursCooktime,
                unit: "tsp",
            };

            const ingredientResponse = await fetch("api/ingredient/AddIngredient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ingredientData),
            });

            if (!ingredientResponse.ok) {
                throw new Error("Failed to add ingredient");
            }
        }*/

        // Resetting form inputs
        setEnteredTitle("");
        setEnteredAmount("");
        setExpiryDate([]);
        setCurrentDate([]);
    } catch (error) {
        console.error(error);
    }
};


  return (
    <Modal>
      <form onSubmit={formSubmitHandler}>
      {/* <form> */}
        <div className={styles.new_inventory__controls}>
          <div className={styles.new_inventory__control}>
            <label>Ingredient</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>


          <div className={styles.new_inventory__control}>
            <label>Quantity</label>
            <input
              type="number"
              value={enteredAmount}
              min="1.0"
              step="1.0"
              onChange={amountChangeHandler}
          />
        </div>


          <div className={styles.new_inventory__control}>
          <label>Expiry Date</label>
          <input
            type="date"
            value={expiryDate}
            min="2019-01-01"
            max="2023-12-31"
            onChange={dateChangeHandler1}
          />
        </div>

        <div className={styles.new_inventory__control}>
          <label>Date Stored</label>
          <input
            type="date"
            value={currentDate}
            min="2019-01-01"
            max="2023-12-31"
            onChange={dateChangeHandler2}
          />
        </div>

        </div>

        {/*Submit button */}
        <div className={styles.new_inventory__actions}>
          <Button onClick={cancelHandler}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Modal>
  );
};

export default InventoryForm;
