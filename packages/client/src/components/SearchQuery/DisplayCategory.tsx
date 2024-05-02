import { Link } from "react-router-dom";
import "../../styles/SearchQuery/DisplayCategory.css";

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
            <Link key={item.id} to="#">
              <header>
                <img src="../Thumbnail.png" />
                {item.title && <p>{item.title}</p>}
                {item.username && <p>{item.username}</p>}
              </header>
              <footer>
                <img src="../HeartFull.svg"></img>
                <img src="../HeartEmpty.svg"></img>
              </footer>
            </Link>
          ))
        ) : (
          <p>No result found</p>
        )}
      </main>
    </section>
  );
};
