import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, alphabeticFilter, scoreSort } from "../Actions/index";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Paginated from "./Paginated";
import Recipe from "./RecipeCard";

let prevId = 1;
export default function Home() {
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

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
    setPage(1);
  }

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

  return (
    <div className="Home">
      <div>
        <button className="refreshButton" onClick={handleClick}>
          Actualizar recetas
        </button>
        <Link to="/recipe">
          <button className="AddButton">Agregar receta</button>
        </Link>
      </div>
      <div className="select">
        <label className="filters">Filtros:</label>
        <select className="select" name="AZ" onChange={(e) => handleAZ(e)}>
          <option defaultValue>Orden</option>
          <option value="atoz">A to Z</option>
          <option value="zota">Z to A</option>
        </select>
        <select
          className="select"
          name="numerical"
          onChange={(e) => handleScoreSort(e)}
        >
          <option defaultValue>Puntaje</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select className="filters" name="diets">
          <option defaultValue>Tipos de Dietas</option>
          <option value="gluten free">Libre de Gluten</option>
          <option value="ketogenic">Keto</option>
          <option value="vegetarian">Vegetariano</option>
          <option value="lacto vegetarian">Lacto-Vegetariano</option>
          <option value="ovo vegetarian">Ovo-Vegetariano</option>
          <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetariano</option>
          <option value="vegan">Vegaon</option>
          <option value="pescetarian">Pescetariano</option>
          <option value="paleolithic">Paleo</option>
          <option value="primal">Primal</option>
          <option value="low fodmap">Low FODMAP</option>
          <option value="whole 30">Whole30</option>
          <option value="dairy free">Libre de Lacteos</option>
        </select>
      </div>
      <Paginated
        recipesPage={recipesPage}
        allRecipes={allRecipes.length}
        paged={paged}
      />

      <SearchBar />
      <div className="allRecipes">
        {showRecipesPage?.map((e) => {
          return (
            <div className="eachRecipes" key={prevId++}>
              <Link className="linkRecipes" to={`home/${e.id}`} />
              <Recipe
                image={
                  e.image
                    ? e.image
                    : `https://64.media.tumblr.com/fe5c1fa749cba141d1b248fe8b1ff66b/tumblr_p3848qU6Aw1s01xbbo1_500.png`
                }
                name={e.name}
                dietTypes={e.dietTypes}
              ></Recipe>
            </div>
          );
        })}
      </div>
      <Paginated
        recipesPage={recipesPage}
        allRecipes={allRecipes.length}
        paged={paged}
      />
    </div>
  );
}
