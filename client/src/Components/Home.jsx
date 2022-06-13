import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  alphabeticFilter,
  scoreSort,
  dietTypeFilter,
} from "../Actions/index";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Paginated from "./Paginated";
import Recipe from "./RecipeCard";
import styles from "./Home.module.css";
import Loader from "./Loader";
import RecipeCard from "./RecipeCard";

export default function Home() {
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [recipesPage] = useState(9);
  const quantityRecipesPage = page * recipesPage;
  const firstRecipePage = quantityRecipesPage - recipesPage;
  const showRecipesPage = allRecipes.slice(
    firstRecipePage,
    quantityRecipesPage
  );

  console.log(showRecipesPage)
  const paged = function (pageNumber) {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
    setPage(1);
  }

  function handleAZ(e) {
    e.preventDefault();
    dispatch(alphabeticFilter(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  }

  function handleScoreSort(e) {
    e.preventDefault();
    dispatch(scoreSort(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  }

  function handleDietTypeFilter(e) {
    e.preventDefault();
    dispatch(dietTypeFilter(e.target.value));
    setPage(1);
  }
  return (
    <div className="home__content">
      {
        showRecipesPage?.map((el) => {
          return (
            <RecipeCard
              image={el.image}
              name={el.name}
              dietTypes={el.dietTypes} 
              spoonacularScore={el.healthScore}/>
          )
        })}
    </div>
  );
}
