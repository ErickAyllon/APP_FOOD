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
  try {
    const resultInfoId = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY1}`
    );
    const r = resultInfoId.data.results;

    const recipeId = {
      id: r.id,
      title: r.title,
      healthScore: r.healthScore,
      dishTypes: r.dishTypes,
      image: r.image,
      summary: r.summary,
      types: r.types,
      steps: r.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }),
    };

    return recipeId;
  } catch (err) {
    console.log(err);
  }
};

const getRecipeIdDb = async (id) => {
  try {
    const resultDb = await Recipe.findAll({
      where: {
        id: id,
      },
      include: Type,
    });
    const listType = resultDb[0].Type.map(temp.name);
    return resultDb;
  } catch (error) {
    console.log(error);
  }
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = apiInfo.concat(dbInfo);

  return allInfo;
};

const searchForId = async (id) => {
  const searchId = await getApiInfoById(id);
  if (searchId) return searchId;
  const db = await getDbInfo();
  const searchDB = db.find((recipe) => recipe.id === id);
  if (db) return searchDB;
  return searchId;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getApiInfoById,
  getRecipeIdDb,
  getAllRecipes,
  searchForId,
};
