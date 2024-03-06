import React from "react";
import "../styles/Navbar.css";
import { Searchbar } from "./Searchbar";
import { Logged } from "./Navbar/Logged";
import { Unlogged } from "./Navbar/Unlogged";
export const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <Searchbar />
      {token ? <Logged /> : <Unlogged />}
    </nav>
  );
};
