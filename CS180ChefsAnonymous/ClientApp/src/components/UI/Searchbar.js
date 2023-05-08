import React, { useState } from "react";
import styles from "./Searchbar.module.css";
// import dummyRecipe from "../Recipes/dummy-recipe-data.json";

const Searchbar = (props) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    const filteredResults = props.recipes.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={handleChange}
        className={styles.searchbar}
      />
      {/* <ul>
        {results.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Searchbar;
