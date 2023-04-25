import React, { useContext, useState } from "react";
import RecipesContext from "./RecipesContext";
import Card from "../UI/Card";
import styles from "./RecipeItem.module.css";
import RecipeForm from "./RecipeForm";
import DUMMY_RECIPES from "./dummy-recipe-data.json";

const RecipeItem = (props) => {
  const context = useContext(RecipesContext);
  const [displayForm, setDisplayForm] = useState(false);

  const displayRecipeFormHandler = () => {
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
  const mouseOverHandler = (event) => {
    event.target.style.fontWeight = "bold";
  };
  const mouseLeaveHandler = (event) => {
    event.target.style.fontWeight = "normal";
  };

  const expandFullRecipeHandler = () => {
    context.recipeItemToExpand(props);
  };
  const deleteRecipeHandler = () => {
    // Need API
  };
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
