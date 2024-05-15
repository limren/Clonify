import { useRef } from "react";
import { useOutsideAlerter } from "../../../utils/hooks";
import { trpc } from "../../../utils/trpc";
import "../../styles/ContextMenu/ContextMenu.css";
export const ContextMenu = ({
  trackId,
  setActive,
}: {
  trackId: number;
  setActive: React.Dispatch<boolean>;
}) => {
  // Pop up should close when the user clicks outside
  const ref = useRef(null);
  const myPlaylistFetch = trpc.user.getPlaylists.useQuery();
  const myPlaylists = myPlaylistFetch.data;
  const addTrackPlaylistMutate = trpc.user.addTrackToPlaylist.useMutation();

  useOutsideAlerter(ref, setActive);
  return (
    <section className="contextMenu" ref={ref}>
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
