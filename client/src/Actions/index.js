import axios from "axios";
import {
  GET_RECIPES,
  LOCAL_HOST,
  RECIPE_SEARCH,
  GET_TYPES,
  SORT_AZ,
  DIET_TYPE_FILTER,
  SCORE_SORT,
} from "./constantes.js";

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      let recipes = await axios.get("http://localhost:3001/api/recipes");
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
      var response = await axios.get(`${LOCAL_HOST}/recipes?name=${payload}`);
      return dispatch({ type: RECIPE_SEARCH, payload: response.data });
    } catch (err) {
      alert("Recipe by name not found");
    }
  };
}

export function addRecipe(payload) {
  return async function () {
    try {
      var response = await axios.post(`${LOCAL_HOST}`, payload);
      return response;
    } catch (err) {
      console.log(err);
    }
  };
}

export function getRecipeDetails(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.get(`${LOCAL_HOST}/${payload}`);
      return dispatch({ type: GET_TYPES, payload: response.data });
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