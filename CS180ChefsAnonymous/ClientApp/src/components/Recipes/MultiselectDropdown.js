import React, { useState, useEffect } from "react";
import styles from "./MultiselectDropdown.module.css";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const MultiselectDropdown = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setselectedOptions] = useState([]);

  // Returns new array that excludes the deleted option
  const deleteOption = (option) => {
    return selectedOptions.filter((op) => op.id !== option.id);
  };

  // Clicking away from the dropdown box will close it
  useEffect(() => {
    const handler = () => setShowOptions(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });
  // Clicking on the dropdown box will display the dropdown menu
  const inputHandler = (event) => {
    event.stopPropagation();
    setShowOptions(true);
  };
  // When an option in the dropdown menu is clicked, it is added to the selectedOptions array and sent to Recipes.js
    const selectOption = (option) => {
        console.log("bingbingbing");
    let newOptions;
    if (selectedOptions.findIndex((o) => o.id === option.id) >= 0) {
      newOptions = deleteOption(option);
    } else {
      newOptions = [...selectedOptions, option];
    }
    // if newoptions size is 1 or greater
    // then run this api call
        

    setselectedOptions(newOptions);
    props.onGetDisplayOptions(newOptions);
  };
  // When an option in Recipes.js is deleted, it is deleted from selectedOptions
  useEffect(() => {
    setselectedOptions((prevOptions) =>
      prevOptions.filter((o) => o.id !== props.deleteOption.id)
    );
  }, [props.deleteOption]);

  // Conditionally style selected options if they are in the selectedOptions array.
  const isSelected = (option) => {
    return selectedOptions.filter((o) => o.id === option.id).length > 0;
  };

  return (
    <div className={styles.dropdown_container}>
      <div onClick={inputHandler} className={styles.dropdown_input}>
        <div className={styles.dropdown_selected_value}>
          {props.placeHolder}
        </div>
        <div className={styles.dropdown_tools}>
          <div className={styles.dropdown_tool}>
            <Icon />
          </div>
        </div>
      </div>
      {showOptions && (
        <div className={styles.dropdown_menu}>
          {props.options.map((option) => (
            <div
              key={option.id}
              className={`${styles.dropdown_item} ${
                isSelected(option) && styles.selected_option
              }`}
              onClick={() => selectOption(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiselectDropdown;
