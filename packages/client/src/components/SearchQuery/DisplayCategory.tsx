import "../../styles/SearchQuery/DisplayCategory.css";

export const DisplayCategory = ({
  category,
}: {
  category: {
    title: string;
    array: any;
  };
}) => {
  console.log("array : ", category.title, category.array);
  return (
    <section className="displayCategories">
      <header>
        <h4>{category.title}</h4>
        <p>See all</p>
      </header>
      <main>
        {category.array.length > 0 ? (
          category.array.map((item: any) => (
            <section>
              <header>
                <img src="./Thumbnail.png" />
                <p>{item.title}</p>
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
