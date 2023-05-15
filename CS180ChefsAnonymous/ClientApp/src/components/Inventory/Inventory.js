import React, { Component, useState } from "react";
//import Card from "../UI/Card";
import InventoryList from "./InventoryList";
import InventoryForm from "./InventoryForm";
import Button from "../UI/Button";

const DUMMY_INVENTORY = [
  {
    id: "e1",
    ingredient: "Tomatoes",
    quantity: "3", 
    expiryDate: new Date(2019, 7, 14), 
    currentDate: new Date(2021, 3, 14), 

    
  },
  {
    id: "e2",
    ingredient: "Potatoes",
    quantity: "3", 
    expiryDate: new Date(2019, 5, 4), 
    currentDate: new Date(2021, 3, 14), 
  },
  
  {
    id: "e2",
    ingredient: "Cheese",
    quantity: "3", 
    expiryDate: new Date(2020, 3, 4), 
    currentDate: new Date(2021, 6, 14), 
  },
];


const Inventory = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [dummyInventory, setDummyInventory] = useState(DUMMY_INVENTORY);

  const displayInventoryFormHandler = () => {
    setDisplayForm(true);
  };
  const cancelFormHandler = () => {
    setDisplayForm(false);
  };
  const getInventoryDataHandler = (enteredInventoryData) => {
    const inventoryData = { ...enteredInventoryData, id: Math.random().toString() };
    const newList = [...dummyInventory, inventoryData];
    setDummyInventory(newList);

    console.log(dummyInventory);
    setDisplayForm(false);
  };

  return (
    <div>
      <h1>Inventory</h1>
      {displayForm === false && (
        <div>
          <InventoryList inventory={dummyInventory} />
          <Button type="submit" onClick={displayInventoryFormHandler}>
            Add Ingredient
          </Button>
        </div>
      )}
      {displayForm === true && (
        <InventoryForm
          onCancel={cancelFormHandler}
          onGetInventoryData={getInventoryDataHandler}
        />
      )}
    </div>
  );
};

export default Inventory;
