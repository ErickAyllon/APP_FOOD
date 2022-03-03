const { Router } = require("express");
const { API_KEY, API_KEY1 } = process.env;
const { Type } = require("../db");
const { typeDietDb } = require("../Controllers/typeController");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    typeDietDb.forEach((el) => {
      Type.findOrCreate({
        where: { title: el },
      });
    });
    const dietTypes = await Type.findAll();
    res.send(200, dietTypes);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
