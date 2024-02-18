import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Album } from "./pages/Album.tsx";
import { Login } from "./pages/auth/Login.tsx";
import { Register } from "./pages/auth/Register.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App children={<Album />} />,
  },
  {
    path: "/login",
    element: <App children={<Login />} />,
  },
  {
    path: "/register",
    element: <App children={<Register />} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
