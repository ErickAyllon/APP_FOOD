import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.landing}>
      <h1 className={styles.welcome}>Welcome to the world of recipes</h1>
      <Link to="/home" id="click">
        <button className={styles.btnHome}>Let's start</button>
      </Link>
    </div>
  );
}
