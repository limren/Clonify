import React from "react";
import { trpc } from "../../utils/trpc";

export const Playlists = () => {
  const playlistsFetch = trpc.user.getPlaylists.useQuery();
  const playlistsData = playlistsFetch.data;
  console.log("data : ", playlistsData);
  return <section className="playlists"></section>;
};
