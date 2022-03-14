const axios = require("axios");
const { Recipe, Type } = require("../db");
const { API_KEY, API_KEY1, API_KEY2 } = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`
  );

  const apiInfo = await apiUrl.data.results.map((r) => {
    return {
      id: r.id,
      name: r.title,
      dietTypes: r.diets,
      summary: r.summary,
      healthScore: r.healthScore, //nivel de comida saludable
      spoonacularScore: r.spoonacularScore, //puntuación de la pagina
      image: r.image,
      steps: r.analyzedInstructions[0]?.steps.map((r) => {
        return {
          number: r.number,
          step: r.step,
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
      attributes: ["title"],
      through: {
        atributes: [],
      },
    },
  });
};

const getApiInfoById = async (id) => {
  return await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY2}`
  );
};

const getDbById = async (id) => {
  return await Recipe.findByPk(id, {
    include: {
      model: Recipe,
      atributes: ["title"],
      through: {
        atributes: [],
      },
    },
  });
};
const getAllRecipes = async () => {
  const infoApi = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = infoApi.concat(dbInfo);

  return allInfo;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getApiInfoById,
  getDbById,
  getAllRecipes,
};
