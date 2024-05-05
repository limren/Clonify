import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/auth/Login.tsx";
import { Register } from "./pages/auth/Register.tsx";
import { CreateTrack } from "./pages/artist/create/CreateTrack.tsx";
import { Feed } from "./pages/Feed.tsx";
import { PlaylistsFeedNav } from "./components/Feed/Nav/PlaylistsFeedNav.tsx";
import { SearchQuery } from "./pages/SearchQuery.tsx";
import { CreateAlbum } from "./pages/artist/create/CreateAlbum.tsx";
import { Playlist } from "./components/Playlist.tsx";
import { Playlists } from "./pages/Playlists.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App children={<Feed />} />,
  },
  {
    path: "/login",
    element: <App children={<Login />} />,
  },
  {
    path: "/register",
    element: <App children={<Register />} />,
  },
  {
    path: "/artist/createTrack",
    element: <App children={<CreateTrack />} />,
  },
  {
    path: "/artist/createAlbum",
    element: <App children={<CreateAlbum />} />,
  },
  {
    path: "/feed",
    element: <App children={<Feed />} />,
  },
  {
    path: "/feed/playlists",
    element: <App children={<Feed children={<PlaylistsFeedNav />} />} />,
  },
  {
    path: "/feed/albums",
    element: <App children={<Feed />} />,
  },
  {
    path: "/feed/artists",
    element: <App children={<Feed />} />,
  },
  {
    path: "/feed/streams",
    element: <App children={<Feed />} />,
  },
  {
    path: "/feed/searchQuery",
    element: <App children={<SearchQuery />} />,
  },
  {
    path: "/playlists",
    element: <App children={<Playlists />} />,
  },
  {
    path: "/playlist/:playlistId",
    element: <App children={<Playlist />} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
