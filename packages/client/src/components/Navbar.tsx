import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <header className="navbar">
      <nav>
        <div>
          <ul>
            <li>Clonify</li>
          </ul>
          <ul>
            <li>Biographie</li>
            <li>Albums</li>
          </ul>
        </div>
        <ul>
          <li>1992</li>
          <li>--</li>
          <li>2018</li>
        </ul>
        <ul>
          <li>
            <Link to="/login">Connexion</Link>
          </li>
          <li>
            <Link to="/register">S'enregistrer</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
