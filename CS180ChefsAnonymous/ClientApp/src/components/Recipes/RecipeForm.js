import React, { useState } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import styles from "./RecipeForm.module.css";
import UlStyles from "./RecipesList.module.css";

const RecipeForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState(props.title);
  const [enteredCuisine, setEnteredCuisine] = useState(props.cuisine);
  const [enteredDescription, setEnteredDescription] = useState(
    props.description
  );
  const [enteredHoursPreptime, setEnteredHoursPreptime] = useState(
    props.prepHr
  );
  const [enteredMinutesPreptime, setEnteredMinutesPreptime] = useState(
    props.prepMin
  );
  const [enteredHoursCooktime, setEnteredHoursCooktime] = useState(
    props.cookHr
  );
  const [enteredMinutesCooktime, setEnteredMinutesCooktime] = useState(
    props.cookMin
  );
  const [enteredIngredient, setEnteredIngredient] = useState(props.ingredients);
  const [newIngredient, setNewIngredient] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const cuisineChangeHandler = (event) => {
    setEnteredCuisine(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  const hoursPreptimeChangeHandler = (event) => {
    setEnteredHoursPreptime(event.target.value);
  };
  const minutesPreptimeChangeHandler = (event) => {
    setEnteredMinutesPreptime(event.target.value);
  };
  const hoursCooktimeChangeHandler = (event) => {
    setEnteredHoursCooktime(event.target.value);
  };
  const minutesCooktimeChangeHandler = (event) => {
    setEnteredMinutesCooktime(event.target.value);
  };
  const newIngredientHandler = (event) => {
    setNewIngredient(event.target.value);
  };
  const addIngredientHandler = () => {
    const newIngredientToAdd = {
      id: Math.random().toString(),
      name: newIngredient,
    };

    let newIngredientsList = [];
    if (enteredIngredient === undefined) {
      newIngredientsList = [newIngredientToAdd];
    } else {
      newIngredientsList = [...enteredIngredient, newIngredientToAdd];
    }
    setEnteredIngredient(newIngredientsList);
    setNewIngredient("");
  };

  const cancelHandler = () => {
    props.onCancel();
  };
  const formSubmitHandler = async (event) => {                     
    event.preventDefault();
    const recipeData = {                                
        recipeId: 28,
        recipeTitle: enteredTitle,
        recipeDesc: enteredDescription,
        preptime: enteredMinutesPreptime,
        cooktime: enteredMinutesCooktime,
        userId: 3,
        categoryId: 1,
    };
    /** Update form^ for the following json format
     
        recipeId: 2,
        recipeTitle: "Merman Kabob",
        recipeDesc: "Not Jinbe",
        instructions: "Catch and cook",
        prepTime: 1,
        cookingTime: 3,
        userId: 3,
        categoryId: 1,
    */
      try {
          const response = await fetch("api/recipe/AddRecipe", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
            },
              body: JSON.stringify(recipeData),
          });

          if (!response.ok) {
              throw new Error("Failed to add recipe");
          }


          const responseData = await response.json();
          const recipeId = responseData.recipeId;

          for (const ingredient of enteredIngredient) {
              const ingredientData = {                      
                  ingredientId: 24,
                  recipeId: recipeId,
                  itemName: ingredient.name,
                  qty: enteredHoursCooktime,
                  unit: "tsp",
              };

              /** Update form^ for the following json format
              Update form to have the following json format
                ingredientId: GUID.newGUID(); ,        // We might have to update the models to use GUID
                recipeId: recipeId,
                itemName: ingredient.name,
                qty: enteredQty,
                unit: enteredUnit,        // example tsp, tbs, cup, etc     ie 3 letter abbreviations
              */

              const ingredientResponse = await fetch("api/ingredient/AddIngredient", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(ingredientData),
              });

              if (!ingredientResponse.ok) {
                  throw new Error("Failed to add ingredient");
              }
          }

          // Resetting form inputs
          setEnteredTitle("");
          setEnteredCuisine("");
          setEnteredDescription("");
          setEnteredIngredient([]);
      } catch (error) {
          console.error(error);
      }
  };

    

  return (
    <div className={styles.backdrop}>
      <Modal>
        <h2 className={styles.new_recipe__controls}>Add Recipe</h2>
        <form onSubmit={formSubmitHandler}>
          <div className={styles.new_recipe__controls}>
            <div className={styles.new_recipe__control}>
              <label>Title</label>
              <input
                type="text"
                value={enteredTitle}
                onChange={titleChangeHandler}
              />
            </div>
            <div className={styles.new_recipe__control}>
              <label>Cuisine</label>
              <input
                type="text"
                value={enteredCuisine}
                onChange={cuisineChangeHandler}
              />
            </div>
            <div className={styles.new_recipe__control}>
              <label>Description</label>
              <input
                type="text"
                value={enteredDescription}
                onChange={descriptionChangeHandler}
              />
            </div>
            <div className={styles.new_recipe__control}>
              <label>Prep Time</label>
              <input
                type="number"
                value={enteredHoursPreptime}
                min="0"
                max="24"
                onChange={hoursPreptimeChangeHandler}
                style={{ width: "35%" }}
              />
              :
              <input
                type="number"
                value={enteredMinutesPreptime}
                min="0"
                max="59"
                onChange={minutesPreptimeChangeHandler}
                style={{ width: "35%" }}
              />
            </div>
            <div className={styles.new_recipe__control}>
              <label>Cook Time</label>
              <input
                type="number"
                value={enteredHoursCooktime}
                min="0"
                max="24"
                onChange={hoursCooktimeChangeHandler}
                style={{ width: "35%" }}
              />
              :
              <input
                type="number"
                value={enteredMinutesCooktime}
                min="0"
                max="59"
                onChange={minutesCooktimeChangeHandler}
                style={{ width: "35%" }}
              />
            </div>
          </div>
          <div className={styles.new_recipe__controls}>
            <div className={styles.new_recipe__control}>
              <label>Add Ingredient</label>
              <input
                type="text"
                value={newIngredient}
                onChange={newIngredientHandler}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (newIngredient !== "") {
                      addIngredientHandler();
                    }
                  }
                }}
              />{" "}
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  if (newIngredient !== "") {
                    addIngredientHandler();
                  }
                }}
              >
                Add
              </Button>
              {enteredIngredient !== undefined && 
              <ul className={UlStyles.recipes_list}>
                {enteredIngredient.map((ingredient) => (
                  <li key={ingredient.id} className={styles.ingredients_list}>
                    {ingredient.qty} {ingredient.name}
                  </li>
                ))}
              </ul>}
            </div>
          </div>

          {/*Submit button */}
          <div className={styles.new_recipe__actions}>
            <Button onClick={cancelHandler} className={styles.cancel_button}>
              Cancel
            </Button>{" "}
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RecipeForm;
