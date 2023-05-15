import React, { useContext, useState } from 'react'
import Card from "../UI/Card";
import styles from "../Recipes/RecipeItem.module.css";
import RecipeForm from "../Recipes/RecipeForm";

const RecipeItem = (props) => {
    const context = useContext(React.createContext());
    const [displayForm, setDisplayForm] = useState(false);
    const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
    const [displayEditDelete, setDisplayEditDelete] = useState(false);
  
    // Form display
    const displayRecipeFormHandler = (e) => {
      e.stopPropagation();
      setDisplayForm(true);
    };
    const cancelFormHandler = () => {
      setDisplayForm(false);
    };

    const updateMealPlan = (prop) => {
        console.log("meal plan:",props.mealPlan)
        console.log(prop.title);
        fetch("api/mealplan/UpdateMealPlan/"+props.mealPlan.userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // pass the new user object as the request body
                meal_plan_id: props.mealPlan.mealPlanId,
                user_id: props.mealPlan.userId,
                meal_time: props.mealPlan.mealTime,
                day_of_week: props.mealPlan.dayOfWeek,
                recipe_id: prop.recipe_id
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }
    
    // Edit recipe
    const getRecipeDataHandler = (enteredRecipeData) => {
      console.log("recipe data: ", enteredRecipeData);
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
              ingredients={props.ingredients}
              onCancel={cancelFormHandler}
              onGetRecipeData={getRecipeDataHandler}
            />
          </div>
        )}
        <li>
          <Card
            className={styles.recipe_item}
            onClick={() => updateMealPlan(props)}
          >
            <h2>{props.title}</h2>
            
          </Card>
        </li>
      </div>
    );
};

export default RecipeItem