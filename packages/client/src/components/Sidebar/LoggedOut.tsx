import React from "react";
import { Link } from "react-router-dom";

export const LoggedOut = () => {
  return (
    <ul>
      <li>
        <Link to="/login">Connexion</Link>
      </li>
      <li>
        <Link to="/register">S'enregistrer</Link>
      </li>
    </ul>
  );
};
