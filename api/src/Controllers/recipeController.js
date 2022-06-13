const axios = require("axios");
const { Recipe, Type } = require("../db");
const jsonBack = require("./jsonback")
const { API_KEY, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5 } =
  process.env;

const getApiInfo = async () => {


  // try {

  //   jsonBack.map(async (e) => {
  //     let newRecipe = await Recipe.create({
  //       id: e.id,
  //       name: e.name,
  //       dietTypes: e.dietTypes,
  //       summary: e.summary,
  //       healthScore: e.healthScore, //nivel de comida saludable
  //       spoonacularScore: e.healthScore, //puntuación de la pagina
  //       image: e.image,
  //       steps: e.steps?.map((r) => {
  //         return {
  //           number: r.number,
  //           step: r.step,
  //         };
  //       }),
  //     })

  //     console.log("base de datos actualizada")
  //   })
  // } catch (error) {
  //   console.log(error)
  // }
  const apiInfo = jsonBack.map((r) => {
    return {
      id: r.id,
      name: r.name,
      dietTypes: r.dietTypes,
      summary: r.summary,
      healthScore: r.healthScore, //nivel de comida saludable
      spoonacularScore: r.healthScore, //puntuación de la pagina
      image: r.image,
      steps: r.steps?.map((r) => {
        return {
          number: r.number,
          step: r.step,
        };
      }),
    };
  });
  return apiInfo.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
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
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  );
};

const getDbById = async (id) => {
  return await Recipe.findByPk(id, {
    include: {
      model: Type,
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
