import React from "react";
import Card from "./Card";
import styles from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div
      className={`${styles.modal_formatting} ${styles.backdrop}`}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
      onBlur={props.onBlur}
    >
      <Card className={styles.modal}>{props.children}</Card>
    </div>
  );
};

export default Modal;
