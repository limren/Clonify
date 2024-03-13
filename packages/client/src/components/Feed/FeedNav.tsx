import { Link } from "react-router-dom";
import "../../styles/Feed/FeedNav.css";
export const FeedNav = () => {
  return (
    <nav className="feedNav">
      <ul>
        <li>
          <Link to="/">Playlists</Link>
        </li>
        <li>
          <Link to="/feed/artists">Artists</Link>
        </li>
        <li>
          <Link to="/feed/albums">Albums</Link>
        </li>
        <li>
          <Link to="/feed/streams">Streams</Link>
        </li>
      </ul>
    </nav>
  );
};
