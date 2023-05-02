import React, { useState } from "react";
import styles from "./ExpandedRecipe.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import RecipeForm from "./RecipeForm";

const ExpandedRecipe = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);

  const displayRecipeFormHandler = () => {
    setDisplayForm(true);
  };
  const cancelFormHandler = () => {
    setDisplayForm(false);
  };

  let totalMin =
    parseInt(props.recipe.preptime.minutes) +
    parseInt(props.recipe.cooktime.minutes);
  let totalHr =
    parseInt(props.recipe.preptime.hours) +
    parseInt(props.recipe.cooktime.hours);
  if (totalMin >= 60) {
    totalHr += Math.floor(totalMin / 60);
    totalMin = totalMin % 60;
  }

  const getRecipeDataHandler = (enteredRecipeData) => {
    console.log("got form data!");
    setDisplayForm(false);

    // Need API
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
    // need to go back to main recipe page
    setDisplayDeleteModal(false);
  };

  return (
    <div>
      {displayForm === true && (
        <div>
          <RecipeForm
            title={props.recipe.title}
            cuisine={props.recipe.cuisine}
            description={props.recipe.description}
            prepHr={props.recipe.preptime.hours}
            prepMin={props.recipe.preptime.minutes}
            cookHr={props.recipe.cooktime.hours}
            cookMin={props.recipe.cooktime.minutes}
            onCancel={cancelFormHandler}
            onGetRecipeData={getRecipeDataHandler}
          />
        </div>
      )}
      {displayDeleteModal === true && (
        <Modal>
          <h2>Delete {props.recipe.title}?</h2>
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
      <h1>{props.recipe.title}</h1>
      <h2>{props.recipe.cuisine}</h2>
      <p>{props.recipe.description}</p>
      <div className={styles.container}>
        <div>
          <h4>Preptime</h4>
          <span>
            {props.recipe.preptime.hours} hr {props.recipe.preptime.minutes} min
          </span>
        </div>
        <div>
          <h4>Cooktime</h4>
          <span>
            {props.recipe.cooktime.hours} hr {props.recipe.cooktime.minutes} min
          </span>
        </div>
        <div>
          <h4>Total Time</h4>
          <span>
            {totalHr} hr {totalMin} min
          </span>
        </div>
      </div>
      <Button type="button" onClick={displayRecipeFormHandler}>
        Edit
      </Button>{" "}
      <Button type="button" onClick={deleteRecipeHandler}>
        Delete
      </Button>
    </div>
  );
};

export default ExpandedRecipe;
