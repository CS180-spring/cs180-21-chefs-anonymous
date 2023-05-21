import React from "react";
import styles from "./RecipesList.module.css";
import RecipeItem from "./RecipeItem";

const RecipesList = (props) => {
  if (props.recipes.length === 0) {
    return <h2 className={styles.recieps_list__fallback}>Found no recipes.</h2>;
  }

  const recipesList = props.recipes.$values;

  if (recipesList !== undefined) {
    return (
      <div>
        <ul className={styles.recipes_list}>
          {recipesList.map((recipe) => (
            <RecipeItem
              key={recipe.RecipeId}
              id={recipe.RecipeId}
              title={recipe.RecipeTitle}
              // cuisine={recipe.cuisine}
              description={recipe.RecipeDesc}
              preptime={recipe.PrepTime}
              cooktime={recipe.CookingTime}
              // ingredients={recipe.ingredients}
            />
          ))}
        </ul>
      </div>
    );
  }
};
// const RecipesList = (props) => {
//   // if (props.recipes.length === 0) {
//   //   return <h2 className={styles.recieps_list__fallback}>Found no recipes.</h2>;
//   // }
//   console.log("here", props.recipes);

//   return (
//     <div>
//       <ul className={styles.recipes_list}>
//         {props.recipes.map((recipe) => (
//           <RecipeItem
//             key={recipe.id}
//             title={recipe.title}
//             cuisine={recipe.cuisine}
//             description={recipe.description}
//             preptime={recipe.preptime}
//             cooktime={recipe.cooktime}
//             ingredients={recipe.ingredients}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// };

export default RecipesList;
