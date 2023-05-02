import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${props.className} ${styles.button} `} //style REUSEABLE button
      type={props.type || "button"} // HTML buttons can either: submit, reset, button (effects controlled by JS)
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
