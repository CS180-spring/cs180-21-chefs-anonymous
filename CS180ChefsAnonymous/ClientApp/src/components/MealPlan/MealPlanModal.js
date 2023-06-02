import React from 'react'
import RecipesList from '../MealPlan/RecipesList'
import DUMMY_RECIPES from "../Recipes/dummy-recipe-data.json";

const MealPlanModal = ({toggleModal, recipe, recipesList, isModal, setModal, refresh, setRefresh, specificRecipe, setSpecificRecipe, setNameRecipe, nameRecipe, recipeDisplay}) => {
  var recipe_name = ""
  if (recipe === undefined) { recipe_name = "-" }
  else { recipe_name = recipeDisplay }
  return (
    <div className="modal1">
        <div onClick={() => setModal(prev=>!prev)} className="overlay1"/>
        <div className="modal-content1">
            <h3 className="mealplan-modal-head">Recipe Name: {recipe_name}</h3>
            <p className='meal-modal-p'>You can select a meal from here:</p>
            <div className="meal-modal-list">
                <RecipesList recipes={recipesList} mealPlan={recipe} isModal={isModal}
                 setModal={setModal} refresh={refresh} setRefresh={setRefresh}
                 specificRecipe={specificRecipe} setSpecificRecipe={setSpecificRecipe}
                 setNameRecipe={setNameRecipe} nameRecipe={nameRecipe}/>
            </div>
        </div>
    </div>
  )
}

export default MealPlanModal