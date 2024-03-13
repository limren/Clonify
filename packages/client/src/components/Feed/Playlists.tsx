import React from "react";
import { trpc } from "../../../utils/trpc";

export const Playlists = () => {
  const playlistsFetch = trpc.user.getPlaylists.useQuery();
  const playlists = playlistsFetch.data;

  if (!playlists) {
    return <p>No playlist found !</p>;
  }
  return <div>Playlists</div>;
};
