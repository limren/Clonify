import React from "react";
import "../styles/Album/Album.css";
import { AlbumInfo } from "../components/AlbumInfo";
import { TrackList } from "../components/TrackList";
export const Album = () => {
  return (
    <div className="album">
      <img src="/Swimming.jpg" />
      <AlbumInfo />
      <TrackList />
    </div>
  );
};
