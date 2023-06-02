import React, { useEffect, useState } from 'react'
import styles from "../Recipes/RecipesList.module.css";
import RecipeItem from "./RecipeItem";

const RecipesList = ({recipes, mealPlan, isModal, setModal, refresh, setRefresh, specificRecipe, setSpecificRecipe, setNameRecipe, nameRecipe}) => {
    if (recipes.length === 0) {
        return <h2 className={styles.recieps_list__fallback}>Found no recipes.</h2>;
    }
    return (
    <div>
      <ul className={styles.recipes_list}>
        {recipes.map((recipe) => (
          <RecipeItem
            key={recipe.recipeId}
            title={recipe.recipeTitle}
            category={recipe.categoryId}
            description={recipe.recipeDesc}
            preptime={recipe.prepTime}
            cooktime={recipe.cookingTime}
            recipe_id={recipe.recipeId}
            mealPlan={mealPlan}
            setModal={setModal}
            isModal={isModal}
            refresh={refresh}
            setRefresh={setRefresh}
            specificRecipe={specificRecipe}
            setSpecificRecipe={setSpecificRecipe}
            setNameRecipe={setNameRecipe}
            nameRecipe={nameRecipe}
          />
        ))}
      </ul>
    </div>
  )
}

export default RecipesList