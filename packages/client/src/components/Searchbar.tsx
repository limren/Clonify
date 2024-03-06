import React from "react";
import "../styles/Searchbar.css";
export const Searchbar = () => {
  return (
    <section className="searchbar">
      <input type="text" placeholder="Search by artists, songs or albums" />
    </section>
  );
};
