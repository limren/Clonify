import { trpc } from "../../../utils/trpc";
import "../../styles/Playlist/PlaylistItem.css";
import { useTrackStore } from "../../../utils/trackStore";
type PlaylistItemProps = {
  track: {
    id: number;
    title: string;
    timesListened: number;
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
export const PlaylistItem = ({ track, index }: PlaylistItemProps) => {
  const utils = trpc.useUtils();
  const addTrackListenerMutate = trpc.user.addTrackListener.useMutation({
    onSuccess: () => {
      utils.user.getPlaylist.invalidate();
    },
  });
  const isPlaying = useTrackStore((state) => state.beingPlayed);
  const trackQueuedId = useTrackStore((state) => state.trackId);
  const changePlayMode = useTrackStore((state) => state.changePlay);
  const changeTrack = useTrackStore((state) => state.changeTrack);
  const handleChangeMusic = async (newTrackId: number) => {
    if (newTrackId != trackQueuedId) {
      changeTrack(newTrackId);
      changePlayMode(true);
      await addTrackListenerMutate.mutateAsync({
        trackId: newTrackId,
      });
    } else {
      changePlayMode(!isPlaying);
    }
  };
  return (
    <li className="playlistItem" onClick={() => handleChangeMusic(track.id)}>
      <section>
        <header>
          {/* TODO: Create a component */}
          {isPlaying && trackQueuedId == track.id ? (
            <img src="/public/PauseButton.svg" className="hide" />
          ) : (
            <img src="/public/PlayButton.svg" className="hide" />
          )}

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
      <section>{track.timesListened}</section>
      <section>
        <h3>
          {track.minutes}:{track.seconds.toString().substring(0, 2)}
        </h3>
      </section>
    </li>
  );
};
