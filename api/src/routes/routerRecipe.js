const { Router } = require("express");
const { Recipe, Type } = require("../db");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    let { title, summary, healthScore, dietTypes, spoonacularScore, steps } =
      req.body;

    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      spoonacularScore,
      steps,
      dietTypes,
    });
    let dietTypesRecipeDb = await Type.findAll({
      where: { title },
    });

    newRecipe.addType(dietTypesRecipeDb);
    res.send(200, newRecipe);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
