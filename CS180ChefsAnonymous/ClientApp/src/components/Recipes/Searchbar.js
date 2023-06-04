import React, { useState, useEffect, useContext } from "react";
import styles from "./Searchbar.module.css";
import RecipesContext from "./RecipesContext";

const CloseIcon = ({ className, onClick }) => {
  return (
    <svg
      className={className}
      height="20"
      width="20"
      viewBox="0 0 20 20"
      onClick={onClick}
    >
      <path
        d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
        fill="black"
      ></path>
    </svg>
  );
};

const Searchbar = (props) => {
  const context = useContext(RecipesContext);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const recipesList = props.recipes;

  useEffect(() => {
    const handler = () => setShowResults(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    setShowResults(true);
    if (inputValue.length > 0) {
      const filteredResults = recipesList.filter((item) =>
        item.RecipeTitle.toLowerCase().includes(inputValue.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setShowResults(false);
      context.recipeListToDisplay(props.fullRecipesList);
      setResults([]);
    }
  };

  const enterKeyHandler = (e) => {
    if (e.key === "Enter") {
      if (input.trim() !== "") {
        context.recipeListToDisplay(results);
      }
    }
  };
  const handleClearInput = () => {
    setInput("");
    context.recipeListToDisplay(props.fullRecipesList);
  };

  // Expand full recipe
  const expandFullRecipeHandler = (item) => {
    console.log("searchbar item to expand: ", item);
    context.recipeItemToExpand(item);
  };

  return (
    <div className={styles.searchbar_container}>
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={handleChange}
        onKeyDown={enterKeyHandler}
        className={`${styles.searchbar_input} `}
      />
      {input !== "" && (
        <CloseIcon onClick={handleClearInput} className={styles.close_icon} />
      )}
      {showResults && (
        <div className={styles.searchbar_menu}>
          {results.map((item) => (
            <div
              key={item.RecipeId}
              className={styles.searchbar_item}
              onClick={() => expandFullRecipeHandler(item)}
            >
              {item.RecipeTitle}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
