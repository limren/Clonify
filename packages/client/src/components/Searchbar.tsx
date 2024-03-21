import { useState } from "react";
import "../styles/Searchbar.css";
import { useNavigate } from "react-router-dom";
export const Searchbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searching for : ", search);
    navigate(`/feed/searchQuery?search=${search}`);
  };

  return (
    <section className="searchbar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by artists, songs or albums"
        />
      </form>
    </section>
  );
};
