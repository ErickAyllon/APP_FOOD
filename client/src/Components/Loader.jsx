import React from "react";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <img
      className={styles.imageLoader}
      src="https://i.pinimg.com/originals/89/d2/db/89d2db3180afe18643b60c7731043afd.gif"
      alt="loader"
    ></img>
  );
}
