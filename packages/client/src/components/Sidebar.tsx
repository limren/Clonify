import React from "react";
import "../styles/Sidebar.css";
// import { LoggedIn } from "./Sidebar/LoggedIn";
// import { LoggedOut } from "./Sidebar/LoggedOut";
import { Link } from "react-router-dom";
import { trpc } from "../../utils/trpc";
export const Sidebar = () => {
  // const token = localStorage.getItem("token");
  const userFetch = trpc.auth.getUser.useQuery();
  const userData = userFetch?.data;
  return (
    <header className="sidebar">
      <nav>
        <header>
          <h2>Clonify</h2>
        </header>
        <main>
          <section>
            <ul>
              <li>
                <div>
                  <img></img>
                  <Link to="/">Feed</Link>
                </div>
              </li>
              <li>
                <div>
                  <img></img>
                  <Link to="/">Playlists</Link>
                </div>
              </li>
              <li>
                <div>
                  <img></img>
                  <Link to="/">Statistics</Link>
                </div>
              </li>
            </ul>
          </section>
          <section>
            <h3>YOUR MUSIC</h3>
            <ul>
              <li>
                <div>
                  <img></img>
                  <Link to="/">Favourites</Link>
                </div>
              </li>
              <li>
                <div>
                  <img></img>
                  <Link to="/">Listen Later</Link>
                </div>
              </li>
              <li>
                <div>
                  <img></img>
                  <Link to="/">History</Link>
                </div>
              </li>
              <li>
                <div>
                  <img></img>
                  <Link to="/">Podcast</Link>
                </div>
              </li>
            </ul>
          </section>
          <section>
            <h3>YOUR PLAYLISTS</h3>
            <ul>
              <li>
                <div>
                  <img></img>
                  <Link to="/">Metalcore</Link>
                </div>
              </li>
              <li>
                <div>
                  <img></img>
                  <Link to="/">Electro</Link>
                </div>
              </li>
              <li>
                <div>
                  <img></img>
                  <Link to="/">Funk</Link>
                </div>
              </li>
              <li>
                <div>
                  <img></img>
                  <Link to="/">Disco</Link>
                </div>
              </li>
            </ul>
          </section>
          {userData?.role === "ARTIST" && (
            <section>
              <h3>CREATE MUSIC</h3>
              <ul>
                <li>
                  <div>
                    <img></img>
                    <Link to="/artist/createTrack">Track</Link>
                  </div>
                </li>
                <li>
                  <div>
                    <img></img>
                    <Link to="/artist/createAlbum">Album</Link>
                  </div>
                </li>
              </ul>
            </section>
          )}
        </main>
      </nav>
    </header>
  );
};