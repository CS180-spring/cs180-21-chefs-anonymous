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
        console.log("here is prop:",prop);
        console.log("meal plan:", prop.mealPlan);
        
        const mealPlanID = prop.mealPlan ?? -5;
        console.log("recipe name:",prop.title, "recipe mealTime", props.mealTime);
        fetch("api/mealplan/UpdateMealPlan", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // pass the new user object as the request body
                mealPlanId: -5,
                mealTime: prop.mealPlan.mealTime,
                dayOfWeek: prop.mealPlan.dayOfWeek,
                userId: prop.mealPlan.userId,
          
                recipeId: prop.recipe_id 
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        props.setModal(!props.isModal);
        props.setRefresh(!props.refresh);
        props.setSpecificRecipe(prop.title);

        let copy = [...props.nameRecipe];
        copy[props.mealPlan.mealTime - 1][props.mealPlan.dayOfWeek - 1] = prop.title;
        props.setNameRecipe(copy);
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