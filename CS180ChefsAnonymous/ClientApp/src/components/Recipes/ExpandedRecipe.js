import React, { useState } from "react";
import styles from "./ExpandedRecipe.module.css";
import Button from "../UI/Button";
import RecipeForm from "./RecipeForm";

const ExpandedRecipe = (props) => {
  const [displayForm, setDisplayForm] = useState(false);

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
  const deleteRecipeHandler = () => {
    console.log("deleting recipe now!");
    // Go back to main recipe page
    // Need API
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
