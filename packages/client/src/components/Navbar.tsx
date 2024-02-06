import React from "react";
import "../styles/Navbar.css";
export const Navbar = () => {
  return (
    <header className="navbar">
      <nav>
        <div>
          <ul>
            <li>Mac Miller</li>
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
          <li>S'inscrire</li>
          <li>Connexion</li>
        </ul>
      </nav>
    </header>
  );
};
