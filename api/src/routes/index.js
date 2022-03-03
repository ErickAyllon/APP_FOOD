const { Router } = require("express");
const recipesRouter = require("../routes/routerRecipes");
const routerType = require("../routes/routerType");
const recipeRouter = require("../routes/routerRecipe");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipesRouter);
router.use("/types", routerType);
router.use("/recipe", recipeRouter);

module.exports = router;
