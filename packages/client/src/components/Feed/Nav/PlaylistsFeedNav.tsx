import { trpc } from "../../../../utils/trpc";
import "../../../styles/Feed/Playlists.css";

export const PlaylistsFeedNav = () => {
  const playlistsFetch = trpc.user.getPlaylists.useQuery();
  const playlists =
    playlistsFetch.data && playlistsFetch.data.length > 5
      ? playlistsFetch.data?.slice(0, 5)
      : playlistsFetch.data;

  if (!playlists) {
    return <p>No playlist found !</p>;
  }
  const dataTracks = {
    nbTracks: 0,
    nbHours: 0,
    nbMinutes: 0,
  };
  return (
    <ul className="playlistsFeed">
      {playlists.map((playlist) => (
        <li key={playlist.id}>
          <section>
            <img src="./Thumbnail.png" />
            <p>{playlist.title}</p>
          </section>
          <section>
            {dataTracks.nbTracks} tracks - {dataTracks.nbHours}h{" "}
            {dataTracks.nbMinutes}m
          </section>
          <section>{}</section>
          <section></section>
        </li>
      ))}
    </ul>
  );
};
