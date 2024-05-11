import { trpc } from "../../../utils/trpc";
import "../../styles/ContextMenu/ContextMenu.css";
export const ContextMenu = ({
  trackId,
  setActive,
}: {
  trackId: number;
  setActive: React.Dispatch<boolean>;
}) => {
  const myPlaylistFetch = trpc.user.getPlaylists.useQuery();
  const myPlaylists = myPlaylistFetch.data;
  const addTrackPlaylistMutate = trpc.user.addTrackToPlaylist.useMutation();
  return (
    <section className="contextMenu">
      <main>
        {myPlaylists?.map((playlist) => (
          <section
            onClick={async () => {
              const res = await addTrackPlaylistMutate.mutateAsync({
                trackId: trackId,
                playlistId: playlist.id,
              });
              // #TODO : Handle better errors from back
              if (res) setActive(false);
            }}
            key={playlist.id}
          >
            {playlist.title}
          </section>
        ))}
      </main>
    </section>
  );
};
