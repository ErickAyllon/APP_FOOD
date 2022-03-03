const { Router } = require("express");
const axios = require("axios");
const {
  getAllRecipes,
  searchForId,
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
      console.log(recipeTitle);
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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const recipeId = await searchForId(id);
  if (recipeId) {
    return res.send(200, recipeId);
  }

  res.send(404, "id no valido");
});

module.exports = router;
