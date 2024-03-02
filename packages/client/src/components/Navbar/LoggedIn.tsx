import React from "react";
import { trpc } from "../../../utils/trpc";
import { Link } from "react-router-dom";

export const LoggedIn = () => {
  const userFetch = trpc.auth.getUser.useQuery();
  const user = userFetch.data;
  console.log("current user : ", user);
  return (
    <ul>
      <li>
        <Link to="/dashboard">{user?.username}</Link>
      </li>
    </ul>
  );
};
