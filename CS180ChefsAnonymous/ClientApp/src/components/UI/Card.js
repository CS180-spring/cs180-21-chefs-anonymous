import React from "react";
import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`${styles.card} ${props.className}`}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </div>
  );
};

export default Card;
