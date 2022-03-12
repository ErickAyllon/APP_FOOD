import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.landing}>
      <h1 className={styles.welcome}>
        Te doy la bienvenida al mundo de la cocina
      </h1>
      <Link to="/home" id="click">
        <button className={styles.btnHome}>Comencemos</button>
      </Link>
    </div>
  );
}
