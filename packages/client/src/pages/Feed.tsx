import { FeedNav } from "../components/Feed/FeedNav";
import { NewReleases } from "../components/Feed/NewReleases";
import { PlaylistOfTheDay } from "../components/Feed/PlaylistOfTheDay";
import { Playlists } from "../components/Feed/Playlists";
import "../styles/Feed/Feed.css";

export const Feed = () => {
  return (
    <section className="feed">
      <main>
        <header>
          <PlaylistOfTheDay />
        </header>
        <main>
          <FeedNav />
          <Playlists />
        </main>
      </main>
      <section>
        <NewReleases />
      </section>
    </section>
  );
};
