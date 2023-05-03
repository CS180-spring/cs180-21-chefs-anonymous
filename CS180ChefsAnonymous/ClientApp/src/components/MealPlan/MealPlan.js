import React, { Component, useState, useMemo, useEffect } from "react";
import styles from "./MealPlan.css";
import data from "../../dummy-meal-plan.json";

const MealPlan = (props) => {
  const [modal, setModal] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [meals, setMeals] = useState([])
  const [meal_matrix, setMealMatrix] = useState(Array.from({length: 5},()=> Array.from({length: 7}, () => null)));
  console.log(meal_matrix)

  // const toggleModal = () => {
  //   setModal(!modal);
  // }

  const toggleModal = (i,j) => {
    setModal(!modal);
    setRecipe(filteredData.filter((jsonData) => jsonData.mealTime === i && jsonData.day_of_week === j)[0]?.recipe_id)
  }

  if (modal) {
    document.body.classList.add('active-modal');
    // document.getElementById("modal").style.display = "block";
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

  // useEffect(() => {
  //   // Runs after EVERY rendering
  // });

  const filteredData = data.filter( (jsonData) => jsonData.user_id === 1);
  // console.log("filtered data:",filteredData);

  const handleChange = (row, col, event) => {
    let copy = [...meal_matrix];
    copy[row][col] = filteredData.filter((jsonData) => jsonData.mealTime === row + 1 && jsonData.day_of_week === col + 1)[0]?.recipe_id;
    setMealMatrix(copy);

    console.log("meal matrix:",meal_matrix);
  };

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
              ({i},{j})
              {meal_matrix[i-1][j-1]}
              <input
                type="text"
                onChange={e => handleChange(i-1, j-1, e)}
              />
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
      {modal && (
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
