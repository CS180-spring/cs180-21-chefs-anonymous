import React, { useState, useEffect } from "react";
import MealPlanModal from "./MealPlanModal";
// We need to import this style
import style from './MealPlan.css';

const MealPlan = (props) => {
  // data is for useState 'recipe' (we pass mealtime object to another component)
  const [data, setData] = useState([]);
  // isModal is for displaying modal
  const [isModal, setModal] = useState(false);
  // recipe is a recipe we can retrieve by clicking a cell
  const [recipe, setRecipe] = useState("");
  // recipesList is a list of recipes that we can select
  const [recipesList, setRecipesList] = useState("");
  // nameRecipe is a list of recipe's names for manipulating table
  const [nameRecipe, setNameRecipe] = useState(Array.from({length: 5},()=> Array.from({length: 7}, () => null)));

  // recipeDisplay is a recipe that is displayed in modal 
  const [recipeDisplay, setRecipeDisplay] = useState("");

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // specificRecipe is a recipe that i clicked in modal
  const [specificRecipe, setSpecificRecipe] = useState("");

  useEffect(() => {
      fetch("api/recipe/GetRecipes")
          .then((response) => response.json())
          .then((responseJson) => {
              console.log("response:",responseJson);
              setRecipesList(responseJson);
          })
          .catch((error) => {
              console.error(error);
          });
  }, []);

  useEffect(() => {
    // need to figure out how to get user (need a login page)
    let ignore = false
    fetch("api/mealplan/GetMealPlan/1")
      .then((response) => response.json())
      .then((responseJson) => {
        if(!ignore){
          console.log("response json",responseJson);
          setData(responseJson);
          console.log("setdata is called");
        }
      })
      .catch((error) => {
        console.error(error);
      });
      console.log("modal changed");

      return () => {ignore=true}
  }, [isModal]);

  useEffect(() => {
    setLoading(true);
    fetch("api/mealplan/GetMealPlanName/1")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("getRecipeName json",responseJson);
        setLoading(false);
        setNameRecipe(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  },[]);

  const toggleModal = (i,j) => {
    console.log("yeeeeeeeeeeeeeeeeeeeeeeeee",data)
    setModal(prev => !prev);
    setRecipe(data.filter((jsonData) => jsonData.mealTime === i && jsonData.dayOfWeek === j)[0]);
    console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeee",i,j, nameRecipe[i-1][j-1])
    setRecipeDisplay(nameRecipe[i-1][j-1]);
  }

  if (isModal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const rows = 6;
  const cols = 8;

  function getDay(j){
    if (j===0) return 'Time'
    else if (j===1) return 'Sun'
    else if (j===2) return 'Mon'
    else if (j===3) return 'Tue'
    else if (j===4) return 'Wed'
    else if (j===5) return 'Thu'
    else if (j===6) return 'Fri'
    else if (j===7) return 'Sat'
  }

  function getMealTime(i) {
    if (i===1) return 'Breakfast'
    else if (i===2) return 'Lunch'
    else if (i===3) return 'Snacks'
    else if (i===4) return 'Dinner'
    else if (i===5) return 'Dessert'
  }

  const tableRows = [];
  for (let i = 0; i < rows; i++) {
    const tableCells = [];
    for (let j = 0; j < cols; j++) {
      if (i===0){
        tableCells.push(
          <th id={i+'-'+j} key={i+'-'+j}>
            {getDay(j)}
          </th>
        );
      }
      else {
        if (j === 0 && i !== 0) {
          tableCells.push(
            <td id={i+'-'+j} key={i+'-'+j}>
              {getMealTime(i)}
            </td>
          );
        }
        else {
          // console.log("This is nameReipe:", nameRecipe);
          if (nameRecipe !== undefined){
            tableCells.push(
              <td id={i+'-'+j} key={i+'-'+j} onClick={ () => toggleModal(i,j)}>
                {loading && (
                  <div>Loading</div>
                )}
                {!loading && (
                  nameRecipe[i-1][j-1]
                )}
              </td>
            );
          }
        }
      }
    }
    tableRows.push(
      <tr id={i} key={i}>
        {tableCells}
      </tr>
    );
  }

  return (
    <div>
      <table>
        <tbody>
          {tableRows}
        </tbody>
      </table>
      {isModal && (
        <MealPlanModal toggleModal={toggleModal} recipe={recipe} 
        recipesList={recipesList} isModal={isModal} setModal={setModal}
         refresh={refresh} setRefresh={setRefresh} specificRecipe={specificRecipe}
         setSpecificRecipe={setSpecificRecipe} setNameRecipe={setNameRecipe}
         nameRecipe={nameRecipe} recipeDisplay={recipeDisplay}/>
      )}
    </div>
  );
};

export default MealPlan;
