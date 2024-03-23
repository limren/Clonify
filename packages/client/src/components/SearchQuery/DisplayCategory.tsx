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
            <section>
              <header>
                <img src="./Thumbnail.png" />
                {item.title && <p>{item.title}</p>}
                {item.username && <p>{item.username}</p>}
                <p>{category.type}</p>
              </header>
            </section>
          ))
        ) : (
          <p>No result found</p>
        )}
      </main>
    </section>
  );
};
