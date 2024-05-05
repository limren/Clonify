import { useLocation } from "react-router-dom";
import { trpc } from "../../utils/trpc";
import { DisplayCategory } from "../components/SearchQuery/DisplayCategory";
import "../styles/SearchQuery.css";
export const SearchQuery = () => {
  const location = useLocation();
  console.log("location :", location);
  const query = location.search.split("=")[1];
  const searchByMutation = trpc.user.searchBy.useQuery({
    query: query,
  });
  const categories = [
    {
      title: "Tracks",
      array: searchByMutation.data?.songs,
      type: "track",
    },
    {
      title: "Playlists",
      array: searchByMutation.data?.playlists,
      type: "playlist",
    },
    {
      title: "Artists",
      array: searchByMutation.data?.artists,
      type: "artist",
    },
    {
      title: "Albums",
      array: searchByMutation.data?.albums,
      type: "album",
    },
  ];

  console.log("result : ", searchByMutation.data);
  return (
    <section className="searchQuery">
      <header>
        <h3>Results for your research : {query} </h3>
      </header>
      <main>
        {categories.map((category) => (
          <DisplayCategory category={category} query={query} />
        ))}
      </main>
    </section>
  );
};
