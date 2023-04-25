import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./RecipeForm.module.css";

const RecipeForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredCuisine, setEnteredCuisine] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredHoursPreptime, setEnteredHoursPreptime] = useState(0);
  const [enteredMinutesPreptime, setEnteredMinutesPreptime] = useState(0);
  const [enteredHoursCooktime, setEnteredHoursCooktime] = useState(0);
  const [enteredMinutesCooktime, setEnteredMinutesCooktime] = useState(0);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const cuisineChangeHandler = (event) => {
    setEnteredCuisine(event.target.value);
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

  const cancelHandler = () => {
    props.onCancel();
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();

    const recipeData = {
      title: enteredTitle,
      cuisine: enteredCuisine,
      description: enteredDescription,
      preptime: {
        hours: enteredHoursPreptime,
        minutes: enteredMinutesPreptime,
      },
      cooktime: {
        hours: enteredHoursCooktime,
        minutes: enteredMinutesCooktime,
      },
    };

    props.onGetRecipeData(recipeData);

    setEnteredTitle("");
    setEnteredCuisine("");
    setEnteredDescription("");
  };

  return (
    <div className={styles.backdrop}>
      <Card className={styles.modal}>
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
              <label>Cuisine</label>
              <input
                type="text"
                value={enteredCuisine}
                onChange={cuisineChangeHandler}
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

          {/*Submit button */}
          <div className={styles.new_recipe__actions}>
            <Button onClick={cancelHandler}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RecipeForm;
