import React, {useState, useEffect} from "react";
//import Card from "../UI/Card";
import InventoryList from "./InventoryList";
import InventoryForm from "./InventoryForm";
import Button from "../UI/Button";

const DUMMY_INVENTORY = [
  {
    id: "e1",
    ingredient: "Tomatoes",
    quantity: "3", 
    expiryDate: "7/14/2019", //new Date(2019, 7, 14), 
    currentDate: "3/14/2021", //new Date(2021, 3, 14), 

    
  },
  {
    id: "e2",
    ingredient: "Potatoes",
    quantity: "3", 
    expiryDate: "4/5/2019", //new Date(2019, 5, 4), 
    currentDate: "3/14/2021", //new Date(2021, 3, 14), 
  },
  
  {
    id: "e3",
    ingredient: "Cheese",
    quantity: "3", 
    expiryDate: "3/4/2020", //new Date(2020, 3, 4), 
    currentDate: "6/14/2021", //new Date(2021, 6, 14), 
  },
];


const Inventory = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [dummyInventory, setDummyInventory] = useState(DUMMY_INVENTORY);
  const [inventoryList, setInventory] = useState("");
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    fetch("api/inventory/GetInventory")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response:", responseJson);
        setInventory(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const refreshInventoryHandler = (props) => {
    console.log("refreshed!");
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const displayInventoryFormHandler = () => {
    setDisplayForm(true);
  };
  const cancelFormHandler = () => {
    setDisplayForm(false);
  };
  const getInventoryDataHandler = async (enteredInventoryData) => {
    //const inventoryData = { ...enteredInventoryData, id: Math.random().toString() };
    //const newList = [...dummyInventory, inventoryData];
    //setDummyInventory(newList);
    //console.log(dummyInventory);
    //setDisplayForm(false);
      try {
          const response = await fetch("api/inventory/AddInventory", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(enteredInventoryData),
          });
          if (response.ok) {
              setRefresh((prevRefresh) => !prevRefresh);
              setDisplayForm(false);
          } else {
              console.error("Failed to add inventory item");
          }
      } catch (error) {
          console.error(error);
      }
  };

  return (
    <div>
      <h1>Inventory</h1>
      {displayForm === false && (
        <div>

          {/* <InventoryList inventory={dummyInventory} /> */}
          <InventoryList inventory={inventoryList} />

        <Button
            type="submit"
            onClick={displayInventoryFormHandler}
            isEditing={false}
        >
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
