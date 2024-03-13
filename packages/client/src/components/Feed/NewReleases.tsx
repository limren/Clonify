import { Link } from "react-router-dom";
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
            <Link to="/" key={newReleases.id}>
              <img src={"./Thumbnail.png"} alt={newReleases.title} />
              <main>
                <h3>{newReleases.title}</h3>
                <ul>
                  <li>Track</li>
                  <li>∙ {newReleases.User?.username}</li>
                  <li>
                    ∙ {newReleases.Album ? newReleases.Album.title : "Single"}
                  </li>
                  <li>∙ {newReleases.year}</li>
                </ul>
              </main>
            </Link>
          );
        })
      ) : (
        <header>No release yet...</header>
      )}
    </section>
  );
};
