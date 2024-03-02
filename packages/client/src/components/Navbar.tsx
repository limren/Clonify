import React from "react";
import "../styles/Navbar.css";
import { LoggedIn } from "./Navbar/LoggedIn";
import { LoggedOut } from "./Navbar/LoggedOut";
export const Navbar = () => {
  const token = localStorage.getItem("token");
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
        {token != "" && token ? <LoggedIn /> : <LoggedOut />}
      </nav>
    </header>
  );
};
