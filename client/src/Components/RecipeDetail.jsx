import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../Actions/index.js";
import styles from "./RecipeDetail.module.css";
import { Link } from "react-router-dom";

export default function RecipeDetail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  const recipeDetails = useSelector((state) => state.recipeDetail);

  return (
    <div className={styles.details} key={id}>
      <div className={styles.containerDetails}>
        <h1 className={styles.texts}>{recipeDetails.title}</h1>
        <div className={styles.containerImage}>
          <img
            className={styles.img}
            src={
              recipeDetails.image
                ? recipeDetails.image
                : `https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80 464w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80 764w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80 928w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80 1064w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80 1364w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80 1528w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1664&q=80 1664w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80 1964w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80 2128w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2264&q=80 2264w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2564&q=80 2564w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2576&q=80 2576w`
            }
            alt="imageRecipe not found"
          />
        </div>

        <div className={styles.dietTypes}>
          <h2 className={styles.textTypes}>Diet Type: </h2>
          {recipeDetails.dietTypes
            ? recipeDetails.dietTypes.map((e) => {
                return (
                  <h2 className={styles.textTypes} key={e}>
                    {e[0].toUpperCase() + e.slice(1)}
                  </h2>
                );
              })
            : recipeDetails.diets?.map((e) => {
                return (
                  <h2 className={styles.textTypes} key={e.name}>
                    {e.name}
                  </h2>
                );
              })}
        </div>

        <div className={styles.containerSummary}>
          <h3 className="texts">Summary: </h3>
          <p className={styles.summary}>
            {recipeDetails.summary?.replace(/<[^>]*>/g, "")}
          </p>
        </div>

        <div className={styles.containerScore}>
          <h3 className="scores">Score: {recipeDetails.spoonacularScore}</h3>
          <h3 className="scores">
            Healthiness points: {recipeDetails.healthScore}
          </h3>
        </div>

        <div className={styles.containerSteps}>
          <h3 className="texts">Steps: </h3>
          <ul className="steps">
            {Array.isArray(recipeDetails.steps) ? (
              recipeDetails.steps.map((e) => {
                return <li key={e.number}>{e.step}</li>;
              })
            ) : (
              <li>{recipeDetails.steps}</li>
            )}
          </ul>
        </div>

        <Link to="/home">
          <button className={styles.backButton}>Go back to recipes</button>
        </Link>
      </div>
    </div>
  );
}
