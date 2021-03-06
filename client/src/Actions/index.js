import axios from "axios";
import {
  GET_RECIPES,
  LOCAL_HOST,
  RECIPE_SEARCH,
  GET_TYPES,
  SORT_AZ,
  DIET_TYPE_FILTER,
  SCORE_SORT,
  RECIPE_DETAILS,
} from "./constantes.js";

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      let recipes = await axios.get("/api/recipes");
      return dispatch({
        type: GET_RECIPES,
        payload: recipes.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export function getRecipesByName(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/api/recipes?name=${payload}`);
      return dispatch({ type: RECIPE_SEARCH, payload: response.data });
    } catch (err) {
      alert("Recipe by name not found");
    }
  };
}
export function getDietTypes() {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/api/types`);
      return dispatch({
        type: GET_TYPES,
        payload: response.data.map((d) => d.title),
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addRecipe(payload) {
  return async function (dispatch) {
    console.log("este es el payload", payload);
    console.log("este es el name", payload.name);
    console.log("este es el dietType", payload.dietTypes);
    //let dietTypesString = payload.dietTypes.toString("");
    // console.log("este es el dietType string", dietTypesString);
    const response = await axios.post(`/api/recipe`, payload);

    return dispatch({
      type: "POST_RECIPE",
      payload: response.data,
    });
  };
}

export function getRecipeDetails(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/api/recipes/${payload}`);
      return dispatch({ type: RECIPE_DETAILS, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function dietTypeFilter(payload) {
  return {
    type: DIET_TYPE_FILTER,
    payload,
  };
}

export function alphabeticFilter(payload) {
  return {
    type: SORT_AZ,
    payload,
  };
}

export function scoreSort(payload) {
  return {
    type: SCORE_SORT,
    payload,
  };
}
