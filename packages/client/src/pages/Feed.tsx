import { FeedNav } from "../components/Feed/FeedNav";
import { NewReleases } from "../components/Feed/NewReleases";
import { PlaylistOfTheDay } from "../components/Feed/PlaylistOfTheDay";
import { PlaylistsFeedNav } from "../components/Feed/Nav/PlaylistsFeedNav";
import "../styles/Feed/Feed.css";

export const Feed = ({ children }: { children?: React.ReactNode }) => {
  return (
    <section className="feed">
      <main>
        <header>
          <PlaylistOfTheDay />
        </header>
        <main>
          <FeedNav />
          {children ? children : <PlaylistsFeedNav />}
        </main>
      </main>
      <section>
        <NewReleases />
      </section>
    </section>
  );
};
