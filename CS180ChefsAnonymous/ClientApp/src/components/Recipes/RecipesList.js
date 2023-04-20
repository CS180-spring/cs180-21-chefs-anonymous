import React, { useState } from "react";
import styles from "./RecipesList.module.css";
import RecipeItem from "./RecipeItem";
import ExpandedRecipe from "./ExpandedRecipe";

const RecipesList = (props) => {
  const [displayFullRecipe, setDisplayFullRecipe] = useState(false);

  if (props.recipes.length === 0) {
    return <h2 className={styles.recieps_list__fallback}>Found no recipes.</h2>;
  }

  let selectedRecipe;
  const expandFullRecipeHandler = (recipeToExpand) => {
    selectedRecipe = recipeToExpand;
    setDisplayFullRecipe(true);
  };

  return (
    <div>
      {!displayFullRecipe && (
        <ul className={styles.recipes_list}>
          {props.recipes.map((recipe) => (
            <RecipeItem
              key={recipe.id}
              title={recipe.title}
              cuisine={recipe.cuisine}
              description={recipe.description}
              preptime={recipe.preptime}
              cooktime={recipe.cooktime}
              ingredients={recipe.ingredients}
              onExpandFullRecipe={expandFullRecipeHandler}
            />
          ))}
        </ul>
      )}
      {displayFullRecipe && <ExpandedRecipe recipe={selectedRecipe} />}
    </div>
  );
};

export default RecipesList;
