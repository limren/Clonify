import { useState } from "react";
import { Link } from "react-router-dom";
import { ContextMenu } from "../ContextMenu/ContextMenu";

export const CategoryItem = ({
  item,
  category,
}: {
  item: any;
  category: {
    title: string;
    array: any;
    type: string;
  };
}) => {
  const [active, setActive] = useState(false);
  return (
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
        {category.type === "track" && (
          <img src="/public/AddPlaylist.svg" onClick={() => setActive(true)} />
        )}
        {active && <ContextMenu trackId={item.id} setActive={setActive} />}
      </footer>
    </section>
  );
};
