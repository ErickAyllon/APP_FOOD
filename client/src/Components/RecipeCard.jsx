import React from "react";
import styles from "./RecipeCard.module.css";

let prevId = 1;
function RecipeCard(recipes) {
  const { image, name, dietTypes, spoonacularScore } = recipes;
  return (
    <div className={styles.recipe}>
      <div className={styles.detailRecipe}>
        <img className={styles.recipeImg} src={image} alt="Not Found" />
        <h2>{name}</h2>
      </div>
      <div>
        <h3>{spoonacularScore}</h3>
      </div>

      <div className="dietContainer">
        {dietTypes?.map((e) => {
          return (
            <h5 className="diets" key={prevId++}>
              {e[0].toUpperCase() + e.slice(1)}
            </h5>
          );
        })}
      </div>
    </div>
  );
}

export default RecipeCard;
