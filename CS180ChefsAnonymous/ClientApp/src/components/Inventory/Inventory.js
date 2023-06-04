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
  const getInventoryDataHandler = (enteredInventoryData) => {
    const inventoryData = { ...enteredInventoryData, id: Math.random().toString() };
    const newList = [...dummyInventory, inventoryData];
    setDummyInventory(newList);

    console.log(dummyInventory);
    setDisplayForm(false);
  };

  return (
    <div>
      {displayForm === false && (
        <div style={{display:"flex", flexDirection:"column",height: "calc(95vh - 2rem)",alignItems: "center", justifyContent:"center"}}>
          <div style={{display:"flex", margin: "2rem 0px", width: "85vw"}}>
            <div style={{padding:" 1rem 3rem",backgroundColor: "rgb(229, 227, 221)",
            boxShadow: "inset 0 0 20px 10px rgba(0, 0, 0, 0.044)",width: "40vw",height: "60vh",
            borderRadius: "30px",marginRight: "3rem",overflowY: "scroll"}}>
              <InventoryList inventory={inventoryList} />
            </div>
            <div style={{width:"60vw", backgroundImage:"url(https://localhost:44462/static/media/inventory.8b99f88c801dd5532e8a.png)",borderRadius:"40px",
            backgroundPosition: "center",backgroundRepeat: "no-repeat",objectFit: "cover"}} />
          </div>
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
