import { Link } from "react-router-dom";
import "../../styles/SearchQuery/DisplayCategory.css";
import { trpc } from "../../../utils/trpc";

export const DisplayCategory = ({
  category,
  query,
}: {
  category: {
    title: string;
    array: any;
    type: string;
  };
  query: string;
}) => {
  const addPlaylistMutate = trpc.user.addTrackPlaylist.useMutation();
  console.log("array : ", category.title, category.array, category.type);
  return (
    <section className="displayCategories">
      <header>
        <h4>{category.title}</h4>
        <Link to={`/${category.title.toLowerCase()}/${query}`}>See all</Link>
      </header>
      <main>
        {category.array && category.array.length > 0 ? (
          category.array.map((item: any) => (
            <section>
              {" "}
              <Link key={item.id} to={`/${category.type}/${item.id}`}>
                <header>
                  <img
                    src={
                      item.thumbnailPath
                        ? `http://localhost:8000/uploads/${category.type}/${item.thumbnailPath}`
                        : "/public/Thumbnail.png"
                    }
                  />
                  {item.title && <p>{item.title}</p>}
                  {item.username && <p>{item.username}</p>}
                </header>
              </Link>
              <footer>
                {/* #TODO - Change color of SVG */}
                <img src="/public/HeartFull.svg" />
                <img src="/public/HeartEmpty.svg" />
                <img
                  src="/public/AddPlaylist.svg"
                  onClick={() => {
                    console.log("zaeaze");
                  }}
                />
              </footer>
            </section>
          ))
        ) : (
          <p>No result found</p>
        )}
      </main>
    </section>
  );
};
