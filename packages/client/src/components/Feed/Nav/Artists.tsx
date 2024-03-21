import { trpc } from "../../../../utils/trpc";

export const Artists = () => {
  const artistsFetch = trpc.user.getArtists.useQuery();
  const artists =
    artistsFetch.data && artistsFetch.data.length > 5
      ? artistsFetch.data?.slice(0, 5)
      : artistsFetch.data;

  if (!artists) {
    return <p>No playlist found !</p>;
  }
  const dataTracks = {
    nbListeners: 0,
    nbTracks: 0,
  };
  return (
    <ul className="playlistsFeed">
      {artists.map((artist) => (
        <li key={artist.id}>
          <section>
            <img src="./Thumbnail.png" />
            <p>{artist.username}</p>
          </section>
          <section>
            {dataTracks.nbTracks} tracks - {dataTracks.nbListeners} Listeners{" "}
          </section>
          <section>{}</section>
          <section></section>
        </li>
      ))}
    </ul>
  );
};
