import React, { Component, useState, useMemo, useEffect } from "react";
import styles from "./MealPlan.css";
// import data from "../../dummy-meal-plan.json";
import MealPlanModal from "./MealPlanModal";
import Modal from "../UI/Modal";

const MealPlan = (props) => {
  const [data, setData] = useState([]);

  const [isModal, setModal] = useState(false);
  // recipe is a recipe we can retrieve by clicking a cell
  const [recipe, setRecipe] = useState("");
  const [publicRecipe, setPublicRecipe] = useState("");
  // meal_matrix is a table which contains recipe_id for displaying in a cell of table
  const [meal_matrix, setMealMatrix] = useState(Array.from({length: 5},()=> Array.from({length: 7}, () => null)));

  const [recipesList, setRecipesList] = useState("");
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

  const toggleModal = (i,j) => {
    setModal(!isModal);
    setRecipe(filteredData.filter((jsonData) => jsonData.mealTime === i && jsonData.dayOfWeek === j)[0])
  }

  useEffect(() => {
    // need to figure out how to get user (need a login page)
    fetch("api/mealplan/GetMealPlan/1")
      .then((response) => response.json())
      .then((responseJson) => {
        // fix this later
        // setTimeout(()=>{
          console.log("response json",responseJson);
          setData(responseJson);
          console.log("setdata is called");
        // }, 100);
      })
      .catch((error) => {
        console.error(error);
      });
      console.log("modal changed");
  }, [isModal]);

const [nameRecipe, setNameRecipe] = useState(Array.from({length: 5},()=> Array.from({length: 7}, () => null)));
  const getRecipeName = (recipe_id) => {
    // var nameRecipe
    if (recipe_id !== undefined){
      fetch("api/recipe/GetRecipe/"+recipe_id)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("getRecipeName json",responseJson);
        // nameRecipe = responseJson.recipeTitle
        setNameRecipe(responseJson)
        // return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      // nameRecipe = undefined
      // setNameRecipe(undefined)
    }
  }

  useEffect(() => {
    console.log("this is meal_matrix desu:", meal_matrix);
    var nameList = Array.from({length: 5},()=> Array.from({length: 7}, () => null));
    for (let i = 1; i < rows; i++) {
      for (let j = 1; j < cols; j++) {
        if (meal_matrix[i-1][j-1] !== undefined){
          fetch("api/recipe/GetRecipe/"+meal_matrix[i-1][j-1])
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("hello from the other side")
            console.log("getRecipeName json",responseJson);
            // nameRecipe = responseJson.recipeTitle
            // setNameRecipe(responseJson)
            nameList[i-1][j-1] = responseJson.recipeTitle
            // return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
        } else {
          console.log("went to error with ", "[",i-1,"][",j-1,"]",
          "\nmeal_matrix:",meal_matrix,"and :",meal_matrix[i-1][j-1]);
          console.log(meal_matrix,"this is it: meal_matrix","[",i-1,"][",j-1,"]", meal_matrix[i-1][j-1])

          var myArray = [
            [undefined, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ];
          console.log("this is it",myArray,myArray[0][1])
          // nameList[i-1][j-1] = null;
          // nameRecipe = undefined
          // setNameRecipe(undefined)
        }
      }
    }
    console.log("meal_matrix in useEffect:",meal_matrix);
    console.log("this is nameList desu",nameList)
    setNameRecipe(nameList)
},[meal_matrix]);


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

  const filteredData = data
  console.log("filteredData:",filteredData)
  let copy = [...meal_matrix];
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      copy[i-1][j-1] = filteredData.filter((jsonData) => 
      jsonData.mealTime === i && jsonData.dayOfWeek === j)[0]?.recipeId;
      // copy[i-1][j-1] = recipesList.filter((data) => 
      // data.recipeId === filteredData.filter((jsonData) => 
      // jsonData.mealTime === i && jsonData.dayOfWeek === j)[0]?.recipeId
      // );
    }
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
          console.log("meal matrix","[",i-1,"]","[",j-1,"]","=",meal_matrix[i-1][j-1])
          console.log("This is nameReipe:",nameRecipe);
          console.log("This is supposed to be Cookie2:",nameRecipe[0][6],"meal_matrix is:",meal_matrix[0][6]);
          if (nameRecipe !== undefined){
            tableCells.push(
              <td id={i+'-'+j} key={i+'-'+j} onClick={ () => toggleModal(i,j)}>
                {/* {meal_matrix[i-1][j-1]} */}
                {/* {getRecipeName(meal_matrix[i-1][j-1])} */}
                {nameRecipe[i-1][j-1]}
              </td>
            );
          } else {
            tableCells.push(
              <td id={i+'-'+j} key={i+'-'+j} onClick={ () => toggleModal(i,j)}>
                {meal_matrix[i-1][j-1]}
                {/* {getRecipeName(meal_matrix[i-1][j-1])} */}
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
        <MealPlanModal toggleModal={toggleModal} recipe={recipe} recipesList={recipesList} isModal={isModal} setModal={setModal}/>
      )}
    </div>
  );
};

export default MealPlan;
