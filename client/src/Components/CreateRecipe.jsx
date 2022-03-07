import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDietTypes, addRecipe } from "../Actions/index";

function validate(input) {
  const errors = {};
  if (!input.name) errors.name = "Por favor introduce un nombre de receta";
  if (!input.summary)
    errors.summary = "Por favor agregá un resumen de la receta";
  if (input.score < 0 || input.score > 100)
    errors.score = "Por favor ingresá un puntaje entre 0 y 100";
  if (input.healthScore < 0 || input.healthScore > 100)
    errors.healthScore = "Por favor ingresá un puntaje de salud entre 0 y 100";
  if (!input.steps.length)
    errors.steps =
      "Por favor ingresá las instrucciones paso a paso de la receta";
  if (!input.dietTypes)
    errors.dietTypes =
      "Por favor ingresá el tipo de dieta que pertenece la receta";
  return errors;
}

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const dietTypes = useSelector((state) => state.dietTypes);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = setState({
    name: "",
    summary: "",
    score: "",
    healthScore: "",
    steps: "",
    dietTypes: [],
  });

  useEffect(() => {
    dispatch(getDietTypes());
  }, [dispatch]);
  return <div>estoy Actualizar</div>;
}
