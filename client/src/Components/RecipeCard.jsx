import React from "react";

let prevId = 1;
function RecipeCard(recipes) {
  const { image, name, dietTypes } = recipes;
  return (
    <div className="recipe">
      <div>
        <img className="recipeImg" src={image} alt="Not Found" />
      </div>
      <div>
        <h2 className="recipeTitle">{name}</h2>
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
