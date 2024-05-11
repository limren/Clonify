import React from "react";
import { useParams } from "react-router-dom";
import { trpc } from "../../utils/trpc";
import "../styles/Playlist.css";
import { PlaylistItem } from "./Playlist/PlaylistItem";
export const Playlist = () => {
  const { playlistId } = useParams();
  if (!playlistId) {
    return <>Error while trying to load requested playlist.</>;
  }
  const playlistFetch = trpc.user.getPlaylist.useQuery({
    playlistId: parseInt(playlistId),
  });
  const playlistData = playlistFetch.data;
  console.log("playlist : ", playlistFetch.data);
  return (
    <section className="playlist">
      <header>
        <img
          src={
            `http://localhost:8000/uploads/playlist/` +
            playlistData?.thumbnailPath
          }
        />
        <section>
          <h2>{playlistData?.title}</h2>
          <p>{playlistData?.description}</p>
        </section>
      </header>
      <main>
        <header>
          {/* #TODO - Change color of SVG */}
          <img src="/DownloadPlaylist.svg" alt="Download playlist" />
          <img src="/Dots.svg" alt="Playlist's parameters" />
        </header>
        <main>
          <header>
            <h3>Titre</h3>
            <h3>Album</h3>
            <h3>Lectures</h3>
            <img src="/public/Clock.svg" />
          </header>
          <ul>
            {playlistData?.Track.map((track, index) => (
              <PlaylistItem track={track} index={index} key={track.id} />
            ))}
          </ul>
        </main>
      </main>
    </section>
  );
};
