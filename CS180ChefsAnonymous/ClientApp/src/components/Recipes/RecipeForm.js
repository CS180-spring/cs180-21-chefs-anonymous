import React, { useState, useEffect } from "react";
import UlStyles from "./RecipesList.module.css";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import styles from "./RecipeForm.module.css";
import DropdownMenu from "../UI/DropdownMenu";
import { v4 as uuid } from 'uuid';

const RecipeForm = (props) => {
  // Array containing category types
  const categoryList = [
    { id: "e1", title: "Appetizer" },
    { id: "e2", title: "Salads" },
    { id: "e3", title: "Main Course" },
    { id: "e4", title: "Side Dish" },
    { id: "e5", title: "Baked Goods" },
    { id: "e6", title: "Dessert" },
    { id: "e7", title: "Snack" },
    { id: "e8", title: "Soup" },
    { id: "e9", title: "Holiday" },
    { id: "e10", title: "Vegetarian" },
  ];

  // Array containing cuisine types
  const cuisineList = [
    { id: 1, title: "American" },
    { id: 2, title: "Argentinian" },
    { id: 3, title: "Australian" },
    { id: 4, title: "Belgian" },
    { id: 5, title: "Brazilian" },
    { id: 6, title: "Canadian" },
    { id: 7, title: "Caribbean" },
    { id: 8, title: "Chinese" },
    { id: 9, title: "Egyptian" },
    { id: 10, title: "French" },
    { id: 11, title: "German" },
    { id: 12, title: "Greek" },
    { id: 13, title: "Indian" },
    { id: 14, title: "Irish" },
    { id: 15, title: "Italian" },
    { id: 16, title: "Japanese" },
    { id: 17, title: "Korean" },
    { id: 18, title: "Lebanese" },
    { id: 19, title: "Mediterranean" },
    { id: 20, title: "Mexican" },
    { id: 21, title: "Moroccan" },
    { id: 22, title: "Persian" },
    { id: 23, title: "Russian" },
    { id: 24, title: "Scottish" },
    { id: 25, title: "Spanish" },
    { id: 26, title: "Swedish" },
    { id: 27, title: "Thai" },
    { id: 28, title: "Turkish" },
    { id: 29, title: "Vietnamese" },
    { id: 30, title: "Welsh" },
  ];
  const mealtimeList = [
    { id: 1, title: "Breakfast" },
    { id: 2, title: "Brunch" },
    { id: 3, title: "Lunch" },
    { id: 4, title: "Dinner" },
  ];

  // const [enteredTitle, setEnteredTitle] = useState("");
  // // const [enteredTitle, setEnteredTitle] = useState(props.title);
  // const [enteredCuisine, setEnteredCuisine] = useState("");
  // // const [enteredCuisine, setEnteredCuisine] = useState(props.cuisine);
  // const [enteredCategory, setEnteredCategory] = useState("");
  // // const [enteredCategory, setEnteredCategory] = useState(props.category);
  // const [enteredDescription, setEnteredDescription] = useState(
  //   props.description
  // );
  // const [enteredHoursPreptime, setEnteredHoursPreptime] = useState(
  //   props.prepHr
  // );
  // const [enteredMinutesPreptime, setEnteredMinutesPreptime] = useState(
  //   props.prepMin
  // );
  // const [enteredHoursCooktime, setEnteredHoursCooktime] = useState(
  //   props.cookHr
  // );
  // const [enteredMinutesCooktime, setEnteredMinutesCooktime] = useState(
  //   props.cookMin
  // );
  // const [enteredIngredient, setEnteredIngredient] = useState(props.ingredients);
  // const [newIngredient, setNewIngredient] = useState("");

  const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredCuisine, setEnteredCuisine] = useState({});
    const [enteredCategory, setEnteredCategory] = useState({});
  const [enteredMealtime, setEnteredMealtime] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredHoursPreptime, setEnteredHoursPreptime] = useState(0);
  const [enteredMinutesPreptime, setEnteredMinutesPreptime] = useState(0);
  const [enteredHoursCooktime, setEnteredHoursCooktime] = useState(0);
  const [enteredMinutesCooktime, setEnteredMinutesCooktime] = useState(0);
  const [enteredIngredient, setEnteredIngredient] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  // If props contains values (Form populates w/ existing recipe info), initialize recipe info states
  useEffect(() => {
    if (props.title != undefined) {
      setEnteredTitle(props.title);
      setEnteredCuisine(props.cuisine);
      setEnteredCategory(props.category);
      setEnteredMealtime(props.mealtime);
      setEnteredDescription(props.description);
      setEnteredHoursPreptime(props.prepHr);
      setEnteredMinutesPreptime(props.prepMin);
      setEnteredHoursCooktime(props.cookHr);
      setEnteredMinutesCooktime(props.cookMin);
      setEnteredIngredient(props.ingredients);
    }
  }, []);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const selectCuisineHandler = (selectedCuisine) => {
    setEnteredCuisine(selectedCuisine);
  };
  const selectCategoryHandler = (selectedCategory) => {
    setEnteredCategory(selectedCategory);
  };
  const selectMealtimeHandler = (selectedMealtime) => {
    setEnteredMealtime(selectedMealtime);
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
      const recipeID = uuid();
    // Post recipe to Recipe table in DB
      const recipeData = {
        recipeId: recipeID,
        recipeTitle: enteredTitle,
        recipeDesc: enteredDescription,
        preptime:
        parseInt(enteredMinutesPreptime) + parseInt(enteredHoursPreptime) * 60,
        cooktime:
        parseInt(enteredMinutesCooktime) + parseInt(enteredHoursCooktime) * 60,
        userId: 6,
        categoryId: 1,
    };

      console.log(recipeData);
      
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
      //const recipeId = responseData.recipeId;


      // Post ingredients to Ingredients table in DB
      for (const ingredient of enteredIngredient) {
        const newGUID = uuid();
        const ingredientData = {
          ingredientId: newGUID,
          recipeId: recipeID,
          itemName: ingredient.name,
          qty: enteredHoursCooktime,
          unit: "tsp",
        };
        
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

      // Post cuisine,categoryType,favorite,mealtime to Category table in DB
      const CategoryData = {
        categoryId: 22,
        cuisine: enteredCuisine.title,
        categoryType: enteredCategory.title,
        difficulty: 3,
        favorite: "Yes",
          amntOfServings: 1.0,
          mealtime:"breakfast",
      };

      const categoryResponse = await fetch("api/category/AddCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          CategoryData,
        ),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

      // Resetting form inputs
      setEnteredTitle("");
      setEnteredCuisine("");
      setEnteredCategory("");
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
        <form onSubmit={formSubmitHandler} className={styles.add_recipe_wrapper}>
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
              <label>Category</label>
              <DropdownMenu
                placeholder={""}
                options={categoryList}
                isSearchable={false}
                OnSelectedOption={selectCategoryHandler}
              />
            </div>
            <div className={styles.new_recipe__control}>
              <label>Cuisine</label>
              <DropdownMenu
                placeholder={""}
                options={cuisineList}
                isSearchable={true}
                OnSelectedOption={selectCuisineHandler}
              />
            </div>
            <div className={styles.new_recipe__control}>
              <label>Mealtime</label>
              <DropdownMenu
                placeholder={""}
                options={mealtimeList}
                isSearchable={false}
                OnSelectedOption={selectMealtimeHandler}
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
              {enteredIngredient !== undefined && (
                <ul className={UlStyles.recipes_list}>
                  {enteredIngredient.map((ingredient) => (
                    <li key={ingredient.id} className={styles.ingredients_list}>
                      {ingredient.qty} {ingredient.name}
                    </li>
                  ))}
                </ul>
              )}
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
