import React, { useContext, useState } from "react";
import styles from "./InventoryItem.module.css";
import InventoryContext from "./InventoryContext";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import InventoryForm from "./InventoryForm";


const InventoryItem = (props) => {
  const context = useContext(InventoryContext);
  const [displayForm, setDisplayForm] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [displayEditDelete, setDisplayEditDelete] = useState(false);

  const displayInventoryFormHandler = (e) => {
    e.stopPropagation();
    setDisplayForm(true);
  };
  const cancelFormHandler = () => {
    setDisplayForm(false);
  };

    // Display Edit/Delete when hovered over
    const mouseOverDisplayDeleteHandler = () => {
      setDisplayEditDelete(true);
    };
    const mouseLeaveDisplayDeleteHandler = () => {
      setDisplayEditDelete(false);
    };

    const mouseOverHandler = (event) => {
      event.target.style.fontWeight = "bold";
      event.target.style.background = "#dfe6e3";
    };
    const mouseLeaveHandler = (event) => {
      event.target.style.fontWeight = "normal";
      event.target.style.background = "white";
    };

    const expandFullInventoryHandler = () => {
      console.log(props);
      context.onExpandFullInventory(props);
    };

    const deleteInventoryHandler = (e) => {
      e.stopPropagation();
      setDisplayDeleteModal(true);
    };
    const cancelDeleteModalHandler = () => {
      setDisplayDeleteModal(false);
    };
    const deleteDeleteModalHandler = () => {
      // Need API
      setDisplayDeleteModal(false);
    };
    // Edit recipe
    const getInventoryDataHandler = (enteredInventoryData) => {
      console.log("inventory data: ", enteredInventoryData);
      setDisplayForm(false);
  
      // Need API
    };

    function removeInventoryItem(key) {
      console.log(props.inventoryId, key);
      fetch(`api/inventory/DeleteInventory/${key}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }

  return (
    <div>
      {displayForm === true && (
        <div>
          <InventoryForm
            enteredTitle={props.enteredTitle}
            enteredAmount={props.enteredAmount}
            expiryDate={props.expiryDate}
            currentDate={props.currentDate}
            onCancel={cancelFormHandler}
            onGetInventoryData={getInventoryDataHandler}
          />
        </div>
      )}

      {displayDeleteModal === true && (
        <Modal>
          <h2>Delete {props.ingredient}?</h2>
          <div className={styles.delete_modal__buttons}>
            <Button
              onClick={cancelDeleteModalHandler}
              className={styles.cancel_button}
            >
              Cancel
            </Button>{" "}
            <Button
              onClick={() => {deleteDeleteModalHandler(); removeInventoryItem(props.inventoryId);}}
              type="submit"
              className={styles.delete_button}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
      <li>
        <Card
          className={styles.inventory_item}
          onClick={expandFullInventoryHandler}
          onMouseOver={mouseOverDisplayDeleteHandler}
          onMouseLeave={mouseLeaveDisplayDeleteHandler}
        >
          <h2>{props.ingredient}</h2>
          <h2>{props.quantity}</h2>
          

          {displayEditDelete === true && (
            <p
              className={styles.delete_inventory_item}
              onClick={displayInventoryFormHandler}
              onMouseOver={mouseOverHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              Edit
            </p>
          )}
          {displayEditDelete === true && (
            <p
              className={styles.delete_inventory_item}
              onClick={deleteInventoryHandler }
              onMouseOver={mouseOverHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              Delete
            </p>
          )}
        </Card>
      </li>
    </div>
  );
};

export default InventoryItem;
