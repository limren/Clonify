import { Link, useLocation } from "react-router-dom";
import "../../styles/Feed/FeedNav.css";
export const FeedNav = () => {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const pathOpt = paths.length > 2 ? paths[2] : "playlists";
  return (
    <nav className="feedNav">
      <ul>
        <li className={pathOpt === "playlists" ? "active" : ""}>
          <Link to="/feed">Playlists</Link>
        </li>
        <li className={pathOpt === "artists" ? "active" : ""}>
          <Link to="/feed/artists">Artists</Link>
        </li>
        <li className={pathOpt === "albums" ? "active" : ""}>
          <Link to="/feed/albums">Albums</Link>
        </li>
        <li className={pathOpt === "streams" ? "active" : ""}>
          <Link to="/feed/streams">Streams</Link>
        </li>
      </ul>
    </nav>
  );
};
