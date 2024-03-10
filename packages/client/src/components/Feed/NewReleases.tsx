import { trpc } from "../../../utils/trpc";
import "../../styles/Feed/NewReleases.css";

export const NewReleases = () => {
  const newReleasesFetch = trpc.user.getNewReleases.useQuery();
  const newReleases = newReleasesFetch.data;

  return (
    <section className="newReleases">
      <h2>NEW RELEASES</h2>
      {newReleases ? (
        newReleases?.map((newReleases) => {
          return (
            <section key={newReleases.id}>
              <img src={"./Thumbnail.png"} alt={newReleases.title} />
              <main>
                <h3>{newReleases.title}</h3>
                <section>
                  <p>Track</p>
                  <p>{newReleases.User?.username}</p>
                  <p>
                    {newReleases.Album ? newReleases.Album.title : "Single"}
                  </p>
                </section>
              </main>
            </section>
          );
        })
      ) : (
        <header>No release yet...</header>
      )}
    </section>
  );
};
