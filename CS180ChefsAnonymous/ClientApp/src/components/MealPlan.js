import React, { useState } from "react";
import data from "../dummy-meal-plan.json";

const MealPlan = (props) => {
  const [plans] = useState(data);
  // const [plans, setPlans] = useState(data);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Meal Time</th>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr>
              <td>{plan.mealTime}</td>
              <td>{plan.Sun}</td>
              <td>{plan.Mon}</td>
              <td>{plan.Tue}</td>
              <td>{plan.Wed}</td>
              <td>{plan.Thu}</td>
              <td>{plan.Fri}</td>
              <td>{plan.Sat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealPlan;
