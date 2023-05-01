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

  // Form display
  const displayRecipeFormHandler = (e) => {
    e.stopPropagation();
    setDisplayForm(true);
  };
  const cancelFormHandler = () => {
    setDisplayForm(false);
  };
  // const [display, setDisplay] = useState(false);

  //let displayDelete = ();
  // const mouseOverDisplayDeleteHandler = () => {
  //   setDisplay(true);
  // };
  // const mouseLeaveDisplayDeleteHandler = () => {
  //   setDisplay(false);
  // };

  // Styling Edit and Delete Buttons on mouse events
  const mouseOverHandler = (event) => {
    event.target.style.fontWeight = "bold";
  };
  const mouseLeaveHandler = (event) => {
    event.target.style.fontWeight = "normal";
  };

  // Expand full recipe
  const expandFullRecipeHandler = () => {
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
  // Edit recipe
  const getRecipeDataHandler = (enteredRecipeData) => {
    console.log("got form data!");
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
            onCancel={cancelFormHandler}
            onGetRecipeData={getRecipeDataHandler}
          />
        </div>
      )}
      {displayDeleteModal === true && (
        <Modal>
          <h2>Delete Recipe?</h2>
          <div className={styles.delete_modal__buttons}>
            <Button onClick={cancelDeleteModalHandler}>Cancel</Button>{" "}
            <Button type="submit">Delete</Button>
          </div>
        </Modal>
      )}
      <li>
        <Card
          className={styles.recipe_item}
          onClick={expandFullRecipeHandler}
          // onMouseOver={mouseOverDisplayDeleteHandler}
          // onMouseLeave={mouseLeaveDisplayDeleteHandler}
        >
          <h2>{props.title}</h2>
          <p
            className={styles.delete_recipe_item}
            onClick={displayRecipeFormHandler}
            onMouseOver={mouseOverHandler}
            onMouseLeave={mouseLeaveHandler}
          >
            Edit
          </p>
          <p
            className={styles.delete_recipe_item}
            onClick={deleteRecipeHandler}
            onMouseOver={mouseOverHandler}
            onMouseLeave={mouseLeaveHandler}
          >
            Delete
          </p>
        </Card>
      </li>
    </div>
  );
};

export default RecipeItem;
