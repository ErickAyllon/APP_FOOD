import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, alphabeticFilter, scoreSort } from "../Actions/index";

let prevId = 1;
export default function Home() {
  //colocar funciones
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [recipesPage, setRecipesPage] = useState(9);
  const quantityRecipesPage = page * recipesPage;
  const firstRecipePage = quantityRecipesPage - recipesPage;
  const showRecipesPage = allRecipes.slice(
    firstRecipePage,
    quantityRecipesPage
  );
  const paged = function (pageNumber) {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleAZ(e) {
    e.preventDefault();
    dispatch(alphabeticFilter(e.target.value));
    setPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  function handleScoreSort(e) {
    e.preventDefault();
    dispatch(scoreSort(e.target.value));
    setPage(1);
    setOrder(`Order ${e.target.value}`);
  }
  //colocar estructura

  return <div></div>;
}
