import React from "react";
import { trpc } from "../../utils/trpc";
import "../styles/Playlists.css";
import { Link } from "react-router-dom";
export const Playlists = () => {
  const playlistsFetch = trpc.user.getPlaylists.useQuery();
  const playlists = playlistsFetch.data;
  return (
    <section className="playlists">
      <header>
        <h2>Your playlists</h2>
        <section>Order by</section>
      </header>
      <main>
        {playlists?.map((playlist) => {
          return (
            <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
              <section>
                <header>
                  <img
                    src={`http://localhost:8000/uploads/playlist/${playlist.thumbnailPath}`}
                  />
                  <section>
                    <h3>{playlist.title}</h3>
                    <img src="/public/PlayButton.svg" />
                  </section>
                </header>
              </section>
            </Link>
          );
        })}
      </main>
    </section>
  );
};
