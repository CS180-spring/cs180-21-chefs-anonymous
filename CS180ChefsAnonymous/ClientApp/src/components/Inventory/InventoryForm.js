import React, {useState, useEffect } from "react";
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

    useEffect(() => {
        if (props.enteredTitle != undefined || props.enteredAmount != undefined) {
            console.log("in useEffect");
            setEnteredTitle(props.enteredTitle);
            setEnteredAmount(props.enteredAmount);
        }
    },[]);

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
      const invId = 36 // Change later for the following comments. (uniqueID for new inventory item && same inventory number for updating)
      const inventoryData = {
          inventoryId: invId, // Should be a new inventory ID
          itemName: enteredTitle,
          qty: enteredAmount,
          unit: "haruki",
          // expiryDate: expiryDate,
          // currentDate: currentDate,
          userId: 3,
      };
      console.log(`isEditing: ${props.isEditing}`);
      if (props.isEditing) {
          console.log(`props: \ninventoryid: ${props.inventoryId}\n enteredTitle: ${props.enteredTitle}`);
          const sameId = props.inventoryId;
          console.log(`props.id === ${props.inventoryId}`);
          const editInventoryData = {
              inventoryId: sameId, // Updating an existing inventory so should be the same inventory number
              itemName: enteredTitle,
              qty: enteredAmount,
              unit: "haruki",
              userId: 3,
          };
          try {

              await fetch(`api/inventory/DeleteInventory/${sameId}`, {
                  method: "DELETE",
              })
                  .then((response) => response.json())
                  .then((data) => console.log(data))
                  .catch((error) => console.error(error));

              const response = await fetch("api/inventory/AddInventory", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(editInventoryData)
              }).then(response => { response.json(); console.log(response.json()) })
                  .then(editData => console.log(editData))
                  .catch(error => console.log(error));

              const responseData = await response.json();
              console.log("response:", responseData);
              const inventoryId = responseData.inventoryId;

              // Resetting form inputs
              setEnteredTitle("");
              setEnteredAmount("");
              setExpiryDate([]);
              setCurrentDate([]);

          } catch (error) {
              console.error(error);
          }


      } else {
          try {

              const response = await fetch("api/inventory/AddInventory", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(inventoryData)
              })//.then(response => { response.json();})
                  //.then(data => console.log(data))
                  //.catch(error => console.log(error));
                  

              const responseData = response.json();
              console.log("response:", responseData);
              const inventoryId = responseData.inventoryId;

              // Resetting form inputs
              setEnteredTitle("");
              setEnteredAmount("");
              setExpiryDate([]);
              setCurrentDate([]);

          } catch (error) {
              console.error(error);
          }
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
