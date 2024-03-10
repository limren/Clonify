import React from "react";
import { trpc } from "../../../utils/trpc";
import { useNavigate } from "react-router-dom";

export const ArtistComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = localStorage.getItem("token");
  const userFetch = trpc.auth.getUser.useQuery();
  const userData = userFetch.data;
  const navigate = useNavigate();
  if (!userData || userData.role !== "ARTIST" || !token || token == "") {
    navigate("/");
  }
  return children;
};
