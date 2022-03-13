import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../Actions/index";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }
  function handleSubmit(e) {
    try {
      dispatch(getRecipesByName(input));
    } catch (error) {
      return error;
    }

    setInput("");
  }

  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder=""
        value={input}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button
        className={styles.searchButton}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        <h5 className={styles.namePosition}>Buscar</h5>
      </button>
    </div>
  );
}

export default SearchBar;
