import { useEffect, useState } from "react";
import { useTrackStore } from "../../utils/trackStore";
import { trpc } from "../../utils/trpc";
import "../styles/MusicPlayer.css";

// TODO: Make this component simplier

export const MusicPlayer = () => {
  const [seconds, setSeconds] = useState(0);
  const trackId = useTrackStore((store) => store.trackId);
  const isPlaying = useTrackStore((store) => store.beingPlayed);
  const changePlayMode = useTrackStore((store) => store.changePlay);
  const getTrackFetch = trpc.user.getTrack.useQuery({
    trackId: trackId,
  });
  const toggleLikedTrackMutation = trpc.user.toggleLikeTrack.useMutation();
  const trackData = getTrackFetch.data;
  const minutesTrack = trackData?.minutes ? trackData?.minutes : 0;
  const secondsTrack = trackData?.seconds ? trackData?.seconds : 0;
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying && minutesTrack * 60 + secondsTrack == seconds) {
        changePlayMode(false);
      } else {
        setSeconds((state) => state + 1);
      }
    }, 1000);
    // When component unmount it clears the created interval when mounted
    return () => clearInterval(intervalId);
  }, []);
  if (!trackData) {
    return <section className="MusicPlayer"></section>;
  }

  const handleLike = async () => {
    const res = await toggleLikedTrackMutation.mutateAsync({
      trackId: trackData.id,
    });
    // TODO: Handle state better
    trackData.isLiked = res;
  };

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
          <section>
            <p>
              {(seconds / 60).toString().substring(0, 1)}:
              {seconds % 60 > 9 ? seconds % 60 : "0" + (seconds % 60)}
            </p>
          </section>
          <section></section>
          <section>
            <p>
              {trackData.minutes}:
              {trackData.seconds > 9
                ? trackData.seconds.toString().substring(0, 2)
                : "0" + trackData.seconds.toString().substring(0, 2)}
            </p>
          </section>
        </section>
      </main>
      {/* TODO: Add pop up playlist */}
      <footer>
        {trackData.isLiked ? (
          <img src="/HeartFull.svg" alt="Liked track" onClick={handleLike} />
        ) : (
          <img src="/HeartEmpty.svg" alt="Like track" onClick={handleLike} />
        )}
      </footer>
    </section>
  );
};
