import React, { useState, useEffect } from "react";
import styles from "./Searchbar.module.css";

const Searchbar = (props) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

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
      const filteredResults = props.recipes.filter((item) =>
        item.title.toLowerCase().includes(inputValue.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setShowResults(false);
      setResults([]);
    }
  };

  return (
    <div className={styles.searchbar_container}>
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={handleChange}
        className={`${styles.searchbar_input} `}
      />
      {showResults && (
        <div className={styles.searchbar_menu}>
          {results.map((item) => (
            <div key={item.id} className={styles.searchbar_item}>
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
