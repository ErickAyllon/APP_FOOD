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
  const [input, setInput] = useState({
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

  function handleChange(e) {
    e.preventDefault();
    setInput((prevInput) => {
      const newInput = {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
      const validations = validate(newInput);
      setErrors(validations);
      return newInput;
    });
  }

  function handleCheckBox(e) {
    let newArray = input.dietTypes;
    let find = newArray.indexOf(e.target.value);

    if (find >= 0) {
      newArray.splice(find, 1);
    } else {
      newArray.push(e.target.value);
    }
    setInput({
      ...input,
      dietTypes: newArray,
    });
    const validations = validate(input);
    setErrors(validations);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(errors).lenght > 0) {
      alert("Por favor complete con la información requerida");
    } else if (
      input.name === "" &&
      input.summary === "" &&
      input.score === "" &&
      input.healthScore === "" &&
      input.steps === "" &&
      !input.dietTypes.length
    ) {
      alert("Por favor complete el formulario");
    } else {
      dispatch(addRecipe(input));
      alert("Nueva receta agregada correctamente");
      setInput({
        name: "",
        summary: "",
        score: "",
        healthScore: "",
        steps: [],
        dietTypes: [],
      });
      history.push("/home");
    }
  }
  return (
    <div>
      <h1 className="msg"> Ingresá tu propia receta</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form">
          <div className="formPrettier">
            <div className="inputs">
              <label className="msgs"> Nombre:</label>
              <input
                name="name"
                type="text"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <span className="errors">{errors.summary}</span>}
            </div>
            <div className="inputs">
              <label className="msgs"> Resumen:</label>
              <textarea
                name="summary"
                type="text"
                rows="4"
                cols="30"
                value={input.summary}
                onChange={(e) => handleChange(e)}
              />
              {errors.summary && (
                <span className="errors">{errors.summary}</span>
              )}
            </div>
            <div className="inputs">
              <label className="msgs">Puntuación:</label>
              <input
                name="score"
                type="number"
                value={input.score}
                onChange={(e) => handleChange(e)}
              />
              {errors.score && <span className="errors">{errors.score}</span>}
            </div>
            <div className="inputs">
              <label className="msgs">Puntuación de Salud:</label>
              <input
                name="healthScore"
                type="number"
                value={input.healthScore}
                onChange={(e) => handleChange(e)}
              />
              {errors.healthScore && (
                <span className="errors">{errors.healthScore}</span>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
