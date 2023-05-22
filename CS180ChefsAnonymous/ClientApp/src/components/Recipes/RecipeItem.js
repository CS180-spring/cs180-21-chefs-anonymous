import React, { useContext, useState } from "react";
import RecipesContext from "./RecipesContext";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import styles from "./RecipeItem.module.css";
import RecipeForm from "./RecipeForm";

const RecipeItem = (props) => {
  const context = useContext(RecipesContext);
  const [displayForm, setDisplayForm] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [displayEditDelete, setDisplayEditDelete] = useState(false);

  // Form display
  const displayRecipeFormHandler = (e) => {
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

  // Styling Edit and Delete Buttons on mouse events
  const mouseOverHandler = (event) => {
    event.target.style.fontWeight = "bold";
  };
  const mouseLeaveHandler = (event) => {
    event.target.style.fontWeight = "normal";
  };

  // Expand full recipe
  const expandFullRecipeHandler = () => {
    console.log("expanding from RecipeItem: ", props);
    context.recipeItemToExpand(props);
  };
  // Delete recipe
  const deleteRecipeHandler = (e) => {
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
  const getRecipeDataHandler = (enteredRecipeData) => {
    console.log("recipe data: ", enteredRecipeData);
    setDisplayForm(false);

    // Need API
  };

  return (
    <div>
      {displayForm === true && (
        <div>
          <RecipeForm
            title={props.title}
            cuisine={props.cuisine}
            description={props.description}
            prepHr={props.preptime.hours}
            prepMin={props.preptime.minutes}
            cookHr={props.cooktime.hours}
            cookMin={props.cooktime.minutes}
            ingredients={props.ingredients}
            onCancel={cancelFormHandler}
            onGetRecipeData={getRecipeDataHandler}
          />
        </div>
      )}
      {displayDeleteModal === true && (
        <Modal>
          <h2>Delete {props.RecipeTitle}?</h2>
          <div className={styles.delete_modal__buttons}>
            <Button
              onClick={cancelDeleteModalHandler}
              className={styles.cancel_button}
            >
              Cancel
            </Button>{" "}
            <Button
              onClick={deleteDeleteModalHandler}
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
          className={styles.recipe_item}
          onClick={expandFullRecipeHandler}
          onMouseOver={mouseOverDisplayDeleteHandler}
          onMouseLeave={mouseLeaveDisplayDeleteHandler}
        >
          <h2>{props.RecipeTitle}</h2>
          {displayEditDelete === true && (
            <p
              className={styles.delete_recipe_item}
              onClick={displayRecipeFormHandler}
              onMouseOver={mouseOverHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              Edit
            </p>
          )}
          {displayEditDelete === true && (
            <p
              className={styles.delete_recipe_item}
              onClick={deleteRecipeHandler}
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

export default RecipeItem;
