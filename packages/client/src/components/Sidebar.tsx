import React from "react";
import "../styles/Sidebar.css";
// import { LoggedIn } from "./Sidebar/LoggedIn";
// import { LoggedOut } from "./Sidebar/LoggedOut";
import { Link } from "react-router-dom";
import { trpc } from "../../utils/trpc";
import { PlaylistsNav } from "./Sidebar/PlaylistsNav";
export const Sidebar = ({
  setPopUpOpen,
}: {
  setPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
                  <Link to="/feed">Feed</Link>
                </div>
              </li>
              <li>
                <div>
                  <img></img>
                  <Link to="/playlists">Playlists</Link>
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
            <PlaylistsNav />
            <section
              className="create-popup"
              onClick={() => setPopUpOpen(true)}
            >
              <button>Create new playlist</button>
              <img src="/AddIcon.svg" />
            </section>
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
