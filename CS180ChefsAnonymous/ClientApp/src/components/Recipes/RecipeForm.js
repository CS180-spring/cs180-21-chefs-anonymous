import React, { useState, useEffect, useContext } from "react";
import UlStyles from "./RecipesList.module.css";
import RecipesContext from "./RecipesContext";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import styles from "./RecipeForm.module.css";
import DropdownMenu from "../UI/DropdownMenu";
import { v4 as uuid } from "uuid";

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
  // Array containing meal times
  const mealtimeList = [
    { id: 1, title: "Breakfast" },
    { id: 2, title: "Brunch" },
    { id: 3, title: "Lunch" },
    { id: 4, title: "Dinner" },
  ];
  // Array containing units
  const unitList = [
    { id: 1, title: "tsp" },
    { id: 2, title: "tbsp" },
    { id: 3, title: "cup" },
    { id: 4, title: "pint" },
    { id: 5, title: "quart" },
    { id: 6, title: "gallon" },
  ];

  const context = useContext(RecipesContext);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredCuisine, setEnteredCuisine] = useState({});
  const [enteredCategory, setEnteredCategory] = useState({});
  const [enteredMealtime, setEnteredMealtime] = useState({});
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredHoursPreptime, setEnteredHoursPreptime] = useState(0);
  const [enteredMinutesPreptime, setEnteredMinutesPreptime] = useState(0);
  const [enteredHoursCooktime, setEnteredHoursCooktime] = useState(0);
  const [enteredMinutesCooktime, setEnteredMinutesCooktime] = useState(0);
  const [enteredIngredient, setEnteredIngredient] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [enteredUnit, setEnteredUnit] = useState({});
  const [enteredQty, setEnteredQty] = useState("");
  const [currentIngredients, setCurrentIngredients] = useState([]);

  // Initialize recipe info states if editing a recipe
  useEffect(() => {
    if (props.title != undefined) {
      console.log("Editing is true: ", props.isEditing, props);
      // Populate form with existing recipe data
      setEnteredTitle(props.title);
      setEnteredDescription(props.description);
      setEnteredHoursPreptime(Math.floor(parseInt(props.preptime) / 60));
      setEnteredMinutesPreptime(parseInt(props.preptime) % 60);
      setEnteredHoursCooktime(Math.floor(parseInt(props.cooktime) / 60));
      setEnteredMinutesCooktime(parseInt(props.cooktime) % 60);

      // Populate form with existing ingredient data
      fetch("api/recipe/GetRecipeIngredients/" + props.recipeId, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.$values);
          setEnteredIngredient(data.$values);
          setCurrentIngredients(data.$values);
        })
        .catch((error) => error(error));

      // Populate form with existing category data
      // fetch("api/category/GetCategory")
      //   .then((response) => response.json())
      //   .then((responseJson) => {
      //     console.log("category data: ", responseJson);
      //     setCategory(responseJson);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      // setEnteredCuisine(props.cuisine);
      // setEnteredCategory(props.category);
      // setEnteredMealtime(props.mealtime);
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
    console.log(enteredMealtime);
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
  const selectUnitHandler = (selectedUnit) => {
    setEnteredUnit(selectedUnit);
  };
  const changeQtyHandler = (event) => {
    setEnteredQty(event.target.value);
  };
  const addIngredientHandler = () => {
    const newIngredientToAdd = {
      IngredientId: Math.random().toString(),
      ItemName: newIngredient,
      Qty: enteredQty,
      Unit: enteredUnit,
    };

    console.log("new ingredient: ", newIngredientToAdd);

    let newIngredientsList = [];
    if (enteredIngredient === []) {
      // if (enteredIngredient === undefined) {
      newIngredientsList = [newIngredientToAdd];
    } else {
      newIngredientsList = [...enteredIngredient, newIngredientToAdd];
    }
    setEnteredIngredient(newIngredientsList);
    setNewIngredient("");
  };
  // Close recipe form
  const cancelHandler = () => {
    props.onCancel();
  };

  let userId;
  try {
    const userJSON = localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      userId = user.UserId;
    } else {
      console.error("User data not found in localStorage.");
    }
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    userId = 3;
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    // Post recipe to Recipe table in DB
    if (!props.isEditing) {
      try {
        const recipeID = uuid();
        const recipe_temp = recipeID;
        const recipeData = {
          recipeId: recipeID,
          recipeTitle: enteredTitle,
          recipeDesc: enteredDescription,
          preptime:
            parseInt(enteredMinutesPreptime) +
            parseInt(enteredHoursPreptime) * 60,
          cookingTime:
            parseInt(enteredMinutesCooktime) +
            parseInt(enteredHoursCooktime) * 60,
          userId: userId,
          categoryId: 1,
        };
        console.log("before launch");
        console.log(recipeData);

        // Post cuisine, categoryType, favorite, mealtime to Category table in DB
        let CategoryData = {
          categoryId: 22,
          cuisine: enteredCuisine.title,
          categoryType: enteredCategory.title,
          difficulty: 3,
          favorite: "Yes",
          amntOfServings: 1.0,
          mealtime: enteredMealtime.title,
        };

        const categoryResponse = await fetch("api/category/AddCategory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(CategoryData),
        });

        try {
          const data = await categoryResponse.json();
          console.log("Here");
          console.log(data);
          recipeData.categoryId = data.categoryId;
        } catch (error) {
          console.error(error);
        }

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

          // Post ingredients to Ingredients table in DB
          for (const ingredient of enteredIngredient) {
            const newGUID = uuid();

            const ingredientData = {
              ingredientId: newGUID,
              recipeId: recipeId,
              itemName: ingredient.name,
              qty: enteredHoursCooktime,
              unit: "tsp",
            };
            console.log("ingredientData");

            console.log(ingredientData);

            const ingredientResponse = await fetch(
              "api/ingredient/AddIngredient",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(ingredientData),
              }
            );

            if (!ingredientResponse.ok) {
              throw new Error("Failed to add ingredient");
            }
          }

          // Resetting form inputs
          setEnteredTitle("");
          setEnteredCuisine("");
          setEnteredCategory("");
          setEnteredDescription("");
          setEnteredIngredient([]);
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // Update recipe table in DB
      //   const updatedRecipeData = {
      //     recipeId: props.recipeId,
      //     recipeTitle: enteredTitle,
      //     recipeDesc: enteredDescription,
      //     instructions: "Instructions coming soon...",
      //     prepTime:
      //       parseInt(enteredMinutesPreptime) +
      //       parseInt(enteredHoursPreptime) * 60,
      //     cookingTime:
      //       parseInt(enteredMinutesCooktime) +
      //       parseInt(enteredHoursCooktime) * 60,
      //     userId: 6,
      //     categoryId: 1,
      //   };

      //   fetch("api/recipe/UpdateRecipe/" + props.recipeId, {
      //     method: "PATCH",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(updatedRecipeData),
      //   })
      //     .then((response) => response.json())
      //     .then((data) => console.log(data))
      //     .catch((error) => console.error(error));

      // Update ingredient table in DB
      enteredIngredient.forEach((ingredient) => {
        const ingredientExists = currentIngredients.some(
          (currentIngredient) =>
            currentIngredient.IngredientId === ingredient.IngredientId
        );

        if (ingredientExists) {
          console.log(`Ingredient ${ingredient.ItemName} already in DB.`);
        } else {
          console.log(`Posting new ingredient: ${ingredient.ItemName}`);

          //   const newGUID = uuid();

          //   const ingredientData = {
          //     ingredientId: newGUID,
          //     recipeId: recipeId,
          //     itemName: ,
          //     qty: enteredQty,
          //     unit: "tsp",
          //   };

          //   fetch("api/ingredient/AddIngredient", {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       ingredientId: 80,
          //       recipeId: 78,
          //       itemName: "Sauce packet",
          //       qty: 1,
          //       unit: "tsp",
          //     }),
          //   })
          //     .then((response) => response.json())
          //     .then((data) => console.log(data))
          //     .catch((error) => console.error(error));
        }
      });

      currentIngredients.forEach((currentIngredient) => {
        const ingredientExists = enteredIngredient.some(
          (ingredient) =>
            ingredient.IngredientId === currentIngredient.IngredientId
        );

        if (!ingredientExists) {
          console.log(`Deleting old ingredient: ${currentIngredient.ItemName}`);
        }
      });
      // Update category table in DB

      context.refreshRecipes();
      props.onCancel();
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
                placeholder="Title..."
                onChange={newIngredientHandler}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (newIngredient !== "") {
                      addIngredientHandler();
                    }
                  }
                }}
              />
              <p></p>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="number"
                  value={enteredQty}
                  placeholder="Qty"
                  min="0"
                  max="24"
                  onChange={changeQtyHandler}
                  style={{ width: "20%" }}
                />
                <DropdownMenu
                  placeHolder={"Units"}
                  options={unitList}
                  isSearchable={false}
                  OnSelectedOption={selectUnitHandler}
                />
              </div>

              <p></p>
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
                    <li
                      key={ingredient.IngredientId}
                      className={styles.ingredients_list}
                    >
                      {ingredient.Qty} {ingredient.ItemName}
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
