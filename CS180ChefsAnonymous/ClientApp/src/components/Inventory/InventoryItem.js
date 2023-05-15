import React, {useContext, useState} from "react";
import InventoryContext from "./InventoryContext"
import Card from "../UI/Card";
import styles from "./InventoryItem.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import styles from "./InventoryItem.module.css";
import InventoryForm from "./InventoryForm";



const InventoryItem = (props) => {
  const context = useContext(InventoryContext);
  const [displayForm, setDisplayForm] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [displayEditDelete, setDisplayEditDelete] = useState(false);




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
