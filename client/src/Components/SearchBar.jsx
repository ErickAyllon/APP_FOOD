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
        className="searchInput"
        placeholder="Buscar Receta"
        value={input}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button
        className="searchButton"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
