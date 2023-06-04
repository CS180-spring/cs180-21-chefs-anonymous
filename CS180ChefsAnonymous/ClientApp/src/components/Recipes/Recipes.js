
import React, { useState, useEffect } from "react";
import RecipesContext from "./RecipesContext";
import ExpandedRecipe from "./ExpandedRecipe";
import RecipesList from "./RecipesList";
import RecipeForm from "./RecipeForm";
import Button from "../UI/Button";
import DUMMY_RECIPES from "./dummy-recipe-data.json";
import dummyFilters from "./dummy-filter-options.json";
import Searchbar from "./Searchbar";
import MultiselectDropdown from "./MultiselectDropdown";
import styles from "./Recipes.module.css";

const CloseIcon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path
        d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
        fill="white"
      ></path>
    </svg>
  );
};

const Recipes = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [displayExpandedRecipe, setDisplayExpandedrecipe] = useState(false);
  const [dummyRecipes, setDummyRecipes] = useState(DUMMY_RECIPES);
  const [recipeItemData, setRecipeItemData] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [optionToDelete, setOptionToDelete] = useState(null);
  const [recipesList, setRecipesList] = useState("");
  const [searchList, setSearchList] = useState("");
  const [refresh, setRefresh] = useState(true);
    const userId = 3;
  useEffect(() => {
    fetch(`api/user/GetUserRecipes/${userId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response:", responseJson.$values);
        setRecipesList(responseJson.$values);
        setSearchList(responseJson.$values);
      })
      .catch((error) => {
        console.error(error);
      });

    console.log();
  }, [refresh]);

  const refreshRecipesHandler = (props) => {
    console.log("refreshed!");
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const recipeListDisplayHandler = (recipeSearchResults) => {
    setRecipesList(recipeSearchResults);
  };

  const displayRecipeFormHandler = () => {
    setDisplayForm(true);
  };
  const cancelFormHandler = () => {
    setDisplayForm(false);
  };
  const getRecipeDataHandler = (enteredRecipeData) => {
    const recipeData = { ...enteredRecipeData, id: Math.random().toString() };
    const newList = [...dummyRecipes, recipeData];
    setDummyRecipes(newList);
    setDisplayForm(false);
  };

  const expandRecipeItemDataHandler = (recipeItem) => {
    // console.log("expanding: ", recipeItem);
    setRecipeItemData(recipeItem);
    setDisplayExpandedrecipe(true);
  };
  const minimizeRecipeItemHandler = () => {
    setDisplayExpandedrecipe(false);
  };

  const displayFilters = () => {
    if (filterOptions.length === 0) {
      return;
    }
    return (
      <div className={styles.dropdown_tags}>
        {filterOptions.map((option) => (
          <div key={option.id} className={styles.dropdown_tag_item}>
            {option.name}
            <span
              onClick={() => onOptionDelete(option)}
              className={styles.dropdown_tag_close}
            >
              <CloseIcon />
            </span>
          </div>
        ))}
      </div>
    );
  };
  const displayOptionsHandler = (optionsArray) => {
    setFilterOptions(optionsArray);
  };
  const deleteOption = (option) => {
    return filterOptions.filter((op) => op.id !== option.id);
  };
  const onOptionDelete = (option) => {
    setFilterOptions(deleteOption(option));
    setOptionToDelete(option);
  };

  return (
    <div>
      <RecipesContext.Provider
        value={{
          recipeItemToExpand: expandRecipeItemDataHandler,
          recipeItemToMinimize: minimizeRecipeItemHandler,
          recipeListToDisplay: recipeListDisplayHandler,
          refreshRecipes: refreshRecipesHandler,
        }}
      >
        {displayExpandedRecipe === true && (
          <ExpandedRecipe
            recipe={recipeItemData}
            fullRecipesList={recipesList}
          />
        )}
        {displayExpandedRecipe === false && (
          <div>
            {displayForm === true && (
              <div>
                <RecipeForm
                  onCancel={cancelFormHandler}
                  onGetRecipeData={getRecipeDataHandler}
                  userId = {userId}
                />
              </div>
            )}
            <h1>Recipes</h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ marginRight: "10px" }}>
                <Searchbar recipes={recipesList} fullRecipesList={searchList} />
              </div>
              <MultiselectDropdown
                placeHolder="Filter by..."
                options={dummyFilters}
                onGetDisplayOptions={displayOptionsHandler}
                deleteOption={optionToDelete}
              />
            </div>
            <div>{displayFilters()}</div>

            <RecipesList recipes={recipesList} />
            <Button type="submit" onClick={displayRecipeFormHandler}>
              Add Recipe
            </Button>
          </div>
        )}
      </RecipesContext.Provider>
    </div>
  );
};

export default Recipes;
