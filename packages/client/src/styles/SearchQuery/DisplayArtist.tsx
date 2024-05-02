import React, { useState } from "react";
import { Link } from "react-router-dom";
import { trpc } from "../../../utils/trpc";

export const DisplayArtist = ({
  query,
  artists,
}: {
  query: string;
  artists:
    | {
        username: string;
        email: string;
        id: number;
        profilePath: string | null;
      }[]
    | undefined;
}) => {

    const [hasBeenLiked, setHasBeenLiked] = useState(false);
    const trpcMutation = trpc.

    const handleLike = () => {
        const liked = !hasBeenLiked;
        setHasBeenLiked(!hasBeenLiked);
        console.log(liked);
        if(liked){

        }
    }
  return (
    <section className="displayCategories">
      <header>
        <h4>Artis</h4>
        <Link to={`/artist/${query}`}>See all</Link>
      </header>
      <main>
        {artists && artists.length > 0 ? (
          artists.map((artist) => (
            <Link key={artist.id} to="#">
              <header>
                <img src="../Thumbnail.png" />
                {artist.username && <p>{artist.username}</p>}
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
