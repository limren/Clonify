import { Link } from "react-router-dom";
import "../../styles/SearchQuery/DisplayCategory.css";
import { CategoryItem } from "./CategoryItem";

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
          // #TODO : Fix any type
          category.array.map((item: any) => (
            <CategoryItem item={item} category={category} key={item.id} />
          ))
        ) : (
          <p>No result found</p>
        )}
      </main>
    </section>
  );
};
