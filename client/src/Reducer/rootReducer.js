import {
  GET_RECIPES,
  DIET_TYPE_FILTER,
  SCORE_SORT,
  SORT_AZ,
  RECIPE_SEARCH,
  ADD_RECIPE,
  RECIPE_DETAILS,
  GET_TYPES,
} from "../Actions/constantes";

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  recipeDetail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case DIET_TYPE_FILTER:
      const allRecipes = state.allRecipes;
      const filteredByDietType = allRecipes.filter((r) =>
        r.diets?.some((d) => d.toLowerCase() === action.payload.toLowerCase())
      );
      return {
        ...state,
        recipes: filteredByDietType,
      };

    case SORT_AZ:
      const sortedRecipes =
        action.payload === "atoz"
          ? state.recipes.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.name < b.name) {
                return 1;
              }
              if (a.name > b.name) {
                return -1;
              }
              return 0;
            });

      return { ...state, recipes: sortedRecipes };

    case SCORE_SORT:
      let sortedRecipesByScore = [...state.recipes];
      sortedRecipesByScore =
        action.payload === "asc"
          ? state.recipes.sort((a, b) => {
              if (a.spoonacularScore > b.spoonacularScore) {
                return 1;
              }
              if (a.spoonacularScore < b.spoonacularScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.spoonacularScore < b.spoonacularScore) {
                return 1;
              }
              if (a.spoonacularScore > b.spoonacularScore) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sortedRecipesByScore,
      };

    case RECIPE_SEARCH:
      return {
        ...state,
        recipes: action.payload,
      };
    case RECIPE_DETAILS:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case ADD_RECIPE:
      return {
        ...state,
      };
    case GET_TYPES:
      return {
        ...state,
        diets: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
