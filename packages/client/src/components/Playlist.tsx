import React from "react";
import { useLocation } from "react-router-dom";

export const Playlist = () => {
  const { pathname } = useLocation();
  console.log("path name :", useLocation());
  return <div>Playlist</div>;
};
