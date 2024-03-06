import React from "react";
import { Link } from "react-router-dom";

export const Unlogged = () => {
  return (
    <section>
      <button>
        <Link to="/login">Connexion</Link>
      </button>
      <button>
        <Link to="/register">Inscription</Link>
      </button>
    </section>
  );
};
