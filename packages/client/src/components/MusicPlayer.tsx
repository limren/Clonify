import { useTrackStore } from "../../utils/trackStore";
import { trpc } from "../../utils/trpc";
import "../styles/MusicPlayer.css";

export const MusicPlayer = () => {
  const trackId = useTrackStore((store) => store.trackId);
  console.log("trackid : ", trackId);
  const isPlaying = useTrackStore((store) => store.beingPlayed);
  const changePlayMode = useTrackStore((store) => store.changePlay);
  const getTrackFetch = trpc.user.getTrack.useQuery({
    trackId: trackId,
  });
  const trackData = getTrackFetch.data;
  if (!trackData) {
    return <section className="MusicPlayer"></section>;
  }
  return (
    <section className="MusicPlayer">
      <header>
        {/* TODO: Change it to be album's cover as default */}
        <img
          src={
            trackData.thumbnailPath
              ? `http/localhost:8000/uploads/track/${trackData.thumbnailPath}`
              : "/public/Thumbnail.png"
          }
        />
        <section>
          <h2>{trackData.title}</h2>
          <h3>
            {trackData.User?.username
              ? trackData.User.username
              : "Unknown artist"}
          </h3>
        </section>
      </header>
      <main>
        <section>
          <img src="/public/NextButton.svg" alt="Previous" />
          {isPlaying ? (
            <img
              src="/public/PauseButton.svg"
              alt="Pause"
              onClick={() => changePlayMode(false)}
            />
          ) : (
            <img
              src="/public/PlayButton.svg"
              alt="Play"
              onClick={() => changePlayMode(true)}
            />
          )}
          <img src="/public/NextButton.svg" alt="Next" />
        </section>
        <section>
          <section></section>
          <section>
            <p>
              {trackData.minutes}:{trackData.seconds.toString().substring(0, 2)}
            </p>
          </section>
        </section>
      </main>
      <footer></footer>
    </section>
  );
};
