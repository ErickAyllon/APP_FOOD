import React from "react";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div className="landing">
      <h1 className="welcome">Te doy la bienvenida al mundo de la cocina</h1>
      <Link to="/home" id="click">
        <button className="btnHome">Comencemos</button>
      </Link>
    </div>
  );
}
