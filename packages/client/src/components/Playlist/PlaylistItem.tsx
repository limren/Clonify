import "../../styles/Playlist/PlaylistItem.css";
type PlaylistItemProps = {
  track: {
    id: number;
    title: string;
    thumbnailPath: string | null;
    Album: {
      title: string;
    } | null;
    User: {
      username: string;
      id: number;
    } | null;
    minutes: number;
    seconds: number;
  };

  index: number;
};
// TODO: FIX THE DISPLAY BETWEEN ITEMS & HEADER
export const PlaylistItem = ({ track, index }: PlaylistItemProps) => {
  return (
    <li className="playlistItem">
      <section>
        <header>
          <img src="/public/PlayButton.svg" className="hide" />
          <p className="show">{index + 1}</p>
        </header>
        <main>
          <h3>{track.title}</h3>
          <h4>{track.User?.username}</h4>
        </main>
      </section>
      <section>
        <h3>{track.Album?.title ? track.Album.title : "Aucun"}</h3>
      </section>
      <section>0</section>
      <section>
        <h3>
          {track.minutes}:{track.seconds.toString().substring(0, 2)}
        </h3>
      </section>
    </li>
  );
};
