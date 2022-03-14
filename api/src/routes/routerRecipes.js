const { Router } = require("express");
const {
  getAllRecipes,
  getApiInfoById,
  getDbById,
} = require("../Controllers/recipeController");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    let recipesTotal = await getAllRecipes();
    if (name) {
      const recipeTitle = recipesTotal.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      recipeTitle.length
        ? res.send(200, recipeTitle)
        : res.send(404, "No se encontró la receta");
    } else {
      return res.send(200, recipesTotal);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    if (
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      let dbRecipesById = await getDbById(id);
      return res.send(200, dbRecipesById);
    } else {
      apiRecipesById = await getApiInfoById(id);
      if (apiRecipesById) {
        let recipeDetails = {
          id: apiRecipesById.data.id,
          title: apiRecipesById.data.title,
          dietTypes: apiRecipesById.data.diets,
          summary: apiRecipesById.data.summary,
          healthScore: apiRecipesById.data.healthScore, //nivel de comida saludable
          spoonacularScore: apiRecipesById.data.spoonacularScore, //puntuación de la pagina
          image: apiRecipesById.data.image,
          steps: apiRecipesById.data.analyzedInstructions[0]?.steps.map((r) => {
            return {
              number: r.number,
              step: r.step,
            };
          }),
        };
        return res.status(200).json(recipeDetails);
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
