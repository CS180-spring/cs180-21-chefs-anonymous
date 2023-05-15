import React from "react";
import Card from "../UI/Card";
import styles from "./InventoryItem.module.css";




const InventoryItem = (props) => {
  const mouseOverHandler = (event) => {
    event.target.style.background = "#dfe6e3";
  };
  const mouseLeaveHandler = (event) => {
    event.target.style.background = "white";
  };

  const expandFullInventoryHandler = () => {
    props.onExpandFullInventory(props);
  };

  return (
    <li>
      <Card
        className={styles.inventory_item}
        onClick={expandFullInventoryHandler}
        onMouseOver={mouseOverHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <strong>{props.ingredient} </strong>
      </Card>
    </li>
  );
};

export default InventoryItem;
