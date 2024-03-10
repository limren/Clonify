import React from "react";
import { useNavigate } from "react-router-dom";

export const AuthorizedComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token || token == "") {
    navigate("/login");
  }
  return children;
};
