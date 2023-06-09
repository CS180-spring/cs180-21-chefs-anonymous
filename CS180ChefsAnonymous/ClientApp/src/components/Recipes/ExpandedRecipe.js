import React, { useState, useEffect, useContext } from "react";
import RecipesContext from "./RecipesContext";
import styles from "./ExpandedRecipe.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import RecipeForm from "./RecipeForm";

const Icon = () => {
  return (
    <svg
      fill="#000000"
      height="15"
      width="15"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g data-name="Layer 2">
        <g data-name="arrow-ios-back">
          <rect
            width="24"
            height="24"
            transform="rotate(90 12 12)"
            opacity="0"
          />

          <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" />
        </g>
      </g>
    </svg>
  );
};

const ExpandedRecipe = (props) => {
  const context = useContext(RecipesContext);
  const [displayForm, setDisplayForm] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const backButtonHandler = () => {
    context.refreshRecipes();
    context.recipeItemToMinimize();
  };

  const displayRecipeFormHandler = () => {
    setDisplayForm(true);
  };
  const cancelFormHandler = () => {
    setDisplayForm(false);
  };

  let totalMin =
    (parseInt(props.recipe.PrepTime) % 60) +
    (parseInt(props.recipe.CookingTime) % 60);
  let totalHr =
    Math.floor(parseInt(props.recipe.PrepTime) / 60) +
    Math.floor(parseInt(props.recipe.CookingTime) / 60);
  if (totalMin >= 60) {
    totalHr += Math.floor(totalMin / 60);
    totalMin = totalMin % 60;
  }

  const getRecipeDataHandler = (enteredRecipeData) => {
    console.log("got form data!");
    setDisplayForm(false);

    // Need API: POST
  };
  // Delete recipe
  const deleteRecipeHandler = (e) => {
    e.stopPropagation();
    setDisplayDeleteModal(true);
  };
  const cancelDeleteModalHandler = () => {
    setDisplayDeleteModal(false);
  };
  const deleteDeleteModalHandler = async () => {
    try {
      await fetch(
        "api/ingredient/DeleteIngredientsByRecipe/" + props.recipe.RecipeId,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
      await fetch("api/recipe/DeleteRecipe/" + props.recipe.RecipeId, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
      context.refreshRecipes();
      context.recipeItemToMinimize();
      setDisplayDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // console.log("recipe id: ", props.recipe.id);
    fetch("api/recipe/GetRecipeIngredients/" + props.recipe.RecipeId, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("recipe ingredients response:", responseJson);
        setRecipeIngredients(responseJson);
      })
      .catch((error) => error(error));
  }, [props.recipe.RecipeId]);

  const recipeIngredientsList = recipeIngredients.$values;

  return (
    <div>
      {displayForm === true && (
        <div>
          <RecipeForm
            recipeId={props.recipe.RecipeId}
            title={props.recipe.RecipeTitle}
            description={props.recipe.RecipeDesc}
            preptime={props.recipe.PrepTime}
            cooktime={props.recipe.CookingTime}
            onCancel={cancelFormHandler}
            onGetRecipeData={getRecipeDataHandler}
            isEditing={true}
          />
        </div>
      )}
      {displayDeleteModal === true && (
        <Modal>
          <h2>Delete {props.recipe.RecipeTitle}?</h2>
          <div className={styles.delete_modal__buttons}>
            <Button
              onClick={cancelDeleteModalHandler}
              className={styles.cancel_button_expanded_recipe}
            >
              Cancel
            </Button>{" "}
            <Button
              onClick={deleteDeleteModalHandler}
              type="submit"
              className={styles.delete_button_expanded_recipe}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
      <div
        className={styles.back_button_Recipes_page}
        onClick={backButtonHandler}
      >
        <Icon />
        <p className={styles.underline_on_hover}>Recipes</p>
      </div>

      <h1>{props.recipe.RecipeTitle}</h1>
      <p>{props.recipe.RecipeDesc}</p>
      <div className={styles.container}>
        <div>
          <h4>Preptime</h4>
          <span>
            {Math.floor(parseInt(props.recipe.PrepTime) / 60)} hr{" "}
            {Math.floor(parseInt(props.recipe.PrepTime) % 60)}
          </span>
        </div>
        <div>
          <h4>Cooktime</h4>
          <span>
            {Math.floor(parseInt(props.recipe.CookingTime) / 60)} hr{" "}
            {Math.floor(parseInt(props.recipe.CookingTime) % 60)}
          </span>
        </div>
        <div>
          <h4>Total Time</h4>
          <span>
            {totalHr} hr {totalMin} min
          </span>
        </div>
      </div>

      <div>
        <h4>Ingredients</h4>
        {recipeIngredientsList != undefined &&
          recipeIngredientsList.map((ingredient) => (
            <li key={ingredient.$id}>
              {ingredient.Qty} {ingredient.ItemName}
            </li>
          ))}
      </div>
      <div className={styles.expanded_recipe__actions}>
        <Button type="button" onClick={displayRecipeFormHandler}>
          Edit
        </Button>{" "}
        <Button type="button" onClick={deleteRecipeHandler}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ExpandedRecipe;
