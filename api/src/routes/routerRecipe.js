const { Router } = require("express");
const { Recipe, Type } = require("../db");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    let { name, summary, healthScore, dietTypes, spoonacularScore, steps } =
      req.body;

    const newRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      spoonacularScore,
      steps,
      dietTypes,
    });
    // let dietTypesRecipeDb = await Type.findAll({
    //   where: { name },
    // });

    //newRecipe.addType(dietTypesRecipeDb);
    res.send(200, newRecipe);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
