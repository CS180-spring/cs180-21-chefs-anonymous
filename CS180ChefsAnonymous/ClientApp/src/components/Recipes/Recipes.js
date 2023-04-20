import React, { Component, useState } from "react";
//import Card from "../UI/Card";
import RecipesList from "./RecipesList";
import RecipeForm from "./RecipeForm";
import Button from "../UI/Button";

const DUMMY_RECIPES = [
  {
    id: "e1",
    title: "Chicken Curry",
    description: "Best meal for cold days",
    cuisine: "Japanese",
    preptime: { hours: 0, minutes: 20 },
    cooktime: { hours: 1, minutes: 0 },
    ingredients: ["potatoes", "curry base", "carrots"],
  },
  {
    id: "e2",
    title: "Burger",
    description: "Dad's recipe",
    cuisine: "American",
    preptime: { hours: 1, minutes: 0 },
    cooktime: { hours: 0, minutes: 10 },
    ingredients: ["bun", "patty", "lettuce", "ketchup", "onions"],
  },
  {
    id: "e3",
    title: "Chocolate Sponge Roll ",
    description: "My favorite dessert",
    cuisine: "Chinese",
    preptime: { hours: 2, minutes: 15 },
    cooktime: { hours: 0, minutes: 45 },
    ingredients: [
      "chocolate",
      "heavy whipping cream",
      "flour",
      "eggs",
      "sugar",
    ],
  },
];

const Recipes = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [dummyRecipes, setDummyRecipes] = useState(DUMMY_RECIPES);

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

    console.log(dummyRecipes);
    setDisplayForm(false);
  };

  return (
    <div>
      <h1>Recipes</h1>
      {displayForm === false && (
        <div>
          <RecipesList recipes={dummyRecipes} />
          <Button type="submit" onClick={displayRecipeFormHandler}>
            Add Recipe
          </Button>
        </div>
      )}
      {displayForm === true && (
        <RecipeForm
          onCancel={cancelFormHandler}
          onGetRecipeData={getRecipeDataHandler}
        />
      )}
    </div>
  );
};

export default Recipes;
