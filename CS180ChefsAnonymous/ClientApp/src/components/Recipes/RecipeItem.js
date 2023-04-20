import React from "react";
import Card from "../UI/Card";
import styles from "./RecipeItem.module.css";

const RecipeItem = (props) => {
  const mouseOverHandler = (event) => {
    event.target.style.background = "#dfe6e3";
  };
  const mouseLeaveHandler = (event) => {
    event.target.style.background = "white";
  };

  const expandFullRecipeHandler = () => {
    props.onExpandFullRecipe(props);
  };

  return (
    <li>
      <Card
        className={styles.recipe_item}
        onClick={expandFullRecipeHandler}
        onMouseOver={mouseOverHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <strong>{props.title} </strong>
      </Card>
    </li>
  );
};

export default RecipeItem;
