import { Link } from "react-router-dom";
import { trpc } from "../../../utils/trpc";

export const Playlists = () => {
  const playlistsFetch = trpc.user.getPlaylists.useQuery();
  const playlists = playlistsFetch.data;
  if (!playlists || playlists.length === 0) {
    return null;
  }
  return (
    <ul className="playlists">
      {playlists?.map((playlist) => (
        <li key={playlist.id}>
          {/* <img src={"./Thumbnail.png"} alt={playlist.title} /> */}
          <Link to={`/playlist/${playlist.id}`}>{playlist.title}</Link>
        </li>
      ))}
    </ul>
  );
};
