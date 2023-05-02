import React, { Component, useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./InventoryForm.module.css";

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
  /*const formSubmitHandler = (event) => {
    event.preventDefault();

    const inventoryData = {
      title: enteredTitle,
      cuisine: enteredCuisine,
      description: enteredDescription,
      preptime: {
        hours: enteredHoursPreptime,
        minutes: enteredMinutesPreptime,
      },
      cooktime: {
        hours: enteredHoursCooktime,
        minutes: enteredMinutesCooktime,
      },
    };

    props.onGetInventoryData(inventoryData);

    setEnteredTitle("");
    setEnteredCuisine("");
    setEnteredDescription("");
  };*/

  return (
    <Card>
      {/* <form onSubmit={formSubmitHandler}> */}
      <form>
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
    </Card>
  );
};

export default InventoryForm;
