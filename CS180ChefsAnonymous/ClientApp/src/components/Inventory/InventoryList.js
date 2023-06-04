import React, { useState } from "react";
import styles from "./InventoryList.module.css";
import InventoryItem from "./InventoryItem";
import ExpandedInventory from "./ExpandedInventory";

const InventoryList = (props) => {

  console.log(props);
  const [displayFullInventory, setDisplayFullInventory] = useState(false);

  if (props.inventory.length === 0) {
    return <h2 className={styles.recieps_list__fallback}>Found no inventory.</h2>;
  }

  let selectedInventory;
  const expandFullInventoryHandler = (inventoryToExpand) => {
    selectedInventory = inventoryToExpand;
    setDisplayFullInventory(true);
  };

  return (
    <div>
      {!displayFullInventory && (
        <ul className={styles.inventory_list}>
          {props.inventory.map((inventory) => (
            <InventoryItem
              key={inventory.id}
              inventoryId={inventory.inventoryId}
              ingredient={inventory.itemName}
              quantity = {inventory.qty}
              expiryDate = {inventory.expiryDate}
              currentDate = {inventory.currentDate}
              onExpandFullInventory={expandFullInventoryHandler}
            />
          ))}
        </ul>
      )}
      {displayFullInventory && <ExpandedInventory inventory={selectedInventory} />}
    </div>
  );
};

export default InventoryList;
