import React from 'react'
import RecipesList from '../Recipes/RecipesList'
import DUMMY_RECIPES from "../Recipes/dummy-recipe-data.json";

const MealPlanModal = ({toggleModal, recipe}) => {
  return (
    <div className="modal1">
        <div onClick={toggleModal} className="overlay1"/>
        <div className="modal-content1">
            <h3 className="mealplan-modal-head">Recipe Name: {recipe}</h3>
            <div className="meal-modal-list">
                <RecipesList recipes={DUMMY_RECIPES}/>
            </div>
        </div>
    </div>
  )
}

export default MealPlanModal