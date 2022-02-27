const axios = require("axios");
const db = require("../db");
const { Recipe, Type } = require("../db");
const { API_KEY } = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?${API_KEY}&addRecipeInformation=true&number=100`
  );

  const apiInfo = await apiUrl.data.results.map((r) => {
    return {
      id: r.id,
      title: r.title,
      summary: r.summary,
      healthScore: r.healthScore, //nivel de comida saludable
      spoonacularScore: r.spoonacularScore, //puntuación de la pagina
      image: r.image,
      steps: r.analyzedInstructions[0]?.steps.map((s) => {
        return {
          number: s.number,
          step: s.step,
        };
      }),
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Type,
      atributtes: ["title"],
      through: {
        atributtes: [],
      },
    },
  });
};

const getApiById = async (id) => {
  return await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?{API_KEY}`
  );
};

const getDbById = async (id) => {
  return await Recipe.findByPK(id, {
    include: {
      model: Type,
      atributtes: ["title"],
      through: {
        atributtes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = [...apiInfo, ...dbInfo];

  return allInfo;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getApiById,
  getDbById,
  getAllRecipes,
};
