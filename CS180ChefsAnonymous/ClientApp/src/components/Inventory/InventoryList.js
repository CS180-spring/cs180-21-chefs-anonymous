import React, { useState } from "react";
import styles from "./InventoryList.module.css";
import InventoryItem from "./InventoryItem";
import ExpandedInventory from "./ExpandedInventory";

const InventoryList = (props) => {
  const [displayFullInventory, setDisplayFullInventory] = useState(false);

  if (props.inventory.length === 0) {
    return <h2 className={styles.inventory_list__fallback}>Found no inventory.</h2>;
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
              title={inventory.title}
              cuisine={inventory.cuisine}
              description={inventory.description}
              preptime={inventory.preptime}
              cooktime={inventory.cooktime}
              ingredients={inventory.ingredients}
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
