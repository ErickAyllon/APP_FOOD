import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDietTypes, addRecipe } from "../Actions/index";
import styles from "./CreateRecipe.module.css";

function validate(input) {
  const errors = {};
  if (!input.name) errors.name = "Por favor introduce un nombre de receta";
  if (!input.summary)
    errors.summary = "Por favor agregá un resumen de la receta";
  if (input.spoonacularScore < 0 || input.spoonacularScore > 100)
    errors.spoonacularScore = "Por favor ingresá un puntaje entre 0 y 100";
  if (input.healthScore < 0 || input.healthScore > 100)
    errors.healthScore = "Por favor ingresá un puntaje de salud entre 0 y 100";
  if (!input.steps.length)
    errors.steps =
      "Por favor ingresá las instrucciones paso a paso de la receta";
  if (!input.diets)
    errors.dietTypes =
      "Por favor ingresá el tipo de dieta que pertenece la receta";
  return errors;
}

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    summary: "",
    spoonacularScore: 0,
    healthScore: 0,
    steps: "",
    dietTypes: [],
    image: "",
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
    const newArray = input.dietTypes;
    const find = newArray.indexOf(e.target.value);

    if (find >= 0) {
      newArray.splice(find, 1);
    } else {
      newArray.push(e.target.value);
    }
    setInput({
      ...input,
      diets: newArray,
    });
    const validations = validate(input);
    setErrors(validations);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(errors).length > 0) {
      alert("Por favor complete con la información requerida");
    } else if (
      input.name === "" &&
      input.summary === "" &&
      input.spoonacularScore === "" &&
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
        spoonacularScore: "",
        healthScore: "",
        steps: "",
        dietTypes: [],
        image: "",
      });
      history.push("/home");
    }
  }
  return (
    <div className={styles.containerCreate}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.form}>
          <span className={styles.span}> Ingresá tu propia receta</span>
          <div className={styles.buttonSpan}>
            <button className={styles.button} type="submit">
              Enviar Receta
            </button>
            <Link to="/home">
              <button className={styles.button}>
                Regresar a Pagina Principal
              </button>
            </Link>
          </div>
          <div className={styles.formPrettier}>
            <div className={styles.inputs}>
              <label className="msgs"> Nombre:</label>
              <input
                className={styles.inputText}
                id="msgs"
                name="name"
                type="text"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <span className="errors">{errors.name}</span>}
            </div>
            <div className={styles.inputs}>
              <label className="msgs"> Resumen:</label>
              <textarea
                className={styles.inputText}
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
            <div className={styles.inputs}>
              <label className="msgs">Puntuación:</label>
              <input
                className={styles.inputText}
                name="spoonacularScore"
                type="number"
                value={input.spoonacularScore}
                onChange={(e) => handleChange(e)}
              />
              {errors.spoonacularScore && (
                <span className="errors">{errors.spoonacularScore}</span>
              )}
            </div>
            <div className={styles.inputs}>
              <label className="msgs">Puntuación de Salud:</label>
              <input
                className={styles.inputText}
                name="healthScore"
                type="number"
                value={input.healthScore}
                onChange={(e) => handleChange(e)}
              />
              {errors.healthScore && (
                <span className="errors">{errors.healthScore}</span>
              )}
            </div>
            <div className={styles.inputs}>
              <label className="msgs">Paso a Paso:</label>
              <textarea
                name="steps"
                type="text"
                rows="4"
                cols="40"
                value={input.steps}
                onChange={(e) => handleChange(e)}
              />

              {errors.steps && <span className="errors">{errors.steps}</span>}
            </div>
          </div>
          <div className={styles.checkSelect}>
            <label className="msgs">Tipo de dietas:</label>
            {diets.map((d) => {
              return (
                <div key={d} className="checks">
                  <input
                    className={styles.checks}
                    type="checkbox"
                    name={d}
                    value={d}
                    selected={input.dietTypes.includes(d)}
                    onChange={(e) => handleCheckBox(e)}
                  />
                  <label className="diets">{d}</label>
                </div>
              );
            })}
            {errors.dietTypes && (
              <span className="errors">{errors.dietTypes}</span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
