import React from "react";
import styles from "./RecipeCard.module.css";

let prevId = 1;
function RecipeCard(recipes) {
  const { image, name, dietTypes, spoonacularScore } = recipes;
  return (
    <div className={styles.recipe}>
      <div>
        <img className={styles.recipeImg} src={image} alt="Not Found" />

        <h4 className={styles.name}>{name}</h4>
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
