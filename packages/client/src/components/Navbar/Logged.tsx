import React from "react";
import { trpc } from "../../../utils/trpc";
import "../../styles/Navbar/Logged.css";
export const Logged = () => {
  const userFetch = trpc.auth.getUser.useQuery();
  const userData = userFetch?.data;
  return (
    <section className="logged">
      <h2>{userData?.username}</h2>
      {/* TODO: Manage user's avatar */}
      <img src="./Avatar.png" />
    </section>
  );
};
