import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../Actions/index.js";
import styles from "./RecipeDetail.module.css";

export default function RecipeDetail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getRecipeDetails(props));
  }, [dispatch, id]);

  const recipeDetails = useSelector((state) => state.recipeDetails);
  console.log(recipeDetails);
  return (
    <div className={styles.details} key={id}>
      <div className={styles.containerDetails}>
        <img
          className={styles.img}
          src={
            recipeDetails.image
              ? recipeDetails.image
              : `https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80 464w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80 764w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80 928w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80 1064w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80 1364w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80 1528w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1664&q=80 1664w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80 1964w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80 2128w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2264&q=80 2264w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2564&q=80 2564w, https://images.unsplash.com/photo-1644704480315-bc18243f5f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2576&q=80 2576w`
          }
          alt="imageRecipe not found"
        />
        <h1 className={styles.texts}>{recipeDetails.name}</h1>
      </div>
    </div>
  );
}
