import React, { Component, useState, useMemo, useEffect } from "react";
import styles from "./MealPlan.css";
import data from "../../dummy-meal-plan.json";

const MealPlan = (props) => {
  const [isModal, setModal] = useState(false);
  // recipe is a recipe we can retrieve by clicking a cell
  const [recipe, setRecipe] = useState("");
  const [meals, setMeals] = useState([])
  // meal_matrix is a table which contains recipe_id for displaying in a cell of table
  const [meal_matrix, setMealMatrix] = useState(Array.from({length: 5},()=> Array.from({length: 7}, () => null)));


  const toggleModal = (i,j) => {
    setModal(!isModal);
    setRecipe(filteredData.filter((jsonData) => jsonData.mealTime === i && jsonData.day_of_week === j)[0]?.recipe_id)
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

  useEffect(() => {
    // Runs after EVERY rendering
  });

  const filteredData = data.filter( (jsonData) => jsonData.user_id === 1);

  let copy = [...meal_matrix];
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      copy[i-1][j-1] = filteredData.filter((jsonData) => jsonData.mealTime === i && jsonData.day_of_week === j)[0]?.recipe_id;
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
          tableCells.push(
            <td id={i+'-'+j} key={i+'-'+j} onClick={ () => toggleModal(i,j)}>
              {meal_matrix[i-1][j-1]}
            </td>
          );
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
        <div className="modal1">
          <div onClick={toggleModal} className="overlay1"></div>
          <div className="modal-content1">
            <h3>{recipe}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlan;
