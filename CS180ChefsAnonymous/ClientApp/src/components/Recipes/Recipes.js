import React, { useState } from "react";
import RecipesContext from "./RecipesContext";
import ExpandedRecipe from "./ExpandedRecipe";
import RecipesList from "./RecipesList";
import RecipeForm from "./RecipeForm";
import Button from "../UI/Button";
import DUMMY_RECIPES from "./dummy-recipe-data.json";

const Recipes = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [displayExpandedRecipe, setDisplayExpandedrecipe] = useState(false);
  const [dummyRecipes, setDummyRecipes] = useState(DUMMY_RECIPES);
  const [recipeItemData, setRecipeItemData] = useState(null);

  const displayRecipeFormHandler = () => {
    setDisplayForm(true);
  };
  const cancelFormHandler = () => {
    setDisplayForm(false);
  };
  const getRecipeDataHandler = (enteredRecipeData) => {
    const recipeData = { ...enteredRecipeData, id: Math.random().toString() };
    const newList = [...dummyRecipes, recipeData];
    setDummyRecipes(newList);
    setDisplayForm(false);
  };

  const expandRecipeItemDataHandler = (recipeItem) => {
    setRecipeItemData(recipeItem);
    setDisplayExpandedrecipe(true);
  };

  return (
    <div>
      <RecipesContext.Provider
        value={{ recipeItemToExpand: expandRecipeItemDataHandler }}
      >
        {displayExpandedRecipe === true && (
          <ExpandedRecipe recipe={recipeItemData} />
        )}
        {displayExpandedRecipe === false && (
          <div>
            {displayForm === true && (
              <div>
                <RecipeForm
                  onCancel={cancelFormHandler}
                  onGetRecipeData={getRecipeDataHandler}
                />
              </div>
            )}
            <h1>Recipes</h1>
            <RecipesList recipes={dummyRecipes} />
            <Button type="submit" onClick={displayRecipeFormHandler}>
              Add Recipe
            </Button>
          </div>
        )}
      </RecipesContext.Provider>
    </div>
  );
};

export default Recipes;
