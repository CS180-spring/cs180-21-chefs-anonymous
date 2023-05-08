import React from 'react'
import RecipesList from '../Recipes/RecipesList'
import DUMMY_RECIPES from "../Recipes/dummy-recipe-data.json";

const MealPlanModal = ({toggleModal, recipe}) => {
  console.log(recipe)
  var recipe_name = ""
  if (recipe === undefined) { recipe_name = "-" }
  else { recipe_name = recipe }
  return (
    <div className="modal1">
        <div onClick={toggleModal} className="overlay1"/>
        <div className="modal-content1">
            <h3 className="mealplan-modal-head">Recipe Name: {recipe_name}</h3>
            <p>You can select a meal:</p>
            <div className="meal-modal-list">
                <RecipesList recipes={DUMMY_RECIPES}/>
            </div>
        </div>
    </div>
  )
}

export default MealPlanModal